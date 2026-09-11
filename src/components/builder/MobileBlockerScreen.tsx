'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Monitor, Copy, Check, ArrowLeft } from 'lucide-react'

export default function MobileBlockerScreen() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      if (typeof window !== 'undefined') {
        const url = window.location.href
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url)
        } else {
          const textArea = document.createElement('textarea')
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy link', err)
    }
  }

  return (
    <>
      <style>{`.mobile-blocker{background:#f4f1e8;color:var(--ink)}.mobile-blocker-panel{padding:38px 30px 30px;border:1px solid var(--ink);border-radius:28px;background:rgb(251 250 245 / 92%);box-shadow:14px 14px 0 var(--coral),var(--shadow-soft);overflow:hidden}.mobile-blocker-icon{display:flex;width:72px;height:72px;align-items:center;justify-content:center;border:1px solid var(--green);border-radius:20px;background:var(--lime);color:var(--green);transform:rotate(-5deg);box-shadow:6px 6px 0 var(--green);margin-bottom:20px}.mobile-blocker-kicker{color:var(--green);font-size:9px;font-weight:900;letter-spacing:.14em}.mobile-blocker h1{color:var(--ink)}.mobile-blocker p{color:var(--muted)}.mobile-blocker-copy{background:var(--green);color:var(--surface);box-shadow:0 5px 0 var(--green-deep)}.mobile-blocker-copy:hover{background:var(--green-deep)}.mobile-blocker-home{border:1px solid var(--line);background:transparent;color:var(--green)}.mobile-blocker-home:hover{background:var(--wash)}.mobile-blocker-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(2px)}.mobile-blocker-orb-one{top:14%;right:12%;width:180px;height:180px;background:rgb(216 239 145 / 38%)}.mobile-blocker-orb-two{bottom:14%;left:8%;width:120px;height:120px;background:rgb(217 133 103 / 18%)}@media(max-width:420px){.mobile-blocker-panel{padding:30px 22px 24px}}`}</style>
    <div className="mobile-blocker fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      <div className="mobile-blocker-orb mobile-blocker-orb-one" aria-hidden="true" />
      <div className="mobile-blocker-orb mobile-blocker-orb-two" aria-hidden="true" />
      <div className="mobile-blocker-panel relative z-10 max-w-sm w-full flex flex-col items-center">
        <div className="mobile-blocker-icon" aria-hidden="true"><Monitor size={28} /></div>
        <span className="mobile-blocker-kicker">HAROO ATELIER · DESKTOP STUDIO</span>

        {/* 타이틀 및 안내 */}
        <h1 className="text-xl font-black text-white mb-2 tracking-tight">
          PC 환경에서만 이용 가능합니다
        </h1>
        <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6 px-1 text-balance">
          사이트 만들기 및 편집 기능은 넓은 PC 화면에서 지원됩니다.
        </p>

        {/* 주소 복사 버튼 */}
        <button
          onClick={handleCopyLink}
          className="mobile-blocker-copy w-full flex items-center justify-center gap-2 py-3.5 px-4 active:scale-[0.98] text-xs font-extrabold rounded-xl transition-all mb-3"
        >
          {copied ? (
            <>
              <Check size={15} className="text-white" />
              <span>PC 접속 링크 복사 완료!</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>PC 접속 링크 복사하기</span>
            </>
          )}
        </button>

        {/* 홈으로 돌아가기 버튼 */}
        <Link
          href="/"
          className="mobile-blocker-home w-full py-3 px-4 active:scale-[0.98] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>메인 홈으로 돌아가기</span>
        </Link>
      </div>
    </div>
  )
}
