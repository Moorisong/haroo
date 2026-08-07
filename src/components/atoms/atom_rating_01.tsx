'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface RatingProps {
  defaultValue?: number
  max?: number
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onChange?: (value: number) => void
}

const SIZE_MAP = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }

/**
 * 20종 원자 컴포넌트: atom_rating_01
 * 클릭 가능한 별점 입력/표시 컴포넌트
 */
const AtomRating01 = forwardRef<HTMLDivElement, RatingProps>(
  ({ defaultValue = 0, max = 5, readonly = false, size = 'md', className, onChange }, ref) => {
    const [hovered, setHovered] = useState(0)
    const [selected, setSelected] = useState(defaultValue)

    const handleClick = (value: number) => {
      if (readonly) return
      setSelected(value)
      onChange?.(value)
    }

    const active = hovered || selected

    return (
      <div
        ref={ref}
        className={cn('inline-flex gap-0.5', className)}
        onMouseLeave={() => !readonly && setHovered(0)}
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            className={cn(
              SIZE_MAP[size],
              'transition-colors',
              readonly ? 'cursor-default' : 'cursor-pointer'
            )}
            aria-label={`${star}점`}
          >
            <svg viewBox="0 0 24 24" fill={star <= active ? '#F59E0B' : 'none'} stroke={star <= active ? '#F59E0B' : '#CBD5E1'} strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        ))}
      </div>
    )
  }
)
AtomRating01.displayName = 'AtomRating01'

export default AtomRating01
