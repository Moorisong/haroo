'use client'

import { useState } from 'react'
import { DollarSign, CreditCard, PieChart, TrendingUp, Cpu, CalendarDays } from 'lucide-react'

type Period = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'

interface FinancialStats {
  grossRevenue: number
  pgFee: number
  awsInfraCost: number
  netProfit: number
  arpu: number
  subscriptionBreakdown: { label: string; count: number; percentage: number }[]
  paymentStatus: { status: string; label: string; count: number; amount: number; color: string }[]
  recentTransactions: { id: string; user: string; project: string; amount: number; tier: string; date: string }[]
}

const MOCK_DATA_BY_PERIOD: Record<Period, FinancialStats> = {
  DAILY: {
    grossRevenue: 450000,
    pgFee: 11250,
    awsInfraCost: 2100, // 일 기준 추정치
    netProfit: 436650,
    arpu: 62676,
    subscriptionBreakdown: [
      { label: '1개월 결제', count: 4, percentage: 50.0 },
      { label: '6개월 결제', count: 3, percentage: 37.5 },
      { label: '12개월 결제', count: 1, percentage: 12.5 },
    ],
    paymentStatus: [
      { status: 'PAID', label: '정상 승인', count: 8, amount: 450000, color: 'text-emerald-600 bg-emerald-50' },
      { status: 'REFUNDED', label: '전액 환불', count: 0, amount: 0, color: 'text-rose-600 bg-rose-50' },
    ],
    recentTransactions: [
      { id: 'PAY_99182', user: 'sh***@naver.com', project: '하루카페 신촌점', amount: 199000, tier: 'Pro (12M)', date: '오늘 14:20' },
      { id: 'PAY_99181', user: 'ki***@gmail.com', project: '더스타일 헤어', amount: 99000, tier: 'Basic (12M)', date: '오늘 11:15' },
    ],
  },
  WEEKLY: {
    grossRevenue: 2840000,
    pgFee: 71000,
    awsInfraCost: 15100,
    netProfit: 2753900,
    arpu: 62676,
    subscriptionBreakdown: [
      { label: '1개월 결제', count: 18, percentage: 40.0 },
      { label: '6개월 결제', count: 20, percentage: 44.4 },
      { label: '12개월 결제', count: 7, percentage: 15.6 },
    ],
    paymentStatus: [
      { status: 'PAID', label: '정상 승인', count: 45, amount: 2840000, color: 'text-emerald-600 bg-emerald-50' },
      { status: 'PARTIAL_REFUNDED', label: '부분 환불', count: 1, amount: 40000, color: 'text-amber-600 bg-amber-50' },
    ],
    recentTransactions: [
      { id: 'PAY_99182', user: 'sh***@naver.com', project: '하루카페 신촌점', amount: 199000, tier: 'Pro (12M)', date: '2026-08-12' },
      { id: 'PAY_99181', user: 'ki***@gmail.com', project: '더스타일 헤어', amount: 99000, tier: 'Basic (12M)', date: '2026-08-11' },
      { id: 'PAY_99180', user: 'le***@daum.net', project: '바디핏 필라테스', amount: 499000, tier: 'Enterprise (12M)', date: '2026-08-10' },
    ],
  },
  MONTHLY: {
    grossRevenue: 8900000,
    pgFee: 222500,
    awsInfraCost: 65000,
    netProfit: 8612500,
    arpu: 62676,
    subscriptionBreakdown: [
      { label: '1개월 결제', count: 48, percentage: 33.8 },
      { label: '6개월 결제', count: 62, percentage: 43.7 },
      { label: '12개월 결제', count: 32, percentage: 22.5 },
    ],
    paymentStatus: [
      { status: 'PAID', label: '정상 승인', count: 138, amount: 8720000, color: 'text-emerald-600 bg-emerald-50' },
      { status: 'PARTIAL_REFUNDED', label: '부분 환불', count: 3, amount: 120000, color: 'text-amber-600 bg-amber-50' },
      { status: 'REFUNDED', label: '전액 환불', count: 1, amount: 60000, color: 'text-rose-600 bg-rose-50' },
    ],
    recentTransactions: [
      { id: 'PAY_99182', user: 'sh***@naver.com', project: '하루카페 신촌점', amount: 199000, tier: 'Pro (12M)', date: '2026-08-12' },
      { id: 'PAY_99181', user: 'ki***@gmail.com', project: '더스타일 헤어', amount: 99000, tier: 'Basic (12M)', date: '2026-08-11' },
      { id: 'PAY_99180', user: 'le***@daum.net', project: '바디핏 필라테스', amount: 499000, tier: 'Enterprise (12M)', date: '2026-08-10' },
      { id: 'PAY_99179', user: 'pa***@kakao.com', project: '성수 버거 랩', amount: 19900, tier: 'Pro (1M)', date: '2026-08-10' },
    ],
  },
  YEARLY: {
    grossRevenue: 95400000,
    pgFee: 2385000,
    awsInfraCost: 780000,
    netProfit: 92235000,
    arpu: 62676,
    subscriptionBreakdown: [
      { label: '1개월 결제', count: 520, percentage: 30.2 },
      { label: '6개월 결제', count: 780, percentage: 45.4 },
      { label: '12개월 결제', count: 420, percentage: 24.4 },
    ],
    paymentStatus: [
      { status: 'PAID', label: '정상 승인', count: 1650, amount: 93500000, color: 'text-emerald-600 bg-emerald-50' },
      { status: 'PARTIAL_REFUNDED', label: '부분 환불', count: 45, amount: 1200000, color: 'text-amber-600 bg-amber-50' },
      { status: 'REFUNDED', label: '전액 환불', count: 25, amount: 700000, color: 'text-rose-600 bg-rose-50' },
    ],
    recentTransactions: [
      { id: 'PAY_99182', user: 'sh***@naver.com', project: '하루카페 신촌점', amount: 199000, tier: 'Pro (12M)', date: '2026-08-12' },
      { id: 'PAY_99181', user: 'ki***@gmail.com', project: '더스타일 헤어', amount: 99000, tier: 'Basic (12M)', date: '2026-08-11' },
    ],
  },
}

