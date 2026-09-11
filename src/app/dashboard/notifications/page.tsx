'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, RefreshCw, Bell, AlertCircle } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import WaitlistTable, { type WaitlistSignupRow } from '@/components/dashboard/WaitlistTable'

interface ProjectOption {
  id: string
  name: string
}

export default function NotificationsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectOption[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [signups, setSignups] = useState<WaitlistSignupRow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) { router.push('/login'); return }
    })
    fetch('/api/project/list')
      .then((r) => r.json())
      .then((data) => {
        const list: ProjectOption[] = (data.projects || []).map((p: any) => ({ id: p.id, name: p.name }))
        setProjects(list)
        if (list.length > 0) setSelectedProjectId(list[0].id)
      })
  }, [router])

  const fetchSignups = useCallback(async (projectId: string) => {
    if (!projectId) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/notifications/waitlist-list?projectId=${encodeURIComponent(projectId)}`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setSignups(data.signups || [])
    } catch (err) {
      setError('신청자 목록을 불러오지 못했습니다.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedProjectId) fetchSignups(selectedProjectId)
  }, [selectedProjectId, fetchSignups])

  const handleSend = async (customMessage?: string) => {
    if (!selectedProjectId) return
    setIsSending(true)
    setSendResult(null)
    try {
      const res = await fetch('/api/notifications/waitlist-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: selectedProjectId, customMessage }),
      })
      const data = await res.json()
      if (data.success) {
        setSendResult(`✅ ${data.sent}명에게 오픈 알림톡 발송 완료!`)
        fetchSignups(selectedProjectId)
      } else {
        setSendResult(`⚠️ 발송 실패 (성공: ${data.sent}명, 실패: ${data.failed}명)`)
      }
    } catch {
      setSendResult('❌ 발송 중 오류가 발생했습니다.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
          <ChevronLeft size={18} />
          <span className="text-sm font-semibold">대시보드</span>
        </Link>
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-amber-500" />
          <span className="text-sm font-bold text-slate-900">알림 신청 관리</span>
        </div>
        <button
          onClick={() => fetchSignups(selectedProjectId)}
          disabled={isLoading}
          className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-40 transition-colors"
          title="새로고침"
        >
          <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* 프로젝트 선택 */}
        {projects.length > 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <label className="text-xs font-semibold text-slate-600 block mb-2">프로젝트 선택</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* 발송 결과 토스트 */}
        {sendResult && (
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-700 flex items-center gap-2">
            <span>{sendResult}</span>
            <button onClick={() => setSendResult(null)} className="ml-auto text-xs text-slate-400 hover:text-slate-600">닫기</button>
          </div>
        )}

        {/* 에러 */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-sm text-rose-700 flex items-center gap-2">
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        {/* 안내: 환경변수 미설정 시 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>실제 알림톡 발송</strong>을 위해{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">.env.local</code>에{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">ALIGO_API_KEY</code>,{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">ALIGO_USER_ID</code> 등을 설정하세요.
            미설정 시 dry-run 모드로 동작합니다.
          </p>
        </div>

        {/* 신청자 목록 테이블 */}
        <WaitlistTable
          signups={signups}
          isSending={isSending}
          projectId={selectedProjectId}
          onSend={handleSend}
        />
      </main>
    </div>
  )
}
