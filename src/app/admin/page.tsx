'use client'

import { useState } from 'react'
import AdminNav from '@/components/admin/AdminNav'
import AdminChoiceActionPanel from '@/components/admin/AdminChoiceActionPanel'
import AdminFinancialPanel from '@/components/admin/AdminFinancialPanel'
import AdminGrowthChartPanel, { GrowthPeriod } from '@/components/admin/AdminGrowthChartPanel'

// 기간별 동적 데이터 맵핑
const STATS_BY_PERIOD = {
  WEEKLY: {
    label: '이번 주',
    draftUsers: 145,
    paidUsers: 12,
    revenue: 2840000,
    pgFee: 71000,
    awsCost: 15100,
    netProfit: 2753900,
  },
  MONTHLY: {
    label: '이번 달',
    draftUsers: 580,
    paidUsers: 45,
    revenue: 8900000,
    pgFee: 222500,
    awsCost: 65000,
    netProfit: 8612500,
  },
  YEARLY: {
    label: '올해',
    draftUsers: 4210,
    paidUsers: 142,
    revenue: 95400000,
    pgFee: 2385000,
    awsCost: 780000,
    netProfit: 92235000,
  },
}

export default function AdminPage() {
  const [period, setPeriod] = useState<GrowthPeriod>('MONTHLY')
  const currentStats = STATS_BY_PERIOD[period]

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* 상단 1클릭 카테고리 이동 네비게이션 */}
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        {/* 기존 핵심 대시보드 컴포넌트 뷰 (반응형 1c -> 3c) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 상단 성장 차트 (기간 조절 컨트롤러) */}
            <AdminGrowthChartPanel
              period={period}
              onPeriodChange={(newPeriod) => setPeriod(newPeriod)}
            />

            {/* 재무 패널 */}
            <AdminFinancialPanel
              periodLabel={currentStats.label}
              revenue={currentStats.revenue}
              pgFee={currentStats.pgFee}
              awsCost={currentStats.awsCost}
              netProfit={currentStats.netProfit}
            />
          </div>

          <div className="space-y-6">
            <AdminChoiceActionPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
