'use client'

import { FileText, Sparkles, Inbox } from 'lucide-react'

// 실제 DB 구조 기반으로 산출 가능한 통계 데이터 타입 (FormSubmission, UserProject 조인)
interface SubmissionStatsData {
  totalSubmissions: number
  todaySubmissions: number
  avgResponseHours: number
  topStoresBySubmission: { storeName: string; subdomain: string; count: number }[]
  topBlocksBySubmission: { blockId: string; label: string; count: number; ratio: number }[]
  recentSubmissions: { id: string; storeName: string; blockId: string; createdAt: string; hasPhone: boolean }[]
}

const MOCK_SUBMISSION_DATA: SubmissionStatsData = {
  totalSubmissions: 1248,
  todaySubmissions: 42,
  avgResponseHours: 1.2,
  topStoresBySubmission: [
    { storeName: '바디핏 필라테스 강남', subdomain: 'bodyfit.haroo.kr', count: 312 },
    { storeName: '하루카페 신촌 본점', subdomain: 'haroocafe.co.kr', count: 245 },
    { storeName: '더스타일 헤어 청담', subdomain: 'thestyle.haroo.kr', count: 198 },
    { storeName: '코드스쿨 코딩학원', subdomain: 'codeschool.haroo.kr', count: 154 },
  ],
  topBlocksBySubmission: [
    { blockId: 'reservation-form', label: '1:1 예약 폼 블록', count: 620, ratio: 49.7 },
    { blockId: 'contact-form', label: '일반 문의 폼 블록', count: 410, ratio: 32.8 },
    { blockId: 'quote-calculator', label: '견적 계산기 제출 블록', count: 218, ratio: 17.5 },
  ],
  recentSubmissions: [
    { id: 'SUB_8841', storeName: '바디핏 필라테스 강남', blockId: 'reservation-form', createdAt: '10분 전', hasPhone: true },
    { id: 'SUB_8840', storeName: '하루카페 신촌 본점', blockId: 'contact-form', createdAt: '25분 전', hasPhone: true },
    { id: 'SUB_8839', storeName: '더스타일 헤어 청담', blockId: 'reservation-form', createdAt: '42분 전', hasPhone: false },
    { id: 'SUB_8838', storeName: '코드스쿨 코딩학원', blockId: 'quote-calculator', createdAt: '1시간 전', hasPhone: true },
  ],
}

export default function AdminSubmissionStats() {
  const s = MOCK_SUBMISSION_DATA

  // 구현 가능한 실제 데이터 기반 뱃지 로직
  const renderStoreBadges = (count: number) => {
    if (count > 200) {
      return <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">폭발적 반응</span>
    }
    return null
  }

  const renderBlockBadges = (ratio: number) => {
    if (ratio > 40) {
      return <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">전환 핵심 블록</span>
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="text-indigo-500" size={20} />
            고객 폼 제출 데이터 분석
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            실제 FormSubmission 테이블 기반 수집 데이터, 블록 ID 기준 반응율 및 폼 제출 목록입니다.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
            <p className="text-[11px] text-indigo-700 font-medium">오늘 접수된 폼</p>
            <p className="text-xl font-black text-indigo-900">+{s.todaySubmissions}건</p>
          </div>
        </div>
      </div>

      {/* 요약 카운트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">누적 전체 제출건</span>
          <p className="text-2xl font-black text-slate-900">{s.totalSubmissions.toLocaleString()}건</p>
          <span className="text-[11px] text-indigo-600 font-medium">FormSubmission Row Count</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">가장 제출 많은 프로젝트</span>
          <p className="text-lg font-black text-slate-900 truncate">{s.topStoresBySubmission[0].storeName}</p>
          <span className="text-[11px] text-slate-400 font-medium">누적 {s.topStoresBySubmission[0].count}건 접수</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs font-semibold text-slate-500">평균 관리자 확인 시간</span>
          <p className="text-2xl font-black text-slate-900">{s.avgResponseHours}시간</p>
          <span className="text-[11px] text-emerald-600 font-medium">알림톡 즉시 연동 완료</span>
        </div>
      </div>

      {/* 매장별 & 블록별 Ranking */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 최다 제출 매장 TOP 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Inbox size={16} className="text-indigo-500" />
            고객 활동이 많은 프로젝트 TOP 4
          </h3>
          <div className="space-y-3">
            {s.topStoresBySubmission.map((store, idx) => (
              <div key={store.subdomain} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-indigo-100 text-indigo-700 text-xs font-black rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900">{store.storeName}</p>
                      {renderStoreBadges(store.count)}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium font-mono">{store.subdomain}</span>
                  </div>
                </div>
                <span className="text-xs font-black text-indigo-600 whitespace-nowrap">{store.count}건 제출</span>
              </div>
            ))}
          </div>
        </div>

        {/* 최다 사용 폼 블록 종류 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-500" />
            고객이 가장 많이 작성한 폼 종류
          </h3>
          <div className="space-y-3">
            {s.topBlocksBySubmission.map((block) => (
              <div key={block.blockId} className="space-y-1.5 p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800 font-bold">{block.label}</span>
                    {renderBlockBadges(block.ratio)}
                  </div>
                  <span className="text-slate-900 font-black">
                    {block.count}건 ({block.ratio}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${block.ratio}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 실시간 최근 고객 제출 데이터 테이블 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">실시간 최신 제출 폼 데이터</h3>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs min-w-[550px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 px-3 font-semibold whitespace-nowrap">제출 ID</th>
                <th className="py-2 px-3 font-semibold whitespace-nowrap">프로젝트 사이트</th>
                <th className="py-2 px-3 font-semibold whitespace-nowrap">블록 ID (blockId)</th>
                <th className="py-2 px-3 font-semibold whitespace-nowrap">연락처 포함 여부</th>
                <th className="py-2 px-3 font-semibold whitespace-nowrap">제출 시각</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {s.recentSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">{sub.id}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">{sub.storeName}</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-600 font-semibold whitespace-nowrap">{sub.blockId}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {sub.hasPhone ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">O</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold">X</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">{sub.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
