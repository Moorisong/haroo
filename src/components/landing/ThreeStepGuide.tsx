import { MousePointerClick, Edit3, Smartphone, ChevronRight } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: '원하는 블록을 톡톡 선택',
    desc: '갤러리, 카톡 문의, 오시는 길 등 필요한 기능 블록을 레고처럼 골라 담으세요.',
    icon: MousePointerClick,
    color: 'bg-sky-50 text-sky-600 border-sky-200',
  },
  {
    step: '02',
    title: '내 글과 사진 채우기',
    desc: '어려운 모바일 코딩 없이 내 사진과 텍스트만 간단하게 작성하면 끝납니다.',
    icon: Edit3,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    step: '03',
    title: '나만의 웹 & 앱 즉시 완성',
    desc: '바탕화면에 앱 아이콘이 바로 생기고 친구·커플·손님에게 링크 1초 공유!',
    icon: Smartphone,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
]

/**
 * 일반인도 1초 만에 이해하는 3단계 서비스 조립 가이드
 */
export default function ThreeStepGuide() {
  return (
    <section id="guide" className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-0.5 bg-sky-100 border border-sky-200 text-sky-700 text-xs font-semibold rounded-full mb-2.5 whitespace-nowrap">
            가장 쉬운 3단계 완성
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 break-keep leading-snug">
            개발 지식 없어도 5분 만에 만드는 법
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg mx-auto break-keep">
            복잡한 코딩이나 외주 맡길 필요 없이, 딱 3단계로 완성되는 나만의 스마트폰 앱
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="relative p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 tracking-wider">STEP {item.step}</span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.color}`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 border border-slate-200 items-center justify-center text-slate-400 z-10">
                    <ChevronRight size={14} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
