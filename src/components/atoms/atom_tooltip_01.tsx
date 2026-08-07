'use client'

import { useState, useRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  children: React.ReactNode
}

const POSITION_MAP = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

/**
 * 20종 원자 컴포넌트: atom_tooltip_01
 * 호버 시 설명 텍스트를 표시하는 툴팁 래퍼
 */
const AtomTooltip01 = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, position = 'top', className, children }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children}
        {visible && (
          <div
            role="tooltip"
            className={cn(
              'absolute z-50 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-md pointer-events-none animate-in fade-in duration-100',
              POSITION_MAP[position]
            )}
          >
            {content}
          </div>
        )}
      </div>
    )
  }
)
AtomTooltip01.displayName = 'AtomTooltip01'

export default AtomTooltip01
