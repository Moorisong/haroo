const STEPS = [
  ['01', '고르기', '필요한 블록을 고르세요.'],
  ['02', '채우기', '사진과 글을 넣으세요.'],
  ['03', '공유하기', '완성한 페이지를 보내세요.'],
]

export default function ThreeStepGuide() {
  return (
    <section id="guide" className="bg-[#2d3a30] text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="max-w-xl">
          <p className="eyebrow eyebrow-light">만드는 방법</p>
          <h2 className="section-title light mt-3">
            생각보다<br />더 간단해요.
          </h2>
        </div>
        <div className="mt-12 grid gap-3 overflow-hidden rounded-2xl md:grid-cols-3">
          {STEPS.map(([num, title, desc], i) => (
            <div
              key={num}
              className="relative bg-[#36463a] p-7 min-h-[200px] rounded-xl border border-white/10 reveal-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="step-number text-[#d8ef91] text-xs font-black tracking-widest">{num}</span>
              <h3 className="mt-12 text-2xl font-black text-white">{title}</h3>
              <p className="mt-2 text-sm text-[#b8c6bb] leading-relaxed">{desc}</p>
              <span className="absolute right-7 bottom-7 w-9 h-[1px] bg-[#d8ef91]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
