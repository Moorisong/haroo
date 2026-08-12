'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Smartphone, ArrowRight, Shield, Zap } from 'lucide-react'
import PwaInstallGuideModal from './PwaInstallGuideModal'
import BlockAssemblyAnimation from './BlockAssemblyAnimation'
import { getCurrentUser, type UserProfile } from '@/lib/auth'

/**
 * 일반인 대상 직관적 랜딩 히어로 섹션
 */
export default function HeroSection() {
  const [pwaModalOpen, setPwaModalOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  return (
    <section className="pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* 상단 뱃지 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-xs font-medium text-sky-700">
            <Zap size={11} />
            코딩 지식 0점도 5분 만에 완결
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
            <Shield size={11} />
            바탕화면 무상 앱 아이콘 생성
          </span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight break-keep mb-4">
          개발 몰라도 OK! 원하는 블록 톡톡 꽂으면
          <br />
          <span className="text-sky-600">나만의 스마트폰 웹 & 앱 완성</span>
        </h1>

        {/* 서브 카피 */}
        <p className="text-center text-xs sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto mb-6 break-keep">
          커플·동호회·개인 프로필부터 매장 홍보까지, 필요한 기능만 레고처럼 조립하세요.
          <br className="hidden sm:block" />
          스마트폰 바탕화면에 앱 아이콘이 생기고 카톡 1초 공유가 가능해집니다.
        </p>

        {/* CTA 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
          <Link
            href={user ? '/builder' : '/login'}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg"
          >
            무료로 내 템플릿 조립하기
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => setPwaModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Smartphone size={15} />
            바탕화면 앱 아이콘 안내
          </button>
        </div>

        {/* 실시간 블록 조립 모션 시뮬레이터 */}
        <BlockAssemblyAnimation />
      </div>

      <PwaInstallGuideModal isOpen={pwaModalOpen} onClose={() => setPwaModalOpen(false)} />
    </section>
  )
}
