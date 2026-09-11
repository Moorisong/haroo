'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Globe, Settings, Edit3, ExternalLink, Copy, Check, Clock,
  Plus, BarChart2, Bell, Smartphone, ChevronRight, Trash2, FolderPlus,
} from 'lucide-react'
import CustomDomainDrawer from '@/components/dashboard/CustomDomainDrawer'
import { getCurrentUser } from '@/lib/auth'

interface ProjectItem {
  id: string
  name: string
  subdomain: string
  customDomain: string | null
  tier: string
  status: string
  nextBilling: string
  visits: number
  inquiries: number
}

interface DraftItem {
  id: string
  name: string
  updatedAt: string
  blocksCount: number
}

const QUICK_ACTIONS = [
  { icon: Edit3, label: '사이트 수정', href: '/builder', color: 'text-slate-700' },
  { icon: BarChart2, label: '문의 데이터', href: '/dashboard/forms', color: 'text-sky-600' },
  { icon: Bell, label: '알림 신청 관리', href: '/dashboard/notifications', color: 'text-amber-600' },
  { icon: Smartphone, label: '바탕화면 앱', href: '#', color: 'text-slate-700' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [domainDrawerOpen, setDomainDrawerOpen] = useState(false)
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [drafts, setDrafts] = useState<DraftItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedDraftIds, setSelectedDraftIds] = useState<string[]>([])
  const [isBatchDeleting, setIsBatchDeleting] = useState(false)

  // DB 데이터 불러오기
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [projRes, draftRes] = await Promise.all([
        fetch('/api/project/list'),
        fetch('/api/drafts/list'),
      ])
      if (projRes.ok) {
        const pData = await projRes.json()
        setProjects(pData.projects || [])
      }
      if (draftRes.ok) {
        const dData = await draftRes.json()
        setDrafts(dData.drafts || [])
      }
    } catch (err) {
      console.error('[Dashboard fetch error]', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        router.push('/login')
      } else {
        fetchData()
      }
    })
  }, [router])

  // 모두 선택 / 해제
  const handleToggleSelectAll = () => {
    if (drafts.length > 0 && selectedDraftIds.length === drafts.length) {
      setSelectedDraftIds([])
    } else {
      setSelectedDraftIds(drafts.map((d) => d.id))
    }
  }

  // 개별 체크 토글
  const handleToggleSelectDraft = (id: string) => {
    setSelectedDraftIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // 일괄 삭제
  const handleBatchDeleteDrafts = async () => {
    if (selectedDraftIds.length === 0) return
    if (!confirm(`선택한 ${selectedDraftIds.length}개의 임시 저장 내역을 일괄 삭제하시겠습니까?`)) return

    setIsBatchDeleting(true)
    try {
      await Promise.all(
        selectedDraftIds.map((id) =>
          fetch(`/api/drafts/${id}`, { method: 'DELETE' })
        )
      )
      setDrafts((prev) => prev.filter((d) => !selectedDraftIds.includes(d.id)))
      setSelectedDraftIds([])
    } catch (err) {
      console.error('[Batch Delete Drafts Error]', err)
      alert('일괄 삭제 중 오류가 발생했습니다.')
    } finally {
      setIsBatchDeleting(false)
    }
  }

  // 드래프트 DB 단일 삭제
  const handleDeleteDraft = async (id: string) => {
    if (!confirm('이 임시 저장 내역을 완전히 삭제하시겠습니까?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/drafts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDrafts((prev) => prev.filter((d) => d.id !== id))
        setSelectedDraftIds((prev) => prev.filter((item) => item !== id))
      }
    } catch (err) {
      console.error('[Delete Draft Error]', err)
    } finally {
      setDeletingId(null)
    }
  }

  const activeProject = projects[0] || null
  const siteUrl = activeProject ? `${activeProject.subdomain}.haroo.site` : ''

  const handleCopy = () => {
    if (!siteUrl) return
    navigator.clipboard.writeText(`https://${siteUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const daysUntilBilling = activeProject
    ? Math.ceil((new Date(activeProject.nextBilling).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

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
        {/* 사이트 상태 카드 (실제 DB 프로젝트 연동) */}
        {activeProject ? (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600">{activeProject.status === 'RUNNING' ? '운영 중' : activeProject.status}</span>
                  <span className="text-xs text-slate-400">EC2</span>
                </div>
                <h1 className="text-xl font-black text-slate-900">{activeProject.name}</h1>
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
                <span className="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold rounded">{activeProject.tier}</span>
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

            <div className="grid grid-cols-3 divide-x divide-slate-100">
              <div className="p-4 text-center">
                <div className="text-2xl font-black text-slate-900">{activeProject.visits.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-0.5">방문자 수</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-black text-slate-900">{activeProject.inquiries}</div>
                <div className="text-xs text-slate-500 mt-0.5">문의 접수</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-black text-slate-900">{daysUntilBilling}일</div>
                <div className="text-xs text-slate-500 mt-0.5">다음 결제까지</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <FolderPlus size={24} />
            </div>
            <h2 className="text-base font-bold text-slate-900">운영 중인 프로젝트가 없습니다</h2>
            <p className="text-xs text-slate-500 mt-1 mb-4">빌더에서 나만의 스마트 모바일 웹앱을 제작하고 바로 배포해보세요.</p>
            <Link href="/builder" className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={14} />
              첫 프로젝트 만들기
            </Link>
          </div>
        )}

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

        {/* 임시 저장 드래프트 (DB 실시간 연동 & 다중 일괄 삭제 기능) */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* 상단 메인 헤더 */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">임시 저장 내역 ({drafts.length}/10)</h2>
            <Link href="/builder" className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1">
              새로 만들기 <ChevronRight size={13} />
            </Link>
          </div>

          {/* 서브 툴바 (목록 체크박스와 수직 정렬되는 전용 바) */}
          {drafts.length > 0 && (
            <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs">
              <label className="flex items-center gap-2.5 text-slate-600 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={drafts.length > 0 && selectedDraftIds.length === drafts.length}
                  onChange={handleToggleSelectAll}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-500 cursor-pointer"
                />
                <span>{drafts.length > 0 && selectedDraftIds.length === drafts.length ? '전체 해제' : '전체 선택'}</span>
              </label>

              {selectedDraftIds.length > 0 ? (
                <button
                  onClick={handleBatchDeleteDrafts}
                  disabled={isBatchDeleting}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 size={12} />
                  <span>선택 삭제 ({selectedDraftIds.length})</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400">항목을 체크하여 삭제할 수 있습니다</span>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="p-8 text-center text-xs text-slate-400">데이터를 불러오는 중입니다...</div>
          ) : drafts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">저장된 임시 내역이 없습니다.</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {drafts.map((draft) => {
                const isSelected = selectedDraftIds.includes(draft.id)
                return (
                  <div
                    key={draft.id}
                    className={`flex items-center justify-between px-5 py-3.5 transition-colors ${
                      isSelected ? 'bg-slate-50/80' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectDraft(draft.id)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-500 cursor-pointer"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{draft.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          <Clock size={11} className="inline mr-1" />
                          {draft.updatedAt} · {draft.blocksCount}종 블록
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/builder?draft=${draft.id}`}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-white transition-colors"
                      >
                        계속 수정
                      </Link>
                      <button
                        onClick={() => handleDeleteDraft(draft.id)}
                        disabled={deletingId === draft.id}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-50 cursor-pointer"
                        title="드래프트 삭제"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <CustomDomainDrawer
        isOpen={domainDrawerOpen}
        onClose={() => setDomainDrawerOpen(false)}
        currentSubdomain={activeProject?.subdomain || 'mybrand'}
      />
    </div>
  )
}
