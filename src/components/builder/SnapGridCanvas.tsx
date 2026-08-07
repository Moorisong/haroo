'use client'

import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { CanvasBlock, ContainerWidth, PaddingYOption, DeviceViewport } from '@/types'
import BlockResizeHandles from '@/components/builder/BlockResizeHandles'
import FloatingQuickToolbar from '@/components/builder/FloatingQuickToolbar'
import SmartGuideLayer from '@/components/builder/SmartGuide'
import {
  CANVAS_WIDTH,
  snapToGrid,
  getSmartGuides,
  type SmartGuide,
} from '@/lib/snapGrid'
import { cn } from '@/lib/utils'

// ──────────────────────────────────────────────────────────────
// 블록 레지스트리 & 렌더러
// ──────────────────────────────────────────────────────────────
import BlkHero01 from '@/components/blocks/blk_hero_01'
import BlkTxt01 from '@/components/blocks/blk_txt_01'
import BlkShare01 from '@/components/blocks/blk_share_01'
import BlkVideo01 from '@/components/blocks/blk_video_01'
import BlkDday01 from '@/components/blocks/blk_dday_01'
import BlkPricing01 from '@/components/blocks/blk_pricing_01'
import BlkForm01 from '@/components/blocks/blk_form_01'
import BlkTalk01 from '@/components/blocks/blk_talk_01'
import BlkMap01 from '@/components/blocks/blk_map_01'
import BlkAlbum01 from '@/components/blocks/blk_album_01'
import BlkFaq01 from '@/components/blocks/blk_faq_01'
import BlkStampCard01 from '@/components/blocks/blk_stamp_card_01'
import BlkCurriculum01 from '@/components/blocks/blk_curriculum_01'
import BlkLike01 from '@/components/blocks/blk_like_01'
import BlkAuth01 from '@/components/blocks/blk_auth_01'
import BlkPay01 from '@/components/blocks/blk_pay_01'
import BlkStats01 from '@/components/blocks/blk_stats_01'
import BlkCoupon01 from '@/components/blocks/blk_coupon_01'
import BlkConsultingSlot01 from '@/components/blocks/blk_consulting_slot_01'

const BlockRegistry: Record<string, React.FC<{ config: any }>> = {
  blk_hero_01: BlkHero01,
  blk_txt_01: BlkTxt01,
  blk_share_01: BlkShare01,
  blk_video_01: BlkVideo01,
  blk_dday_01: BlkDday01,
  blk_pricing_01: BlkPricing01,
  blk_form_01: BlkForm01,
  blk_talk_01: BlkTalk01,
  blk_map_01: BlkMap01,
  blk_album_01: BlkAlbum01,
  blk_faq_01: BlkFaq01,
  blk_stamp_card_01: BlkStampCard01,
  blk_curriculum_01: BlkCurriculum01,
  blk_like_01: BlkLike01,
  blk_auth_01: BlkAuth01,
  blk_pay_01: BlkPay01,
  blk_stats_01: BlkStats01,
  blk_coupon_01: BlkCoupon01,
  blk_consulting_slot_01: BlkConsultingSlot01,
}

