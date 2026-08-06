'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  signInWithProvider,
  signInWithEmail,
  signUpWithEmail,
  signInAsDemoUser,
} from '@/lib/auth'
import { isSupabaseConfigured } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'social' | 'email'>('social')
  const [isSignUp, setIsSignUp] = useState(false)

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleOAuth = async (provider: 'kakao' | 'google') => {
    setLoading(provider)
    setErrorMsg(null)
    try {
      const res = await signInWithProvider(provider)
      if (res.error) {
        setErrorMsg(res.error.message)
        setLoading(null)
      } else if (res.isDemo) {
        router.push('/dashboard')
      }
    } catch {
      setErrorMsg('소셜 로그인 중 오류가 발생했습니다.')
      setLoading(null)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMsg('이메일과 비밀번호를 입력해주세요.')
      return
    }

    setLoading('email')
    setErrorMsg(null)

    try {
      if (isSignUp) {
        const res = await signUpWithEmail(email, password, name)
        if (res.error) {
          setErrorMsg(res.error.message)
          setLoading(null)
          return
        }
      } else {
        const res = await signInWithEmail(email, password)
        if (res.error) {
          setErrorMsg(res.error.message)
          setLoading(null)
          return
        }
      }
      router.push('/dashboard')
    } catch {
      setErrorMsg('로그인 처리 중 오류가 발생했습니다.')
      setLoading(null)
    }
  }

  const handleDemoLogin = () => {
    signInAsDemoUser('demo@haroo.site', '체험 사용자')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-black">H</span>
            </div>
          </Link>
          <h1 className="text-xl font-black text-slate-900">하루(Haroo) 시작하기</h1>
          <p className="text-xs text-slate-500 mt-1">소셜 계정 또는 이메일로 5분 만에 사이트를 만드세요.</p>
        </div>

        {/* Supabase 미설정 안내 배너 */}
        {!isSupabaseConfigured && (
          <div className="mb-4 p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-800 leading-relaxed text-center">
            💡 <strong>개발/테스트 모드:</strong> Supabase API 키 연결 전에도 모든 기능을 테스트할 수 있습니다.
          </div>
        )}

        {/* 에러 메시지 */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* 탭 전환 */}
        <div className="flex border-b border-slate-200 mb-5">
          <button
            onClick={() => setTab('social')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
              tab === 'social'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            소셜 로그인
          </button>
          <button
            onClick={() => setTab('email')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
              tab === 'email'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            이메일 로그인
          </button>
        </div>

        {tab === 'social' ? (
          /* 소셜 로그인 */
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
        ) : (
          /* 이메일 로그인 / 회원가입 폼 */
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading !== null}
              className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 mt-2"
            >
              {loading === 'email'
                ? '처리 중...'
                : isSignUp
                ? '회원가입'
                : '로그인'}
            </button>
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-sky-600 hover:underline font-semibold"
              >
                {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
              </button>
            </div>
          </form>
        )}

        {/* 즉시 테스트 데모 로그인 버튼 */}
        <div className="mt-5 pt-4 border-t border-slate-200">
          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
          >
            ⚡ 1초 만에 데모 계정으로 바로 테스트하기
          </button>
        </div>

        {/* 약관 동의 */}
        <p className="text-center text-xs text-slate-400 mt-5 leading-relaxed">
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
