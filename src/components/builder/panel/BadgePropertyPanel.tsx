'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

export default function BadgePropertyPanel({ config, handleChange }: Props) {
  const badgeText = config.badgeText ?? 'NEW'
  const isNone = badgeText === 'none' || badgeText === '없음'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">상단 알약 뱃지 예시 선택</label>
          <select
            value={isNone ? 'none' : ['NEW', 'HOT', 'EVENT', '공지'].includes(badgeText) ? badgeText : 'custom'}
            onChange={(e) => {
              if (e.target.value === 'custom') return
              handleChange('badgeText', e.target.value)
            }}
            className="w-full text-sm border border-slate-300 rounded-md p-2 bg-white font-medium"
          >
            <option value="none">없음</option>
            <option value="공지">공지</option>
            <option value="NEW">NEW</option>
            <option value="HOT">HOT</option>
            <option value="EVENT">EVENT</option>
            {!isNone && !['NEW', 'HOT', 'EVENT', '공지'].includes(badgeText) && (
              <option value="custom">직접 입력 중...</option>
            )}
          </select>
        </div>

        {!isNone && (
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">뱃지 문구 직접 입력</label>
              <span className="text-[11px] text-slate-400 font-medium">
                ({(badgeText || '').length}/5자)
              </span>
            </div>
            <input
              type="text"
              maxLength={5}
              value={badgeText === 'none' ? '' : badgeText}
              onChange={(e) => handleChange('badgeText', e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-md p-2 bg-white font-medium placeholder:text-slate-400"
              placeholder="최대 5자 입력 (예: SALE)"
            />
          </div>
        )}

        {config.badgeText !== 'none' && config.badgeText !== '없음' && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
            <div className="flex flex-col gap-1 min-w-0">
              <label className="text-[11px] font-semibold text-slate-600 truncate">뱃지 배경 색상</label>
              <div className="flex gap-1.5 items-center min-w-0">
                <input
                  type="color"
                  value={config.badgeColor || '#10b981'}
                  onChange={(e) => handleChange('badgeColor', e.target.value)}
                  className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0 shrink-0 bg-transparent"
                />
                <input
                  type="text"
                  value={config.badgeColor || ''}
                  onChange={(e) => handleChange('badgeColor', e.target.value)}
                  className="w-full min-w-0 text-[11px] border border-slate-300 rounded px-1.5 py-1 uppercase text-slate-700 font-mono"
                  placeholder="#10B981"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <label className="text-[11px] font-semibold text-slate-600 truncate">뱃지 글씨 색상</label>
              <div className="flex gap-1.5 items-center min-w-0">
                <input
                  type="color"
                  value={config.badgeTextColor || '#ffffff'}
                  onChange={(e) => handleChange('badgeTextColor', e.target.value)}
                  className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0 shrink-0 bg-transparent"
                />
                <input
                  type="text"
                  value={config.badgeTextColor || ''}
                  onChange={(e) => handleChange('badgeTextColor', e.target.value)}
                  className="w-full min-w-0 text-[11px] border border-slate-300 rounded px-1.5 py-1 uppercase text-slate-700 font-mono"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
