import { Info } from 'lucide-react'

/**
 * PWA 기술 투명 고지 뱃지
 * Pure White 배경, 1px border-slate-200, sky-600 알약 뱃지
 */
export default function MandatoryPwaTransparencyNotice() {
  return (
    <div className="px-4 sm:px-6 py-2 sm:py-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Info size={14} className="text-sky-600" />
            <span className="inline-flex items-center px-2 py-0.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold text-sky-700">
              PWA 기술 투명 고지
            </span>
          </div>
          <p className="text-xs sm:text-xs text-slate-600 leading-relaxed">
            하루(Haroo)는 스토어 심사 없는 <strong>PWA 모바일 웹앱 기술</strong>로 제작됩니다.
            바탕화면 아이콘 추가, 푸시 알림 등 앱과 동일한 기능이 즉시 배포됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
