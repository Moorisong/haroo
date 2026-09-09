'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { DeviceViewport } from '@/types'
import { Play, Pencil, Monitor, Tablet, Smartphone } from 'lucide-react'

export default function ViewportSwitcher() {
  const {
    projectType,
    deviceViewport,
    setDeviceViewport,
    isPreviewMode,
    togglePreviewMode,
  } = useBuilderStore()

  const viewports: { id: DeviceViewport; label: string; icon: React.ElementType }[] = [
    { id: 'desktop', label: '데스크톱', icon: Monitor },
    { id: 'tablet', label: '태블릿', icon: Tablet },
    { id: 'mobile', label: '모바일', icon: Smartphone },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4 py-2 bg-white border-b border-slate-200 gap-2 shrink-0 z-10">
      <div className="flex items-center space-x-3">
        {/* 뷰포트 전환 (웹 모드일 때만 표출) */}
        {projectType === 'WEB' ? (
          <div className="flex items-center space-x-1">
            {viewports.map((vp) => {
              const Icon = vp.icon
              const isActive = deviceViewport === vp.id
              return (
                <button
                  key={vp.id}
                  onClick={() => setDeviceViewport(vp.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  title={vp.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{vp.label}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            <Smartphone className="w-3.5 h-3.5 text-slate-600" />
            <span>PWA 모바일 전용 뷰</span>
          </div>
        )}
      </div>

      {/* 미리보기 / 편집모드 전환 버튼: 웹사이트 제작 시 태블릿/모바일 뷰포트에서는 숨김 */}
      {!(projectType === 'WEB' && deviceViewport !== 'desktop') && (
        <div className="flex items-center gap-2">
          <button
            onClick={togglePreviewMode}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow-xs ${
              isPreviewMode
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isPreviewMode ? (
              <>
                <Pencil className="w-3.5 h-3.5" />
                <span>편집하기</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>동작 테스트 하기</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
