'use client'

import React from 'react'
import { Bell, Loader2, CheckCircle2, Clock } from 'lucide-react'

export interface WaitlistSignupRow {
  id: string
  project_id: string
  phone_masked: string
  status: 'PENDING' | 'NOTIFIED'
  notified_at: string | null
  created_at: string
}

interface Props {
  signups: WaitlistSignupRow[]
  isSending: boolean
  projectId: string
  onSend: (message?: string) => void
}

function formatDate(isoStr: string): string {
  try {
    return new Date(isoStr).toLocaleString('ko-KR', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return isoStr
  }
}

export default function WaitlistTable({ signups, isSending, projectId, onSend }: Props) {
  const total = signups.length
  const pending = signups.filter((s) => s.status === 'PENDING').length
  const notified = signups.filter((s) => s.status === 'NOTIFIED').length

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* 헤더 */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bell size={15} className="text-amber-500" />
            알림 신청자 목록
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            총 {total}명 · 미발송 {pending}명 · 발송 완료 {notified}명
          </p>
        </div>

        {pending > 0 && (
          <button
            onClick={() => onSend()}
            disabled={isSending}
            className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-900 text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            {isSending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Bell size={14} />
            )}
            {isSending ? '발송 중...' : `오픈 알림 발송 (${pending}명)`}
          </button>
        )}
      </div>

      {/* 통계 요약 */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        <div className="p-4 text-center">
          <div className="text-xl font-black text-slate-900">{total}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">전체 신청</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-xl font-black text-amber-600">{pending}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">발송 대기</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-xl font-black text-emerald-600">{notified}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">발송 완료</div>
        </div>
      </div>

      {/* 목록 */}
      {signups.length === 0 ? (
        <div className="p-10 text-center">
          <div className="text-3xl mb-3">🔔</div>
          <p className="text-sm text-slate-500">아직 알림 신청자가 없습니다.</p>
          <p className="text-xs text-slate-400 mt-1">
            블록 버튼 액션을 &apos;알림 신청&apos;으로 설정하면 방문자가 신청할 수 있습니다.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {signups.map((signup) => (
            <div key={signup.id} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <Bell size={13} className="text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{signup.phone_masked}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock size={10} />
                    {formatDate(signup.created_at)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {signup.status === 'NOTIFIED' ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <CheckCircle2 size={11} />
                    발송 완료
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    대기 중
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
