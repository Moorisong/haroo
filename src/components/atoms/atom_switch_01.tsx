'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  label?: string
  className?: string
  onChange?: (checked: boolean) => void
}

/**
 * 20종 원자 컴포넌트: atom_switch_01
 * iOS 스타일 토글 스위치
 */
const AtomSwitch01 = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, disabled = false, label, className, onChange }, ref) => {
    const isControlled = checked !== undefined
    const [internal, setInternal] = useState(defaultChecked)
    const active = isControlled ? checked : internal

    const handleClick = () => {
      if (disabled) return
      const next = !active
      if (!isControlled) setInternal(next)
      onChange?.(next)
    }

    return (
      <label className={cn('inline-flex items-center gap-2 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed', className)}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={active}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            'relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
            active ? 'bg-slate-900' : 'bg-slate-200'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
              active ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
        {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      </label>
    )
  }
)
AtomSwitch01.displayName = 'AtomSwitch01'

export default AtomSwitch01
