'use client'

import { DollarSign, TrendingUp } from 'lucide-react'

interface Props {
  periodLabel?: string
  revenue: number
  pgFee: number
  awsCost: number
  netProfit: number
}

/**
 * 어드민 재무 지표 패널 (매출, PG수수료, AWS비용, 순이익)
 * 선택한 기간(주간/월간/연간)에 연동됩니다.
 */
export default function AdminFinancialPanel({ periodLabel = '이번 달', revenue, pgFee, awsCost, netProfit }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign size={18} className="text-emerald-600" />
        <h2 className="text-sm font-bold text-slate-900">재무 지표 ({periodLabel})</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-xs text-slate-500 mb-1">총 매출액</div>
          <div className="text-xl font-black text-slate-900">₩ {revenue.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="text-xs text-emerald-700 mb-1 font-semibold flex items-center gap-1">
            <TrendingUp size={12} /> 순이익
          </div>
          <div className="text-xl font-black text-emerald-700">₩ {netProfit.toLocaleString()}</div>
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">포트원 PG 수수료 (약 2.5%)</span>
          <span className="text-red-500 font-medium">- ₩ {pgFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">AWS 인프라 비용 (Mock)</span>
          <span className="text-red-500 font-medium">- ₩ {awsCost.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
