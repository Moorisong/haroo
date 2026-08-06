import { NextRequest, NextResponse } from 'next/server'
import { calculateRefund } from '@/lib/refundCalculator'

/**
 * POST /api/subscriptions/cancel-refund
 * 구독 해지 + Math.ceil 환불 자동 정산
 * 실제 구현: 포트원 부분 취소 API → DB 상태 업데이트
 */
export async function POST(req: NextRequest) {
  try {
    const { projectId, totalPaid, totalMonths, paidAt } = await req.json()

    if (!projectId || !totalPaid || !totalMonths || !paidAt) {
      return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 })
    }

    const elapsedDays = Math.floor(
      (Date.now() - new Date(paidAt).getTime()) / (1000 * 60 * 60 * 24),
    )

    const refund = calculateRefund({ totalPaid, totalMonths, elapsedDays })

    // TODO: 실제 구현
    // 1. 포트원 부분 취소 API 호출 (finalRefund 금액)
    // 2. DB UserProject status = STOPPED
    // 3. EC2 컨테이너 정지

    return NextResponse.json({
      projectId,
      refund,
      status: 'REFUNDED',
      message: `환불 금액 ${refund.finalRefund.toLocaleString()}원이 처리됩니다.`,
    })
  } catch (error) {
    console.error('[api/subscriptions/cancel-refund]', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
