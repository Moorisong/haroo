'use client'

import { useState } from 'react'
import { Store, Globe, Cpu, Layers, PlayCircle, StopCircle, AlertTriangle, ChevronDown, ChevronUp, Trophy } from 'lucide-react'

// 실제 DB 구조 기반으로 산출 가능한 통계 데이터 타입
interface ProjectStatsData {
  totalProjects: number
  running: number
  building: number
  stopped: number
  failed: number
  customDomainCount: number
  subdomainCount: number
  tierDistribution: { tier: string; count: number; ratio: number }[]
  // UserProjectDraft의 selectedBlocks 기반 블록 조합 추출 + PaymentHistory 전환율
  popularBlockCombos: { rank: number; blocks: string[]; count: number; paidConversionRate: number; submissionRate: number }[]
}

const MOCK_PROJECT_DATA: ProjectStatsData = {
  totalProjects: 142,
  running: 135,
  building: 4,
  stopped: 2,
  failed: 1,
  customDomainCount: 58,
  subdomainCount: 84,
  tierDistribution: [
    { tier: 'BASIC', count: 85, ratio: 59.8 },
    { tier: 'PRO', count: 42, ratio: 29.6 },
    { tier: 'ENTERPRISE', count: 15, ratio: 10.6 },
  ],
  popularBlockCombos: [
    { rank: 1, blocks: ['Hero', 'Menu', 'Map', 'ContactForm'], count: 64, paidConversionRate: 45.2, submissionRate: 88.4 },
    { rank: 2, blocks: ['Hero', 'Pricing', 'ReservationForm', 'Review'], count: 45, paidConversionRate: 62.1, submissionRate: 92.5 },
    { rank: 3, blocks: ['Hero', 'Profile', 'Schedule', 'ContactForm'], count: 22, paidConversionRate: 35.0, submissionRate: 74.2 },
    { rank: 4, blocks: ['Hero', 'Gallery', 'Checkout', 'ContactForm'], count: 18, paidConversionRate: 55.6, submissionRate: 45.0 },
    { rank: 5, blocks: ['Hero', 'Feature', 'Coupon', 'Map'], count: 16, paidConversionRate: 25.0, submissionRate: 30.1 },
    { rank: 6, blocks: ['Hero', 'Service', 'FAQ', 'ContactForm'], count: 14, paidConversionRate: 42.8, submissionRate: 60.5 },
    { rank: 7, blocks: ['Hero', 'Banner', 'EventForm'], count: 12, paidConversionRate: 15.4, submissionRate: 95.0 },
    { rank: 8, blocks: ['Hero', 'Gallery', 'QuoteForm'], count: 11, paidConversionRate: 72.7, submissionRate: 85.2 },
    { rank: 9, blocks: ['Hero', 'Story', 'Menu', 'ReservationForm'], count: 10, paidConversionRate: 50.0, submissionRate: 78.5 },
    { rank: 10, blocks: ['Hero', 'Pricing', 'Facility', 'ContactForm'], count: 9, paidConversionRate: 66.6, submissionRate: 82.1 },
    { rank: 11, blocks: ['Hero', 'Review', 'Schedule', 'ReservationForm'], count: 8, paidConversionRate: 37.5, submissionRate: 70.0 },
    { rank: 12, blocks: ['Hero', 'Pricing', 'Profile', 'ContactForm'], count: 8, paidConversionRate: 50.0, submissionRate: 65.4 },
    { rank: 13, blocks: ['Hero', 'Product', 'Checkout', 'Notice'], count: 7, paidConversionRate: 85.7, submissionRate: 20.0 },
    { rank: 14, blocks: ['Hero', 'Comparison', 'ContactForm'], count: 7, paidConversionRate: 42.8, submissionRate: 55.6 },
    { rank: 15, blocks: ['Hero', 'Class', 'Calendar', 'Checkout'], count: 6, paidConversionRate: 100.0, submissionRate: 15.0 },
    { rank: 16, blocks: ['Hero', 'Pricing', 'Table', 'ContactForm'], count: 5, paidConversionRate: 60.0, submissionRate: 60.0 },
    { rank: 17, blocks: ['Hero', 'ContactForm', 'Feature', 'Map'], count: 5, paidConversionRate: 20.0, submissionRate: 80.0 },
    { rank: 18, blocks: ['Hero', 'Facility', 'Calendar', 'ContactForm'], count: 4, paidConversionRate: 75.0, submissionRate: 75.0 },
    { rank: 19, blocks: ['Hero', 'Profile', 'Schedule', 'ReservationForm'], count: 4, paidConversionRate: 50.0, submissionRate: 90.0 },
    { rank: 20, blocks: ['Hero', 'Gallery', 'QuoteCalculator'], count: 3, paidConversionRate: 66.6, submissionRate: 100.0 },
  ],
}

