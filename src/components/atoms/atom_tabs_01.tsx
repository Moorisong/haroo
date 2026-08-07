'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  value: string
  label: string
}

export interface TabsProps {
  tabs: TabItem[]
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
}

/**
 * 20종 원자 컴포넌트: atom_tabs_01
 * 언더라인 스타일의 탭 메뉴
 */
const AtomTabs01 = forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultValue, className, onChange }, ref) => {
    const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? '')

    const handleSelect = (value: string) => {
      setActive(value)
      onChange?.(value)
    }

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn('flex border-b border-slate-200 overflow-x-auto', className)}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={active === tab.value}
            onClick={() => handleSelect(tab.value)}
            className={cn(
              'px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px',
              active === tab.value
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
  }
)
AtomTabs01.displayName = 'AtomTabs01'

export default AtomTabs01
