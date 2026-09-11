'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Shield, Lock, Info } from 'lucide-react'
import { CREATION_TIERS, SUBSCRIPTION_PLANS } from '@/lib/constants'
import type { AgreementState } from '@/types'
import TermsAgreementCheckbox from '@/components/checkout/TermsAgreementCheckbox'
import WaitlistModal from '@/components/checkout/WaitlistModal'

export default function CheckoutPage() {
  const [selectedTier, setSelectedTier] = useState('STANDARD')
  const [selectedMonths, setSelectedMonths] = useState(12)
  const [subdomain, setSubdomain] = useState('')
  const [agreed, setAgreed] = useState<AgreementState>({ terms: false, privacy: false, refund: false })
  const [waitlistModal, setWaitlistModal] = useState(false)

  const tier = CREATION_TIERS.find((t) => t.name === selectedTier)!
  const plan = SUBSCRIPTION_PLANS.find((p) => p.months === selectedMonths)!
  const total = tier.price + plan.total
  const allAgreed = Object.values(agreed).every(Boolean)

  const toggleAgreed = (key: keyof AgreementState) => {
    setAgreed((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePayment = () => {
    if (!allAgreed || !subdomain) return
    // TODO: 포트원 IMP.request_pay() 호출
    alert('포트원 결제창 호출 (실제 구현 시 IMP.request_pay)')
  }

  return (
    <div className="min-h-screen bg-slate-50 atelier-enter">
      <header className="bg-white/80 backdrop-blur border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="brand-mark" aria-hidden="true">ㅎ</div>
          <span className="brand-name">하루</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Lock size={12} />
          안전 결제
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6"><p className="eyebrow mb-2">Your atelier, ready to open</p><h1 className="text-2xl sm:text-3xl font-black text-slate-900">결제 주문서</h1><p className="text-sm text-slate-500 mt-2">필요한 것만 고르고, 나머지는 하루가 준비할게요.</p></div>

        <div className="grid md:grid-cols-5 gap-5">
          {/* 왼쪽: 선택 폼 */}
          <div className="md:col-span-3 space-y-4">
            {/* 서브도메인 입력 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-3">내 매장 주소 설정</h2>
              <div className="flex items-center gap-0">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="mybrand"
                  className="flex-1 px-3 py-2.5 text-sm border border-slate-200 rounded-l-xl outline-none focus:border-slate-900 transition-colors"
                />
                <div className="px-3 py-2.5 bg-slate-50 border border-l-0 border-slate-200 rounded-r-xl text-sm text-slate-500">
                  .haroo.site
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">영문 소문자, 숫자, 하이픈(-)만 사용 가능</p>
            </div>

            {/* 제작비 티어 선택 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-3">제작비 플랜 선택</h2>
              <div className="space-y-2">
                {CREATION_TIERS.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTier(t.name)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${
                      selectedTier === t.name ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedTier === t.name ? 'border-slate-900 bg-slate-900' : 'border-slate-300'}`}>
                        {selectedTier === t.name && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-slate-900">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.blocks}</div>
                      </div>
                    </div>
                    <div className="text-sm font-black text-slate-900">{t.price.toLocaleString()}원</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 구독 기간 선택 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h2 className="text-sm font-bold text-slate-900 mb-3">서버 구독 기간</h2>
              <div className="grid grid-cols-2 gap-2">
                {SUBSCRIPTION_PLANS.map((p) => (
                  <button
                    key={p.months}
                    onClick={() => setSelectedMonths(p.months)}
                    className={`relative p-3.5 rounded-xl border-2 text-left transition-all ${
                      selectedMonths === p.months ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {p.recommended && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-sky-600 text-white text-[10px] font-bold rounded">추천</span>
                    )}
                    <div className="text-sm font-bold text-slate-900">{p.months}개월</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {p.total.toLocaleString()}원
                      {p.discount > 0 && <span className="ml-1 text-sky-600 font-semibold">{p.discount}% 할인</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <TermsAgreementCheckbox agreed={agreed} onChange={toggleAgreed} />
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div className="md:col-span-2 atelier-delay-2">
            <div className="sticky top-6 bg-white rounded-2xl border border-slate-200 overflow-hidden atelier-focus">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">주문 요약</h2>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">제작비 ({selectedTier})</span>
                  <span className="font-semibold text-slate-900">{tier.price.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">구독료 ({selectedMonths}개월)</span>
                  <span className="font-semibold text-slate-900">{plan.total.toLocaleString()}원</span>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-900">총 결제 금액</span>
                    <span className="text-xl font-black text-slate-900">{total.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 space-y-2">
                <button
                  disabled={!allAgreed || !subdomain}
                  onClick={handlePayment}
                  className="w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Shield size={15} />
                  포트원 안전 결제하기
                </button>
                {!allAgreed && <p className="text-xs text-red-500 text-center">위 약관에 모두 동의해주세요</p>}
                {!subdomain && <p className="text-xs text-amber-600 text-center">매장 주소를 입력해주세요</p>}
              </div>
              <div className="px-5 pb-5">
                <div className="flex items-start gap-2 p-3 bg-sky-50 rounded-xl">
                  <Info size={13} className="text-sky-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-sky-700">
                    결제 완료 후 5단계 무인 배포가 자동으로 시작되어 약 30초 내 사이트가 오픈됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WaitlistModal isOpen={waitlistModal} onClose={() => setWaitlistModal(false)} />
    </div>
  )
}
