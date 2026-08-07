'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZE_MAP = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
}

/**
 * 20종 원자 컴포넌트: atom_avatar_01
 * 프로필 이미지 또는 이니셜 폴백을 표시하는 아바타
 */
const AtomAvatar01 = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', fallback, size = 'md', className }, ref) => {
    const initials = fallback
      ? fallback.slice(0, 2).toUpperCase()
      : alt.slice(0, 2).toUpperCase() || 'U'

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full overflow-hidden bg-slate-200 flex items-center justify-center flex-shrink-0',
          SIZE_MAP[size],
          className
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold text-slate-600 leading-none">{initials}</span>
        )}
      </div>
    )
  }
)
AtomAvatar01.displayName = 'AtomAvatar01'

export default AtomAvatar01
