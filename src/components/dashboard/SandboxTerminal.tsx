'use client'

import { useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'

const BUILD_STEPS = [
  '🚀 배포를 시작합니다...',
  '📦 [1/5] Docker 이미지 Pull 중...',
  '✅ [1/5] 이미지 Pull 완료',
  '🐳 [2/5] 컨테이너 실행 중...',
  '✅ [2/5] 컨테이너 기동 완료 (포트: 3001)',
  '🔍 [3/5] Health Check 중...',
  '✅ [3/5] HTTP 200 OK 확인',
  '🌐 [4/5] Caddy 라우팅 등록 중...',
  '✅ [4/5] mybrand.haroo.site → :3001 라우팅 완료',
  '🔒 [5/5] SSL 인증서 발급 중...',
  '✅ [5/5] Let\'s Encrypt SSL 발급 완료',
  '🎉 배포 완료! https://mybrand.haroo.site',
]

/**
 * 샌드박스 배포 터미널
 * SSE 스트림 수신으로 실시간 빌드 로그 표시
 * 실제 구현: EventSource → /api/build-logs/stream
 */
export default function SandboxTerminal({ projectId }: { projectId?: string }) {
  const [logs, setLogs] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startStream = () => {
    if (isStreaming) return
    setLogs([])
    stepRef.current = 0
    setIsComplete(false)
    setIsStreaming(true)

    // Mock SSE - 실제는 EventSource('/api/build-logs/stream?projectId=...')
    timerRef.current = setInterval(() => {
      if (stepRef.current >= BUILD_STEPS.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setIsComplete(true)
        setIsStreaming(false)
        return
      }
      setLogs((prev) => [...prev, BUILD_STEPS[stepRef.current]])
      stepRef.current++
    }, 700)
  }

  useEffect(() => {
    if (projectId) startStream()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [projectId])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-xs text-slate-400 ml-2">배포 터미널</span>
        </div>
        <button
          onClick={startStream}
          disabled={isStreaming}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={12} className={isStreaming ? 'animate-spin' : ''} />
          재시작
        </button>
      </div>
      <div
        ref={terminalRef}
        className="bg-slate-950 p-4 h-48 overflow-y-auto font-mono text-xs"
      >
        {logs.length === 0 ? (
          <span className="text-slate-600">배포 시작을 기다리는 중...</span>
        ) : (
          logs.map((log, i) => (
            <div key={i} className={`mb-1 ${log.startsWith('✅') ? 'text-emerald-400' : log.startsWith('🎉') ? 'text-yellow-400' : 'text-slate-300'}`}>
              {log}
            </div>
          ))
        )}
        {isStreaming && <span className="text-slate-400 animate-pulse">▊</span>}
      </div>
    </div>
  )
}
