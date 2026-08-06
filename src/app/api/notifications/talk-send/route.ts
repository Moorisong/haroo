import { NextRequest, NextResponse } from 'next/server'
import { KakaoTalkClient } from '@/lib/kakaoTalkClient'

export async function POST(req: NextRequest) {
  try {
    const { phone, templateCode, variables } = await req.json()
    
    // 알림톡 발송 시도
    const result = await KakaoTalkClient.sendAlimtalk(phone, templateCode, variables)
    
    // TODO: 실패 시 KakaoTalkClient.sendLmsFallback 호출 로직 추가

    return NextResponse.json(result)
  } catch (error) {
    console.error('[api/notifications/talk-send]', error)
    return NextResponse.json({ error: '발송 실패' }, { status: 500 })
  }
}
