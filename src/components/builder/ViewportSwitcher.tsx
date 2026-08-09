'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { DeviceViewport } from '@/types'
import { Play, Pencil, Sparkles } from 'lucide-react'

export default function ViewportSwitcher() {
  const {
    projectType,
    deviceViewport,
    setDeviceViewport,
    isPreviewMode,
    togglePreviewMode,
  } = useBuilderStore()

  const viewports: { id: DeviceViewport; label: string; icon: string }[] = [
    { id: 'desktop', label: '데스크톱', icon: '🖥️' },
    { id: 'tablet', label: '태블릿', icon: '💻' },
    { id: 'mobile', label: '모바일', icon: '📱' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4 py-2 bg-white border-b border-slate-200 gap-2 shrink-0 z-10">
      <div className="flex items-center space-x-3">
        {/* 확정된 프로젝트 모드 표시 뱃지 */}
        <div className="flex items-center px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm">
          <span className="mr-1.5">{projectType === 'PWA' ? '📱' : '🌐'}</span>
          {projectType === 'PWA' ? 'PWA 모바일 앱 모드' : '반응형 웹사이트 모드'}
        </div>

        {/* 뷰포트 전환 (웹 모드일 때만 표출) */}
        {projectType === 'WEB' && (
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
                {vp.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* 초보 유저 친화적 눈에 띄는 동작 테스트 / 편집 전환 버튼 */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePreviewMode}
          className={`relative group flex items-center gap-2 px-4 py-1.5 text-xs font-extrabold rounded-xl transition-all duration-300 shadow-md transform hover:-translate-y-0.5 active:translate-y-0 ${
            isPreviewMode
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/50'
              : 'bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white ring-2 ring-indigo-300/50 animate-pulse hover:animate-none'
          }`}
        >
          {isPreviewMode ? (
            <>
              <Pencil className="w-3.5 h-3.5" />
              <span>다시 화면 편집하기</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>사이트 동작 테스트 하기</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
