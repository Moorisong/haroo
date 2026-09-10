import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createSupabaseServerClient, getAuthenticatedUserId, copyCookies } from '@/lib/supabaseServer'

declare global {
  // eslint-disable-next-line no-var
  var globalDraftStore: Map<string, any[]> | undefined
}
function getServerStore() {
  if (!global.globalDraftStore) {
    global.globalDraftStore = new Map()
  }
  return global.globalDraftStore
}

/**
 * 동일 이름 존재 시 (n) 번호를 붙여 유일한 프로젝트 이름을 만들어주는 헬퍼
 */
function resolveUniqueDraftName(rawName: string, targetDraftId: string, existingDrafts: any[]): string {
  const trimmed = rawName ? rawName.trim() : ''
  
  // 자기 자신의 기존 이름과 동일하면 유지
  const selfDraft = existingDrafts.find((d) => d.id === targetDraftId)
  if (selfDraft && selfDraft.name === trimmed) {
    return trimmed
  }

  const otherNames = existingDrafts
    .filter((d) => d.id !== targetDraftId)
    .map((d) => (d.name || d.draft_name || '').trim())

  if (!otherNames.includes(trimmed)) {
    return trimmed
  }

  // 중복 발생 시 '이름 (1)', '이름 (2)' 순차 생성
  const cleanBase = trimmed.replace(/\s\(\d+\)$/, '')
  let index = 1
  let candidate = `${cleanBase} (${index})`
  while (otherNames.includes(candidate)) {
    index++
    candidate = `${cleanBase} (${index})`
  }
  return candidate
}

/**
 * POST /api/drafts/save
 * 드래프트 DB 저장 (동일 이름 시 (n) 자동 생성)
 */
export async function POST(req: NextRequest) {
  try {
    const serverStore = getServerStore()
    const tempRes = new NextResponse()
    const supabase = createSupabaseServerClient(req, tempRes)
    const userId = await getAuthenticatedUserId(req, tempRes)
    const body = await req.json()
    const { draftId, name, selectedBlocks, versionClock } = body

    if (!name || !name.trim() || (!Array.isArray(selectedBlocks) && typeof selectedBlocks !== 'object')) {
      const errRes = NextResponse.json({ error: '프로젝트 이름을 입력해 주세요' }, { status: 400 })
      return copyCookies(tempRes, errRes)
    }

    const targetDraftId = draftId || `draft_${uuidv4().slice(0, 12)}`
    const nowIso = new Date().toISOString()

    // 1. 기존 유저 드래프트 목록 가져오기 (중복 이름 체크용)
    const existingMemDrafts = serverStore.get(userId) || []
    let existingDbDrafts: any[] = []
    try {
      const dbCheckPromise = supabase
        .from('UserProjectDraft')
        .select('id, name')
        .eq('userId', userId)
      const timeoutPromise = new Promise<{ data: any[] }>((resolve) =>
        setTimeout(() => resolve({ data: [] }), 1200)
      )
      const { data } = await Promise.race([dbCheckPromise, timeoutPromise])
      if (data) existingDbDrafts = data
    } catch (e) {
      // ignore
    }

    const allExisting = [...existingMemDrafts, ...existingDbDrafts]
    const finalUniqueName = resolveUniqueDraftName(name, targetDraftId, allExisting)

    const draftData = {
      id: targetDraftId,
      draft_id: targetDraftId,
      userId: userId,
      user_id: userId,
      name: finalUniqueName,
      draft_name: finalUniqueName,
      selectedBlocks: selectedBlocks,
      block_config_json: selectedBlocks,
      versionClock: versionClock ?? 0,
      version_clock: versionClock ?? 0,
      updatedAt: nowIso,
      updated_at: nowIso,
    }

    // 2. 서버 캐시에 우선 기록
    const userDrafts = serverStore.get(userId) || []
    const existingIdx = userDrafts.findIndex((d: any) => d.id === targetDraftId)
    const formattedDraft = {
      id: targetDraftId,
      name: finalUniqueName,
      selectedBlocks,
      versionClock: versionClock ?? 0,
      updatedAt: nowIso,
    }

    if (existingIdx > -1) {
      userDrafts[existingIdx] = formattedDraft
    } else {
      userDrafts.unshift(formattedDraft)
    }
    if (userDrafts.length > 10) userDrafts.pop()
    serverStore.set(userId, userDrafts)

    // 3. Supabase DB 저장 시도
    try {
      const { error } = await supabase
        .from('UserProjectDraft')
        .upsert(draftData, { onConflict: 'id' })

      if (error) {
        await supabase
          .from('user_project_drafts')
          .upsert(draftData, { onConflict: 'id' })
      }
    } catch (dbErr) {
      console.warn('[api/drafts/save DB sync warn]', dbErr)
    }

    const jsonRes = NextResponse.json({
      draftId: targetDraftId,
      name: finalUniqueName,
      versionClock: versionClock ?? 0,
      updatedAt: nowIso,
      success: true,
    })

    return copyCookies(tempRes, jsonRes)
  } catch (error) {
    console.error('[api/drafts/save error]', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
