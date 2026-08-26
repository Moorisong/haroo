import { NextRequest, NextResponse } from 'next/server'
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
 * GET /api/drafts/list
 * 유저 드래프트 목록 DB & 백업 캐시 통합 조회 (최대 10개)
 */
export async function GET(req: NextRequest) {
  try {
    const serverStore = getServerStore()
    const tempRes = new NextResponse()
    const supabase = createSupabaseServerClient(req, tempRes)
    
    let userId = ''
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) userId = user.id
    } catch (e) {
      // ignore
    }
    if (!userId) {
      userId = await getAuthenticatedUserId(req, tempRes)
    }

    // 1. Supabase DB 조회 시도
    let dbData: any[] = []
    try {
      const { data, error } = await supabase
        .from('UserProjectDraft')
        .select('*')
        .or(`userId.eq.${userId},user_id.eq.${userId}`)
        .order('updatedAt', { ascending: false })
        .limit(10)

      if (!error && data && data.length > 0) {
        dbData = data
      } else {
        const res2 = await supabase
          .from('user_project_drafts')
          .select('*')
          .limit(10)
        if (res2.data) dbData = res2.data
      }
    } catch (e) {
      console.warn('[api/drafts/list DB read warn]', e)
    }

    // DB 데이터 파싱
    const dbDrafts = dbData.map((row: Record<string, unknown>) => {
      const selectedBlocksData = row.selectedBlocks || row.block_config_json || []
      let blockCount = 0

      if (Array.isArray(selectedBlocksData)) {
        blockCount = selectedBlocksData.length
      } else if (typeof selectedBlocksData === 'object' && selectedBlocksData !== null) {
        const pagesObj = (selectedBlocksData as { pages?: { blocks?: unknown[] }[] }).pages
        if (Array.isArray(pagesObj)) {
          blockCount = pagesObj.reduce((acc, p) => acc + (Array.isArray(p.blocks) ? p.blocks.length : 0), 0)
        }
      }

      const updatedAtRaw = (row.updatedAt || row.updated_at || new Date().toISOString()) as string
      const formattedDate = typeof updatedAtRaw === 'string' ? updatedAtRaw.split('T')[0] : new Date().toISOString().split('T')[0]

      return {
        id: (row.id || row.draft_id) as string,
        name: (row.name || row.draft_name || '') as string,
        selectedBlocks: selectedBlocksData,
        versionClock: (row.versionClock || row.version_clock || 0) as number,
        updatedAt: formattedDate,
        blocksCount: blockCount,
      }
    })

    // 2. 백업 서버 캐시 데이터 병합 (중복 제거)
    const memDrafts = (serverStore.get(userId) || []).map((d: any) => {
      const selectedBlocksData = d.selectedBlocks || []
      let blockCount = 0
      if (Array.isArray(selectedBlocksData)) {
        blockCount = selectedBlocksData.length
      } else if (typeof selectedBlocksData === 'object' && selectedBlocksData !== null) {
        const pagesObj = (selectedBlocksData as { pages?: { blocks?: unknown[] }[] }).pages
        if (Array.isArray(pagesObj)) {
          blockCount = pagesObj.reduce((acc, p) => acc + (Array.isArray(p.blocks) ? p.blocks.length : 0), 0)
        }
      }

      return {
        id: d.id,
        name: d.name || '',
        selectedBlocks: d.selectedBlocks,
        versionClock: d.versionClock || 0,
        updatedAt: typeof d.updatedAt === 'string' ? d.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0],
        blocksCount: blockCount,
      }
    })

    // 병합 및 중복 제거 (memDrafts 우선)
    const draftMap = new Map<string, any>()
    dbDrafts.forEach((d) => draftMap.set(d.id, d))
    memDrafts.forEach((d: any) => draftMap.set(d.id, d))

    const mergedDrafts = Array.from(draftMap.values()).slice(0, 10)

    const jsonRes = NextResponse.json({ drafts: mergedDrafts, userId })
    return copyCookies(tempRes, jsonRes)
  } catch (error) {
    console.error('[api/drafts/list error]', error)
    return NextResponse.json({ drafts: [] })
  }
}
