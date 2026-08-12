'use client'

import { useState, useEffect } from 'react'
import { Layout, Image as ImageIcon, MessageSquare, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

const ASSEMBLY_STEPS = [
  {
    id: 'hero',
    title: '히어로 비주얼 배너',
    category: '메인 상단',
    icon: Layout,
    color: 'border-sky-500 bg-sky-50 text-sky-700',
    mobilePreview: {
      title: '우리들의 특별한 하루',
      subtitle: '2026.10.24 Sat PM 2:00',
      bg: 'bg-gradient-to-r from-sky-500 to-indigo-600',
    },
  },
  {
    id: 'gallery',
    title: '추억 갤러리 앨범',
    category: '사진 모음',
    icon: ImageIcon,
    color: 'border-indigo-500 bg-indigo-50 text-indigo-700',
    mobilePreview: {
      photos: 3,
    },
  },
  {
    id: 'contact',
    title: '1:1 카톡 예약·문의',
    category: '소통 연동',
    icon: MessageSquare,
    color: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    mobilePreview: {
      buttonText: '카카오톡으로 예약 문의하기',
    },
  },
  {
    id: 'map',
    title: '카카오 지도 오시는 길',
    category: '위치 안내',
    icon: MapPin,
    color: 'border-amber-500 bg-amber-50 text-amber-700',
    mobilePreview: {
      location: '서울 강남구 테헤란로 123',
    },
  },
]

/**
 * 블록이 착착 결합되어 스마트폰에 실시간 완성되는 모션 애니메이션 시뮬레이터
 */
export default function BlockAssemblyAnimation() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % (ASSEMBLY_STEPS.length + 1))
    }, 1100)
    return () => clearInterval(timer)
  }, [])

  const currentCount = activeStepIndex === 0 ? 1 : activeStepIndex

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 sm:p-6 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-xl overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="flex gap-1 flex-shrink-0">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-600 ml-1 break-keep truncate">
            실시간 블록 조립 시뮬레이터
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-sky-100 border border-sky-200 rounded-full text-[10px] sm:text-[11px] font-bold text-sky-700 whitespace-nowrap flex-shrink-0">
          <Sparkles size={11} className="animate-spin flex-shrink-0" />
          <span>예시</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 좌측: 블록 결합 라이브러리 목록 */}
        <div className="md:col-span-6 space-y-2.5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            원하는 기능을 클릭해서 추가하세요
          </div>
          {ASSEMBLY_STEPS.map((step, idx) => {
            const Icon = step.icon
            const isAttached = idx < currentCount
            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                  isAttached
                    ? `${step.color} shadow-sm translate-x-1`
                    : 'border-slate-200 bg-white text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{step.title}</div>
                    <div className="text-[10px] text-slate-500">{step.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {isAttached ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600">
                      <CheckCircle2 size={13} />
                      결합됨
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      대기 중 <ArrowRight size={11} />
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 우측: 스마트폰 목업 내 조립 결과 실시간 반영 */}
        <div className="md:col-span-6 flex justify-center">
          <div className="w-56 sm:w-64 rounded-[32px] border-8 border-slate-900 bg-slate-900 shadow-2xl overflow-hidden relative">
            {/* 노치 및 상태바 */}
            <div className="bg-slate-900 py-1.5 flex justify-center">
              <div className="w-16 h-1.5 bg-slate-700 rounded-full" />
            </div>

            {/* 폰 내부 스크린 */}
            <div className="bg-slate-100 min-h-[340px] p-2 space-y-2 overflow-y-auto">
              {/* 스텝 1: 히어로 */}
              {currentCount >= 1 && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="text-[10px] font-bold opacity-80">Haroo Web & App</div>
                  <div className="text-sm font-black mt-0.5">우리들의 특별한 하루</div>
                  <div className="text-[10px] opacity-90 mt-1">2026.10.24 Sat PM 2:00</div>
                </div>
              )}

              {/* 스텝 2: 갤러리 */}
              {currentCount >= 2 && (
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="text-[10px] font-bold text-slate-700 mb-1.5">추억 갤러리</div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-[9px] text-indigo-500 font-bold">사진 1</div>
                    <div className="h-10 rounded-lg bg-sky-100 flex items-center justify-center text-[9px] text-sky-500 font-bold">사진 2</div>
                    <div className="h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[9px] text-slate-500 font-bold">사진 3</div>
                  </div>
                </div>
              )}

              {/* 스텝 3: 카톡 문의 */}
              {currentCount >= 3 && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="h-7 rounded-lg bg-amber-400 text-slate-900 text-[10px] font-bold flex items-center justify-center gap-1">
                    <MessageSquare size={11} />
                    카카오톡으로 예약 문의하기
                  </div>
                </div>
              )}

              {/* 스텝 4: 오시는길 */}
              {currentCount >= 4 && (
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-800 mb-1">
                    <MapPin size={11} className="text-amber-500" />
                    오시는 길 안내
                  </div>
                  <div className="h-12 rounded-lg bg-slate-100 flex items-center justify-center text-[9px] text-slate-400">
                    카카오 지도 미리보기
                  </div>
                </div>
              )}
            </div>

            {/* 홈 바 */}
            <div className="bg-slate-900 py-2 flex justify-center">
              <div className="w-16 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
