'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'

const FONT_OPTIONS = [
  { label: '기본 폰트 (상속)', value: '' },
  { label: 'Pretendard (깔끔한 고딕)', value: 'Pretendard, sans-serif' },
  { label: 'Noto Sans KR (기본 고딕)', value: '"Noto Sans KR", sans-serif' },
  { label: 'Gmarket Sans (특징 있는 고딕)', value: '"Gmarket Sans", sans-serif' },
  { label: 'Noto Serif KR (기본 명조)', value: '"Noto Serif KR", serif' },
  { label: 'Nanum Myeongjo (나눔 명조)', value: '"Nanum Myeongjo", serif' },
]

const WEIGHT_OPTIONS = [
  { label: '기본', value: '' },
  { label: '얇게 (300)', value: '300' },
  { label: '보통 (400)', value: '400' },
  { label: '중간 (500)', value: '500' },
  { label: '굵게 (700)', value: '700' },
  { label: '매우 굵게 (900)', value: '900' },
]

interface Props {
  elementKey: string
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

export default function TextPropertyPanel({ elementKey, config, handleChange }: Props) {
  // elementKey에 따라 titleStyle 또는 subtitleStyle을 사용
  const isTitle = elementKey === 'title'
  const styleKey = isTitle ? 'titleStyle' : 'subtitleStyle'
  const contentKey = isTitle ? 'title' : 'subtitle'
  const styleData = config[styleKey] || {}

  const updateStyle = (key: string, val: string) => {
    handleChange(styleKey, { ...styleData, [key]: val })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">{isTitle ? '제목 내용' : '부제목 내용'}</label>
        <textarea
          value={config[contentKey] || ''}
          onChange={(e) => handleChange(contentKey, e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2 min-h-[80px]"
          placeholder="텍스트를 입력하세요"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">폰트 종류 (웹 폰트)</label>
        <select
          value={styleData.fontFamily || ''}
          onChange={(e) => updateStyle('fontFamily', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          {FONT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">폰트 두께</label>
        <select
          value={styleData.fontWeight || ''}
          onChange={(e) => updateStyle('fontWeight', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          {WEIGHT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">텍스트 크기 (pt)</label>
        <select
          value={styleData.fontSize || ''}
          onChange={(e) => updateStyle('fontSize', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="">기본 크기</option>
          {Array.from({ length: 41 }, (_, i) => i + 10).map((pt) => (
            <option key={pt} value={`${pt}pt`}>
              {pt}pt
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">텍스트 색상</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={styleData.color || '#000000'}
            onChange={(e) => updateStyle('color', e.target.value)}
            className="w-8 h-8 rounded border-none cursor-pointer p-0"
          />
          <input
            type="text"
            value={styleData.color || ''}
            onChange={(e) => updateStyle('color', e.target.value)}
            className="flex-1 text-sm border border-slate-300 rounded-md p-2 uppercase"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  )
}
