import { Info } from 'lucide-react'

/**
 * PWA 기술 투명 고지 뱃지
 * Pure White 배경, 1px border-slate-200, sky-600 알약 뱃지
 */
export default function MandatoryPwaTransparencyNotice() {
  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Info size={14} className="text-sky-600" />
            <span className="inline-flex items-center px-2.5 py-0.5 bg-sky-100 border border-sky-200 rounded-full text-xs font-bold text-sky-700">
              PWA 기술 투명 고지
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            하루(Haroo) 서비스로 제작되는 결과물은 앱스토어·플레이스토어 다운로드 <strong>네이티브 앱이 아닌</strong>,
            최신 <strong>PWA(Progressive Web App) 모바일 웹앱 기술</strong>로 제작됩니다.
            바탕화면 아이콘 추가, 푸시 알림 등 앱과 동일한 경험을 제공하며 별도 심사 없이 즉시 배포 가능합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
