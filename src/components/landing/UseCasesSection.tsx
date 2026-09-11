'use client'

import { useState } from 'react'
import Link from 'next/link'

const CASES = [
  {
    title: '모임',
    desc: '모임 일정과 공지를 한곳에',
    icon: '✦',
    tag: '이번 주 토요일',
    theme: 'gather',
    items: ['우리들의 봄 소풍', '장소 · 서울숲', '참석 12명'],
  },
  {
    title: '가게',
    desc: '메뉴와 위치를 쉽게 안내',
    icon: '⌁',
    tag: '오늘도 영업 중',
    theme: 'shop',
    items: ['오늘의 작은 메뉴', '바질 토마토 샌드', '오후 2시 · 재료 소진'],
  },
  {
    title: '커플앱/우정앱',
    desc: '추억 사진과 D-day를 우리끼리',
    icon: '◌',
    tag: '우리가 함께한 날',
    theme: 'profile',
    items: ['소중한 순간 앨범', '함께한 지 500일', '우리만의 비밀 방명록'],
  },
  {
    title: '행사',
    desc: '사진과 초대장을 함께',
    icon: '✹',
    tag: 'D-17',
    theme: 'event',
    items: ['우리의 여름 파티', '2026. 07. 18. 토요일', '초대 손님 48명'],
  },
]

function PreviewArt({ item }: { item: typeof CASES[number] }) {
  return (
    <div className={`case-preview-art ${item.theme}`} aria-hidden="true">
      <span className="case-scribble">{item.icon}</span>
      <span className="case-sticker">{item.tag}</span>
      <div className="case-art-card">
        <span className="case-art-line long" />
        <span className="case-art-line" />
        <span className="case-art-line short" />
      </div>
      <span className="case-doodle">
        {item.theme === 'gather' ? '♡' : item.theme === 'shop' ? '☼' : item.theme === 'profile' ? '✎' : '☆'}
      </span>
    </div>
  )
}

export default function UseCasesSection() {
  const [selected, setSelected] = useState(0)
  const item = CASES[selected]

  return (
    <>
      <style>{`
        .case-preview-rich {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 190px;
          gap: 26px;
          overflow: hidden;
          position: relative;
          animation: atelier-rise .45s cubic-bezier(.22,1,.36,1) both;
        }
        .case-preview-copy {
          position: relative;
          z-index: 1;
        }
        .case-preview-rich h3 {
          margin-top: 34px;
          font-size: 42px;
          letter-spacing: -.06em;
        }
        .case-preview-copy > div > div > p {
          margin-top: 8px;
          color: var(--muted);
          font-size: 14px;
        }
        .case-preview-icon {
          display: flex;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--lime);
          color: var(--green);
          font-size: 25px;
          transform: rotate(8deg);
          animation: atelier-pulse 2.4s ease-in-out infinite;
        }
        .case-preview-list {
          display: grid;
          gap: 7px;
          margin-top: 24px;
          color: var(--muted);
          font-size: 12px;
        }
        .case-preview-list li {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .case-preview-list li span {
          color: var(--green);
          font-weight: 900;
          font-size: 10px;
        }
        .case-preview-art {
          position: relative;
          min-height: 214px;
          border-radius: 50% 45% 48% 42%;
          background: var(--wash);
          align-self: center;
          transform: rotate(3deg);
          overflow: hidden;
        }
        .case-preview-art.gather { background: #e6edcf; }
        .case-preview-art.shop { background: #f3dfc9; }
        .case-preview-art.profile { background: #dce8df; }
        .case-preview-art.event { background: #efe0df; }
        .case-scribble {
          position: absolute;
          top: 27px;
          left: 25px;
          color: var(--green);
          font-size: 35px;
          font-family: serif;
          animation: case-float 3s ease-in-out infinite;
        }
        .case-sticker {
          position: absolute;
          right: 14px;
          top: 25px;
          border: 1px solid var(--green);
          border-radius: 999px;
          padding: 6px 8px;
          color: var(--green);
          font-size: 9px;
          font-weight: 900;
          transform: rotate(7deg);
        }
        .case-art-card {
          position: absolute;
          left: 28px;
          right: 22px;
          top: 83px;
          padding: 16px 14px;
          border: 1px solid var(--ink);
          background: var(--surface);
          box-shadow: 5px 5px 0 var(--lime);
          transform: rotate(-4deg);
        }
        .case-art-line {
          display: block;
          width: 68%;
          height: 7px;
          margin-top: 8px;
          background: var(--green);
          opacity: .78;
        }
        .case-art-line.long { width: 85%; margin-top: 0; }
        .case-art-line.short { width: 44%; background: var(--coral); }
        .case-doodle {
          position: absolute;
          right: 25px;
          bottom: 22px;
          color: var(--coral);
          font-size: 29px;
          transform: rotate(-12deg);
        }
        .case-arrow {
          margin-left: auto;
          color: var(--green);
          font-size: 22px;
        }
        @keyframes case-float {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-7px) rotate(4deg); }
        }
        @media (max-width: 640px) {
          .case-preview-rich {
            grid-template-columns: 1fr;
            padding: 24px;
          }
          .case-preview-art {
            min-height: 150px;
            max-width: 220px;
            width: 100%;
            justify-self: end;
          }
          .case-preview-rich h3 {
            font-size: 34px;
          }
        }
      `}</style>
      <section id="usecases" className="section-muted">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="eyebrow">이렇게 쓰세요</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <h2 className="section-title">
                무엇을 만들지<br />
                <span className="text-primary">정해져 있나요?</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
                가장 가까운 목적을 고르면<br />
                필요한 구성부터 보여드릴게요.
              </p>
            </div>
            <div className={`case-preview case-preview-rich ${item.theme}`} key={item.title}>
              <div className="case-preview-copy">
                <p className="eyebrow">선택한 페이지</p>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3>{item.title} 페이지</h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="case-preview-icon" aria-hidden="true">{item.icon}</span>
                </div>
                <ul className="case-preview-list">
                  {item.items.map((text, index) => (
                    <li key={text}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="mini-blocks">
                  <span>소개</span>
                  <span>{item.title === '가게' ? '메뉴' : '사진'}</span>
                  <span>{item.title === '행사' ? '초대하기' : '연락하기'}</span>
                </div>
              </div>
              <PreviewArt item={item} />
            </div>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CASES.map((caseItem, i) => (
              <button
                type="button"
                key={caseItem.title}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                className={`case-choice ${selected === i ? 'is-selected' : ''}`}
              >
                <span className="custom-icon" aria-hidden="true">{caseItem.icon}</span>
                <span>
                  <b>{caseItem.title}</b>
                  <small>{caseItem.desc}</small>
                </span>
                <span className="case-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <Link href="/builder" className="action-button mt-8">
            내 페이지 만들기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
