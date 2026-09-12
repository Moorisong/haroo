'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type CaseItem = { title: string; appName: string; desc: string; icon: string; tag: string; theme: string; template: string; items: string[] }

const CASES: CaseItem[] = [
  { title: '모임', appName: '토닥토닥 클럽', desc: '친구들과 약속을 가볍게 이어가는 공간', icon: '✦', tag: '이번 주 토요일', theme: 'gather', template: 'COMPANY', items: ['우리들의 봄 소풍', '장소 · 서울숲', '참석 12명'] },
  { title: '가게', appName: '모퉁이 식탁', desc: '작은 가게의 오늘을 다정하게 소개하는 공간', icon: '⌁', tag: '오늘도 영업 중', theme: 'shop', template: 'COMMERCE', items: ['오늘의 작은 메뉴', '바질 토마토 샌드', '오후 2시 · 재료 소진'] },
  { title: '커플앱/우정앱', appName: '우리들의 하루', desc: '소중한 기념일과 일상의 추억을 나누는 공간', icon: '♡', tag: '함께한 지 520일', theme: 'profile', template: 'PORTFOLIO', items: ['우리의 첫 제주 여행', '서로에게 남긴 한 줄', '다음 만남 D-3'] },
  { title: '행사', appName: '여름밤 초대장', desc: '사진과 초대장을 함께 나누는 공간', icon: '✹', tag: 'D-17', theme: 'event', template: 'EVENT', items: ['우리의 여름 파티', '2026. 07. 18. 토요일', '초대 손님 48명'] },
]


function PreviewArt({ item, layout }: { item: CaseItem; layout: number }) {
  if (layout === 1) return <div className={`case-art-layout layout-polaroid ${item.theme}`} aria-hidden="true"><span className="case-polaroid-mark">{item.icon}</span><div className="case-polaroid-photo"><span>{item.theme === 'shop' ? 'MENU' : item.theme === 'event' ? 'SAVE' : 'HELLO'}</span></div><span className="case-sticker">{item.tag}</span></div>
  if (layout === 2) return <div className={`case-art-layout layout-notebook ${item.theme}`} aria-hidden="true"><div className="case-notebook-top"><span>{item.icon}</span><small>{item.tag}</small></div><div className="case-notebook-lines"><i/><i/><i/><i/></div><span className="case-doodle">{item.theme === 'gather' ? '♡' : item.theme === 'shop' ? '☼' : item.theme === 'profile' ? '✎' : '☆'}</span></div>
  return <div className={`case-art-layout layout-board ${item.theme}`} aria-hidden="true"><span className="case-scribble">{item.icon}</span><span className="case-sticker">{item.tag}</span><div className="case-art-card"><span className="case-art-line long"/><span className="case-art-line"/><span className="case-art-line short"/></div><span className="case-doodle">{item.theme === 'gather' ? '♡' : item.theme === 'shop' ? '☼' : item.theme === 'profile' ? '✎' : '☆'}</span></div>
}

