'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'
import { PADDING_Y_OPTIONS, CONTAINER_WIDTHS } from '@/types'

const PADDING_Y_LABELS: Record<string, string> = {
  compact: '좁게 (Compact)',
  normal: '보통 (Normal)',
  spacious: '넓게 (Spacious)',
  extraSpacious: '아주 넓게 (Extra Spacious)',
}

const WIDTH_LABELS: Record<string, string> = {
  full: '꽉 차게 (Full)',
  wide: '넓게 (Wide)',
  medium: '보통 (Medium)',
  narrow: '좁게 (Narrow)',
}

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

export default function BackgroundPropertyPanel({ config, handleChange }: Props) {
  const styleData = config.backgroundStyle || {}

  const updateStyle = (key: string, val: any) => {
    handleChange('backgroundStyle', { ...styleData, [key]: val })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">배경 색상</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={styleData.backgroundColor || '#ffffff'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            className="w-8 h-8 rounded border-none cursor-pointer p-0"
          />
          <input
            type="text"
            value={styleData.backgroundColor || ''}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            className="flex-1 text-sm border border-slate-300 rounded-md p-2 uppercase"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">배경 이미지 URL</label>
        <input
          type="text"
          value={styleData.backgroundImage || ''}
          onChange={(e) => updateStyle('backgroundImage', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
          placeholder="https://"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">배경 이미지 투명도</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={styleData.opacity ?? 1}
            onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs text-slate-500 w-8 text-right">
            {Math.round((styleData.opacity ?? 1) * 100)}%
          </span>
        </div>
      </div>

      <div className="h-px bg-slate-200 my-2" />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">상하 여백</label>
        <select
          value={config.paddingY || 'normal'}
          onChange={(e) => handleChange('paddingY', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          {PADDING_Y_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {PADDING_Y_LABELS[opt]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">콘텐츠 가로 폭</label>
        <select
          value={config.containerWidth || 'wide'}
          onChange={(e) => handleChange('containerWidth', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          {CONTAINER_WIDTHS.map((opt) => (
            <option key={opt} value={opt}>
              {WIDTH_LABELS[opt]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
