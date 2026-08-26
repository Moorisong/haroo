import { Info } from 'lucide-react'

/**
 * PWA / 웹 전용 서비스 투명 고지 뱃지
 */
export default function MandatoryPwaTransparencyNotice() {
  return (
    <div className="w-full">
      <div className="flex items-start sm:items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border border-sky-200/80 bg-sky-50/60 shadow-2xs">
        <Info size={18} className="text-sky-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          앱스토어 심사 없이 <strong>웹 주소(URL) 하나로 즉시 오픈</strong>되며, 스마트폰 <strong>바탕화면 앱 아이콘</strong>까지 1초 만에 연결됩니다.
        </p>
      </div>
    </div>
  )
}
