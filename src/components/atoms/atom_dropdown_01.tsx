'use client'

import { useState, useRef, useEffect, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps {
  options: DropdownOption[]
  placeholder?: string
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
}

/**
 * 20종 원자 컴포넌트: atom_dropdown_01
 * 커스텀 드롭다운 셀렉터
 */
const AtomDropdown01 = forwardRef<HTMLDivElement, DropdownProps>(
  ({ options, placeholder = '선택해 주세요', defaultValue, className, onChange }, ref) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<DropdownOption | null>(
      options.find((o) => o.value === defaultValue) ?? null
    )
    const containerRef = useRef<HTMLDivElement>(null)

    // 외부 클릭 감지
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSelect = (opt: DropdownOption) => {
      setSelected(opt)
      setOpen(false)
      onChange?.(opt.value)
    }

    return (
      <div ref={containerRef} className={cn('relative w-full', className)}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 transition-colors"
        >
          <span className={selected ? 'text-slate-800' : 'text-slate-400'}>
            {selected?.label ?? placeholder}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('text-slate-400 transition-transform', open && 'rotate-180')}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <ul className="absolute z-50 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg py-1 max-h-60 overflow-auto">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors',
                    selected?.value === opt.value && 'font-semibold text-slate-900'
                  )}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
AtomDropdown01.displayName = 'AtomDropdown01'

export default AtomDropdown01
