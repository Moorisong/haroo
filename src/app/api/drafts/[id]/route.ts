import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, getAuthenticatedUserId, copyCookies } from '@/lib/supabaseServer'

declare global {
  // eslint-disable-next-line no-var
  var globalDraftStore: Map<string, any[]> | undefined
}
const serverStore = global.globalDraftStore || new Map()

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const tempRes = new NextResponse()
    const userId = await getAuthenticatedUserId(req, tempRes)
    const supabase = createSupabaseServerClient(req, tempRes)

    // 1. 메모리 캐시 조회
    const userDrafts = serverStore.get(userId) || []
    const foundMem = userDrafts.find((d: any) => d.id === id)
    if (foundMem) {
      const jsonRes = NextResponse.json({ draft: foundMem })
      return copyCookies(tempRes, jsonRes)
    }

    // 2. DB 조회
    let { data } = await supabase
      .from('UserProjectDraft')
      .select('*')
      .or(`id.eq.${id},draft_id.eq.${id}`)
      .single()

    if (!data) {
      const fallback = await supabase
        .from('user_project_drafts')
        .select('*')
        .eq('id', id)
        .single()
      data = fallback.data
    }

    if (!data) {
      return NextResponse.json({ error: '드래프트를 찾을 수 없습니다' }, { status: 404 })
    }

    const draft = {
      id: data.id || data.draft_id,
      name: data.name || data.draft_name || '',
      selectedBlocks: data.selectedBlocks || data.block_config_json || [],
      versionClock: data.versionClock || data.version_clock || 0,
      updatedAt: data.updatedAt || data.updated_at,
    }

    const jsonRes = NextResponse.json({ draft })
    return copyCookies(tempRes, jsonRes)
  } catch (error) {
    console.error('[api/drafts/[id] GET] error:', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const tempRes = new NextResponse()
    const userId = await getAuthenticatedUserId(req, tempRes)
    const supabase = createSupabaseServerClient(req, tempRes)

    // 1. 메모리 캐시에서 삭제
    const userDrafts = serverStore.get(userId) || []
    const updatedMem = userDrafts.filter((d: any) => d.id !== id)
    serverStore.set(userId, updatedMem)

    // 2. DB 삭제
    try {
      await supabase
        .from('UserProjectDraft')
        .delete()
        .or(`id.eq.${id},draft_id.eq.${id}`)

      await supabase
        .from('user_project_drafts')
        .delete()
        .eq('id', id)
    } catch (e) {
      console.warn('[api/drafts/[id] DELETE DB warn]', e)
    }

    const jsonRes = NextResponse.json({ success: true, deletedId: id })
    return copyCookies(tempRes, jsonRes)
  } catch (error) {
    console.error('[api/drafts/[id] DELETE] error:', error)
    return NextResponse.json({ error: '삭제 오류' }, { status: 500 })
  }
}
