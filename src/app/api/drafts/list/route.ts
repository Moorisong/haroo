import { NextResponse } from 'next/server'

/**
 * GET /api/drafts/list
 * 유저 드래프트 목록 조회
 * 실제 구현: Supabase UserProjectDraft select where userId + 90일 TTL 필터
 */
export async function GET() {
  try {
    // TODO: 실제 구현 - 인증 미들웨어로 userId 추출 후 Supabase 조회
    const mockDrafts = [
      {
        id: 'd1',
        name: '새 프로젝트',
        selectedBlocks: [],
        versionClock: 0,
        updatedAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({ drafts: mockDrafts })
  } catch (error) {
    console.error('[api/drafts/list]', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
