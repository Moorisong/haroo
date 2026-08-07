import React, { useState, useRef } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { ContainerWidth, PaddingYOption } from '@/types'

interface BlockResizeHandlesProps {
  instanceId: string
  isSelected?: boolean
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
  isSelected = false,
  containerWidth = 'wide',
  paddingY = 'normal',
  customWidthPx,
  customPaddingYPx,
  children,
}: BlockResizeHandlesProps & { customWidthPx?: number, customPaddingYPx?: number }) {
  const { updateBlockInputData } = useBuilderStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const [isResizing, setIsResizing] = useState(false)
  const [activeHandle, setActiveHandle] = useState<HandleType | null>(null)
  const [currentWidthLabel, setCurrentWidthLabel] = useState<string>('')
  const [currentPaddingLabel, setCurrentPaddingLabel] = useState<string>('')

  // 실제 픽셀값 변환 맵 (커스텀 값이 없을 때의 기준점)
  const PADDING_Y_PIXELS: Record<PaddingYOption, number> = {
    compact: 24,
    normal: 40,
    spacious: 64,
    extraSpacious: 80,
  }

  // 현재 최대 폭 (커스텀 픽셀이 있으면 커스텀, 없으면 스냅 폭)
  const baseMaxPx = WIDTH_STEPS.find((s) => s.key === containerWidth)?.maxPx || 1152
  const currentMaxPx = customWidthPx || baseMaxPx
  const handleOffset = currentMaxPx / 2

  // 마우스 드래그 핸들러
  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    handle: HandleType
  ) => {
    // 이벤트 전파 및 기본 동작 완벽 차단 (DND 충돌 및 스크롤 방지)
    e.stopPropagation()
    e.preventDefault()
    e.nativeEvent.stopPropagation()

    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()

    const startX = e.clientX
    const startY = e.clientY
    
    // 드래그 시작 시점의 기준 폭과 여백
    const startWidth = Math.min(rect.width, currentMaxPx)
    const startPadding = customPaddingYPx ?? PADDING_Y_PIXELS[paddingY]

    setIsResizing(true)
    setActiveHandle(handle);
    
    const target = e.target as HTMLElement
    try {
      target.setPointerCapture(e.pointerId)
    } catch (_) {}

    let lastSavedPx = currentMaxPx
    let lastSavedPadding = startPadding

    const onPointerMove = (moveEv: PointerEvent) => {
      // DnD 등 타 이벤트 개입 원천 차단
      moveEv.stopPropagation()

      let deltaX = 0
      if (handle === 'right' || handle === 'tr' || handle === 'br') {
        deltaX = (moveEv.clientX - startX) * 2
      } else if (handle === 'left' || handle === 'tl' || handle === 'bl') {
        deltaX = (startX - moveEv.clientX) * 2
      }

      let deltaY = 0
      if (handle === 'bottom' || handle === 'bl' || handle === 'br') {
        deltaY = moveEv.clientY - startY
      } else if (handle === 'top' || handle === 'tl' || handle === 'tr') {
        deltaY = startY - moveEv.clientY
      }

      let newWidth = lastSavedPx
      let newPadding = lastSavedPadding

      if (handle.includes('left') || handle.includes('right') || handle.includes('t') || handle.includes('b')) {
        newWidth = Math.max(320, Math.min(1400, startWidth + deltaX))
        setCurrentWidthLabel(`${Math.round(newWidth)}px`)
      }

      if (handle.includes('top') || handle.includes('bottom') || handle.includes('l') || handle.includes('r')) {
        // 총 드래그 거리를 상하 각각의 패딩 증분으로 분할
        newPadding = Math.max(0, startPadding + (deltaY / 2))
        setCurrentPaddingLabel(`${Math.round(newPadding)}px`)
      }

      // 상태 변경이 있을 경우에만 Zustand Store 라이브 업데이트 (최적화)
      if (Math.abs(newWidth - lastSavedPx) > 1 || Math.abs(newPadding - lastSavedPadding) > 1) {
        updateBlockInputData(instanceId, {
          customWidthPx: Math.round(newWidth),
          customPaddingYPx: Math.round(newPadding),
        })
        lastSavedPx = newWidth
        lastSavedPadding = newPadding
      }
    }

    const onPointerUp = (upEv: PointerEvent) => {
      upEv.stopPropagation()
      setIsResizing(false)
      setActiveHandle(null)
      try {
        target.releasePointerCapture(upEv.pointerId)
      } catch (_) {}

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  // 핸들 UI 컴포넌트 도우미
  const VerticalHandle = ({ type, positionClass, style }: { type: HandleType, positionClass: string, style?: React.CSSProperties }) => (
    <div
      onPointerDown={(e) => handlePointerDown(e, type)}
      className={`absolute ${positionClass} z-40 w-6 h-12 flex items-center justify-center cursor-ew-resize opacity-0 group-hover/resize:opacity-100 transition-opacity`}
      style={style}
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

  const CornerHandle = ({ type, positionClass, cursor, style }: { type: HandleType, positionClass: string, cursor: string, style?: React.CSSProperties }) => (
    <div
      onPointerDown={(e) => handlePointerDown(e, type)}
      className={`absolute ${positionClass} z-40 w-6 h-6 flex items-center justify-center ${cursor} opacity-0 group-hover/resize:opacity-100 transition-opacity`}
      style={style}
      title="가로/세로 동시 리사이즈"
    >
      <div className="w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full shadow-md hover:scale-125 active:scale-150 transition-transform" />
    </div>
  )

  return (
    <div ref={containerRef} id={`block-resize-${instanceId}`} className="relative group/resize w-full flex justify-center">
      {/* 커스텀 픽셀 폭/높이 CSS 오버라이드 (실시간 리사이징 적용) */}
      <style>{`
        #block-resize-${instanceId} > div:first-of-type {
          max-width: ${currentMaxPx}px !important; 
          margin-left: auto; 
          margin-right: auto;
        }
        ${customPaddingYPx ? `
        #block-resize-${instanceId} [class*="py-"] {
          padding-top: ${customPaddingYPx}px !important; 
          padding-bottom: ${customPaddingYPx}px !important;
        }
        ` : ''}
      `}</style>

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
        <div className="absolute inset-0 border-2 border-indigo-500 border-dashed pointer-events-none z-40 rounded-sm max-w-full mx-auto" style={{ maxWidth: currentMaxPx ? `${currentMaxPx}px` : undefined }} />
      )}

      {/* 블록 콘텐츠 원본 */}
      {children}

      {isSelected && (
        <>
          {/* 상하좌우 및 모서리 핸들 */}
          <VerticalHandle 
            type="left" 
            positionClass="top-1/2 -translate-y-1/2 -ml-3" 
            style={{ left: `max(0px, calc(50% - ${handleOffset}px))` }} 
          />
          <VerticalHandle 
            type="right" 
            positionClass="top-1/2 -translate-y-1/2 -mr-3" 
            style={{ right: `max(0px, calc(50% - ${handleOffset}px))` }} 
          />
          
          <HorizontalHandle type="top" positionClass="-top-3 left-1/2 -translate-x-1/2" />
          <HorizontalHandle type="bottom" positionClass="-bottom-3 left-1/2 -translate-x-1/2" />

          <CornerHandle 
            type="tl" 
            positionClass="-top-2 -ml-2" 
            cursor="cursor-nwse-resize" 
            style={{ left: `max(0px, calc(50% - ${handleOffset}px))` }} 
          />
          <CornerHandle 
            type="tr" 
            positionClass="-top-2 -mr-2" 
            cursor="cursor-nesw-resize" 
            style={{ right: `max(0px, calc(50% - ${handleOffset}px))` }} 
          />
          <CornerHandle 
            type="bl" 
            positionClass="-bottom-2 -ml-2" 
            cursor="cursor-nesw-resize" 
            style={{ left: `max(0px, calc(50% - ${handleOffset}px))` }} 
          />
          <CornerHandle 
            type="br" 
            positionClass="-bottom-2 -mr-2" 
            cursor="cursor-nwse-resize" 
            style={{ right: `max(0px, calc(50% - ${handleOffset}px))` }} 
          />
        </>
      )}
    </div>
  )
}
