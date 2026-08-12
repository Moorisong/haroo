import { Check, X, Smartphone, Monitor } from 'lucide-react'

const COMPARISON_ROWS = [
  { feature: '기본 홍보 웹사이트', haroo: true, agency: true },
  { feature: 'PWA 모바일 웹앱', haroo: true, agency: false },
  { feature: '바탕화면 앱 아이콘', haroo: true, agency: false },
  { feature: '카카오 알림톡 연동', haroo: true, agency: false },
  { feature: '무제한 무료 수정', haroo: true, agency: false },
]

const AGENCY_LIST = [
  { label: '기본 홍보 웹사이트', ok: true },
  { label: 'PWA 모바일 웹앱', ok: false },
  { label: '바탕화면 앱 아이콘', ok: false },
  { label: '카카오 알림톡 연동', ok: false },
  { label: '무제한 무료 수정', ok: false },
  { label: '완성: 2~4주 소요', ok: null },
]

const HAROO_LIST = [
  '기본 홍보 웹사이트',
  'PWA 모바일 웹앱 통합',
  '바탕화면 앱 아이콘 자동 생성',
  '카카오 알림톡 연동',
  '무제한 무료 수정',
  '완성: 단 5분',
]

const BENEFIT_ITEMS = [
  {
    icon: Monitor,
    iconClass: 'text-slate-700',
    wrapperClass: 'border-slate-200 bg-white',
    title: '일반 홍보 웹사이트',
    titleClass: 'text-slate-900',
    desc: 'PC·모바일 반응형으로 매장 정보, 위치, 예약을 완벽하게 안내합니다.',
    descClass: 'text-slate-500',
  },
  {
    icon: Smartphone,
    iconClass: 'text-sky-600',
    wrapperClass: 'border-sky-200 bg-sky-50',
    title: '앱 감성 모바일 웹앱(PWA)',
    titleClass: 'text-sky-800',
    desc: '앱 아이콘 추가, 푸시 알림 등 네이티브 앱과 동일한 경험을 선사합니다.',
    descClass: 'text-sky-700',
  },
]

/**
 * 현실적 비용 비교 테이블
 * 외주 제작사 vs 하루 비교 카드
 */
export default function RealisticCostComparisonTable() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-0.5 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold rounded-full mb-3">
            현실적인 비교
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 text-balance">
            외주 제작 300~500만원,
            <br />
            하루는 <span className="text-sky-600">99,000원</span>부터
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
            홍보 웹사이트와 PWA 웹앱을 하나로 통합 제공합니다.
          </p>
        </div>

        {/* 비교 카드 */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* 외주 제작사 */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Monitor size={15} className="text-slate-400" />
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">일반 외주 제작사</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">300~500<span className="text-lg">만원</span></div>
              <div className="text-xs text-slate-500 mt-0.5">일시불 + 유지보수 월 5~15만원</div>
            </div>
            <div className="px-5 py-3.5 space-y-2">
              {AGENCY_LIST.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {item.ok === true && <Check size={14} className="text-emerald-500 flex-shrink-0" />}
                  {item.ok === false && <X size={14} className="text-red-400 flex-shrink-0" />}
                  {item.ok === null && <span className="w-3.5 h-3.5 text-slate-300 flex-shrink-0">—</span>}
                  <span className={`text-xs sm:text-sm ${item.ok === false ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 하루 */}
          <div className="rounded-2xl border-2 border-slate-900 bg-white overflow-hidden relative">
            <div className="absolute top-3.5 right-4">
              <span className="px-2.5 py-0.5 bg-sky-600 text-white text-[11px] font-bold rounded-full">90% 절감</span>
            </div>
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Smartphone size={15} className="text-sky-600" />
                <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">하루(Haroo)</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">99,000<span className="text-lg">원~</span></div>
              <div className="text-xs text-slate-500 mt-0.5">일시불 + 구독 월 29,000원</div>
            </div>
            <div className="px-5 py-3.5 space-y-2">
              {HAROO_LIST.map((label, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Check size={14} className="text-sky-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 이원화 혜택 */}
        <div className="mt-6 grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {BENEFIT_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className={`flex items-start gap-2.5 p-3.5 rounded-xl border ${item.wrapperClass}`}>
                <Icon size={18} className={`${item.iconClass} flex-shrink-0 mt-0.5`} />
                <div>
                  <div className={`text-xs sm:text-sm font-bold mb-0.5 ${item.titleClass}`}>{item.title}</div>
                  <div className={`text-[11px] leading-relaxed ${item.descClass}`}>{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
