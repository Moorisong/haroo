'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'

const FONT_OPTIONS = [
  { label: '기본 폰트 (상속)', value: '' },
  { label: 'Pretendard (깔끔한 고딕)', value: 'Pretendard, sans-serif' },
  { label: 'Noto Sans KR (기본 고딕)', value: '"Noto Sans KR", sans-serif' },
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
      {isTitle && (
        <div className="flex flex-col gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">상단 알약 뱃지 선택</label>
            <select
              value={config.badgeText ?? 'NEW'}
              onChange={(e) => handleChange('badgeText', e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-md p-2 bg-white font-medium"
            >
              <option value="none">없음 (뱃지 미노출)</option>
              <option value="NEW">NEW (신규 추천)</option>
              <option value="HOT">HOT (인기 폭발)</option>
              <option value="BEST">BEST (최고 추천)</option>
              <option value="EVENT">EVENT (특별 이벤트)</option>
            </select>
          </div>

          {config.badgeText !== 'none' && config.badgeText !== '없음' && (
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200/60">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-slate-600">뱃지 배경 색상</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={config.badgeColor || '#10b981'}
                    onChange={(e) => handleChange('badgeColor', e.target.value)}
                    className="w-7 h-7 rounded border-none cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={config.badgeColor || ''}
                    onChange={(e) => handleChange('badgeColor', e.target.value)}
                    className="flex-1 text-xs border border-slate-300 rounded p-1.5 uppercase"
                    placeholder="#10B981"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-slate-600">뱃지 글씨 색상</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={config.badgeTextColor || '#ffffff'}
                    onChange={(e) => handleChange('badgeTextColor', e.target.value)}
                    className="w-7 h-7 rounded border-none cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={config.badgeTextColor || ''}
                    onChange={(e) => handleChange('badgeTextColor', e.target.value)}
                    className="flex-1 text-xs border border-slate-300 rounded p-1.5 uppercase"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
