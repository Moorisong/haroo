'use client'

import { useState } from 'react'
import { Send, Users } from 'lucide-react'

interface Props {
  waitlistCount: number
}

/**
 * 대기자 일괄 카카오 알림톡 발송 버튼
 * 서버 오픈 시 수집된 대기자들에게 일괄 전송
 */
export default function WaitlistKakaoBroadcastBtn({ waitlistCount }: Props) {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleBroadcast = async () => {
    if (!confirm(`현재 대기자 ${waitlistCount}명에게 오픈 알림톡을 발송하시겠습니까?`)) return
    
    setLoading(true)
    try {
      // TODO: POST /api/notifications/waitlist-broadcast 연동
      await new Promise(r => setTimeout(r, 1000))
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#FEE500] rounded-2xl p-5 border border-[#FDD800]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Users size={16} /> 대기자 카카오톡 일괄 전송
          </h3>
          <p className="text-xs text-slate-700 mt-1">2차 오픈 시 대기자 전원에게 결제 링크 발송</p>
        </div>
        <div className="text-2xl font-black text-slate-900">{waitlistCount}명</div>
      </div>
      <button
        onClick={handleBroadcast}
        disabled={loading || sent || waitlistCount === 0}
        className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
      >
        <Send size={15} />
        {loading ? '발송 중...' : sent ? '발송 완료' : '알림톡 일괄 발송'}
      </button>
    </div>
  )
}
