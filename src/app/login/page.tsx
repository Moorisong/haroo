'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signInWithProvider } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        const pendingDraft = sessionStorage.getItem('pending_builder_draft')
        if (pendingDraft) {
          router.replace('/builder')
        } else {
          router.replace('/dashboard')
        }
      }
    })
  }, [router])

  const handleOAuth = async (provider: 'kakao' | 'google') => {
    setLoading(provider)
    setErrorMsg(null)
    try {
      const res = await signInWithProvider(provider)
      if (res.error) {
        setErrorMsg(res.error.message)
        setLoading(null)
      }
    } catch {
      setErrorMsg('소셜 로그인 중 오류가 발생했습니다.')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-black">H</span>
            </div>
          </Link>
          <h1 className="text-xl font-black text-slate-900">하루(Haroo) 시작하기</h1>
          <p className="text-xs text-slate-500 mt-1">소셜 계정으로 5분 만에 사이트를 만드세요.</p>
        </div>

        {/* 에러 메시지 */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* 소셜 로그인 버튼 */}
        <div className="space-y-3">
          <button
            onClick={() => handleOAuth('kakao')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#FEE500] text-slate-900 hover:bg-[#FDD800] transition-colors disabled:opacity-60"
          >
            <span className="text-lg">💬</span>
            {loading === 'kakao' ? '로그인 중...' : '카카오 로그인'}
          </button>

          <button
            onClick={() => handleOAuth('google')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors disabled:opacity-60"
          >
            <span className="text-lg">🌐</span>
            {loading === 'google' ? '로그인 중...' : 'Google 로그인'}
          </button>
        </div>

        {/* 약관 동의 */}
        <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed">
          로그인 시{' '}
          <Link href="/terms" className="text-sky-600 hover:underline">이용약관</Link>
          {' '}및{' '}
          <Link href="/privacy" className="text-sky-600 hover:underline">개인정보 처리방침</Link>에 동의합니다.
        </p>

        <div className="text-center mt-5">
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
