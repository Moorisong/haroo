'use client'

import { useState } from 'react'
import { Activity, ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react'

export type GrowthPeriod = 'WEEKLY' | 'MONTHLY' | 'YEARLY'

interface Props {
  period?: GrowthPeriod
  onPeriodChange?: (p: GrowthPeriod) => void
}

interface GrowthData {
  label: string
  drafts: number
  paids: number
}

interface GrowthStats {
  totalDrafts: number
  totalPaids: number
  draftDelta: number
  paidDelta: number
  chartData: GrowthData[]
}

const MOCK_GROWTH_DATA: Record<GrowthPeriod, GrowthStats> = {
  WEEKLY: {
    totalDrafts: 145,
    totalPaids: 12,
    draftDelta: 15.4,
    paidDelta: 8.2,
    chartData: [
      { label: '월', drafts: 18, paids: 1 },
      { label: '화', drafts: 24, paids: 3 },
      { label: '수', drafts: 30, paids: 2 },
      { label: '목', drafts: 22, paids: 4 },
      { label: '금', drafts: 28, paids: 1 },
      { label: '토', drafts: 15, paids: 1 },
      { label: '일', drafts: 8, paids: 0 },
    ]
  },
  MONTHLY: {
    totalDrafts: 580,
    totalPaids: 45,
    draftDelta: 24.5,
    paidDelta: 18.0,
    chartData: [
      { label: '1주차', drafts: 120, paids: 8 },
      { label: '2주차', drafts: 145, paids: 12 },
      { label: '3주차', drafts: 160, paids: 15 },
      { label: '4주차', drafts: 155, paids: 10 },
    ]
  },
  YEARLY: {
    totalDrafts: 4210,
    totalPaids: 142,
    draftDelta: 184.2,
    paidDelta: 125.5,
    chartData: [
      { label: '1분기', drafts: 850, paids: 25 },
      { label: '2분기', drafts: 1120, paids: 34 },
      { label: '3분기', drafts: 1400, paids: 48 },
      { label: '4분기', drafts: 840, paids: 35 },
    ]
  }
}

export default function AdminGrowthChartPanel({ period: controlledPeriod, onPeriodChange }: Props) {
  const [localPeriod, setLocalPeriod] = useState<GrowthPeriod>('MONTHLY')
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; type: 'draft' | 'paid' } | null>(null)

  const activePeriod = controlledPeriod ?? localPeriod
  const handleSelectPeriod = (p: GrowthPeriod) => {
    if (onPeriodChange) {
      onPeriodChange(p)
    } else {
      setLocalPeriod(p)
    }
  }

  const data = MOCK_GROWTH_DATA[activePeriod]
  const list = data.chartData
  const count = list.length

  // SVG 좌표 계산 (viewBox 0 0 500 160)
  const width = 500
  const height = 160
  const paddingX = 40
  const paddingTop = 25
  const paddingBottom = 30

  const maxDraft = Math.max(...list.map(d => d.drafts)) || 1
  const maxPaid = Math.max(...list.map(d => d.paids)) || 1

  // Y 좌표 변환 함수
  const getDraftY = (val: number) => {
    const usableHeight = height - paddingTop - paddingBottom
    return height - paddingBottom - (val / maxDraft) * usableHeight
  }

  const getPaidY = (val: number) => {
    const usableHeight = height - paddingTop - paddingBottom
    return height - paddingBottom - (val / maxPaid) * usableHeight
  }

  // X 좌표 계산
  const getX = (idx: number) => {
    if (count <= 1) return width / 2
    const usableWidth = width - paddingX * 2
    return paddingX + (idx / (count - 1)) * usableWidth
  }

  // 라인 데이터 생성
  const draftPoints = list.map((item, idx) => `${getX(idx)},${getDraftY(item.drafts)}`).join(' ')
  const paidPoints = list.map((item, idx) => `${getX(idx)},${getPaidY(item.paids)}`).join(' ')

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6">
      {/* 차트 헤더 & 호버 툴팁 & 기간 필터 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-purple-600" size={18} />
              유입 및 결제 전환 추이 분석
            </h2>
            
            {/* 도움말 물음표 호버 툴팁 */}
            <div className="relative group/tooltip inline-block cursor-pointer">
              <HelpCircle size={15} className="text-slate-400 hover:text-purple-600 transition-colors" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-50 pointer-events-none leading-relaxed">
                <p className="font-bold text-sky-300 mb-1">💡 유입/전환 추이 차트란?</p>
                <p className="text-[11px] text-slate-300">
                  <strong className="text-purple-300">무료 드래프트 생성 라인</strong>은 템플릿 조립을 시작한 유저 수,{' '}
                  <strong className="text-sky-300">유료 결제 전환 라인</strong>은 최종 유료 플랜을 구독한 프로젝트 수의 추이를 보여줍니다.
                </p>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            드래프트 생성(보라색 라인)과 최종 유료 결제(파란색 라인)의 기간별 추이 곡선입니다.
          </p>
        </div>

        {/* 기간 선택 필터 */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => handleSelectPeriod('WEEKLY')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activePeriod === 'WEEKLY' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            주간
          </button>
          <button
            onClick={() => handleSelectPeriod('MONTHLY')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activePeriod === 'MONTHLY' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            월간
          </button>
          <button
            onClick={() => handleSelectPeriod('YEARLY')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activePeriod === 'YEARLY' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            연간
          </button>
        </div>
      </div>

      {/* 요약 델타 수치 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-purple-50/60 p-3.5 sm:p-4 rounded-xl border border-purple-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs text-purple-700 font-semibold break-keep">무료 드래프트 생성 (Draft)</p>
            <p className="text-xl sm:text-2xl font-black text-purple-900">{data.totalDrafts.toLocaleString()}건</p>
          </div>
          <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded shrink-0 ${data.draftDelta >= 0 ? 'bg-purple-200 text-purple-800' : 'bg-rose-100 text-rose-700'}`}>
            {data.draftDelta >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(data.draftDelta)}%
          </div>
        </div>

        <div className="bg-sky-50/60 p-3.5 sm:p-4 rounded-xl border border-sky-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs text-sky-700 font-semibold break-keep">유료 결제 전환 (Paid)</p>
            <p className="text-xl sm:text-2xl font-black text-sky-900">{data.totalPaids.toLocaleString()}건</p>
          </div>
          <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded shrink-0 ${data.paidDelta >= 0 ? 'bg-sky-200 text-sky-800' : 'bg-rose-100 text-rose-700'}`}>
            {data.paidDelta >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(data.paidDelta)}%
          </div>
        </div>
      </div>

      {/* SVG 라인 차트 컴포넌트 */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            {/* 배경 가로 가이드 라인 */}
            {[0, 0.33, 0.66, 1].map((ratio, i) => {
              const y = paddingTop + ratio * (height - paddingTop - paddingBottom)
              return (
                <line
                  key={i}
                  x1={paddingX - 10}
                  y1={y}
                  x2={width - paddingX + 10}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              )
            })}

            {/* 1. Draft 생성 라인 (보라색) */}
            <polyline
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={draftPoints}
            />

            {/* 2. Paid 전환 라인 (스카이블루) */}
            <polyline
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={paidPoints}
            />

            {/* 데이터 포인트 (원 및 호버 툴팁) */}
            {list.map((item, idx) => {
              const cx = getX(idx)
              const draftCy = getDraftY(item.drafts)
              const paidCy = getPaidY(item.paids)

              return (
                <g key={idx}>
                  {/* Draft 서클 데이터 포인트 */}
                  <circle
                    cx={cx}
                    cy={draftCy}
                    r={hoveredPoint?.index === idx && hoveredPoint?.type === 'draft' ? '6' : '4.5'}
                    className="fill-white stroke-purple-600 stroke-[3] transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredPoint({ index: idx, type: 'draft' })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />

                  {/* Paid 서클 데이터 포인트 */}
                  <circle
                    cx={cx}
                    cy={paidCy}
                    r={hoveredPoint?.index === idx && hoveredPoint?.type === 'paid' ? '6' : '4.5'}
                    className="fill-white stroke-sky-600 stroke-[3] transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredPoint({ index: idx, type: 'paid' })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />

                  {/* X축 범례 라벨 */}
                  <text
                    x={cx}
                    y={height - 8}
                    textAnchor="middle"
                    className="text-[11px] font-bold fill-slate-500"
                  >
                    {item.label}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* 데이터 포인트 호버 시 수치 팝업 툴팁 */}
          {hoveredPoint !== null && (
            <div
              className="absolute bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all z-20"
              style={{
                left: `${(getX(hoveredPoint.index) / width) * 100}%`,
                top: `${
                  ((hoveredPoint.type === 'draft'
                    ? getDraftY(list[hoveredPoint.index].drafts)
                    : getPaidY(list[hoveredPoint.index].paids)) /
                    height) *
                  100
                }%`,
                marginTop: '-10px',
              }}
            >
              {hoveredPoint.type === 'draft' ? (
                <span className="text-purple-300">
                  {list[hoveredPoint.index].label} Draft: {list[hoveredPoint.index].drafts}건
                </span>
              ) : (
                <span className="text-sky-300">
                  {list[hoveredPoint.index].label} Paid: {list[hoveredPoint.index].paids}건
                </span>
              )}
            </div>
          )}
        </div>

        {/* 차트 명확한 범례 (Legend) */}
        <div className="flex items-center justify-center gap-6 pt-1 text-xs font-bold">
          <div className="flex items-center gap-2 text-purple-700">
            <div className="w-3 h-3 rounded-full bg-purple-600 border-2 border-white shadow-sm"></div>
            <span>무료 드래프트 생성 추이 (Drafts)</span>
          </div>
          <div className="flex items-center gap-2 text-sky-700">
            <div className="w-3 h-3 rounded-full bg-sky-600 border-2 border-white shadow-sm"></div>
            <span>유료 결제 전환 추이 (Paids)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
