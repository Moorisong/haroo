'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

export default function VideoPropertyPanel({ config, handleChange }: Props) {
  const videoUrl = config.videoUrl || ''

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">영상 링크 (URL)</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => handleChange('videoUrl', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          placeholder="예: https://www.youtube.com/watch?v=..."
        />
        <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
          유튜브 영상 주소를 넣으면 화면에 바로 연결됩니다. (일부공개 영상도 지원)
        </p>
      </div>

      {videoUrl && (
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">등록된 영상 연결 상태</span>
            <button
              type="button"
              onClick={() => handleChange('videoUrl', '')}
              className="text-[11px] text-rose-600 hover:underline font-medium"
            >
              URL 지우기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
