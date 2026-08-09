'use client'

/**
 * ActionToast
 * 빌더 미리보기 및 실제 배포 사이트 공통으로 사용되는 Toast 알림 컴포넌트.
 * haroo:toast 커스텀 이벤트를 구독하여 메시지를 표시.
 * 미리보기에서는 "[테스트]" 접두사가 붙은 목데이터 메시지, 배포에서는 실제 메시지.
 */

import React, { useEffect, useState, useCallback } from 'react'
import type { ToastLevel } from '@/hooks/useActionHandler'

interface ToastItem {
  id: string
  message: string
  level: ToastLevel
  durationMs: number
}

const LEVEL_STYLES: Record<ToastLevel, string> = {
  success: 'bg-emerald-600 text-white',
  info:    'bg-indigo-600 text-white',
  warning: 'bg-amber-500 text-white',
  error:   'bg-red-600 text-white',
}

export default function ActionToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, level = 'info', durationMs = 3500 } = (e as CustomEvent).detail
      const id = `toast_${Date.now()}_${Math.random()}`
      setToasts((prev) => [...prev, { id, message, level, durationMs }])
      setTimeout(() => removeToast(id), durationMs)
    }

    window.addEventListener('haroo:toast', handler)
    return () => window.removeEventListener('haroo:toast', handler)
  }, [removeToast])

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-start gap-2 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium
            max-w-sm pointer-events-auto cursor-pointer
            animate-[slideInRight_0.3s_ease-out]
            ${LEVEL_STYLES[toast.level]}
          `}
          onClick={() => removeToast(toast.id)}
        >
          <span className="leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
