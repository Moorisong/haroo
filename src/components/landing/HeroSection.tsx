'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Smartphone, Monitor, ArrowRight, Shield, Zap } from 'lucide-react'
import PwaInstallGuideModal from './PwaInstallGuideModal'
import { getCurrentUser, type UserProfile } from '@/lib/auth'

const STAT_ITEMS = [
  { value: '45종', label: '마스터 블록' },
  { value: '5분', label: '완성 시간' },
  { value: '90%', label: '외주 대비 절감', highlight: true },
]

/**
 * 랜딩 히어로 섹션
 * 메인 타이틀, 통계 수치, 웹+모바일 프리뷰 카드
 */
export default function HeroSection() {
  const [pwaModalOpen, setPwaModalOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  return (
    <section className="pt-20 pb-10 sm:pt-24 sm:pb-12 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* 상단 뱃지 */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-xs font-medium text-sky-700">
            <Zap size={11} />
            45종 마스터 블록 제공
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
            <Shield size={11} />
            PWA 모바일 웹앱 기술
          </span>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight text-balance mb-4">
          일반 웹사이트부터
          <br />
          <span className="text-sky-600">앱처럼 묵직하게 구동되는</span>
          <br />
          모바일 웹앱(PWA)까지
          <span className="sm:inline"> 5분 만에 완성!</span>
        </h1>

        {/* 서브 카피 */}
        <p className="text-center text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto mb-6 text-pretty">
          스마트폰 바탕화면에 바로가기 앱 아이콘이 쏙 생기고,
          <br className="hidden sm:block" />
          카톡 알림까지 연동할 수 있어요.
        </p>

        {/* CTA 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            href={user ? '/builder' : '/login'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg"
          >
            무료로 5분 만에 만들기
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => setPwaModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Smartphone size={15} />
            바탕화면 앱 아이콘 안내
          </button>
        </div>

        {/* 통계 수치 */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-10">
          {STAT_ITEMS.map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl border border-slate-100 bg-slate-50">
              <div className={`text-xl sm:text-2xl font-black ${stat.highlight ? 'text-sky-600' : 'text-slate-900'}`}>
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 미리보기 카드 */}
        <div className="relative flex justify-center items-end gap-4 sm:gap-8">
          {/* 데스크톱 프리뷰 */}
          <div className="hidden sm:block w-64 lg:w-72 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-900 px-3 py-1.5 flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 mx-2 bg-slate-700 rounded px-2 py-0.5 text-[10px] text-slate-400">mybrand.haroo.site</div>
              <Monitor size={12} className="text-slate-500" />
            </div>
            <div className="bg-white p-3">
              <div className="h-16 bg-slate-100 rounded-lg mb-2.5 flex items-center justify-center">
                <span className="text-xs text-slate-400">히어로 배너</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-slate-100 rounded w-3/4" />
                <div className="h-2.5 bg-slate-100 rounded w-1/2" />
              </div>
              <div className="mt-2.5 flex gap-2">
                <div className="h-7 bg-slate-900 rounded-lg flex-1 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">예약하기</span>
                </div>
                <div className="h-7 bg-slate-100 rounded-lg flex-1 flex items-center justify-center">
                  <span className="text-xs text-slate-500">오시는길</span>
                </div>
              </div>
            </div>
          </div>

          {/* 모바일 프리뷰 */}
          <div className="w-36 sm:w-40 rounded-2xl border-4 border-slate-900 overflow-hidden shadow-xl">
            <div className="bg-slate-900 py-1 flex justify-center">
              <div className="w-12 h-1 bg-slate-600 rounded-full" />
            </div>
            <div className="bg-white">
              <div className="bg-slate-900 px-2.5 py-2 flex items-center justify-between">
                <span className="text-white text-xs font-bold">내 매장</span>
                <Smartphone size={12} className="text-slate-400" />
              </div>
              <div className="h-20 bg-sky-50 flex items-center justify-center">
                <span className="text-xs text-sky-400">히어로 사진</span>
              </div>
              <div className="p-2.5 space-y-1.5">
                <div className="h-2 bg-slate-100 rounded w-full" />
                <div className="h-2 bg-slate-100 rounded w-2/3" />
                <div className="mt-2 h-6 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-[11px] text-white font-medium">지금 예약</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 py-2 flex justify-center gap-4">
              <div className="w-4 h-4 rounded-full bg-slate-700" />
            </div>
          </div>

          {/* 바탕화면 아이콘 뱃지 */}
          <div className="absolute -bottom-3 right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900 rounded-xl shadow-lg">
              <div className="w-5 h-5 bg-sky-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-black">H</span>
              </div>
              <div>
                <div className="text-xs text-white font-semibold">앱 아이콘 추가됨</div>
                <div className="text-[10px] text-slate-400">바탕화면에서 1초 접근</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PwaInstallGuideModal isOpen={pwaModalOpen} onClose={() => setPwaModalOpen(false)} />
    </section>
  )
}
