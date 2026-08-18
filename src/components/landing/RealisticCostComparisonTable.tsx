import { Zap, Edit3, Smartphone, MessageSquare } from 'lucide-react'

const VALUE_PROPOSITIONS = [
  {
    icon: Zap,
    title: '5분 만에 쉬운 홈페이지 완성',
    price: '99,000원부터',
    description: '어려운 코딩 없이 원하는 화면을 마우스로 차곡차곡 모아 오늘 바로 브랜드 사이트를 만들어 보세요.',
    badge: '쉬운 제작',
  },
  {
    icon: Edit3,
    title: '언제든 내 손으로 직접 수정',
    price: '수정비 0원',
    description: '사진이나 글자를 바꿀 때마다 외주업체에 매번 돈 낼 필요 없이, 클릭 몇 번으로 즉시 바꾸면 돼요.',
    badge: '무료 수정',
  },
  {
    icon: Smartphone,
    title: '스마트폰 바로가기 앱 기능',
    price: '추가금 없음',
    description: '일반 인터넷 홈페이지는 물론, 고객 스마트폰 홈 화면에 내 매장 아이콘을 쏙 설치해 드려요.',
    badge: '스마트폰 연결',
  },
  {
    icon: MessageSquare,
    title: '카톡 알림 & 카드 결제 자동 탑재',
    price: '원클릭 연동',
    description: '고객 예약 및 문의가 오면 카카오톡으로 실시간 알림을 받고, 신용카드 결제까지 손쉽게 연결해요.',
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
            비싼 외주나 복잡한 코딩 없이, <br className="sm:hidden" />
            <span className="text-sky-600">하루 하나로</span> 쉽고 빠르게
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            비싼 제작비부터 매번 드는 수정 비용까지, 초보자도 쉽게 해결할 수 있는 하루의 혜택입니다.
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
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
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
