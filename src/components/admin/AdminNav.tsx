'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Store, DollarSign, FileText, Server, Home, Archive } from 'lucide-react'

const NAV_ITEMS = [
  { name: '종합 개요', href: '/admin', icon: LayoutDashboard },
  { name: '프로젝트 통계', href: '/admin/projects', icon: Store },
  { name: '매출 & 재무', href: '/admin/financials', icon: DollarSign },
  { name: '폼 제출 분석', href: '/admin/submissions', icon: FileText },
  { name: '인프라 & 대기자', href: '/admin/infra', icon: Server },
  { name: '데이터 아카이브', href: '/admin/archive', icon: Archive },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* 로고 및 브랜딩 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <span className="text-white font-black text-sm sm:text-base">H</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-white font-bold text-sm sm:text-base leading-none">어드민 센터</h1>
                <span className="bg-sky-500/20 text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-500/30">
                  v2.0 Analytics
                </span>
              </div>
              <p className="text-slate-400 text-[10px] sm:text-[11px] mt-0.5">Haroo Platform Detailed Management</p>
            </div>
          </div>

          {/* 메인 홈 이동 */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Home size={14} />
            <span>서비스 메인</span>
          </Link>
        </div>

        {/* 카테고리 탭 네비게이션 */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/80">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
