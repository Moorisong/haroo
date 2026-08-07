'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

/**
 * 20종 원자 컴포넌트: atom_accordion_01
 * FAQ 및 접이식 콘텐츠용 아코디언
 */
const AtomAccordion01 = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, className }, ref) => {
    const [openId, setOpenId] = useState<string | null>(null)

    return (
      <div ref={ref} className={cn('w-full divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden', className)}>
        {items.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id}>
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-slate-800 pr-4">{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn('flex-shrink-0 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed bg-slate-50">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
AtomAccordion01.displayName = 'AtomAccordion01'

export default AtomAccordion01
