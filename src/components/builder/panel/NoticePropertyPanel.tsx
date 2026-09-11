'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (fieldOrData: string | Record<string, any>, value?: any) => void
}

const DEFAULT_FEATURES = [
  { icon: '✉️', text: '월 100건 무료 발송 (초과 시 LMS 자동 전환)' },
  { icon: '⚡', text: '이벤트 및 조건 충족 시 즉시 자동 발송' },
  { icon: '📋', text: '메시지 템플릿 커스터마이징 지원' },
]

export default function NoticePropertyPanel({ config, handleChange }: Props) {
  const features = config.noticeFeatures && config.noticeFeatures.length > 0
    ? config.noticeFeatures
    : DEFAULT_FEATURES

  const handleUpdateItem = (index: number, field: 'icon' | 'text', value: string) => {
    const updated = features.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value }
      }
      return item
    })
    handleChange('noticeFeatures', updated)
  }

  const handleAddItem = () => {
    const updated = [
      ...features,
      { icon: '✨', text: '새로운 안내 항목을 입력하세요.' },
    ]
    handleChange('noticeFeatures', updated)
  }

  const handleDeleteItem = (index: number) => {
    if (features.length <= 1) return
    const updated = features.filter((_, idx) => idx !== index)
    handleChange('noticeFeatures', updated)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">안내 항목 리스트 ({features.length}개)</label>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-bold px-2 py-1 rounded hover:bg-sky-50 transition-colors"
        >
          <Plus size={14} />
          <span>항목 추가</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">항목 #{idx + 1}</span>
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                  title="항목 삭제"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <div className="w-14 shrink-0 flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">아이콘</label>
                <input
                  type="text"
                  value={item.icon || ''}
                  onChange={(e) => handleUpdateItem(idx, 'icon', e.target.value)}
                  className="w-full text-center text-base border border-slate-300 rounded-md p-1.5 bg-white"
                  placeholder="✉️"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-[10px] text-slate-400 font-medium">내용 문구</label>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleUpdateItem(idx, 'text', e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-md p-2 bg-white"
                  placeholder="안내 문구를 입력하세요"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">
        💡 이모지나 아이콘 문자와 함께 카드에 노출할 안내 항목을 자유롭게 편집하세요.
      </p>
    </div>
  )
}
