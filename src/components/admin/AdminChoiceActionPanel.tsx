'use client'

import { useState } from 'react'
import { ShieldAlert, Users, HelpCircle } from 'lucide-react'

/**
 * 어드민 액션 패널
 * 서킷 브레이커, 정원제 모드 토글 및 잘리지 않는 호버 툴팁 기능
 */
export default function AdminChoiceActionPanel() {
  const [circuitBreaker, setCircuitBreaker] = useState(false)
  const [waitlistMode, setWaitlistMode] = useState(false)

  const toggleCircuitBreaker = async () => {
    setCircuitBreaker(!circuitBreaker)
  }

  const toggleWaitlistMode = async () => {
    setWaitlistMode(!waitlistMode)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative z-20 overflow-visible">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert size={16} className="text-slate-700" />
          <h2 className="text-sm font-bold text-slate-900">시스템 긴급 제어판</h2>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">마우스를 올려 설명을 확인하세요</span>
      </div>

      <div className="p-5 divide-y divide-slate-100 space-y-5">
        {/* 1. 서킷 브레이커 */}
        <div className="space-y-2 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 relative group/tooltip">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 cursor-help">
                <span>서킷 브레이커</span>
                <HelpCircle size={15} className="text-slate-400 group-hover/tooltip:text-red-500 transition-colors" />
              </div>

              {/* 하단으로 표출되어 잘리지 않는 툴팁 팝업 */}
              <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl text-xs z-[999] opacity-0 group-hover/tooltip:opacity-100 pointer-events-none group-hover/tooltip:pointer-events-auto transition-all duration-200 -translate-y-1 group-hover/tooltip:translate-y-0 border border-slate-700">
                {/* 툴팁 상단 화살표 */}
                <div className="absolute left-6 -top-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-slate-900" />

                <div className="flex items-center gap-1.5 font-bold text-red-400 mb-1.5 border-b border-slate-800 pb-1.5">
                  <ShieldAlert size={14} />
                  <span>서킷 브레이커 (Circuit Breaker)</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-normal">
                  AWS 서버 및 인프라 운영비의 무제한 과금을 방지하는 <strong className="text-white">긴급 차단 시스템</strong>입니다.
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p>• <strong>발동 시:</strong> 모든 신규 컨테이너 배포 및 결제가 즉시 동결됩니다.</p>
                  <p>• <strong>유지:</strong> 기존 운영 중인 프로젝트 사이트는 정상 유지됩니다.</p>
                </div>
              </div>
            </div>

            <button
              onClick={toggleCircuitBreaker}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                circuitBreaker ? 'bg-red-500' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  circuitBreaker ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-normal">
            EC2 및 인프라 과금 폭증 시 신규 배포를 자동/수동 차단합니다.
          </p>

          {circuitBreaker && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 mt-2">
              <ShieldAlert size={14} className="text-red-600 mt-0.5" />
              <div className="text-xs text-red-700 font-semibold leading-relaxed">
                서킷 브레이커 발동 중입니다. 모든 신규 프로젝트 생성이 동결되어 과금을 방지하고 있습니다.
              </div>
            </div>
          )}
        </div>

        {/* 2. 정원제 (대기자) 모드 */}
        <div className="pt-4 space-y-2 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 relative group/tooltip">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 cursor-help">
                <span>정원제 (대기자) 모드</span>
                <HelpCircle size={15} className="text-slate-400 group-hover/tooltip:text-sky-500 transition-colors" />
              </div>

              {/* 하단으로 표출되어 잘리지 않는 툴팁 팝업 */}
              <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl text-xs z-[999] opacity-0 group-hover/tooltip:opacity-100 pointer-events-none group-hover/tooltip:pointer-events-auto transition-all duration-200 -translate-y-1 group-hover/tooltip:translate-y-0 border border-slate-700">
                {/* 툴팁 상단 화살표 */}
                <div className="absolute left-6 -top-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-slate-900" />

                <div className="flex items-center gap-1.5 font-bold text-sky-400 mb-1.5 border-b border-slate-800 pb-1.5">
                  <Users size={14} />
                  <span>정원제 모드 (Waitlist Mode)</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-normal">
                  서버 수용 인원 초과 시 신규 가입 대신 <strong className="text-white">사전 대기자 명단을 수집</strong>하는 모드입니다.
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p>• <strong>발동 시:</strong> 결제창 진입 시 결제 대신 전화번호 입력 모달이 뜹니다.</p>
                  <p>• <strong>활용:</strong> 수집된 명단으로 카카오 알림톡 1초 일괄 발송이 가능합니다.</p>
                </div>
              </div>
            </div>

            <button
              onClick={toggleWaitlistMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                waitlistMode ? 'bg-sky-500' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  waitlistMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-normal">
            신규 결제를 차단하고 카카오 알림톡 사전 예약 명단을 수집합니다.
          </p>

          {waitlistMode && (
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-2 mt-2">
              <Users size={14} className="text-sky-600 mt-0.5" />
              <div className="text-xs text-sky-700 font-semibold leading-relaxed">
                정원제 모드 활성화됨: 랜딩/결제 진입 시 카카오 사전 예약 대기자 폼이 노출됩니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
