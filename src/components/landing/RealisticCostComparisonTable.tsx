import { Zap, Edit3, Smartphone, MessageSquare } from 'lucide-react'

const VALUE_PROPOSITIONS = [
  {
    icon: Zap,
    title: '5분 셀프 홈페이지 완성',
    price: '99,000원부터',
    description: '어려운 코딩 없이 블록을 조립하여 오늘 바로 서비스를 시작하세요.',
    badge: '쉬운 제작',
  },
  {
    icon: Edit3,
    title: '무제한 셀프 무료 수정',
    price: '수정비 0원',
    description: '글이나 사진을 바꿀 때 외주비 걱정 없이 클릭 몇 번으로 즉시 변경하세요.',
    badge: '무료 수정',
  },
  {
    icon: Smartphone,
    title: '스마트폰 바로가기 앱',
    price: '추가금 없음',
    description: '고객의 스마트폰 바탕화면에 내 브랜드 아이콘을 손쉽게 설치해 드립니다.',
    badge: '스마트폰 연결',
  },
  {
    icon: MessageSquare,
    title: '알림톡 & 카드 결제 지원',
    price: '원클릭 연동',
    description: '고객 예약 알림톡부터 신용카드 결제까지 손쉽게 연결합니다.',
    badge: '고객/결제 관리',
  },
]

/**
 * 하루(HAROO) 핵심 강점 어필 영역 (Why Haroo?)
 */
export default function RealisticCostComparisonTable() {
  return (
    <section id="why" className="py-16 px-4 sm:px-6 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold rounded-full mb-3">
            Why Haroo?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-balance">
            외주 부담 없이, <span className="text-sky-600">하루 하나로</span> 쉽고 빠르게
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            비싼 외주비와 매번 드는 수정 비용 부담을 깔끔하게 해결해 드립니다.
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
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">핵심 혜택</span>
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
