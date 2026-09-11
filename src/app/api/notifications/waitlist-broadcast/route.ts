import { NextRequest, NextResponse } from 'next/server'
import { KakaoTalkClient } from '@/lib/kakaoTalkClient'
import { WaitlistSignupModel } from '@/lib/db/models/WaitlistSignup'

/**
 * POST /api/notifications/waitlist-broadcast
 * body: { phone: string, projectId?: string }
 *
 * 방문자 알림 신청 처리:
 * 1. DB에 신청자 저장 (마스킹)
 * 2. 즉시 접수 확인 알림톡 발송
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { phone, projectId } = body as { phone?: string; projectId?: string }

    if (!phone) {
      return NextResponse.json({ error: '전화번호가 필요합니다.' }, { status: 400 })
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '')
    const resolvedProjectId = projectId || 'unknown'

    // 1. DB 저장
    await WaitlistSignupModel.insert(resolvedProjectId, cleanPhone)

    // 2. 즉시 접수 확인 알림톡 발송
    const tplCode = process.env.ALIGO_KAKAO_TEMPLATE_CODE || 'TPL_WAITLIST_01'
    await KakaoTalkClient.sendAlimtalk(cleanPhone, tplCode, {
      message: '[하루] 알림 신청이 완료되었습니다.\n오픈 및 주요 소식을 카카오톡으로 안내해 드립니다.',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[api/notifications/waitlist-broadcast]', error)
    return NextResponse.json({ error: '처리 실패' }, { status: 500 })
  }
}
