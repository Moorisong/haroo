'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { DeviceViewport } from '@/types'

export default function ViewportSwitcher() {
  const { deviceViewport, setDeviceViewport, isPreviewMode, togglePreviewMode } = useBuilderStore()

  const viewports: { id: DeviceViewport; label: string; icon: string }[] = [
    { id: 'mobile', label: '모바일', icon: '📱' },
    { id: 'tablet', label: '태블릿', icon: '💻' },
    { id: 'desktop', label: '데스크톱', icon: '🖥️' },
  ]

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-white border-b border-slate-200">
      <div className="flex items-center space-x-2">
        {viewports.map((vp) => (
          <button
            key={vp.id}
            onClick={() => setDeviceViewport(vp.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              deviceViewport === vp.id
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            title={vp.label}
          >
            <span className="mr-1">{vp.icon}</span>
            {vp.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center">
        <button
          onClick={togglePreviewMode}
          className={`px-4 py-1.5 text-sm font-bold rounded-md border transition-colors ${
            isPreviewMode
              ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {isPreviewMode ? '편집 모드로 돌아가기' : '미리보기 모드'}
        </button>
      </div>
    </div>
  )
}
