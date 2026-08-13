import { Zap, Edit3, Smartphone, MessageSquare } from 'lucide-react'

const VALUE_PROPOSITIONS = [
  {
    icon: Zap,
    title: '5분 원클릭 완성 & 압도적 가성비',
    price: '99,000원~',
    description: '코딩이나 외주 개발 필요 없이 45종 전문 블록 조립으로 오늘 바로 브랜드 웹사이트와 앱을 오픈하세요.',
    badge: '초스피드 구축',
  },
  {
    icon: Edit3,
    title: '실시간 셀프 수정 (수정 공임비 0원)',
    price: '언제든 직접 수정',
    description: '문구나 이미지 변경 시 외주 업체에 매번 비용을 지불할 필요 없이 마우스 클릭 몇 번으로 즉시 반영됩니다.',
    badge: '유지보수 자유',
  },
  {
    icon: Smartphone,
    title: '웹 & PWA 모바일 앱 자동 통합',
    price: '추가금 없음',
    description: '일반 대표 웹사이트는 물론, 스마트폰 바탕화면 앱 아이콘 설치와 모바일 앱 경험이 기본 탑재됩니다.',
    badge: '웹+앱 통합',
  },
  {
    icon: MessageSquare,
    title: '카카오 알림톡 & 결제 연동 지원',
    price: '원클릭 즉시 탑재',
    description: '고객 신청 및 문의 발생 시 카카오톡 실시간 알림 수신부터 신용카드/카카오페이 결제창까지 클릭 한 번으로 연동하세요.',
    badge: '마케팅/결제 포함',
  },
]

/**
 * 하루(HAROO) 핵심 강점 어필 영역
 * (비교표 대신 자사 핵심 어필 카드 배치)
 */
export default function RealisticCostComparisonTable() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold rounded-full mb-3">
            Why Haroo?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-balance">
            복잡하고 비싼 외주 없이, <br className="sm:hidden" />
            <span className="text-sky-600">하루 하나로</span> 완벽 해결
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            비용 부담부터 유지보수 스트레스까지 한 번에 줄여주는 하루만의 핵심 가치
          </p>
        </div>

        {/* 4대 핵심 어필 카드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUE_PROPOSITIONS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">제공 혜택</span>
                  <span className="text-xs font-extrabold text-sky-600">{item.price}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
