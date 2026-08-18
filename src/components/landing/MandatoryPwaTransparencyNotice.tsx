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
          하루(Haroo)는 앱스토어·구글플레이 심사 및 앱 설치가 필요 없는 <strong>100% 모바일 웹(PWA) 기술</strong> 기반입니다.
          <br />
          복잡한 스토어 등록 없이 <strong>웹 주소(URL)로 즉시 오픈</strong>되며, 스마트폰 바탕화면 바로가기 아이콘 추가 기능을 제공합니다.
        </p>
      </div>
    </div>
  )
}
