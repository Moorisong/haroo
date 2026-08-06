'use client'

import { useState } from 'react'
import { X, AlertCircle, RefreshCw } from 'lucide-react'
import { DNS_POLL_INTERVAL_MS } from '@/lib/constants'
import type { DnsPollStatus } from '@/types'

interface CustomDomainDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentSubdomain: string
}

const CNAME_STEPS = [
  '도메인 등록 기관(가비아, 후이즈 등)에서 CNAME 레코드를 추가하세요.',
  'CNAME 값을 아래와 같이 설정하세요: target.haroo.site',
  '아래에 도메인을 입력하고 연결 확인을 클릭하세요.',
]

/**
 * 커스텀 도메인 연결 드로어
 * DNS CNAME 안내 + 5초 폴링 DNS 검증
 */
export default function CustomDomainDrawer({ isOpen, onClose, currentSubdomain }: CustomDomainDrawerProps) {
  const [customDomain, setCustomDomain] = useState('')
  const [pollStatus, setPollStatus] = useState<DnsPollStatus>('idle')

  const siteUrl = `${currentSubdomain}.haroo.site`

  const handleDnsCheck = async () => {
    if (!customDomain) return
    setPollStatus('checking')
    try {
      const res = await fetch('/api/domains/custom-connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customDomain }),
      })
      // 5초 대기 후 결과 확인 (DNS Polling 시뮬레이션)
      setTimeout(async () => {
        if (res.ok) {
          setPollStatus('success')
        } else {
          setPollStatus('failed')
        }
      }, DNS_POLL_INTERVAL_MS)
    } catch {
      setTimeout(() => setPollStatus('failed'), DNS_POLL_INTERVAL_MS)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">커스텀 도메인 연결</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 현재 도메인 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-700 mb-1">현재 기본 주소</div>
            <div className="text-sm font-mono text-slate-900">{siteUrl}</div>
          </div>

          {/* CNAME 안내 */}
          <div>
            <div className="text-sm font-bold text-slate-900 mb-3">커스텀 도메인 연결 방법</div>
            <div className="space-y-2.5">
              {CNAME_STEPS.map((step, i) => (
                <div key={i} className="flex gap-2 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <div>
                    {step}
                    {i === 1 && (
                      <code className="ml-1 text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded">target.haroo.site</code>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 도메인 입력 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">내 도메인 입력</label>
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="www.mybrand.com"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-900 font-mono"
            />
          </div>

          {/* DNS 폴링 상태 */}
          {pollStatus === 'checking' && (
            <div className="flex items-center gap-2 p-3 bg-sky-50 rounded-xl border border-sky-200">
              <RefreshCw size={14} className="text-sky-600 animate-spin" />
              <div className="text-xs text-sky-700">
                <div className="font-semibold">DNS 전파 확인 중...</div>
                <div className="text-sky-500">최대 24시간 소요될 수 있습니다.</div>
              </div>
            </div>
          )}
          {pollStatus === 'success' && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-xs text-emerald-700 font-semibold">✅ 연결 완료! SSL 자동 발급 중...</div>
            </div>
          )}
          {pollStatus === 'failed' && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <div className="font-semibold">DNS 전파가 아직 완료되지 않았습니다.</div>
                <div className="mt-0.5">CNAME 설정 후 최대 24시간이 소요됩니다. 잠시 후 다시 시도해주세요.</div>
              </div>
            </div>
          )}

          <button
            onClick={handleDnsCheck}
            disabled={!customDomain || pollStatus === 'checking'}
            className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            {pollStatus === 'checking' ? 'DNS 확인 중...' : 'SSL 자동 발급 & 연결 확인'}
          </button>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500">
              STANDARD / PROFESSIONAL 티어에서 커스텀 도메인 연결 및 무제한 SSL 자동 발급이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
