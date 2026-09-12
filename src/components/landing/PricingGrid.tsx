'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Tab = 'creation' | 'subscription'

const PLANS = [
  ['가볍게 시작', '99,000원', '소개, 사진, 지도', '처음 만드는 분께'],
  ['가장 많이 선택', '199,000원', '예약, 문의, 알림', '작은 가게와 모임에'],
  ['제대로 시작', '299,000원', '로그인, 결제, 통계', '서비스를 키우는 분께'],
]

export default function PricingGrid() {
  const [tab, setTab] = useState<Tab>('creation')
  const [activeIndex, setActiveIndex] = useState(1) // 기본 추천 플랜(index 1) 포커스
  const carouselRef = useRef<HTMLDivElement>(null)

  // 모바일 진입 시 추천 플랜(index 1)이 화면 중앙에 오도록 스크롤 정렬
  useEffect(() => {
    if (tab !== 'creation') return
    const el = carouselRef.current
    if (!el) return
    const featuredCard = el.children[1] as HTMLElement | undefined
    if (featuredCard) {
      const scrollPos = featuredCard.offsetLeft - (el.clientWidth - featuredCard.offsetWidth) / 2
      el.scrollTo({ left: Math.max(0, scrollPos), behavior: 'instant' })
    }
  }, [tab])

  const handleScroll = () => {
    const el = carouselRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    if (!children.length) return
    const containerCenter = el.scrollLeft + el.clientWidth / 2

    let closestIdx = 0
    let minDiff = Infinity
    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const diff = Math.abs(containerCenter - childCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIdx = idx
      }
    })
    setActiveIndex(closestIdx)
  }

  return (
    <section id="pricing" className="section-paper border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">가격 안내</p>
            <h2 className="section-title mt-3 sm:mt-5">
              복잡한 계산 없이,<br />
              <span className="text-primary">필요한 만큼만.</span>
            </h2>
          </div>
          <div className="tab-switch self-start md:self-auto">
            <button
              onClick={() => setTab('creation')}
              className={tab === 'creation' ? 'is-active' : ''}
            >
              한 번 결제
            </button>
            <button
              onClick={() => setTab('subscription')}
              className={tab === 'subscription' ? 'is-active' : ''}
            >
              매달 결제
            </button>
          </div>
        </div>

        {tab === 'creation' ? (
          /* Mobile: Compact Horizontal Snap Carousel / Desktop: 3-column Grid */
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="mt-8 sm:mt-12 flex md:grid md:grid-cols-3 gap-3.5 overflow-x-auto py-3.5 md:py-0 md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0"
          >
            {PLANS.map(([name, price, features, forWho], i) => (
              <article
                key={name}
                className={`price-card min-w-[260px] flex-1 snap-center flex flex-col justify-between rounded-xl ${
                  i === 1 ? 'is-featured' : ''
                } ${activeIndex === i ? 'is-active' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">{i === 1 ? '추천 플랜' : `0${i + 1}`}</p>
                    {i === 1 && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        BEST
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-black">{name}</h3>
                  <strong className="mt-2 sm:mt-3 block text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                    {price}
                  </strong>
                  <p className="price-feature mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-foreground/80">
                    {features}
                  </p>
                  <small className="mt-1 sm:mt-2 block text-xs text-muted-foreground">{forWho}</small>
                </div>
                <Link
                  href="/builder"
                  className="mt-6 sm:mt-8 inline-flex items-center gap-1 text-xs sm:text-sm font-black text-primary transition-transform hover:translate-x-1"
                >
                  이 구성으로 시작 <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="subscription-card mt-8 sm:mt-12 rounded-2xl">
            <p className="eyebrow">매달 결제</p>
            <h3>
              서버와 페이지를<br />
              <span>안심하고 유지하세요</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground break-keep">
              도메인 연결부터 서버 관리까지 하루가 모두 챙겨드립니다.
            </p>
            <strong>월 9,900원부터</strong>
            <Link href="/builder" className="action-button mt-1">
              내 페이지 만들기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground break-keep">
          결제 전까지 자유롭게 둘러보고 무료로 제작해볼 수 있어요.
        </p>
      </div>
    </section>
  )
}

