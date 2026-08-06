'use client'

import { X, Share, MoreVertical, Smartphone } from 'lucide-react'

interface PwaInstallGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

/** iOS Safari 설치 단계 */
const IOS_STEPS = [
  'Safari 하단 공유 버튼 탭',
  '[홈 화면에 추가] 선택',
  '[추가] 탭 — 완료!',
]

/** Android Chrome 설치 단계 */
const ANDROID_STEPS = [
  '우상단 ⋮ 메뉴 탭',
  '하단 팝업 [설치] 탭',
  '바탕화면 아이콘 확인!',
]

/**
 * PWA 설치 안내 모달
 * 대상 A(사장님 본인) & 대상 B(매장 고객) 이원화 구현
 * iOS Safari 공유 / Android Chrome 설치 팝업 분리 안내
 */
export default function PwaInstallGuideModal({ isOpen, onClose }: PwaInstallGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 */}
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">바탕화면 앱 아이콘 3초 추가</h2>
            <p className="text-xs text-slate-500 mt-0.5">PWA 스마트폰 바탕화면 설치 안내</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* 대상 A: 사장님 본인 */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-4 py-2.5">
              <span className="text-xs font-bold text-white">대상 A — 사장님 본인용</span>
              <p className="text-xs text-slate-400 mt-0.5">하루(haroo.site) 관리 페이지를 바탕화면에</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                    <span className="text-xs">🍎</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">iOS Safari</span>
                </div>
                <ol className="space-y-1.5">
                  {IOS_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </span>
                      {step}
                      {i === 0 && <Share size={10} className="inline mt-0.5 ml-0.5" />}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                    <span className="text-xs">🤖</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Android Chrome</span>
                </div>
                <ol className="space-y-1.5">
                  {ANDROID_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </span>
                      {step}
                      {i === 0 && <MoreVertical size={10} className="inline ml-0.5" />}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* 대상 B: 매장 고객 */}
          <div className="rounded-xl border border-sky-200 overflow-hidden">
            <div className="bg-sky-600 px-4 py-2.5">
              <span className="text-xs font-bold text-white">대상 B — 매장 고객용</span>
              <p className="text-xs text-sky-200 mt-0.5">mybrand.haroo.site 매장 사이트를 고객 바탕화면에</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                사장님이 제작한 매장 사이트 링크를 카톡으로 공유하면, 고객이 동일한 방법으로
                바탕화면에 매장 앱 아이콘을 추가할 수 있습니다.
              </p>
              <div className="mt-3 flex items-center gap-2 p-3 bg-sky-50 rounded-lg">
                <Smartphone size={16} className="text-sky-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-sky-800">1초 예약 접근</div>
                  <div className="text-xs text-sky-600">바탕화면 아이콘 → 매장 예약 페이지 즉시 진입</div>
                </div>
              </div>
            </div>
          </div>

          {/* PWA 투명 고지 */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="text-amber-500 text-base flex-shrink-0">ℹ️</span>
            <p className="text-xs text-amber-800 leading-relaxed">
              하루 서비스로 제작되는 결과물은 앱스토어 다운로드 네이티브 앱이 아닌,
              <strong> PWA(Progressive Web App) 모바일 웹앱 기술</strong>로 제작됩니다.
            </p>
          </div>
        </div>

        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  )
}
