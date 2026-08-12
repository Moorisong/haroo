'use client'

import { X, Share, MoreVertical, Smartphone, Info, Apple } from 'lucide-react'

interface PwaInstallGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

/** iOS Safari 설치 단계 */
const IOS_STEPS = [
  '하단 공유 버튼 탭',
  '[홈 화면에 추가] 선택',
  '[추가] 탭 하면 3초 완료!',
]

/** Android Chrome 설치 단계 */
const ANDROID_STEPS = [
  '우상단 메뉴(⋮) 탭',
  '[홈 화면에 추가] 선택',
  '바탕화면 앱 아이콘 완성!',
]

/**
 * 일반인 대상 직관적 바탕화면 앱 설치 안내 모달
 */
export default function PwaInstallGuideModal({ isOpen, onClose }: PwaInstallGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 */}
      <div className="relative w-full sm:max-w-md bg-white sm:rounded-2xl rounded-t-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">바탕화면 앱 아이콘 설치 안내</h2>
            <p className="text-xs text-slate-500 mt-0.5">스토어 다운로드 없이 3초 만에 바로 추가하세요</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* OS별 설치 방법 2열 카드 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 아이폰 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Apple size={16} className="text-slate-800" />
                <span className="text-xs font-bold text-slate-900">아이폰 (iOS)</span>
              </div>
              <ol className="space-y-2">
                {IOS_STEPS.map((step, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-tight">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <span>
                      {step}
                      {i === 0 && <Share size={10} className="inline ml-1 text-sky-600" />}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 안드로이드 */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Smartphone size={16} className="text-sky-600" />
                <span className="text-xs font-bold text-slate-900">갤럭시/안드로이드</span>
              </div>
              <ol className="space-y-2">
                {ANDROID_STEPS.map((step, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-tight">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <span>
                      {step}
                      {i === 0 && <MoreVertical size={10} className="inline ml-1 text-sky-600" />}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 쉬운 안내 배너 */}
          <div className="flex items-start gap-2.5 p-3 bg-sky-50 border border-sky-200 rounded-xl">
            <Info size={16} className="text-sky-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-sky-800 leading-relaxed">
              카카오톡이나 문자 링크를 받은 공유 상대방도 동일하게 바탕화면에 앱으로 추가할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  )
}
