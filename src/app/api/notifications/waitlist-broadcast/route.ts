import { NextRequest, NextResponse } from 'next/server'
import { KakaoTalkClient } from '@/lib/kakaoTalkClient'

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json()

    if (phone) {
      // 1. 단일 유저 신청 (결제 페이지 모달에서 호출)
      // TODO: DB Waitlist 테이블에 phone 저장
      console.log(`[Waitlist] 신청: ${phone}`)
      return NextResponse.json({ success: true })
    } else {
      // 2. 어드민 일괄 발송 (어드민 페이지에서 호출)
      // TODO: DB에서 대기자 목록 조회 후 KakaoTalkClient.broadcast 호출
      const mockPhones = ['01012345678', '01087654321']
      await KakaoTalkClient.broadcast(mockPhones, 'TPL_OPEN_01')
      return NextResponse.json({ success: true, count: mockPhones.length })
    }
  } catch (error) {
    console.error('[api/notifications/waitlist-broadcast]', error)
    return NextResponse.json({ error: '처리 실패' }, { status: 500 })
  }
}
