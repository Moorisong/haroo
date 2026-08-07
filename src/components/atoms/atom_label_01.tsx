import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * 20종 원자 컴포넌트: atom_label_01
 * 폼 필드 라벨용 텍스트
 */
const AtomLabel01 = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('text-sm font-semibold opacity-90', className)}
        {...props}
      >
        {children}
      </label>
    )
  }
)
AtomLabel01.displayName = 'AtomLabel01'

export default AtomLabel01
