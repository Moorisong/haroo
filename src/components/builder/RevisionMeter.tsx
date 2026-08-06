'use client'

import { useRevisionPriceCalculator } from '@/hooks/useRevisionPriceCalculator'
import type { BlockTier } from '@/types'
import { cn } from '@/lib/utils'

const CASE_BADGE: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-700',
  B: 'bg-emerald-100 text-emerald-700',
  C: 'bg-violet-100 text-violet-700',
  D: 'bg-amber-100 text-amber-700',
}

interface RevisionMeterProps {
  originalTier?: BlockTier
}

/**
 * 수정 비용 미터 — 캔버스 하단 상시 표시
 * 케이스 A·B → 0원, C → 업그레이드 차액, D → +10,000원
 */
export default function RevisionMeter({ originalTier }: RevisionMeterProps) {
  const { totalRevisionCost, prices } = useRevisionPriceCalculator(originalTier)

  return (
    <div className="mt-4 rounded-xl bg-white border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">수정 추가 비용</span>
        <span className={cn('text-sm font-black', totalRevisionCost === 0 ? 'text-emerald-600' : 'text-violet-600')}>
          {totalRevisionCost === 0 ? '0원 (무료)' : `+${totalRevisionCost.toLocaleString()}원`}
        </span>
      </div>
      <div className="p-3 space-y-1.5">
        {prices.map((item) => (
          <div key={item.caseType} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={cn('w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center', CASE_BADGE[item.caseType])}>
                {item.caseType}
              </span>
              <span className="text-xs text-slate-600">{item.label}</span>
            </div>
            <span className={cn('text-xs font-semibold', item.price === 0 ? 'text-emerald-600' : 'text-violet-600')}>
              {item.price === 0 ? '무료' : `+${item.price.toLocaleString()}원`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
