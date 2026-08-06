'use client'

import { Filter, MousePointerClick, CreditCard } from 'lucide-react'

interface Props {
  totalVisitors: number
  draftUsers: number
  paidUsers: number
}

/**
 * 어드민 퍼널 지표 패널 (방문 -> 조립 -> 결제)
 */
export default function AdminFunnelPanel({ totalVisitors, draftUsers, paidUsers }: Props) {
  const conversionRate = totalVisitors > 0 ? ((paidUsers / totalVisitors) * 100).toFixed(1) : '0.0'
  const dropoffRate = totalVisitors > 0 ? (((totalVisitors - draftUsers) / totalVisitors) * 100).toFixed(1) : '0.0'

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-700" />
          <h2 className="text-sm font-bold text-slate-900">가입 퍼널</h2>
        </div>
        <div className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded">
          최종 전환율 {conversionRate}%
        </div>
      </div>

      <div className="space-y-4 relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100 z-0" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-slate-500">1</span>
          </div>
          <div className="flex-1 bg-slate-50 rounded-xl p-3 flex justify-between items-center border border-slate-100">
            <span className="text-sm font-semibold text-slate-700">랜딩페이지 방문</span>
            <span className="text-base font-black text-slate-900">{totalVisitors.toLocaleString()}</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-slate-500">2</span>
          </div>
          <div className="flex-1 bg-sky-50 rounded-xl p-3 flex justify-between items-center border border-sky-100">
            <div>
              <span className="text-sm font-semibold text-sky-900 block">무료 조립 시작 (이탈 {dropoffRate}%)</span>
            </div>
            <span className="text-base font-black text-sky-900">{draftUsers.toLocaleString()}</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center flex-shrink-0">
            <CreditCard size={12} className="text-white" />
          </div>
          <div className="flex-1 bg-slate-900 rounded-xl p-3 flex justify-between items-center shadow-md">
            <span className="text-sm font-semibold text-white">최종 결제 완료</span>
            <span className="text-base font-black text-white">{paidUsers.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
