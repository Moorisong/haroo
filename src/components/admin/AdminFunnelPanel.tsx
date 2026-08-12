'use client'

import { Filter, Edit3, CreditCard } from 'lucide-react'

interface Props {
  draftUsers: number
  paidUsers: number
}

/**
 * 어드민 퍼널 지표 패널 (조립 시작 -> 결제 완료)
 * DB의 UserProjectDraft -> UserProject 테이블 수집 데이터를 기반으로 합니다.
 */
export default function AdminFunnelPanel({ draftUsers, paidUsers }: Props) {
  const conversionRate = draftUsers > 0 ? ((paidUsers / draftUsers) * 100).toFixed(1) : '0.0'
  const dropoffRate = draftUsers > 0 ? (((draftUsers - paidUsers) / draftUsers) * 100).toFixed(1) : '0.0'

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-700" />
          <div>
            <h2 className="text-sm font-bold text-slate-900">가입 퍼널 분석</h2>
            <p className="text-[10px] text-slate-400">UserProjectDraft → UserProject 전환</p>
          </div>
        </div>
        <div className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded">
          드래프트 대비 결제율 {conversionRate}%
        </div>
      </div>

      <div className="space-y-4 relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100 z-0" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center flex-shrink-0">
            <Edit3 size={12} className="text-slate-500" />
          </div>
          <div className="flex-1 bg-slate-50 rounded-xl p-3 flex justify-between items-center border border-slate-100">
            <div>
              <span className="text-sm font-semibold text-slate-700 block">무료 사이트 조립 시작 (Draft)</span>
              <span className="text-[10px] text-slate-400">빌더에 진입해 블록을 1개 이상 추가</span>
            </div>
            <span className="text-base font-black text-slate-900">{draftUsers.toLocaleString()}명</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center flex-shrink-0">
            <CreditCard size={12} className="text-white" />
          </div>
          <div className="flex-1 bg-slate-900 rounded-xl p-3 flex justify-between items-center shadow-md">
            <div>
              <span className="text-sm font-semibold text-white block">최종 결제 완료 (Paid)</span>
              <span className="text-[10px] text-slate-400">조립 이탈률: {dropoffRate}%</span>
            </div>
            <span className="text-base font-black text-white">{paidUsers.toLocaleString()}명</span>
          </div>
        </div>
      </div>
    </div>
  )
}
