import React, { useState, useRef } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { ContainerWidth, PaddingYOption } from '@/types'
import { cn } from '@/lib/utils'
import { snapToGrid, CANVAS_WIDTH } from '@/lib/snapGrid'

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
  { key: 'full',   label: '꽉참', maxPx: CANVAS_WIDTH },
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
  
  // 실시간 렌더링 최적화(Lag 제거) 및 Boundary 피드백을 위한 로컬 상태
  const [localWidthPx, setLocalWidthPx] = useState<number | null>(null)
  const [localPaddingYPx, setLocalPaddingYPx] = useState<number | null>(null)
  const [isBoundaryHit, setIsBoundaryHit] = useState(false)

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
      let hitBoundary = false

      if (handle.includes('left') || handle.includes('right') || handle.includes('t') || handle.includes('b')) {
        const calculatedWidth = snapToGrid(startWidth + deltaX)
        if (calculatedWidth <= 320 || calculatedWidth >= CANVAS_WIDTH) hitBoundary = true
        newWidth = Math.max(320, Math.min(CANVAS_WIDTH, calculatedWidth))
        setCurrentWidthLabel(`${Math.round(newWidth)}px`)
      }

      if (handle.includes('top') || handle.includes('bottom') || handle.includes('l') || handle.includes('r')) {
        // 총 드래그 거리를 상하 각각의 패딩 증분으로 분할
        newPadding = Math.max(0, snapToGrid(startPadding + (deltaY / 2)))
        if (newPadding === 0) hitBoundary = true
        setCurrentPaddingLabel(`${Math.round(newPadding)}px`)
      }

      setIsBoundaryHit(hitBoundary)

      // 실시간 DOM 업데이트를 위해 로컬 상태만 갱신 (60fps)
      if (Math.abs(newWidth - lastSavedPx) > 0 || Math.abs(newPadding - lastSavedPadding) > 0) {
        setLocalWidthPx(Math.round(newWidth))
        setLocalPaddingYPx(Math.round(newPadding))
        
        // 물리적인 영역 (최상위 wrapper) 실시간 리사이즈
        const parentBlock = containerRef.current?.closest('[data-sortable-block="true"]') as HTMLElement
        if (parentBlock) {
          parentBlock.style.width = `${Math.round(newWidth)}px`
        }

        lastSavedPx = newWidth
        lastSavedPadding = newPadding
      }
    }

    const onPointerUp = (upEv: PointerEvent) => {
      upEv.stopPropagation()
      setIsResizing(false)
      setActiveHandle(null)
      setIsBoundaryHit(false)
      
      try {
        target.releasePointerCapture(upEv.pointerId)
      } catch (_) {}

      // 드래그 종료 시에만 한 번 전역 Store 업데이트
      if (lastSavedPx !== currentMaxPx || lastSavedPadding !== startPadding) {
        updateBlockInputData(instanceId, {
          customWidthPx: Math.round(lastSavedPx),
          customPaddingYPx: Math.round(lastSavedPadding),
        })
      }
      
      setLocalWidthPx(null)
      setLocalPaddingYPx(null)

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  // 핸들 UI 컴포넌트 도우미
  const renderHandle = (
    handle: HandleType, 
    positionClass: string, 
    cursorClass: string
  ) => {
    const isActive = activeHandle === handle
    return (
      <div
        className={cn(
          'absolute z-50 bg-white border border-slate-300 rounded-sm shadow-sm transition-opacity duration-150',
          positionClass,
          cursorClass,
          (isSelected || isActive || isResizing) ? 'opacity-100' : 'opacity-0',
          isActive ? 'bg-indigo-50 border-indigo-400 scale-110' : 'hover:scale-110 hover:border-indigo-400'
        )}
        onPointerDown={(e) => handlePointerDown(e, handle)}
      />
    )
  }

  const displayWidth = localWidthPx !== null ? localWidthPx : currentMaxPx
  const displayPadding = localPaddingYPx !== null ? localPaddingYPx : customPaddingYPx

  return (
    <div ref={containerRef} id={`block-resize-${instanceId}`} className="relative group/resize w-full h-full flex justify-center overflow-visible">
      {/* 커스텀 픽셀 폭/높이 CSS 오버라이드 (실시간 리사이징 적용) */}
      <style>{`
        #block-resize-${instanceId} > div:first-of-type {
          max-width: ${displayWidth}px !important; 
          margin-left: auto; 
          margin-right: auto;
        }
        ${displayPadding !== undefined ? `
        #block-resize-${instanceId} [class*="py-"] {
          padding-top: ${displayPadding}px !important; 
          padding-bottom: ${displayPadding}px !important;
        }
        ` : ''}
      `}</style>
      
      {isBoundaryHit && <style>{`body * { cursor: not-allowed !important; }`}</style>}

      {/* 실시간 드래그 중 영역 파란(경계 도달 시 빨간) 가이드선 */}
      {isResizing && (
        <div className={`absolute inset-0 border-2 ${isBoundaryHit ? 'border-red-500' : 'border-indigo-500'} border-dashed pointer-events-none z-40 rounded-sm max-w-full mx-auto transition-colors`} />
      )}

      {/* 블록 콘텐츠 원본 */}
      {children}

      {isSelected && (
        <div
          data-resize-handle="true"
          className="absolute -bottom-2 -right-2 z-50 flex items-center justify-center p-1.5 bg-slate-900 text-white rounded-md shadow-lg border border-slate-700 cursor-nwse-resize select-none hover:scale-110 transition-transform"
          onPointerDown={(e) => handlePointerDown(e, 'br')}
          title="드래그하여 크기 조절"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-200">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" x2="14" y1="3" y2="10" />
            <line x1="3" x2="10" y1="21" y2="14" />
          </svg>
        </div>
      )}
    </div>
  )
}
