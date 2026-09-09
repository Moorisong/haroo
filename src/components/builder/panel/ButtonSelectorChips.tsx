'use client'

import React from 'react'

interface Props {
  buttons: any[]
  selectedBtnIndex: number
  onSelect: (index: number) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

export default function ButtonSelectorChips({
  buttons,
  selectedBtnIndex,
  onSelect,
  onAdd,
  onRemove,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-600">편집할 버튼 선택</label>
      <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg">
        {buttons.map((btn: any, idx: number) => (
          <button
            key={btn.id || idx}
            onClick={() => onSelect(idx)}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              selectedBtnIndex === idx
                ? 'bg-white text-sky-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>{idx === 0 ? '🔵 주 버튼' : `⚪ 버튼 ${idx + 1}`}</span>
            {buttons.length > 1 && idx > 0 && (
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(idx)
                }}
                className="ml-1 text-slate-400 hover:text-red-500"
              >
                ×
              </span>
            )}
          </button>
        ))}
        {buttons.length < 3 && (
          <button
            onClick={onAdd}
            className="px-2 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50 rounded-md"
          >
            + 추가
          </button>
        )}
      </div>
    </div>
  )
}
