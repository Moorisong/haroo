const STEPS = [
  ['01', '고르기', '필요한 블록을 고르세요.'],
  ['02', '채우기', '사진과 글을 넣으세요.'],
  ['03', '공유하기', '완성한 페이지를 보내세요.'],
]

export default function ThreeStepGuide() {
  return (
    <section id="guide" className="bg-[#2d3a30] text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow eyebrow-light">만드는 방법</p>
            <h2 className="section-title light mt-2 sm:mt-3">
              생각보다<br />더 간단해요.
            </h2>
          </div>
          <p className="text-xs text-[#b8c6bb] sm:text-sm">
            누구나 3단계만 거치면 나만의 모바일 웹·앱이 완성됩니다.
          </p>
        </div>

        {/* Mobile: Compact Horizontal Snap Carousel / Desktop: 3-column Grid */}
        <div className="mt-8 sm:mt-12 flex md:grid md:grid-cols-3 gap-3.5 overflow-x-auto pb-4 md:pb-0 md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0">
          {STEPS.map(([num, title, desc], i) => (
            <div
              key={num}
              className="relative min-w-[240px] flex-1 snap-center bg-[#36463a] p-5 sm:p-7 min-h-[140px] sm:min-h-[200px] rounded-xl border border-white/10 reveal-up flex flex-col justify-between transition-transform hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="step-number text-[#d8ef91] text-xs font-black tracking-widest">{num}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Step {i + 1}</span>
              </div>
              <div className="mt-4 sm:mt-8">
                <h3 className="text-xl sm:text-2xl font-black text-white">{title}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#b8c6bb] leading-relaxed">{desc}</p>
              </div>
              <span className="w-8 h-[2px] bg-[#d8ef91]/80 mt-4 self-end" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

