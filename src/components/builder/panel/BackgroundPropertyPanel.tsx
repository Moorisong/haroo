'use client'

import React, { useRef } from 'react'
import type { BlockInputConfig } from '@/types'
import { PADDING_Y_OPTIONS } from '@/types'

const PADDING_Y_LABELS: Record<string, string> = {
  compact: '좁게',
  normal: '보통',
  spacious: '넓게',
  extraSpacious: '아주 넓게',
}

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

export default function BackgroundPropertyPanel({ config, handleChange }: Props) {
  const styleData = config.backgroundStyle || {}
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bgType = styleData.bgType || (styleData.backgroundImage ? 'image' : 'color')

  const updateStyle = (updates: Record<string, any>) => {
    handleChange('backgroundStyle', { ...styleData, ...updates })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          updateStyle({ backgroundImage: result, bgType: 'image' })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* 1. 배경 유형 선택 (단색 vs 배경 이미지) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">배경 유형</label>
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            className={`py-1.5 text-xs font-medium rounded-md transition-all ${
              bgType === 'color'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            onClick={() => updateStyle({ bgType: 'color' })}
          >
            단색 색상
          </button>
          <button
            type="button"
            className={`py-1.5 text-xs font-medium rounded-md transition-all ${
              bgType === 'image'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            onClick={() => updateStyle({ bgType: 'image' })}
          >
            배경 사진
          </button>
        </div>
      </div>

      {/* 2. 단색 색상 선택 모드 */}
      {bgType === 'color' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">배경 색상</label>
          <div className="flex gap-2 items-center min-w-0">
            <input
              type="color"
              value={styleData.backgroundColor || '#ffffff'}
              onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={styleData.backgroundColor || ''}
              onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
              className="w-full min-w-0 text-sm border border-slate-300 rounded-md p-2 uppercase font-mono"
              placeholder="#ffffff"
            />
          </div>
        </div>
      )}

      {/* 3. 배경 이미지 선택 모드 */}
      {bgType === 'image' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              내 컴퓨터에서 이미지 선택
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-700">배경 사진 투명도</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={styleData.opacity ?? 1}
                onChange={(e) => updateStyle({ opacity: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <span className="text-xs text-slate-500 w-8 text-right">
                {Math.round((styleData.opacity ?? 1) * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="h-px bg-slate-200 my-1" />

      {/* 4. 상하 여백 옵션 */}
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
    </div>
  )
}