const PERIODS: { value: Period; label: string }[] = [
  { value: 'DAILY', label: '오늘 (일)' },
  { value: 'WEEKLY', label: '이번 주 (주)' },
  { value: 'MONTHLY', label: '이번 달 (월)' },
  { value: 'YEARLY', label: '올해 (연)' },
]

export default function AdminFinancialDetailed() {
  const [period, setPeriod] = useState<Period>('MONTHLY')
  const f = MOCK_DATA_BY_PERIOD[period]
  const profitMargin = ((f.netProfit / f.grossRevenue) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* 헤더 타이틀 및 기간 필터 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="text-emerald-500" size={20} />
            매출 & 재무 분석 리포트
          </h2>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <CalendarDays size={12} /> 선택한 기간에 발생한 실결제액을 분석합니다.
          </p>
        </div>
        
        {/* 기간 선택 탭 (Segmented Control) */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                period === p.value
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 정산 재무 요약 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">결제액 ({PERIODS.find(p => p.value === period)?.label})</span>
          <p className="text-2xl font-black text-slate-900">₩{f.grossRevenue.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-600 font-medium">PaymentHistory 누적</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">PG 결제 수수료 (2.5%)</span>
          <p className="text-2xl font-black text-slate-700">-₩{f.pgFee.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 font-medium">KG 이니시스 자동 차감액</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Cpu size={12} /> AWS 인프라 비용
          </span>
          <p className="text-2xl font-black text-slate-700">-₩{f.awsInfraCost.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 font-medium">AWS Cost (Mock 연동)</span>
        </div>

        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg shadow-emerald-600/20 space-y-1">
          <span className="text-xs font-semibold text-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-1"><TrendingUp size={14} /> 순이익</div>
            <div className="bg-emerald-700/50 px-1.5 py-0.5 rounded text-[10px]">이익률 {profitMargin}%</div>
          </span>
          <p className="text-2xl font-black">₩{f.netProfit.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-200 font-medium">평균 객단가(ARPU) ₩{f.arpu.toLocaleString()}</span>
        </div>
      </div>

      {/* 구독 기간 및 결제 상태 분포 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 구독기간 비중 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PieChart size={16} className="text-sky-500" />
            구독 기간 선택 분포 (할인율별)
          </h3>
          <div className="space-y-3">
            {f.subscriptionBreakdown.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="text-slate-900 font-bold">
                    {item.count}건 ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percentage}%`, transition: 'width 0.5s ease-out' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 결제 상태별 breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard size={16} className="text-sky-500" />
            결제 및 환불 상태 (PaymentHistory.status)
          </h3>
          <div className="space-y-3">
            {f.paymentStatus.map((ps) => (
              <div key={ps.status} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ps.color}`}>{ps.status}</span>
                  <span className="text-xs text-slate-700 font-semibold">{ps.label}</span>
                  <span className="text-[10px] text-slate-500">{ps.count}건</span>
                </div>
                <span className="text-xs font-black text-slate-900">₩{ps.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 최근 트랜잭션 테이블 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">최신 결제 트랜잭션 내역</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 px-3 font-semibold">주문 ID</th>
                <th className="py-2 px-3 font-semibold">사용자(이메일)</th>
                <th className="py-2 px-3 font-semibold">프로젝트명</th>
                <th className="py-2 px-3 font-semibold">요금제 플랜</th>
                <th className="py-2 px-3 font-semibold">결제액</th>
                <th className="py-2 px-3 font-semibold">결제일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {f.recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-500">{tx.id}</td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">{tx.user}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{tx.project}</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-600">{tx.tier}</td>
                  <td className="py-2.5 px-3 font-black text-emerald-600">₩{tx.amount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-slate-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
