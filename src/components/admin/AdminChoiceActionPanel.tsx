'use client'

import { useState } from 'react'
import { ShieldAlert, Users, Check } from 'lucide-react'

/**
 * 어드민 액션 패널
 * 서킷 브레이커(EC2 인스턴스 자동 스케일 다운/락), 정원제 모드(가입 제한) 토글 기능
 */
export default function AdminChoiceActionPanel() {
  const [circuitBreaker, setCircuitBreaker] = useState(false)
  const [waitlistMode, setWaitlistMode] = useState(false)

  const toggleCircuitBreaker = async () => {
    // TODO: POST /api/admin/circuit-breaker/unlock 구현
    setCircuitBreaker(!circuitBreaker)
  }

  const toggleWaitlistMode = async () => {
    // TODO: POST /api/admin/waitlist-mode/toggle 구현
    setWaitlistMode(!waitlistMode)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <ShieldAlert size={16} className="text-slate-700" />
        <h2 className="text-sm font-bold text-slate-900">시스템 제어 (초과 대응)</h2>
      </div>
      <div className="p-5 divide-y divide-slate-100">
        
        {/* 서킷 브레이커 */}
        <div className="pb-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-bold text-slate-900">서킷 브레이커</div>
              <div className="text-xs text-slate-500 mt-1">EC2 비용 월 200만원 초과 시 자동 발동. 해제 시 과금 지속.</div>
            </div>
            <button
              onClick={toggleCircuitBreaker}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${circuitBreaker ? 'bg-red-500' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${circuitBreaker ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          {circuitBreaker && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 mt-3">
              <ShieldAlert size={14} className="text-red-600 mt-0.5" />
              <div className="text-xs text-red-700 font-semibold leading-relaxed">
                현재 서킷 브레이커가 발동 중입니다. 모든 신규 배포가 중단되며, 기존 사이트만 유지됩니다.
              </div>
            </div>
          )}
        </div>

        {/* 정원제 모드 */}
        <div className="pt-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-bold text-slate-900">정원제 (대기자) 모드</div>
              <div className="text-xs text-slate-500 mt-1">신규 가입을 막고 대기자 명단을 수집합니다.</div>
            </div>
            <button
              onClick={toggleWaitlistMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${waitlistMode ? 'bg-sky-500' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${waitlistMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          {waitlistMode && (
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-2 mt-3">
              <Users size={14} className="text-sky-600 mt-0.5" />
              <div className="text-xs text-sky-700 font-semibold leading-relaxed">
                결제 페이지에서 신규 결제가 차단되고 카카오 알림 신청 모달이 뜹니다.
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