export default function UseCasesSection() {
  const [selected, setSelected] = useState(0)
  const [layouts, setLayouts] = useState([0, 0, 0, 0])
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setLayouts(CASES.map(() => Math.floor(Math.random() * 3))) }, [])

  const handleScroll = () => {
    const el = carouselRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    if (!children.length) return
    const containerCenter = el.scrollLeft + el.clientWidth / 2

    let closestIdx = 0
    let minDiff = Infinity
    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const diff = Math.abs(containerCenter - childCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIdx = idx
      }
    })
    setSelected(closestIdx)
  }

  const item = CASES[selected]
  const layout = layouts[selected]

  return (
    <>
      <style>{`
        .case-preview-rich{display:grid;grid-template-columns:minmax(0,1fr) 190px;gap:26px;overflow:hidden;position:relative;animation:atelier-rise .45s cubic-bezier(.22,1,.36,1) both}
        .case-preview-copy{position:relative;z-index:1}
        .case-preview-rich h3{margin-top:20px;font-size:38px;letter-spacing:-.06em}
        .case-preview-copy>div>div>p{margin-top:6px;color:var(--muted);font-size:14px}
        .case-preview-icon{display:flex;width:44px;height:44px;align-items:center;justify-content:center;border-radius:50%;background:var(--lime);color:var(--green);font-size:23px;transform:rotate(8deg);animation:atelier-pulse 2.4s ease-in-out infinite}
        .case-preview-list{display:grid;gap:6px;margin-top:20px;color:var(--muted);font-size:12px}
        .case-preview-list li{display:flex;align-items:center;gap:8px}
        .case-preview-list li span{color:var(--green);font-weight:900;font-size:10px}
        .case-art-layout{position:relative;min-height:214px;align-self:center;overflow:hidden}
        .layout-board{border-radius:50% 45% 48% 42%;background:var(--wash);transform:rotate(3deg)}
        .layout-board.gather{background:#e6edcf}
        .layout-board.shop{background:#f3dfc9}
        .layout-board.profile{background:#dce8df}
        .layout-board.event{background:#efe0df}
        .case-scribble{position:absolute;top:27px;left:25px;color:var(--green);font-size:35px;font-family:serif;animation:case-float 3s ease-in-out infinite}
        .case-sticker{position:absolute;right:14px;top:25px;border:1px solid var(--green);border-radius:999px;padding:6px 8px;color:var(--green);font-size:9px;font-weight:900;transform:rotate(7deg)}
        .case-art-card{position:absolute;left:28px;right:22px;top:83px;padding:16px 14px;border:1px solid var(--ink);background:var(--surface);box-shadow:5px 5px 0 var(--lime);transform:rotate(-4deg)}
        .case-art-line{display:block;width:68%;height:7px;margin-top:8px;background:var(--green);opacity:.78}
        .case-art-line.long{width:85%;margin-top:0}
        .case-art-line.short{width:44%;background:var(--coral)}
        .case-doodle{position:absolute;right:25px;bottom:22px;color:var(--coral);font-size:29px;transform:rotate(-12deg)}
        .layout-polaroid{background:var(--lime);border-radius:44% 38% 45% 35%;transform:rotate(-4deg);padding:28px 20px}
        .case-polaroid-photo{height:115px;background:var(--surface);border:1px solid var(--ink);display:flex;align-items:center;justify-content:center;box-shadow:6px 6px 0 var(--coral);transform:rotate(5deg);font-size:28px;font-weight:900;color:var(--green)}
        .case-polaroid-mark{position:absolute;left:18px;top:15px;color:var(--coral);font-size:28px;z-index:1}
        .layout-notebook{background:#dce8df;border:1px solid var(--green);border-radius:12px;padding:20px 18px;transform:rotate(3deg);box-shadow:7px 8px 0 var(--lime)}
        .case-notebook-top{display:flex;justify-content:space-between;color:var(--green);font-size:25px}
        .case-notebook-top small{font-size:9px;border:1px solid var(--green);border-radius:99px;padding:6px 8px;height:max-content}
        .case-notebook-lines{display:grid;gap:14px;margin-top:26px}
        .case-notebook-lines i{display:block;height:2px;background:var(--green);opacity:.42}
        .case-notebook-lines i:nth-child(2){width:75%}
        .case-notebook-lines i:nth-child(3){width:88%;background:var(--coral)}
        .case-notebook-lines i:nth-child(4){width:52%}
        .case-choice{display:flex;align-items:stretch;text-align:left;border:1px solid var(--line);background:var(--surface);padding:0;transition:all .2s;overflow:hidden;border-radius:12px}
        .case-choice:hover,.case-choice.is-selected{border-color:var(--green);transform:translateY(-2px);box-shadow:0 6px 0 var(--lime)}
        .case-choice-main{display:flex;align-items:center;gap:10px;flex:1;min-width:0;padding:12px 14px;text-align:left}
        .case-choice-main:hover{background:color-mix(in srgb,var(--lime) 10%,transparent)}
        .case-choice b{display:block;font-size:14px;font-weight:900}
        .case-choice small{display:block;margin-top:2px;color:var(--muted);font-size:11px;line-height:1.3}
        .custom-icon{display:inline-flex;width:32px;height:32px;flex:0 0 auto;align-items:center;justify-content:center;border:1px solid var(--green);color:var(--green);font-size:16px;font-family:serif;border-radius:6px}
        .case-arrow{display:flex;width:40px;flex:0 0 40px;align-items:center;justify-content:center;border-left:1px solid var(--line);color:var(--green);font-size:16px;transition:background .2s,color .2s}
        .case-arrow:hover{background:var(--green);color:var(--surface)}
        @keyframes case-float{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-7px) rotate(4deg)}}
        @media(min-width:640px){
          .case-choice-main{gap:14px;padding:16px 18px}
          .case-choice b{font-size:15px}
          .case-choice small{margin-top:5px;font-size:12px}
          .custom-icon{width:40px;height:40px;font-size:20px}
          .case-arrow{width:54px;flex:0 0 54px;font-size:20px}
        }
        @media(max-width:640px){
          .case-preview-rich{grid-template-columns:1fr;padding:16px;gap:12px;min-height:auto}
          .case-preview-copy>div:first-of-type{align-items:center}
          .case-preview-rich h3{font-size:20px;margin-top:4px}
          .case-preview-copy>div>div>p{font-size:12px;margin-top:2px}
          .case-preview-icon{width:36px;height:36px;font-size:18px}
          .case-preview-list{display:none} /* Mobile: Hide verbose bullet list for extreme compactness */
          .mini-blocks{margin-top:10px;gap:5px}
          .mini-blocks span{padding:4px 8px;font-size:10px}
          .case-art-layout{min-height:85px;max-width:160px;width:100%;justify-self:end;margin-top:-30px;opacity:.9}
          .case-scribble{font-size:24px;top:12px;left:14px}
          .case-sticker{display:none}
          .case-art-card{top:38px;left:18px;right:14px;padding:8px}
          .case-art-line{height:4px;margin-top:4px}
          .case-doodle{font-size:20px;right:14px;bottom:10px}
          .case-polaroid-photo{height:65px;font-size:18px}
          .case-polaroid-mark{font-size:18px;top:8px;left:10px}
          .case-notebook-top{font-size:18px}
          .case-notebook-lines{gap:8px;margin-top:14px}
        }
      `}</style>
      <section id="usecases" className="section-muted">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-20">
          <p className="eyebrow">이렇게 쓰세요</p>
          <div className="mt-3 sm:mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <h2 className="section-title">
                무엇을 만들지<br />
                <span className="text-primary">정해져 있나요?</span>
              </h2>
              <p className="mt-2 sm:mt-5 max-w-sm text-xs sm:text-sm leading-5 sm:leading-6 text-muted-foreground">
                가장 가까운 목적을 고르면<br className="hidden sm:inline" />필요한 구성부터 보여드릴게요.
              </p>
            </div>
            <div className={`case-preview case-preview-rich ${item.theme}`} key={`${item.appName}-${layout}`}>
              <div className="case-preview-copy">
                <p className="eyebrow">선택한 페이지</p>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{item.appName}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                  <span className="case-preview-icon" aria-hidden="true">{item.icon}</span>
                </div>
                <ul className="case-preview-list">
                  {item.items.map((text, index) => (
                    <li key={text}>
                      <span>{String(index + 1).padStart(2, '0')}</span>{text}
                    </li>
                  ))}
                </ul>
                <div className="mini-blocks">
                  <span>소개</span>
                  <span>{item.title === '가게' ? '메뉴' : '사진'}</span>
                  <span>{item.title === '행사' ? '초대장' : item.title === '커플앱/우정앱' ? '디데이' : '연락하기'}</span>
                </div>
              </div>
              <PreviewArt item={item} layout={layout} />
            </div>
          </div>

          {/* Mobile: 1-Row Horizontal Scroll Snap / Desktop: 4-Column Grid */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="mt-8 sm:mt-12 flex lg:grid lg:grid-cols-4 gap-3.5 overflow-x-auto py-3.5 lg:py-1 lg:overflow-visible snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0"
          >
            {CASES.map((caseItem, i) => (
              <div
                key={caseItem.title}
                className={`case-choice min-w-[220px] sm:min-w-[240px] flex-1 snap-center ${
                  selected === i ? 'is-selected ring-2 ring-primary' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                  className="case-choice-main"
                >
                  <span className="custom-icon" aria-hidden="true">{caseItem.icon}</span>
                  <span className="min-w-0">
                    <b className="truncate">{caseItem.title}</b>
                    <small className="line-clamp-1">{caseItem.desc}</small>
                  </span>
                </button>
                <Link
                  href={`/builder?template=${caseItem.template}`}
                  className="case-arrow"
                  aria-label={`${caseItem.title} 템플릿으로 만들기`}
                >
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>

          <Link href="/builder" className="action-button mt-5 sm:mt-8">
            내 페이지 만들기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}


