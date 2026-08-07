'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CounterProps {
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  className?: string
  onChange?: (value: number) => void
}

/**
 * 20종 원자 컴포넌트: atom_counter_01
 * +/- 버튼이 있는 수량 카운터
 */
const AtomCounter01 = forwardRef<HTMLDivElement, CounterProps>(
  ({ defaultValue = 1, min = 0, max = 99, step = 1, className, onChange }, ref) => {
    const [count, setCount] = useState(defaultValue)

    const update = (next: number) => {
      const clamped = Math.min(max, Math.max(min, next))
      setCount(clamped)
      onChange?.(clamped)
    }

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden', className)}
      >
        <button
          type="button"
          onClick={() => update(count - step)}
          disabled={count <= min}
          className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-medium"
          aria-label="감소"
        >
          −
        </button>
        <span className="w-10 text-center text-sm font-semibold text-slate-800 select-none">
          {count}
        </span>
        <button
          type="button"
          onClick={() => update(count + step)}
          disabled={count >= max}
          className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-medium"
          aria-label="증가"
        >
          +
        </button>
      </div>
    )
  }
)
AtomCounter01.displayName = 'AtomCounter01'

export default AtomCounter01
