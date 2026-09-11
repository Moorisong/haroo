'use client'

import { useState, useEffect } from 'react'
import { X, Bell } from 'lucide-react'

interface WaitlistModalProps {
  isOpen?: boolean
  onClose?: () => void
  initialTitle?: string
  initialSubtitle?: string
}

/**
 * 대기자 알림 모달
 * 정원 초과 시 또는 블록 알림 신청(APPLY_NOTIFICATION) 시 활성화 - 카카오 알림 신청
 */
export default function WaitlistModal({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  initialTitle,
  initialSubtitle,
}: WaitlistModalProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(initialTitle || '사전예약 / 오픈 알림')
  const [modalSubtitle, setModalSubtitle] = useState(initialSubtitle || '오픈 및 주요 소식을 카카오톡 알림으로 전송해 드립니다.')
  const [projectId, setProjectId] = useState<string>('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const isControlled = typeof propsIsOpen === 'boolean'
  const isVisible = isControlled ? propsIsOpen : internalOpen

  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ title?: string; subtitle?: string; projectId?: string }>
      if (customEvent.detail) {
        if (customEvent.detail.title) setModalTitle(customEvent.detail.title)
        if (customEvent.detail.subtitle) setModalSubtitle(customEvent.detail.subtitle)
        if (customEvent.detail.projectId) setProjectId(customEvent.detail.projectId)
      }
      setSubmitted(false)
      setPhone('')
      setInternalOpen(true)
    }

    window.addEventListener('haroo:open-waitlist', handleOpenEvent)
    return () => {
      window.removeEventListener('haroo:open-waitlist', handleOpenEvent)
    }
  }, [])

  const handleClose = () => {
    if (propsOnClose) {
      propsOnClose()
    } else {
      setInternalOpen(false)
    }
  }

  if (!isVisible) return null

  const handleSubmit = async () => {
    if (!phone) return
    setLoading(true)
    try {
      // projectId: 이벤트 payload 또는 URL의 draft 파라미터에서 추출
      const resolvedProjectId = projectId ||
        (typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('draft') || 'unknown'
          : 'unknown')
      await fetch('/api/notifications/waitlist-broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, projectId: resolvedProjectId }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6">
        <button onClick={handleClose} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
          <X size={16} />
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-lg font-black text-slate-900 mb-2">신청 완료!</h2>
            <p className="text-sm text-slate-600">오픈 및 주요 소식을 카카오톡 알림으로 보내드립니다.</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-4">🔔</div>
            <h2 className="text-lg font-black text-slate-900 mb-2">{modalTitle}</h2>
            <p className="text-sm text-slate-600 mb-5">{modalSubtitle}</p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl mb-3 outline-none focus:border-slate-900"
            />
            <button
              onClick={handleSubmit}
              disabled={!phone || loading}
              className="w-full py-3 bg-[#FEE500] text-slate-900 text-sm font-bold rounded-xl hover:bg-[#FDD800] disabled:opacity-50 transition-colors"
            >
              <Bell size={14} className="inline mr-2" />
              {loading ? '신청 중...' : '카톡 알림 신청하기'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
