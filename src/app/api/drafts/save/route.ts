import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

/**
 * POST /api/drafts/save
 * 드래프트 임시 저장 (500ms debounce로 클라이언트에서 호출)
 * 실제 구현: Supabase UserProjectDraft upsert + 90일 TTL
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { draftId, name, selectedBlocks, versionClock } = body

    // 유효성 검사
    if (!name || !Array.isArray(selectedBlocks)) {
      return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 })
    }

    // TODO: 실제 구현 - Supabase UserProjectDraft upsert
    // const draft = await db.upsertDraft({ draftId, name, selectedBlocks, versionClock, expiresAt: 90일 후 })
    const savedDraftId = draftId ?? uuidv4()

    return NextResponse.json({
      draftId: savedDraftId,
      name,
      versionClock,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[api/drafts/save]', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
