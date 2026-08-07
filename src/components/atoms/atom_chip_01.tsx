'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'active'
  onRemove?: () => void
}

/**
 * 20종 원자 컴포넌트: atom_chip_01
 * 태그·필터·카테고리 표시용 칩
 */
const AtomChip01 = forwardRef<HTMLSpanElement, ChipProps>(
  ({ variant = 'default', onRemove, className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-100 text-slate-700 border-transparent',
      outline: 'bg-white text-slate-700 border-slate-200',
      active: 'bg-slate-900 text-white border-transparent',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border transition-colors',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-0.5 w-3.5 h-3.5 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-opacity"
            aria-label="제거"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)
AtomChip01.displayName = 'AtomChip01'

export default AtomChip01
