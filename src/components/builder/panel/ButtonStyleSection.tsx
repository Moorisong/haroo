'use client'

import React from 'react'

interface Props {
  styleData: Record<string, any>
  updateStyle: (key: string, val: string) => void
}

export default function ButtonStyleSection({ styleData, updateStyle }: Props) {
  return (
    <>
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
        <label className="text-xs font-semibold text-slate-700">버튼 크기 (폰트 크기 비례)</label>
        <select
          value={styleData.size || 'lg'}
          onChange={(e) => updateStyle('size', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="sm">작게</option>
          <option value="md">보통</option>
          <option value="lg">크게</option>
          <option value="xl">아주 크게</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">모서리 둥글기</label>
        <select
          value={styleData.borderRadius ?? '0'}
          onChange={(e) => updateStyle('borderRadius', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="0">각지게</option>
          <option value="0.375rem">살짝 둥글게</option>
          <option value="0.75rem">둥글게</option>
          <option value="9999px">완전 둥글게</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">폰트 두께</label>
        <select
          value={styleData.fontWeight || '700'}
          onChange={(e) => updateStyle('fontWeight', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="400">보통</option>
          <option value="700">굵게</option>
          <option value="900">매우 굵게</option>
        </select>
      </div>
    </>
  )
}
