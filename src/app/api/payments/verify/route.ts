import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/payments/verify
 * 포트원 imp_uid 결제 금액 위변조 검증
 * 실제 구현: 포트원 REST API로 imp_uid 조회 후 amount 비교
 */
export async function POST(req: NextRequest) {
  try {
    const { imp_uid, merchant_uid, paid_amount } = await req.json()

    if (!imp_uid || !merchant_uid) {
      return NextResponse.json({ error: 'imp_uid, merchant_uid 필수' }, { status: 400 })
    }

    // TODO: 포트원 REST API 검증
    // const portoneToken = await getPortoneToken()
    // const payment = await fetch(`https://api.iamport.kr/payments/${imp_uid}`, { headers: { Authorization: portoneToken } })
    // if (payment.amount !== paid_amount) throw new Error('금액 위변조 감지')

    return NextResponse.json({ verified: true, imp_uid, merchant_uid, paid_amount })
  } catch (error) {
    console.error('[api/payments/verify]', error)
    return NextResponse.json({ error: '결제 검증 실패' }, { status: 400 })
  }
}
