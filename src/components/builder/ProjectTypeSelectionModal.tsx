'use client'

import React, { useState, useEffect } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ArrowRight } from 'lucide-react'

export default function ProjectTypeSelectionModal() {
  const { projectTypeSelected, confirmProjectType, draftId } = useBuilderStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const params = new URLSearchParams(window.location.search)
  if (params.get('draft') || draftId || projectTypeSelected) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 sm:p-9 text-center relative overflow-hidden">
        {/* 데코 배키그라운드 */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-100 rounded-full blur-3xl pointer-events-none opacity-70" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-100 rounded-full blur-3xl pointer-events-none opacity-70" />

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
          어떤 서비스를 만드시겠습니까?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-medium">
          만들고자 하는 형태를 선택하면 전용 맞춤 캔버스가 열립니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {/* 1. 반응형 웹사이트 카드 */}
          <button
            onClick={() => confirmProjectType('WEB')}
            className="group relative p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover:bg-white hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* 애니메이션 일러스트 영역: 모니터 ↔ 모바일 리사이징 애니메이션 */}
              <div className="h-28 bg-slate-200/60 rounded-xl mb-4 p-3 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-900/5 transition-colors">
                <div className="w-24 h-16 bg-white rounded-md border-2 border-slate-800 shadow-md flex flex-col items-center justify-between p-1.5 transition-all duration-500 group-hover:scale-105">
                  <div className="w-full h-2 bg-slate-200 rounded" />
                  <div className="w-full flex-1 my-1 bg-sky-100 rounded flex items-center justify-center">
                    {/* 미니 블록 애니메이션 */}
                    <div className="w-8 h-2 bg-sky-500 rounded animate-pulse" />
                  </div>
                  <div className="w-4 h-1 bg-slate-300 rounded" />
                </div>

                {/* 반응형 아이콘 효과 */}
                <div className="absolute bottom-2 right-3 text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-1 group-hover:border-slate-800 transition-colors">
                  <span>🖥️ ↔ 📱 화면 리사이즈</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center justify-between">
                <span>🌐 반응형 웹사이트</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                PC 모니터, 태블릿, 스마트폰 모든 화면에 맞춰 알아서 예쁘게 줄어드는 일반 홈피/브랜드 사이트
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between group-hover:text-slate-900">
              <span>모든 기기(PC·모바일) 대응</span>
              <div className="w-6 h-6 rounded-full bg-slate-200 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight size={13} />
              </div>
            </div>
          </button>

          {/* 2. PWA 모바일 앱 카드 */}
          <button
            onClick={() => confirmProjectType('PWA')}
            className="group relative p-5 bg-sky-50/50 rounded-2xl border-2 border-sky-200 hover:border-sky-600 hover:bg-white hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* 애니메이션 일러스트 영역: 스마트폰 아이콘 쏙 내려오는 앱 설치 애니메이션 */}
              <div className="h-28 bg-sky-100/60 rounded-xl mb-4 p-3 flex items-center justify-center relative overflow-hidden group-hover:bg-sky-500/10 transition-colors">
                {/* 스마트폰 목업 */}
                <div className="w-14 h-22 bg-slate-900 rounded-xl p-1 shadow-lg relative flex flex-col items-center justify-between group-hover:scale-105 transition-transform duration-300">
                  <div className="w-6 h-1 bg-slate-700 rounded-full mt-0.5" />
                  
                  {/* 바탕화면에 앱 아이콘 쏙 등장하는 애니메이션 */}
                  <div className="w-full flex-1 my-1 bg-white rounded-lg p-1.5 flex flex-col items-center justify-center relative">
                    <div className="w-7 h-7 bg-sky-500 rounded-lg shadow-md flex items-center justify-center text-white text-[10px] font-black group-hover:animate-bounce">
                      H
                    </div>
                    <span className="text-[7px] font-bold text-slate-700 mt-1">내 매장 앱</span>
                  </div>

                  <div className="w-4 h-0.5 bg-slate-600 rounded-full mb-0.5" />
                </div>

                {/* 바탕화면 아이콘 추가 효과 태그 */}
                <div className="absolute bottom-2 right-3 text-[10px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded-full border border-sky-200 shadow-sm flex items-center gap-1 group-hover:border-sky-500 transition-colors">
                  <span>📲 바탕화면 1초 설치</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center justify-between">
                <span>📱 PWA 모바일 웹앱</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                스마트폰 바탕화면에 내 브랜드 앱 아이콘이 바로 생기고 카톡 알림까지 뜨는 모바일 전용 웹앱
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-sky-100 flex flex-col gap-2">
              <div className="text-xs font-bold text-sky-700 flex items-center justify-between">
                <span>모바일 전용 단독 화면</span>
                <div className="w-6 h-6 rounded-full bg-sky-200 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight size={13} />
                </div>
              </div>
              {/* 법적/UX 투명성 고지 뱃지 (미키 사업_v3 MandatoryPwaTransparencyNotice 수칙) */}
              <div className="text-[10px] text-slate-500 font-medium bg-white/80 p-1.5 rounded-lg border border-sky-200/70 flex items-center justify-center gap-1">
                <span>💡 앱스토어 다운로드 없이 바탕화면에 추가되는 최신 PWA 웹앱 기술입니다</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
