import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUserId } from '@/lib/supabaseServer'
import { KakaoTalkClient } from '@/lib/kakaoTalkClient'
import { WaitlistSignupModel } from '@/lib/db/models/WaitlistSignup'

/**
 * POST /api/notifications/waitlist-send
 * body: { projectId: string, customMessage?: string }
 *
 * 오픈 알림 일괄 발송:
 * 1. PENDING 상태 신청자 전화번호 조회
 * 2. 카카오 알림톡 일괄 발송 (500건 자동 배치)
 * 3. 발송 완료 신청자 status → NOTIFIED 업데이트
 */
export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req)
    if (!userId || userId.startsWith('anon_')) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }

    const body = await req.json()
    const { projectId, customMessage } = body as { projectId?: string; customMessage?: string }

    if (!projectId) {
      return NextResponse.json({ error: 'projectId가 필요합니다.' }, { status: 400 })
    }

    // 1. 미발송 신청자 조회
    const pending = await WaitlistSignupModel.getPendingPhones(projectId)
    if (pending.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: '발송 대상이 없습니다.' })
    }

    const phones = pending.map((p) => p.phone)
    const ids = pending.map((p) => p.id)

    // 2. 일괄 발송
    const tplCode = process.env.ALIGO_KAKAO_TEMPLATE_CODE || 'TPL_WAITLIST_01'
    const result = await KakaoTalkClient.broadcast(phones, tplCode, customMessage)

    // 3. 발송 성공 건 notified_at 업데이트
    if (result.sent > 0) {
      await WaitlistSignupModel.markNotified(ids)
    }

    return NextResponse.json({
      success: result.success,
      sent: result.sent,
      failed: result.failed,
      total: pending.length,
    })
  } catch (error) {
    console.error('[api/notifications/waitlist-send]', error)
    return NextResponse.json({ error: '발송 실패' }, { status: 500 })
  }
}
