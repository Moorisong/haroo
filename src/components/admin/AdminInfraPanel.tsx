'use client'

import { Server, Activity, ArrowUpCircle } from 'lucide-react'

interface Props {
  totalContainers: number
  runningContainers: number
  stoppedContainers: number
}

/**
 * 어드민 인프라 모니터링 패널
 */
export default function AdminInfraPanel({ totalContainers, runningContainers, stoppedContainers }: Props) {
  const loadPercent = Math.min((runningContainers / 100) * 100, 100) // 임의의 100개 기준 로드율

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Server size={18} className="text-slate-700" />
          <h2 className="text-sm font-bold text-slate-900">도커 컨테이너 현황</h2>
        </div>
        <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded flex items-center gap-1 transition-colors">
          <ArrowUpCircle size={12} />
          무중단 롤링 업데이트
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 rounded-xl border border-slate-100 bg-slate-50">
          <div className="text-xl font-black text-slate-900">{totalContainers}</div>
          <div className="text-[10px] text-slate-500 mt-1">총 발급수</div>
        </div>
        <div className="text-center p-3 rounded-xl border border-emerald-100 bg-emerald-50">
          <div className="text-xl font-black text-emerald-600">{runningContainers}</div>
          <div className="text-[10px] text-emerald-700 mt-1">실행 중</div>
        </div>
        <div className="text-center p-3 rounded-xl border border-slate-200 bg-slate-100">
          <div className="text-xl font-black text-slate-500">{stoppedContainers}</div>
          <div className="text-[10px] text-slate-500 mt-1">정지 (구독 만료)</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500">
          <span>예상 인스턴스 부하율</span>
          <span className="font-semibold text-slate-700">{loadPercent.toFixed(1)}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all ${loadPercent > 80 ? 'bg-red-500' : 'bg-sky-500'}`}
            style={{ width: `${loadPercent}%` }}
          />
        </div>
        {loadPercent > 80 && (
          <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
            <Activity size={12} />
            <span>부하가 높습니다. 인스턴스 스케일업을 고려하세요.</span>
          </div>
        )}
      </div>
    </div>
  )
}
