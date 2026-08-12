'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, Globe, Shield, Star } from 'lucide-react'
import { SUBSCRIPTION_PLANS, CREATION_TIERS } from '@/lib/constants'

type PricingTab = 'creation' | 'subscription'

const CREATION_TIER_META = [
  {
    name: 'STARTER',
    price: 99000,
    label: '소상공인 매장',
    icon: Zap,
    color: 'border-slate-200',
    btnColor: 'bg-slate-900 text-white hover:bg-slate-800',
    blocks: '15종 블록 (히어로, 텍스트, 지도, 갤러리)',
    domain: 'haroo.site 서브도메인 기본 제공',
    features: ['히어로 배너, 메뉴판, 지도', '갤러리, D-Day, 소셜 공유', '무제한 무료 수정', 'haroo.site 서브도메인'],
    highlight: false,
  },
  {
    name: 'STANDARD',
    price: 199000,
    label: '예약·문의 수집',
    icon: Globe,
    color: 'border-slate-900',
    btnColor: 'bg-slate-900 text-white hover:bg-slate-800',
    blocks: '25종 블록 (예약/문의 폼, 알림톡/LMS)',
    domain: '[신규] 커스텀 도메인 무상 매핑',
    features: ['STARTER 15종 블록 포함', '예약/문의 폼 + 엑셀 다운로드', '카카오 알림톡/LMS 자동 발송', '커스텀 도메인 무상 매핑'],
    highlight: true,
  },
  {
    name: 'PROFESSIONAL',
    price: 299000,
    label: '지식창업가·강사·MVP',
    icon: Shield,
    color: 'border-slate-200',
    btnColor: 'bg-sky-600 text-white hover:bg-sky-700',
    blocks: '전체 45종 블록 (소셜로그인, PG결제, 통계)',
    domain: '[신규] 커스텀 도메인 + 무제한 SSL 자동 발급',
    features: ['STANDARD 25종 블록 포함', '소셜 로그인 + 전자결제(PG)', '맞춤형 통계 + 차트', '무제한 SSL 자동 발급'],
    highlight: false,
  },
]

const REVISION_CASES = [
  { case: 'A', label: '문구·사진·색상 변경', cost: '무료', badge: 'bg-emerald-100 text-emerald-700' },
  { case: 'B', label: '블록 순서·동티어 블록 추가', cost: '무료', badge: 'bg-emerald-100 text-emerald-700' },
  { case: 'C', label: '상위 티어 업그레이드', cost: '티어 차액', badge: 'bg-violet-100 text-violet-700' },
  { case: 'D', label: 'DB 구조 변동 (컬럼 신규 추가)', cost: '+10,000원', badge: 'bg-amber-100 text-amber-700' },
]

export default function PricingGrid() {
  const [tab, setTab] = useState<PricingTab>('creation')

  return (
    <section id="pricing" className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold rounded-full mb-3">
            가격 안내
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 text-balance">
            명확하고 투명한 가격
          </h2>
          <p className="text-slate-500 text-sm mt-2">무료로 먼저 조립해보시고 결정하세요.</p>
        </div>

        {/* 탭 */}
        <div className="flex justify-center mb-6 w-full">
          <div className="grid grid-cols-2 gap-1 p-1 bg-white border border-slate-200 rounded-xl w-full max-w-sm">
            {(['creation', 'subscription'] as PricingTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-1.5 px-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all text-center whitespace-nowrap truncate ${
                  tab === t ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'creation' ? '제작비 (일시불)' : '구독료 (서버 유지)'}
              </button>
            ))}
          </div>
        </div>

        {tab === 'creation' && (
          <div className="grid md:grid-cols-3 gap-4">
            {CREATION_TIER_META.map((tier) => {
              const Icon = tier.icon
              return (
                <div key={tier.name} className={`rounded-2xl border-2 bg-white overflow-hidden ${tier.color} ${tier.highlight ? 'shadow-lg' : ''}`}>
                  {tier.highlight && (
                    <div className="bg-slate-900 text-center py-1">
                      <span className="text-xs font-bold text-white">가장 인기 있는 플랜</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                        <Icon size={15} className="text-slate-700" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500">{tier.name}</div>
                        <div className="text-[11px] text-slate-400">{tier.label}</div>
                      </div>
                    </div>
                    <div className="mb-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">{tier.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-500">원 일시불</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-4">{tier.blocks}</p>
                    <div className="space-y-1.5 mb-5">
                      {tier.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check size={13} className="text-sky-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700">{f}</span>
                        </div>
                      ))}
                      <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                        <Star size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 font-medium">{tier.domain}</span>
                      </div>
                    </div>
                    <Link href="/login" className={`block w-full py-2.5 text-center text-xs sm:text-sm font-bold rounded-xl transition-colors ${tier.btnColor}`}>
                      무료로 조립 시작
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'subscription' && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="divide-y divide-slate-100">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div key={plan.months} className={`flex items-center justify-between p-3.5 sm:p-4 ${plan.recommended ? 'bg-sky-50' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[11px] sm:text-xs whitespace-nowrap flex-shrink-0 ${plan.recommended ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {plan.months}개월
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">
                          월 {plan.monthlyPrice.toLocaleString()}원
                          {plan.discount > 0 && <span className="ml-2 text-[11px] font-bold text-sky-600">{plan.discount}% 할인</span>}
                          {plan.recommended && <span className="ml-2 text-[11px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded">추천</span>}
                        </div>
                        <div className="text-[11px] text-slate-400">{plan.note}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-black text-slate-900">{plan.total.toLocaleString()}원</div>
                      <div className="text-[11px] text-slate-400">일시불 결제</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                  중도 해지 시 이용하신 기간을 제외한 나머지 금액에서 10% 위약금을 뺀 후 즉시 환불해 드립니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 수정 요금 정책 */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden max-w-3xl mx-auto">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">수정 비용 정책</h3>
            <p className="text-[11px] text-slate-500">대부분의 수정은 완전 무료입니다</p>
          </div>
          <div className="divide-y divide-slate-50">
            {REVISION_CASES.map((item) => (
              <div key={item.case} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center">{item.case}</span>
                  <span className="text-xs sm:text-sm text-slate-700">{item.label}</span>
                </div>
                <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${item.badge}`}>{item.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
