import { REFUND_PENALTY_RATE } from './constants'

interface RefundInput {
  /** 총 결제 금액 (원) */
  totalPaid: number
  /** 총 구독 기간 (개월) */
  totalMonths: number
  /** 결제일로부터 경과 일수 */
  elapsedDays: number
}

interface RefundResult {
  usedMonths: number
  remainingMonths: number
  baseRefund: number
  penaltyFee: number
  finalRefund: number
}

/**
 * 하루 환불 정산 공식 (Math.ceil 기반)
 *
 * usedMonths = Math.ceil(경과일수 / 30)
 * remainingMonths = totalMonths - usedMonths
 * baseRefund = remainingMonths × (totalPaid / totalMonths)
 * penaltyFee = totalPaid × 10%
 * finalRefund = Math.max(0, baseRefund - penaltyFee)
 */
export function calculateRefund({
  totalPaid,
  totalMonths,
  elapsedDays,
}: RefundInput): RefundResult {
  const usedMonths = Math.ceil(elapsedDays / 30)
  const remainingMonths = Math.max(0, totalMonths - usedMonths)
  const baseRefund = remainingMonths * (totalPaid / totalMonths)
  const penaltyFee = totalPaid * REFUND_PENALTY_RATE
  const finalRefund = Math.max(0, baseRefund - penaltyFee)

  return {
    usedMonths,
    remainingMonths,
    baseRefund: Math.floor(baseRefund),
    penaltyFee: Math.floor(penaltyFee),
    finalRefund: Math.floor(finalRefund),
  }
}
