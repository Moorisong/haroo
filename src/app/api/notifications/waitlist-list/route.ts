import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUserId } from '@/lib/supabaseServer'
import { WaitlistSignupModel } from '@/lib/db/models/WaitlistSignup'

/**
 * GET /api/notifications/waitlist-list?projectId=xxx
 * 인증된 유저의 프로젝트 신청자 목록 조회 (대시보드용)
 */
export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req)
    if (!userId || userId.startsWith('anon_')) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')
    if (!projectId) {
      return NextResponse.json({ error: 'projectId가 필요합니다.' }, { status: 400 })
    }

    const signups = await WaitlistSignupModel.getByProject(projectId)
    const total = signups.length
    const pending = signups.filter((s) => s.status === 'PENDING').length
    const notified = signups.filter((s) => s.status === 'NOTIFIED').length

    return NextResponse.json({ signups, total, pending, notified })
  } catch (error) {
    console.error('[api/notifications/waitlist-list]', error)
    return NextResponse.json({ error: '조회 실패' }, { status: 500 })
  }
}
