'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import type { AgreementState } from '@/types'

const AGREEMENT_ITEMS = [
  { key: 'terms' as const, label: '이용약관', href: '/terms' },
  { key: 'privacy' as const, label: '개인정보 처리방침', href: '/privacy' },
  { key: 'refund' as const, label: '환불 규정 (해지 시 10% 위약금 + Math.ceil 정산)', href: '/terms#제6조' },
]

interface TermsAgreementCheckboxProps {
  agreed: AgreementState
  onChange: (key: keyof AgreementState) => void
}

/**
 * 약관 동의 체크박스 그룹 (3개 필수 약관)
 * Math.ceil 환불 규정 명시
 */
export default function TermsAgreementCheckbox({ agreed, onChange }: TermsAgreementCheckboxProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h2 className="text-sm font-bold text-slate-900 mb-3">약관 동의 (필수)</h2>
      <div className="space-y-3">
        {AGREEMENT_ITEMS.map((item) => (
          <label key={item.key} className="flex items-start gap-3 cursor-pointer" htmlFor={`agree-${item.key}`}>
            <div
              id={`agree-${item.key}`}
              role="checkbox"
              aria-checked={agreed[item.key]}
              tabIndex={0}
              onClick={() => onChange(item.key)}
              onKeyDown={(e) => e.key === 'Enter' && onChange(item.key)}
              className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors mt-0.5 cursor-pointer ${
                agreed[item.key] ? 'bg-slate-900 border-slate-900' : 'border-slate-300 hover:border-slate-500'
              }`}
            >
              {agreed[item.key] && <Check size={11} className="text-white" />}
            </div>
            <span className="text-xs text-slate-700 leading-relaxed">
              [필수]{' '}
              <Link href={item.href} className="text-sky-600 underline underline-offset-2 hover:text-sky-800" target="_blank">
                {item.label}
              </Link>
              에 동의합니다
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
