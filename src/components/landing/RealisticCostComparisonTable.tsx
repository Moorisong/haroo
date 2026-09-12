const ITEMS = [
  ['5분', '오늘 바로 시작', '복잡한 준비 없이 내 페이지를 만듭니다.'],
  ['0원', '수정 비용', '사진과 글은 언제든 직접 바꿉니다.'],
  ['1개', '내 손안의 앱', '스마트폰 첫 화면에 바로 꺼내 씁니다.'],
  ['∞', '필요한 만큼', '소개부터 예약·결제까지 이어집니다.'],
]

export default function RealisticCostComparisonTable() {
  return (
    <section id="why" className="section-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <p className="eyebrow">하루가 다른 이유</p>
        <div className="mt-4 sm:mt-5 flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <h2 className="section-title">
            만들고 나면<br />
            <span className="text-primary">바로 쓸 수 있어요.</span>
          </h2>
          <p className="max-w-xs text-xs sm:text-sm leading-5 sm:leading-6 text-muted-foreground">
            필요한 기능만 담아<br />처음부터 어렵지 않게 만들었습니다.
          </p>
        </div>

        {/* 2x2 Grid on Mobile, 4-column on Desktop */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {ITEMS.map(([num, title, desc]) => (
            <article key={title} className="value-panel p-4 sm:p-6.5 flex flex-col justify-between">
              <strong className="text-3xl sm:text-4xl font-black text-primary tracking-tight">{num}</strong>
              <div className="mt-3 sm:mt-8">
                <h3 className="text-sm sm:text-base font-black text-foreground">{title}</h3>
                <p className="mt-1 sm:mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

