'use client'

import { useState } from 'react'
import { X, Bell } from 'lucide-react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * 대기자 알림 모달
 * 정원 초과 시 활성화 - 카카오 알림 신청
 */
export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!phone) return
    setLoading(true)
    try {
      await fetch('/api/notifications/waitlist-broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg">
          <X size={16} />
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-lg font-black text-slate-900 mb-2">신청 완료!</h2>
            <p className="text-sm text-slate-600">서버 오픈 시 카카오 알림을 보내드립니다.</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-4">🔔</div>
            <h2 className="text-lg font-black text-slate-900 mb-2">1차 전석 마감!</h2>
            <p className="text-sm text-slate-600 mb-5">2차 서버 오픈 시 카톡 알림을 받으세요.</p>
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
