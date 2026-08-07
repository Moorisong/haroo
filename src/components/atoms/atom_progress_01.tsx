'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const HEIGHT_MAP = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

/**
 * 20종 원자 컴포넌트: atom_progress_01
 * 진행률 표시 프로그레스 바
 */
const AtomProgress01 = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, size = 'md', showLabel = false, className }, ref) => {
    const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)))

    return (
      <div ref={ref} className={cn('w-full flex flex-col gap-1', className)}>
        {showLabel && (
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>진행률</span>
            <span>{pct}%</span>
          </div>
        )}
        <div className={cn('w-full bg-slate-200 rounded-full overflow-hidden', HEIGHT_MAP[size])}>
          <div
            className="h-full bg-slate-900 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    )
  }
)
AtomProgress01.displayName = 'AtomProgress01'

export default AtomProgress01
