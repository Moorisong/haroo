'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { ContainerWidth, PaddingYOption } from '@/types'

interface BlockResizeHandlesProps {
  instanceId: string
  containerWidth?: ContainerWidth
  paddingY?: PaddingYOption
  children: React.ReactNode
}

const WIDTH_STEPS: { key: ContainerWidth; label: string; maxPx: number }[] = [
  { key: 'narrow', label: '좁음', maxPx: 576 },
  { key: 'medium', label: '보통', maxPx: 896 },
  { key: 'wide',   label: '넓음', maxPx: 1152 },
  { key: 'full',   label: '꽉참', maxPx: 1400 },
]

const PADDING_STEPS: { key: PaddingYOption; label: string }[] = [
  { key: 'compact',       label: '작게' },
  { key: 'normal',        label: '보통' },
  { key: 'spacious',      label: '넓게' },
  { key: 'extraSpacious', label: '특대' },
]

export default function BlockResizeHandles({
  instanceId,
  containerWidth = 'wide',
  paddingY = 'normal',
  children,
}: BlockResizeHandlesProps) {
  const { updateBlockInputData } = useBuilderStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const [isResizing, setIsResizing] = useState(false)
  const [activeHandle, setActiveHandle] = useState<'right' | 'bottom' | 'corner' | null>(null)
  const [dragPxWidth, setDragPxWidth] = useState<number | null>(null)
  const [currentWidthLabel, setCurrentWidthLabel] = useState<string>('')
  const [currentPaddingLabel, setCurrentPaddingLabel] = useState<string>('')

  // 마우스 드래그 핸들러
  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    handle: 'right' | 'bottom' | 'corner'
  ) => {
    e.stopPropagation()
    e.preventDefault()

    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = rect.width
    const startHeight = rect.height

    setIsResizing(true)
    setActiveHandle(handle);
    (e.target as HTMLElement).setPointerCapture(e.pointerId)

    let pendingWidthKey: ContainerWidth = containerWidth
    let pendingPaddingKey: PaddingYOption = paddingY

    const onPointerMove = (moveEv: PointerEvent) => {
      const deltaX = (moveEv.clientX - startX) * 2 // 센터 정렬이므로 양방향 유효 폭 2배
      const deltaY = moveEv.clientY - startY

      if (handle === 'right' || handle === 'corner') {
        const newWidth = Math.max(320, Math.min(1400, startWidth + deltaX))
        setDragPxWidth(newWidth)

        // 가장 가까운 Width 단계 계산
        if (newWidth < 680) pendingWidthKey = 'narrow'
        else if (newWidth < 1000) pendingWidthKey = 'medium'
        else if (newWidth < 1280) pendingWidthKey = 'wide'
        else pendingWidthKey = 'full'

        const step = WIDTH_STEPS.find((s) => s.key === pendingWidthKey)
        setCurrentWidthLabel(`${Math.round(newWidth)}px (${step?.label || ''})`)
      }

      if (handle === 'bottom' || handle === 'corner') {
        const newHeight = Math.max(100, startHeight + deltaY)
        if (newHeight < 150) pendingPaddingKey = 'compact'
        else if (newHeight < 250) pendingPaddingKey = 'normal'
        else if (newHeight < 380) pendingPaddingKey = 'spacious'
        else pendingPaddingKey = 'extraSpacious'

        const pStep = PADDING_STEPS.find((p) => p.key === pendingPaddingKey)
        setCurrentPaddingLabel(`여백: ${pStep?.label || ''}`)
      }
    }

    const onPointerUp = (upEv: PointerEvent) => {
      setIsResizing(false)
      setActiveHandle(null)
      setDragPxWidth(null)
      try {
        (upEv.target as HTMLElement).releasePointerCapture(upEv.pointerId)
      } catch (_) {}

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      // 드래그 완료 후 Zustand store에 최종 스냅 레이아웃 설정 반영
      updateBlockInputData(instanceId, {
        containerWidth: pendingWidthKey,
        paddingY: pendingPaddingKey,
      })
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  return (
    <div ref={containerRef} className="relative group/resize w-full">
      {/* 캔버스 드래그 리사이징 중 가이드 툴팁 */}
      {isResizing && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2">
          <span>📏</span>
          {currentWidthLabel && <span>{currentWidthLabel}</span>}
          {currentPaddingLabel && <span className="opacity-80">| {currentPaddingLabel}</span>}
        </div>
      )}

      {/* 실시간 드래그 중 영역 파란 가이드선 */}
      {isResizing && (
        <div className="absolute inset-0 border-2 border-indigo-500 border-dashed pointer-events-none z-40 rounded-sm" />
      )}

      {/* 블록 콘텐츠 원본 */}
      {children}

      {/* ─────────────────────────────────────────────────────────────
          마우스 직접 드래그 리사이징 핸들 (우측 / 하단 / 코너)
          ───────────────────────────────────────────────────────────── */}
      
      {/* 1. 우측 핸들 (가로 폭 조절) */}
      <div
        onPointerDown={(e) => handlePointerDown(e, 'right')}
        className="absolute top-1/2 -right-3 -translate-y-1/2 z-40 w-6 h-12 flex items-center justify-center cursor-ew-resize opacity-0 group-hover/resize:opacity-100 transition-opacity"
        title="드래그하여 가로 폭 리사이즈"
      >
        <div className="w-2.5 h-8 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:scale-110 active:scale-125 transition-transform flex items-center justify-center">
          <div className="w-0.5 h-3 bg-indigo-600 rounded-full" />
        </div>
      </div>

      {/* 2. 하단 핸들 (상하 여백/높이 조절) */}
      <div
        onPointerDown={(e) => handlePointerDown(e, 'bottom')}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-40 w-12 h-6 flex items-center justify-center cursor-ns-resize opacity-0 group-hover/resize:opacity-100 transition-opacity"
        title="드래그하여 상하 여백 리사이즈"
      >
        <div className="h-2.5 w-8 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:scale-110 active:scale-125 transition-transform flex items-center justify-center">
          <div className="h-0.5 w-3 bg-indigo-600 rounded-full" />
        </div>
      </div>

      {/* 3. 우측 하단 코너 핸들 (대각선 동시 조절) */}
      <div
        onPointerDown={(e) => handlePointerDown(e, 'corner')}
        className="absolute -bottom-2 -right-2 z-40 w-6 h-6 flex items-center justify-center cursor-nwse-resize opacity-0 group-hover/resize:opacity-100 transition-opacity"
        title="대각선 드래그하여 가로/세로 동시 리사이즈"
      >
        <div className="w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full shadow-md hover:scale-125 active:scale-150 transition-transform" />
      </div>
    </div>
  )
}
