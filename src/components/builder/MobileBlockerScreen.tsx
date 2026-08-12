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
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* 백그라운드 빛 효과 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-sm w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-7 shadow-2xl backdrop-blur-xl flex flex-col items-center">
        {/* PC 아이콘 */}
        <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-sky-500/20 transform -rotate-3">
          <Monitor size={32} />
        </div>

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
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-sky-500 hover:bg-sky-600 active:scale-[0.98] text-white text-xs font-extrabold rounded-xl transition-all mb-3 shadow-md shadow-sky-500/20"
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
          className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-700/60"
        >
          <ArrowLeft size={14} />
          <span>메인 홈으로 돌아가기</span>
        </Link>
      </div>
    </div>
  )
}
