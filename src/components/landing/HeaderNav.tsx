'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Layers, User, LogOut } from 'lucide-react'
import { getCurrentUser, signOut, type UserProfile } from '@/lib/auth'

const NAV_LINKS = [
  { label: '45종 블록', href: '#blocks' },
  { label: '가격 안내', href: '#pricing' },
]

/**
 * 고정 상단 네비게이션
 * 로그인 상태 감지 & 모바일/데스크톱 대응
 */
export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  const handleLogout = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black tracking-tight">H</span>
            </div>
            <span className="text-slate-900 font-bold text-lg tracking-tight">하루</span>
            <span className="hidden sm:inline text-slate-400 text-xs font-normal ml-1">Haroo</span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {link.label}
              </a>
            ))}
            <Link href={user ? '/dashboard' : '/login'} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              내 저장소
            </Link>
          </nav>

          {/* CTA / 로그인 상태 */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <User size={13} />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
                  title="로그아웃"
                >
                  <LogOut size={13} />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                로그인
              </Link>
            )}

            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Layers size={14} />
              5분 만에 만들기
            </Link>
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="메뉴 열기"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={user ? '/dashboard' : '/login'}
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              내 저장소
            </Link>

            <div className="pt-3 border-t border-slate-100 mt-2 space-y-2">
              {user ? (
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-600" />
                    <span className="text-xs font-semibold text-slate-800">{user.name} ({user.email})</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="text-xs text-red-600 font-semibold flex items-center gap-1"
                  >
                    <LogOut size={12} /> 로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-2 text-sm text-slate-700 font-medium hover:bg-slate-50 rounded-lg"
                >
                  로그인
                </Link>
              )}

              <Link
                href="/builder"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Layers size={14} />
                5분 만에 만들기
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
