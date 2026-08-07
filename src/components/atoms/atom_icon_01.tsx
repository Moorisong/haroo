'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** Lucide 혹은 외부에서 전달받은 SVG 아이콘 컴포넌트 */
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  size?: number
}

/**
 * 20종 원자 컴포넌트: atom_icon_01
 * 범용 아이콘 래퍼 — Lucide icon 컴포넌트를 주입받아 렌더링
 */
const AtomIcon01 = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: Icon, size = 16, className, ...props }, ref) => {
    return (
      <Icon
        ref={ref as any}
        width={size}
        height={size}
        className={cn('flex-shrink-0', className)}
        {...props}
      />
    )
  }
)
AtomIcon01.displayName = 'AtomIcon01'

export default AtomIcon01