export default function AdminProjectStats() {
  const d = MOCK_PROJECT_DATA
  const [showAllTop20, setShowAllTop20] = useState(false)

  const displayedCombos = showAllTop20 ? d.popularBlockCombos : d.popularBlockCombos.slice(0, 5)

  // 뱃지 계산 로직 (구현 가능한 데이터 기준)
  const renderBadges = (combo: ProjectStatsData['popularBlockCombos'][0]) => {
    const badges = []
    
    // 1. 전체 프로젝트 수 대비 사용 횟수 기반 (사용량 상위)
    if (combo.count >= 40) {
      badges.push(<span key="top" className="text-[10px] px-2 py-0.5 rounded font-bold bg-sky-100 text-sky-700">인기 TOP</span>)
    }
    
    // 2. 유료 결제 전환율 기반 (결제 데이터 연동 가능)
    if (combo.paidConversionRate >= 60) {
      badges.push(<span key="paid" className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700">매출 전환 우수</span>)
    }
    
    // 3. 폼 제출 활성도 기반 (FormSubmission 연동 가능)
    if (combo.submissionRate >= 80) {
      badges.push(<span key="form" className="text-[10px] px-2 py-0.5 rounded font-bold bg-indigo-100 text-indigo-700">고객 문의 활발</span>)
    }

    return badges
  }

  return (
    <div className="space-y-6">
      {/* 타이틀 및 요약 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Store className="text-sky-500" size={20} />
            프로젝트 상세 통계
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            UserProject 테이블 기반 배포 상태 및 조합 랭킹입니다.
          </p>
        </div>
        <div className="text-right bg-sky-50 px-4 py-2 rounded-xl border border-sky-100">
          <p className="text-[11px] text-slate-400 font-medium">전체 생성 프로젝트</p>
          <p className="text-xl font-black text-slate-900">{d.totalProjects}개</p>
        </div>
      </div>

      {/* 4분할 프로젝트 상태 카운팅 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">정상 운영 (RUNNING)</span>
            <PlayCircle size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-900 mt-2">{d.running}개</p>
        </div>

        <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-700">배포 중 (BUILDING)</span>
            <Cpu size={18} className="text-sky-600" />
          </div>
          <p className="text-2xl font-black text-sky-900 mt-2">{d.building}개</p>
        </div>

        <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">일시 정지 (STOPPED)</span>
            <StopCircle size={18} className="text-slate-500" />
          </div>
          <p className="text-2xl font-black text-slate-800 mt-2">{d.stopped}개</p>
        </div>

        <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700">오류 발생 (FAILED)</span>
            <AlertTriangle size={18} className="text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-900 mt-2">{d.failed}개</p>
        </div>
      </div>

      {/* 도메인 연결 & 티어 분포 Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe size={16} className="text-sky-500" />
            도메인 설정 현황
          </h3>
          <div className="space-y-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">커스텀 도메인</p>
                <p className="text-[11px] text-slate-400">UserProject.customDomain 값이 있는 경우</p>
              </div>
              <span className="text-base font-black text-sky-600">{d.customDomainCount}개</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">기본 서브도메인</p>
                <p className="text-[11px] text-slate-400">UserProject.subdomain 만 있는 경우</p>
              </div>
              <span className="text-base font-black text-slate-700">{d.subdomainCount}개</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers size={16} className="text-sky-500" />
            요금제(Block Tier) 분포
          </h3>
          <div className="space-y-3">
            {d.tierDistribution.map((t) => (
              <div key={t.tier} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{t.tier}</span>
                  <span className="text-slate-900 font-bold">{t.count}개 ({t.ratio}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${t.ratio}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 인기 조합 블록 템플릿 TOP 20 대형 카드 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">사용 블록 조합 (JSONB) TOP 20 분석</h3>
              <p className="text-[11px] text-slate-400">
                UserProjectDraft의 selectedBlocks 기반 추출 통계
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAllTop20(!showAllTop20)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
          >
            <span>{showAllTop20 ? '접기 (Top 5만 보기)' : 'TOP 20 전체 보기'}</span>
            {showAllTop20 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-1">
          {displayedCombos.map((combo) => (
            <div
              key={combo.rank}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                combo.rank <= 3
                  ? 'bg-amber-50/50 border-amber-200/80 shadow-xs'
                  : 'bg-slate-50/70 border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <span
                  className={`w-6 h-6 shrink-0 rounded-lg text-xs font-black flex items-center justify-center ${
                    combo.rank === 1 ? 'bg-amber-500 text-white' : 
                    combo.rank === 2 ? 'bg-slate-400 text-white' : 
                    combo.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {combo.rank}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900 break-all leading-relaxed">
                    {combo.blocks.join(' + ')}
                  </p>
                  <div className="flex gap-1.5 flex-wrap mt-1.5">
                    {renderBadges(combo)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <span className="text-xs font-black text-sky-600 whitespace-nowrap">{combo.count}개 프로젝트 사용</span>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  유료 전환: {combo.paidConversionRate}% / 문의: {combo.submissionRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
