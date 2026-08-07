import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * 20종 원자 컴포넌트: atom_checkbox_01
 * 기본 체크박스
 */
const AtomCheckbox01 = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          'w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
AtomCheckbox01.displayName = 'AtomCheckbox01'

export default AtomCheckbox01
