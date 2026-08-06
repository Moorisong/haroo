import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/payments/portone-webhook
 * 포트원 결제 상태 변경 웹훅 수신 (결제 완료, 부분 취소 등)
 * Vercel Serverless Function 타임아웃 방지를 위해 응답 후 비동기 처리 권장
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imp_uid, merchant_uid, status } = body

    if (!imp_uid || !merchant_uid) {
      return NextResponse.json({ error: '필수 파라미터 누락' }, { status: 400 })
    }

    // TODO: 결제 위변조 검증 (포트원 API 호출)
    console.log(`[WebHook] imp_uid: ${imp_uid}, status: ${status}`)

    if (status === 'paid') {
      // 결제 성공 처리 -> DB 상태 변경 등
    } else if (status === 'cancelled') {
      // 결제 취소(환불) 처리
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[api/payments/portone-webhook]', error)
    return NextResponse.json({ error: '웹훅 처리 실패' }, { status: 500 })
  }
}
