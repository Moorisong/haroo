'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { DeviceViewport } from '@/types'

export default function ViewportSwitcher() {
  const {
    projectType,
    deviceViewport,
    setDeviceViewport,
    isPreviewMode,
    togglePreviewMode,
  } = useBuilderStore()

  const viewports: { id: DeviceViewport; label: string; icon: string }[] = [
    { id: 'mobile', label: '모바일', icon: '📱' },
    { id: 'tablet', label: '태블릿', icon: '💻' },
    { id: 'desktop', label: '데스크톱', icon: '🖥️' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4 py-2 bg-white border-b border-slate-200 gap-2 shrink-0 z-10">
      <div className="flex items-center space-x-3">
        {/* 확정된 프로젝트 모드 표시 뱃지 */}
        <div className="flex items-center px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm">
          <span className="mr-1.5">{projectType === 'PWA' ? '📱' : '🌐'}</span>
          {projectType === 'PWA' ? 'PWA 모바일 앱 모드' : '반응형 웹사이트 모드'}
        </div>

        {/* 뷰포트 전환 (웹 모드일 때만 표출, PWA 모드일 땐 완전히 숨김) */}
        {projectType === 'WEB' ? (
          <div className="hidden sm:flex items-center space-x-1 pl-2 border-l border-slate-200">
            {viewports.map((vp) => (
              <button
                key={vp.id}
                onClick={() => setDeviceViewport(vp.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  deviceViewport === vp.id
                    ? 'bg-sky-600 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title={vp.label}
              >
                <span className="mr-1">{vp.icon}</span>
                {vp.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center pl-2 border-l border-slate-200">
            <span className="text-xs text-slate-500 font-medium">
              모바일 전용 단독 앱 화면 (375px)
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center">
        <button
          onClick={togglePreviewMode}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-md border transition-colors ${
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
