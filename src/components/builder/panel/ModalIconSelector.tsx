'use client'

import React from 'react'
import {
  Ban,
  Info,
  Bell,
  CheckCircle2,
  Sparkles,
  Gift,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react'

export interface ModalIconItem {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  bg: string
  text: string
  border: string
}

export const MODAL_ICON_LIST: ModalIconItem[] = [
  { id: 'none', label: '아이콘 없음', icon: Ban, bg: 'bg-slate-100', text: 'text-slate-400', border: 'border-slate-300' },
  { id: 'info', label: '안내', icon: Info, bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  { id: 'bell', label: '공지', icon: Bell, bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200' },
  { id: 'check', label: '완료/성공', icon: CheckCircle2, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  { id: 'sparkles', label: '이벤트/혜택', icon: Sparkles, bg: 'bg-amber-50', text: 'text-amber-500', border: 'border-amber-200' },
  { id: 'gift', label: '쿠폰/선물', icon: Gift, bg: 'bg-pink-50', text: 'text-pink-500', border: 'border-pink-200' },
  { id: 'alert', label: '주의/규칙', icon: AlertTriangle, bg: 'bg-rose-50', text: 'text-rose-500', border: 'border-rose-200' },
  { id: 'help', label: '도움말/FAQ', icon: HelpCircle, bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
]

interface ModalIconSelectorProps {
  selectedId?: string
  onChange: (id: string) => void
}

export default function ModalIconSelector({ selectedId = 'none', onChange }: ModalIconSelectorProps) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-700 block mb-2">팝업 상단 아이콘</label>
      <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 no-scrollbar">
        {MODAL_ICON_LIST.map(({ id, label, icon: IconComponent, bg, text, border }) => {
          const isSelected = (selectedId || 'none') === id
          return (
            <button
              key={id}
              type="button"
              title={label}
              aria-label={label}
              onClick={() => onChange(id)}
              className={`relative flex-shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                isSelected
                  ? `ring-2 ring-slate-900 border-2 border-white shadow-md scale-105 ${bg} ${text}`
                  : `border ${border} ${bg} ${text} opacity-70 hover:opacity-100 hover:scale-105`
              }`}
            >
              <IconComponent size={17} className="stroke-[2.2]" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
