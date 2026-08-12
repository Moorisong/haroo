'use client'

import { useState } from 'react'
import { Archive, CalendarDays, DollarSign, ChevronRight } from 'lucide-react'

type YearArchive = '2025' | '2024'

interface MonthlyData {
  month: number
  grossRevenue: number
  pgFee: number
  grossProfit: number
  paidCount: number
}

interface YearlyArchiveData {
  year: string
  totalGrossRevenue: number
  totalPgFee: number
  totalGrossProfit: number
  totalPaidCount: number
  monthlyRecords: MonthlyData[]
}

const MOCK_ARCHIVE_DATA: Record<YearArchive, YearlyArchiveData> = {
  '2025': {
    year: '2025',
    totalGrossRevenue: 85400000,
    totalPgFee: 2135000,
    totalGrossProfit: 83265000,
    totalPaidCount: 1420,
    monthlyRecords: [
      { month: 1, grossRevenue: 6200000, pgFee: 155000, grossProfit: 6045000, paidCount: 95 },
      { month: 2, grossRevenue: 7100000, pgFee: 177500, grossProfit: 6922500, paidCount: 105 },
      { month: 3, grossRevenue: 7500000, pgFee: 187500, grossProfit: 7312500, paidCount: 115 },
      { month: 4, grossRevenue: 8200000, pgFee: 205000, grossProfit: 7995000, paidCount: 128 },
      { month: 5, grossRevenue: 8100000, pgFee: 202500, grossProfit: 7897500, paidCount: 125 },
      { month: 6, grossRevenue: 8900000, pgFee: 222500, grossProfit: 8677500, paidCount: 138 },
      // 추후 데이터 적재
    ]
  },
  '2024': {
    year: '2024',
    totalGrossRevenue: 42500000,
    totalPgFee: 1062500,
    totalGrossProfit: 41437500,
    totalPaidCount: 680,
    monthlyRecords: [
      { month: 8, grossRevenue: 1200000, pgFee: 30000, grossProfit: 1170000, paidCount: 20 },
      { month: 9, grossRevenue: 3400000, pgFee: 85000, grossProfit: 3315000, paidCount: 52 },
      { month: 10, grossRevenue: 5800000, pgFee: 145000, grossProfit: 5655000, paidCount: 88 },
      { month: 11, grossRevenue: 11500000, pgFee: 287500, grossProfit: 11212500, paidCount: 180 },
      { month: 12, grossRevenue: 20600000, pgFee: 515000, grossProfit: 20085000, paidCount: 340 },
    ]
  }
}

const YEARS: YearArchive[] = ['2025', '2024']

export default function AdminArchivePanel() {
  const [selectedYear, setSelectedYear] = useState<YearArchive>('2025')
  const data = MOCK_ARCHIVE_DATA[selectedYear]

  return (
    <div className="space-y-6">
      {/* 헤더 및 연도 선택 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Archive className="text-slate-500" size={20} />
            과거 재무 데이터 아카이브
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            개별 트랜잭션을 제외하고 가볍게 월별로 합산(Aggregated)된 연간 요약 데이터를 열람합니다.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-xs font-semibold text-slate-500 hidden sm:block">연도 선택:</label>
          <div className="relative">
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value as YearArchive)}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-sky-500 focus:border-sky-500 block w-full pl-4 pr-10 py-2 transition-colors cursor-pointer outline-none hover:bg-slate-100"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {/* 연간 집계 요약 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <CalendarDays size={12} /> {selectedYear}년 총 결제액
          </span>
          <p className="text-2xl font-black text-slate-900">₩{data.totalGrossRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">결제 수수료 공제</span>
          <p className="text-2xl font-black text-slate-700">-₩{data.totalPgFee.toLocaleString()}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded-2xl space-y-1">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <DollarSign size={12} /> 연간 매출 총이익
          </span>
          <p className="text-2xl font-black text-white">₩{data.totalGrossProfit.toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">총 결제 승인 건수</span>
          <p className="text-2xl font-black text-slate-900">{data.totalPaidCount.toLocaleString()}건</p>
        </div>
      </div>

      {/* 월별 경량화 데이터 테이블 */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">월별 상세 집계</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
              <tr>
                <th className="py-3 px-5 font-bold">월 (Month)</th>
                <th className="py-3 px-5 font-bold">승인 건수</th>
                <th className="py-3 px-5 font-bold">월 매출액 (Gross)</th>
                <th className="py-3 px-5 font-bold">PG 수수료</th>
                <th className="py-3 px-5 font-bold text-slate-900">월 매출 총이익 (Profit)</th>
                <th className="py-3 px-5 text-right font-bold">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.monthlyRecords.length > 0 ? (
                data.monthlyRecords.map((m) => (
                  <tr key={m.month} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-5 font-black text-slate-700 text-sm">{selectedYear}년 {m.month}월</td>
                    <td className="py-3.5 px-5 font-medium text-slate-600">{m.paidCount}건</td>
                    <td className="py-3.5 px-5 font-semibold text-slate-900">₩{m.grossRevenue.toLocaleString()}</td>
                    <td className="py-3.5 px-5 text-slate-500">-₩{m.pgFee.toLocaleString()}</td>
                    <td className="py-3.5 px-5 font-black text-emerald-600">₩{m.grossProfit.toLocaleString()}</td>
                    <td className="py-3.5 px-5 text-right">
                      <button className="p-1 text-slate-400 hover:text-sky-500 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
                    해당 연도에 집계된 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
