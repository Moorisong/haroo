import React, { useState, useRef } from 'react'
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

type HandleType = 'left' | 'right' | 'top' | 'bottom' | 'tl' | 'tr' | 'bl' | 'br'

export default function BlockResizeHandles({
  instanceId,
  containerWidth = 'wide',
  paddingY = 'normal',
  children,
}: BlockResizeHandlesProps) {
  const { updateBlockInputData } = useBuilderStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const [isResizing, setIsResizing] = useState(false)
  const [activeHandle, setActiveHandle] = useState<HandleType | null>(null)
  const [currentWidthLabel, setCurrentWidthLabel] = useState<string>('')
  const [currentPaddingLabel, setCurrentPaddingLabel] = useState<string>('')

  // 마우스 드래그 핸들러
  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    handle: HandleType
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

    let lastSavedWidth: ContainerWidth = containerWidth
    let lastSavedPadding: PaddingYOption = paddingY

    const onPointerMove = (moveEv: PointerEvent) => {
      // 좌측 핸들 드래그 시 왼쪽으로 이동한 거리만큼 너비가 증가함
      let deltaX = 0
      if (handle === 'right' || handle === 'tr' || handle === 'br') {
        deltaX = (moveEv.clientX - startX) * 2
      } else if (handle === 'left' || handle === 'tl' || handle === 'bl') {
        deltaX = (startX - moveEv.clientX) * 2
      }

      // 상단 핸들 드래그 시 위로 이동한 거리만큼 높이가 증가함
      let deltaY = 0
      if (handle === 'bottom' || handle === 'bl' || handle === 'br') {
        deltaY = moveEv.clientY - startY
      } else if (handle === 'top' || handle === 'tl' || handle === 'tr') {
        deltaY = startY - moveEv.clientY
      }

      let pendingWidthKey: ContainerWidth = lastSavedWidth
      let pendingPaddingKey: PaddingYOption = lastSavedPadding

      // 폭 실시간 반영 로직
      if (handle.includes('left') || handle.includes('right') || handle.includes('t') || handle.includes('b')) {
        const newWidth = Math.max(320, Math.min(1400, startWidth + deltaX))

        if (newWidth < 680) pendingWidthKey = 'narrow'
        else if (newWidth < 1000) pendingWidthKey = 'medium'
        else if (newWidth < 1280) pendingWidthKey = 'wide'
        else pendingWidthKey = 'full'

        const step = WIDTH_STEPS.find((s) => s.key === pendingWidthKey)
        setCurrentWidthLabel(`${Math.round(newWidth)}px (${step?.label || ''})`)
      }

      // 높이/여백 실시간 반영 로직
      if (handle.includes('top') || handle.includes('bottom') || handle.includes('l') || handle.includes('r')) {
        const newHeight = Math.max(100, startHeight + deltaY)
        if (newHeight < 150) pendingPaddingKey = 'compact'
        else if (newHeight < 250) pendingPaddingKey = 'normal'
        else if (newHeight < 380) pendingPaddingKey = 'spacious'
        else pendingPaddingKey = 'extraSpacious'

        const pStep = PADDING_STEPS.find((p) => p.key === pendingPaddingKey)
        setCurrentPaddingLabel(`여백: ${pStep?.label || ''}`)
      }

      // 상태 변경이 있을 경우에만 Zustand Store 라이브 업데이트 (성능 최적화)
      if (pendingWidthKey !== lastSavedWidth || pendingPaddingKey !== lastSavedPadding) {
        updateBlockInputData(instanceId, {
          containerWidth: pendingWidthKey,
          paddingY: pendingPaddingKey,
        })
        lastSavedWidth = pendingWidthKey
        lastSavedPadding = pendingPaddingKey
      }
    }

    const onPointerUp = (upEv: PointerEvent) => {
      setIsResizing(false)
      setActiveHandle(null)
      try {
        (upEv.target as HTMLElement).releasePointerCapture(upEv.pointerId)
      } catch (_) {}

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  // 핸들 UI 컴포넌트 도우미
  const VerticalHandle = ({ type, positionClass }: { type: HandleType, positionClass: string }) => (
    <div
      onPointerDown={(e) => handlePointerDown(e, type)}
      className={`absolute ${positionClass} z-40 w-6 h-12 flex items-center justify-center cursor-ew-resize opacity-0 group-hover/resize:opacity-100 transition-opacity`}
      title="가로 폭 리사이즈"
    >
      <div className="w-2.5 h-8 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:scale-110 active:scale-125 transition-transform flex items-center justify-center">
        <div className="w-0.5 h-3 bg-indigo-600 rounded-full" />
      </div>
    </div>
  )

  const HorizontalHandle = ({ type, positionClass }: { type: HandleType, positionClass: string }) => (
    <div
      onPointerDown={(e) => handlePointerDown(e, type)}
      className={`absolute ${positionClass} z-40 w-12 h-6 flex items-center justify-center cursor-ns-resize opacity-0 group-hover/resize:opacity-100 transition-opacity`}
      title="상하 여백 리사이즈"
    >
      <div className="h-2.5 w-8 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:scale-110 active:scale-125 transition-transform flex items-center justify-center">
        <div className="h-0.5 w-3 bg-indigo-600 rounded-full" />
      </div>
    </div>
  )

  const CornerHandle = ({ type, positionClass, cursor }: { type: HandleType, positionClass: string, cursor: string }) => (
    <div
      onPointerDown={(e) => handlePointerDown(e, type)}
      className={`absolute ${positionClass} z-40 w-6 h-6 flex items-center justify-center ${cursor} opacity-0 group-hover/resize:opacity-100 transition-opacity`}
      title="가로/세로 동시 리사이즈"
    >
      <div className="w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full shadow-md hover:scale-125 active:scale-150 transition-transform" />
    </div>
  )

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

      {/* 상하좌우 및 모서리 핸들 */}
      <VerticalHandle type="left" positionClass="top-1/2 -left-3 -translate-y-1/2" />
      <VerticalHandle type="right" positionClass="top-1/2 -right-3 -translate-y-1/2" />
      
      <HorizontalHandle type="top" positionClass="-top-3 left-1/2 -translate-x-1/2" />
      <HorizontalHandle type="bottom" positionClass="-bottom-3 left-1/2 -translate-x-1/2" />

      <CornerHandle type="tl" positionClass="-top-2 -left-2" cursor="cursor-nwse-resize" />
      <CornerHandle type="tr" positionClass="-top-2 -right-2" cursor="cursor-nesw-resize" />
      <CornerHandle type="bl" positionClass="-bottom-2 -left-2" cursor="cursor-nesw-resize" />
      <CornerHandle type="br" positionClass="-bottom-2 -right-2" cursor="cursor-nwse-resize" />
    </div>
  )
}
