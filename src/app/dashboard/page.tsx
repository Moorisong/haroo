'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Globe, Settings, Edit3, ExternalLink, Copy, Check, Clock,
  Plus, BarChart2, Bell, Smartphone, ChevronRight,
} from 'lucide-react'
import CustomDomainDrawer from '@/components/dashboard/CustomDomainDrawer'

const MOCK_PROJECT = {
  id: 'proj_abc123',
  name: '나만의 카페',
  subdomain: 'mycafe',
  customDomain: null,
  tier: 'STANDARD',
  status: 'RUNNING',
  nextBilling: '2026-09-06',
  subscriptionMonths: 12,
  deployedAt: '2026-08-06',
  visits: 1247,
  inquiries: 38,
}

const MOCK_DRAFTS = [
  { id: 'd1', name: '헤어샵 리뉴얼', updatedAt: '2026-08-05', blocks: 8 },
  { id: 'd2', name: '클래스 소개 페이지', updatedAt: '2026-08-03', blocks: 12 },
]

const QUICK_ACTIONS = [
  { icon: Edit3, label: '사이트 수정', href: '/builder', color: 'text-slate-700' },
  { icon: BarChart2, label: '문의 데이터', href: '/dashboard/forms', color: 'text-sky-600' },
  { icon: Bell, label: '알림톡 발송', href: '/dashboard/notifications', color: 'text-amber-600' },
  { icon: Smartphone, label: '바탕화면 앱', href: '#', color: 'text-slate-700' },
]

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const [domainDrawerOpen, setDomainDrawerOpen] = useState(false)

  const siteUrl = `${MOCK_PROJECT.subdomain}.haroo.site`

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${siteUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const daysUntilBilling = Math.ceil(
    (new Date(MOCK_PROJECT.nextBilling).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-black">H</span>
          </div>
          <span className="text-slate-900 font-bold text-base">하루</span>
        </Link>
        <Link href="/builder" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors">
          <Plus size={12} />
          새 프로젝트
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* 사이트 상태 카드 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-600">운영 중</span>
                <span className="text-xs text-slate-400">EC2 t4g.small</span>
              </div>
              <h1 className="text-xl font-black text-slate-900">{MOCK_PROJECT.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={`https://${siteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-800 font-medium"
                >
                  <Globe size={13} />
                  {siteUrl}
                  <ExternalLink size={11} />
                </a>
                <button onClick={handleCopy} className="p-1 text-slate-400 hover:text-slate-700 transition-colors">
                  {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold rounded">{MOCK_PROJECT.tier}</span>
              <Link href="/builder" className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                <Edit3 size={15} />
              </Link>
              <button
                onClick={() => setDomainDrawerOpen(true)}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Settings size={15} />
              </button>
            </div>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            <div className="p-4 text-center">
              <div className="text-2xl font-black text-slate-900">{MOCK_PROJECT.visits.toLocaleString()}</div>
              <div className="text-xs text-slate-500 mt-0.5">방문자 수</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-black text-slate-900">{MOCK_PROJECT.inquiries}</div>
              <div className="text-xs text-slate-500 mt-0.5">문의 접수</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-black text-slate-900">{daysUntilBilling}일</div>
              <div className="text-xs text-slate-500 mt-0.5">다음 결제까지</div>
            </div>
          </div>
        </div>

        {/* 퀵 액션 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all"
              >
                <Icon size={20} className={action.color} />
                <span className="text-xs font-semibold text-slate-700">{action.label}</span>
              </Link>
            )
          })}
        </div>

        {/* 임시 저장 드래프트 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">임시 저장 ({MOCK_DRAFTS.length}/10)</h2>
            <Link href="/builder" className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1">
              새로 만들기 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {MOCK_DRAFTS.map((draft) => (
              <div key={draft.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{draft.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    <Clock size={11} className="inline mr-1" />
                    {draft.updatedAt} · {draft.blocks}종 블록
                  </div>
                </div>
                <Link
                  href={`/builder?draft=${draft.id}`}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  계속 수정
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CustomDomainDrawer
        isOpen={domainDrawerOpen}
        onClose={() => setDomainDrawerOpen(false)}
        currentSubdomain={MOCK_PROJECT.subdomain}
      />
    </div>
  )
}