function BlockRenderer({ block, isPreviewMode }: { block: CanvasBlock; isPreviewMode: boolean }) {
  const config = block.inputConfig || {}
  const Component = BlockRegistry[block.blockId]
  if (Component) return <Component config={config} />
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[200px] border border-dashed border-slate-300 bg-slate-50 w-full">
      <h2 className="text-xl font-bold mb-2 text-slate-400">{block.name}</h2>
      <p className="text-sm opacity-50 text-center">(실물 UI 컴포넌트 미구현 - {block.blockId})</p>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// 드래그 가능한 개별 블록 컴포넌트 (데스크톱 모드 전용)
// ──────────────────────────────────────────────────────────────
interface DraggableBlockProps {
  block: CanvasBlock
  canvasRef: React.RefObject<HTMLDivElement | null>
  onDragStart: (id: string) => void
  onDragMove: (id: string, x: number, y: number) => void
  onDragEnd: () => void
}

function DraggableBlock({ block, canvasRef, onDragStart, onDragMove, onDragEnd }: DraggableBlockProps) {
  const { selectBlock, selectedInstanceId, isPreviewMode, updateBlockInputData } = useBuilderStore()
  const isSelected = selectedInstanceId === block.instanceId
  const config = block.inputConfig || {}
  const containerWidth = (config.containerWidth as ContainerWidth) || 'wide'
  const posX = config.posX ?? 0
  const posY = config.posY ?? 0
  const blockWidth = config.customWidthPx ?? CANVAS_WIDTH
  const blockRef = useRef<HTMLDivElement>(null)

  // 블록 높이를 실측하여 스토어에 저장 (스마트 가이드 계산용)
  useEffect(() => {
    if (!blockRef.current) return
    const observer = new ResizeObserver((entries) => {
      const h = Math.round(entries[0].contentRect.height)
      if (h > 0 && h !== config.blockHeight) {
        updateBlockInputData(block.instanceId, { blockHeight: h })
      }
    })
    observer.observe(blockRef.current)
    return () => observer.disconnect()
  }, [block.instanceId, config.blockHeight, updateBlockInputData])

  // ── 포인터 기반 드래그 핸들러 ──
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // 리사이즈 핸들 클릭 시 드래그 무시
    if ((e.target as HTMLElement).closest('[data-resize-handle]')) return
    e.stopPropagation()

    const canvas = canvasRef.current
    if (!canvas) return
    const canvasRect = canvas.getBoundingClientRect()
    const scale = canvasRect.width / CANVAS_WIDTH

    const startClientX = e.clientX
    const startClientY = e.clientY
    const startPosX = posX
    const startPosY = posY

    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    onDragStart(block.instanceId)

    const onMove = (moveEv: PointerEvent) => {
      const rawX = startPosX + (moveEv.clientX - startClientX) / scale
      const rawY = startPosY + (moveEv.clientY - startClientY) / scale
      const snappedX = Math.max(0, Math.min(CANVAS_WIDTH - blockWidth, snapToGrid(rawX)))
      const snappedY = Math.max(8, snapToGrid(rawY))
      onDragMove(block.instanceId, snappedX, snappedY)
    }

    const onUp = (upEv: PointerEvent) => {
      const rawX = startPosX + (upEv.clientX - startClientX) / scale
      const rawY = startPosY + (upEv.clientY - startClientY) / scale
      const snappedX = Math.max(0, Math.min(CANVAS_WIDTH - blockWidth, snapToGrid(rawX)))
      const snappedY = Math.max(8, snapToGrid(rawY))
      updateBlockInputData(block.instanceId, { posX: snappedX, posY: snappedY })
      onDragEnd()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [block.instanceId, posX, posY, blockWidth, canvasRef, onDragStart, onDragMove, onDragEnd, updateBlockInputData])

  if (isPreviewMode) {
    return (
      <div
        style={{ position: 'absolute', left: posX, top: posY, width: blockWidth }}
        ref={blockRef}
      >
        <BlockRenderer block={block} isPreviewMode={true} />
      </div>
    )
  }

  return (
    <div
      id={`snap-block-${block.instanceId}`}
      data-sortable-block="true"
      style={{ position: 'absolute', left: posX, top: posY, width: blockWidth }}
      className={cn(
        'group overflow-visible cursor-grab active:cursor-grabbing select-none',
        isSelected ? 'ring-1 ring-inset ring-indigo-500 z-10' : 'hover:ring-1 hover:ring-inset hover:ring-slate-300'
      )}
      onPointerDown={handlePointerDown}
      onClick={(e) => { e.stopPropagation(); selectBlock(block.instanceId) }}
    >
      {isSelected && <FloatingQuickToolbar />}

      {/* overflow-visible 필수: 리사이즈 핸들이 부모 경계 밖으로 나와야 함 */}
      <div ref={blockRef} className="overflow-visible">
        <BlockResizeHandles
          instanceId={block.instanceId}
          isSelected={isSelected}
          containerWidth={containerWidth}
          paddingY={config.paddingY as PaddingYOption}
          customWidthPx={config.customWidthPx as number | undefined}
          customPaddingYPx={config.customPaddingYPx as number | undefined}
        >
          <BlockRenderer block={block} isPreviewMode={false} />
        </BlockResizeHandles>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// 데스크톱 뷰 캔버스 (절대 좌표 + 스냅 그리드)
// ──────────────────────────────────────────────────────────────
function DesktopCanvas() {
  const { canvasBlocks, selectBlock } = useBuilderStore()
  const canvasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const canvasHeight = Math.max(
    1200,
    ...canvasBlocks.map((b) => (b.inputConfig?.posY ?? 0) + (b.inputConfig?.blockHeight ?? 200) + 100)
  )

  // 컨테이너 폭을 실시간 측정 (ResizeObserver)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width
      if (w > 0) setContainerWidth(w)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 컨테이너가 측정됐으면 캔버스를 항상 컨테이너 폭에 맞게 자동 축소
  const finalScale = containerWidth > 0 ? Math.min(1, containerWidth / CANVAS_WIDTH) : 1

  // 드래그 중 임시 좌표 (스마트 가이드 계산용)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [draggingPos, setDraggingPos] = useState<{ x: number; y: number } | null>(null)
  const [guides, setGuides] = useState<SmartGuide[]>([])

  const handleDragStart = useCallback((id: string) => {
    setDraggingId(id)
    setGuides([])
  }, [])

  const handleDragMove = useCallback((id: string, x: number, y: number) => {
    setDraggingPos({ x, y })

    // 드래그 중인 블록의 스마트 가이드 계산
    const draggingBlock = canvasBlocks.find((b) => b.instanceId === id)
    if (!draggingBlock) return

    const w = draggingBlock.inputConfig?.customWidthPx ?? CANVAS_WIDTH
    const h = draggingBlock.inputConfig?.blockHeight ?? 200
    const otherBlocks = canvasBlocks.filter((b) => b.instanceId !== id)
    const { guides: newGuides } = getSmartGuides({ x, y, w, h }, otherBlocks)
    setGuides(newGuides)
  }, [canvasBlocks])

  const handleDragEnd = useCallback(() => {
    setDraggingId(null)
    setDraggingPos(null)
    setGuides([])
  }, [])

  return (
    <div
      className="flex-1 overflow-auto bg-slate-100 flex justify-center pt-14 pb-16"
      onClick={() => selectBlock(null)}
    >
      {/* 가용 영역 전체를 차지하는 투명 컨테이너 (폭 측정용) */}
      <div ref={containerRef} className="w-full flex justify-center px-4">
        {/* 스케일 적용 후 실제 차지하는 공간 = CANVAS_WIDTH * finalScale */}
        <div style={{ width: CANVAS_WIDTH * finalScale, flexShrink: 0, position: 'relative' }}>
          {/* 실제 도화지: 항상 1200px 논리 폭, scale로 축소 */}
          <div
            ref={canvasRef}
            className="relative bg-white shadow-xl rounded-2xl border border-slate-200 overflow-hidden"
            style={{
              width: CANVAS_WIDTH,
              minHeight: canvasHeight,
              transformOrigin: 'top left',
              transform: finalScale !== 1 ? `scale(${finalScale})` : undefined,
              // scale 보정: 줄어든 높이만큼 공간 확보
              marginBottom: finalScale !== 1 ? canvasHeight * finalScale - canvasHeight : 0,
            }}
          >
            {/* 데스크톱 프레임 상단 헤더 */}
            <div className="bg-slate-900 text-slate-300 text-xs py-1.5 flex items-center justify-between px-4 font-medium shrink-0 border-b border-slate-800 relative z-20">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Desktop Canvas (1200px)
              </span>
              <span className="text-[10px] text-slate-400">8px Snap Grid Enabled</span>
            </div>
            {canvasBlocks.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none select-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 opacity-50">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                <p className="font-medium text-sm">블록을 추가하여 캔버스를 채워보세요</p>
              </div>
            )}

            {canvasBlocks.map((block) => (
              <DraggableBlock
                key={block.instanceId}
                block={
                  // 드래그 중인 블록은 임시 좌표로 렌더링
                  draggingId === block.instanceId && draggingPos
                    ? {
                        ...block,
                        inputConfig: {
                          ...block.inputConfig,
                          posX: draggingPos.x,
                          posY: draggingPos.y,
                        },
                      }
                    : block
                }
                canvasRef={canvasRef}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
              />
            ))}

            {/* 스마트 가이드 레이어 */}
            <SmartGuideLayer guides={guides} canvasHeight={canvasHeight} />
          </div>{/* end canvasRef div */}
        </div>{/* end scale wrapper div */}
      </div>{/* end containerRef div */}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// 반응형 모바일/태블릿 뷰 (세로 스택 모드 및 PWA 앱 스마트폰 프레임)
// ──────────────────────────────────────────────────────────────
function ResponsiveViewCanvas({ viewport }: { viewport: DeviceViewport }) {
  const { canvasBlocks, selectBlock, selectedInstanceId, isPreviewMode, projectType } = useBuilderStore()
  
  const frameWidth = viewport === 'mobile' ? 375 : 768
  const isPwa = projectType === 'PWA'

  // 모바일 뷰에서는 블록들을 posY 기준으로 정렬하여 차례대로 표시
  const sortedBlocks = useMemo(() => {
    return [...canvasBlocks].sort((a, b) => (a.inputConfig?.posY ?? 0) - (b.inputConfig?.posY ?? 0))
  }, [canvasBlocks])

  return (
    <div 
      className="flex-1 overflow-y-auto bg-slate-100 flex flex-col items-center py-6 px-4 min-h-0"
      onClick={() => selectBlock(null)}
    >
      {/* WEB 모드 반응형 미리보기 안내 상단 뱃지 */}
      {!isPwa && (
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-50 border border-sky-200 rounded-full text-xs font-bold text-sky-800 shadow-sm animate-in fade-in duration-200 select-none">
          <span>👁️ {viewport === 'mobile' ? '모바일' : '태블릿'} 반응형 미리보기 모드</span>
          <span className="text-slate-400 font-normal">|</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              useBuilderStore.getState().setDeviceViewport('desktop')
            }}
            className="text-sky-600 hover:text-sky-900 underline font-extrabold flex items-center gap-1"
          >
            🖥️ 데스크톱 편집으로 이동
          </button>
        </div>
      )}

      <div 
        className={cn(
          'bg-white shadow-2xl rounded-[36px] border flex flex-col relative transition-all duration-300 my-auto h-fit overflow-hidden',
          isPwa ? 'border-slate-800 ring-4 ring-slate-900/10' : 'border-slate-300'
        )}
        style={{ width: frameWidth, minHeight: 667 }}
      >
        {/* PWA 앱 또는 모바일 프레임 상단 헤더 */}
        <div className="bg-slate-900 text-slate-300 text-xs py-2 flex items-center justify-between px-4 font-medium shrink-0 border-b border-slate-800">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {isPwa ? '📱 PWA App Frame (375px)' : viewport === 'mobile' ? 'Mobile Responsive Preview (375px)' : 'Tablet Responsive Preview (768px)'}
          </span>
          <span className="text-[10px] text-slate-400">
            {isPwa ? '홈 화면 앱 스타일' : 'Preview Only'}
          </span>
        </div>

        {/* PWA 전용 디바이스 상단 노치 / 상태바 미러링 */}
        {isPwa && (
          <div className="bg-slate-900 text-white text-[11px] px-6 py-1 flex items-center justify-between font-semibold select-none border-b border-slate-800/50">
            <span>9:41</span>
            <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
            <div className="flex items-center space-x-1.5 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col w-full relative">
          {sortedBlocks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 min-h-[400px]">
              <p className="text-sm font-medium text-center">
                {isPwa ? 'PWA 앱에 블록을 추가하여 메인 화면을 완성하세요' : '데스크톱 모드에서 블록을 추가해 보세요'}
              </p>
            </div>
          ) : (
            sortedBlocks.map((block) => {
              const isSelected = selectedInstanceId === block.instanceId
              const config = block.inputConfig || {}

              return (
                <div 
                  key={block.instanceId}
                  className={cn(
                    'w-full relative transition-all overflow-visible',
                    !isPreviewMode && 'cursor-pointer hover:ring-1 hover:ring-inset hover:ring-slate-300',
                    !isPreviewMode && isSelected && 'ring-2 ring-inset ring-sky-500 z-10'
                  )}
                  onClick={(e) => {
                    if (isPreviewMode) return
                    e.stopPropagation()
                    selectBlock(block.instanceId)
                  }}
                >
                  {/* WEB 모드 반응형 미리보기 상태에서 블록 선택 시 안내 툴팁 */}
                  {!isPwa && !isPreviewMode && isSelected && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl animate-in fade-in duration-150 whitespace-nowrap">
                      <span>👁️ 반응형 결과 확인 중입니다</span>
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation()
                          useBuilderStore.getState().setDeviceViewport('desktop')
                        }}
                        className="px-1.5 py-0.5 bg-sky-600 hover:bg-sky-500 rounded text-white text-[10px] font-extrabold transition-colors ml-1"
                      >
                        🖥️ 데스크톱에서 편집
                      </button>
                    </div>
                  )}
                  
                  {/* PWA 모드가 아니거나 미리보기 모드가 아니더라도 태블릿/모바일은 위치/크기 변경 불가능하도록 순수 렌더링 */}
                  <BlockRenderer block={block} isPreviewMode={isPreviewMode} />
                </div>
              )
            })
          )}
        </div>

        {/* PWA 전용 스마트폰 하단 홈 바 (Home Indicator) 미러링 */}
        {isPwa && (
          <div className="bg-white py-2 flex justify-center shrink-0 border-t border-slate-100">
            <div className="w-32 h-1 bg-slate-900 rounded-full opacity-60" />
          </div>
        )}
      </div>
    </div>
  )
}


// ──────────────────────────────────────────────────────────────
// 메인 스냅 그리드 캔버스 (뷰포트 분기)
// ──────────────────────────────────────────────────────────────
export default function SnapGridCanvas() {
  const { deviceViewport } = useBuilderStore()
  
  if (deviceViewport === 'desktop') {
    return <DesktopCanvas />
  }
  
  return <ResponsiveViewCanvas viewport={deviceViewport} />
}
