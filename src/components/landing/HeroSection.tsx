'use client'
import { useState } from 'react'
import Link from 'next/link'
import PwaInstallGuideModal from './PwaInstallGuideModal'

const blocks = ['소개', '사진', '문의']
export default function HeroSection() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(1)
  return <section className="hero-shell">
    <div className="hero-grid" aria-hidden="true" />
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:grid-cols-[1fr_430px]">
      <div className="reveal-up">
        <p className="eyebrow">웹사이트 · 모임 · 가게 · 커플/우정앱 · 행사</p>
        <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[1.08] tracking-[-0.055em] text-foreground sm:text-7xl">외주 맡기지 말고<br /><span className="text-primary">직접 쉽게 만들어요.</span></h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">블록을 골라 내용을 채우면 5분 만에 완성.<br />모바일 웹과 앱을 스스로 간편하게 제작하세요.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/builder" className="action-button">5분 만에 시작하기 <span aria-hidden="true">→</span></Link><button onClick={() => setOpen(true)} className="quiet-button">스마트폰에 설치하는 방법</button></div>
      </div>
      <div className="builder-preview reveal-up delay-2" aria-label="페이지 조립 미리보기">
        <div className="preview-top"><span className="brand-mark small" aria-hidden="true">ㅎ</span><span>내 페이지</span><span className="status-dot" /></div>
        <div className="preview-content"><p className="eyebrow">내 페이지 미리보기</p><h2>오늘의<br /><span>작은 시작</span></h2><div className="preview-blocks">{blocks.map((block, index) => <button key={block} onClick={() => setActive(index)} className={`preview-block ${active === index ? 'is-active' : ''}`}><i aria-hidden="true" /><span>{block}</span><b>{active === index ? '선택됨' : '선택'}</b></button>)}</div><div className="preview-progress"><span style={{ width: `${(active + 1) * 33.33}%` }} /></div><p className="preview-note">{active === 0 ? '첫 화면을 소개해보세요.' : active === 1 ? '사진으로 분위기를 보여주세요.' : '문의받을 방법을 연결하세요.'}</p></div>
        <div className="preview-footer"><span>준비됐어요</span><Link href="/builder">계속하기 →</Link></div>
      </div>
    </div><PwaInstallGuideModal isOpen={open} onClose={() => setOpen(false)} />
  </section>
}
