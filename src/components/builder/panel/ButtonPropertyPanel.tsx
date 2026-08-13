'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'
import type { BlockCapability } from '../SidePropertyPanel'
import { ACTION_OPTIONS } from './constants'

const ACTION_TYPE_OPTIONS = Object.entries(ACTION_OPTIONS).map(([value, label]) => ({ value, label }))

interface Props {
  cap: BlockCapability
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

export default function ButtonPropertyPanel({ cap, config, handleChange }: Props) {
  const styleData = config.buttonStyle || {}

  const updateStyle = (key: string, val: string) => {
    handleChange('buttonStyle', { ...styleData, [key]: val })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">버튼 문구</label>
        <input
          type="text"
          value={config.buttonText || ''}
          onChange={(e) => handleChange('buttonText', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
          placeholder="예: 신청하기, 더 알아보기"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">버튼 액션 (클릭 시 동작)</label>
        <select
          value={config.actionType || ''}
          onChange={(e) => handleChange('actionType', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="">-- 동작을 선택하세요 --</option>
          {ACTION_TYPE_OPTIONS.filter((opt) => cap.allowedActions?.includes(opt.value)).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">연결할 링크 (URL)</label>
        <input
          type="text"
          value={config.buttonLink || ''}
          onChange={(e) => handleChange('buttonLink', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
          placeholder="https://"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700">배경 색상</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={styleData.backgroundColor || '#0f172a'}
              onChange={(e) => updateStyle('backgroundColor', e.target.value)}
              className="w-8 h-8 rounded border-none cursor-pointer p-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700">글씨 색상</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={styleData.textColor || '#ffffff'}
              onChange={(e) => updateStyle('textColor', e.target.value)}
              className="w-8 h-8 rounded border-none cursor-pointer p-0"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">모서리 둥글기</label>
        <select
          value={styleData.borderRadius || ''}
          onChange={(e) => updateStyle('borderRadius', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="">기본</option>
          <option value="0">각지게 (0px)</option>
          <option value="0.375rem">살짝 둥글게 (sm)</option>
          <option value="0.75rem">둥글게 (xl)</option>
          <option value="9999px">완전 둥글게 (알약)</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">폰트 두께</label>
        <select
          value={styleData.fontWeight || ''}
          onChange={(e) => updateStyle('fontWeight', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="">기본</option>
          <option value="400">보통</option>
          <option value="700">굵게</option>
          <option value="900">매우 굵게</option>
        </select>
      </div>
    </div>
  )
}
