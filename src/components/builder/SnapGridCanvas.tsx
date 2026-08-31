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
import { useActionHandler, emitToast } from '@/hooks/useActionHandler'
import { BlockProvider } from '@/contexts/BlockContext'

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
import BlkProfileGrid01 from '@/components/blocks/blk_profile_grid_01'
import BlkFeatureGrid01 from '@/components/blocks/blk_feature_grid_01'
import BlkContentCardGrid01 from '@/components/blocks/blk_content_card_grid_01'
import BlkBoardList01 from '@/components/blocks/blk_board_list_01'
import BlkFeed01 from '@/components/blocks/blk_feed_01'
import BlkProgress01 from '@/components/blocks/blk_progress_01'
import BlkChart01 from '@/components/blocks/blk_chart_01'
import BlkPoll01 from '@/components/blocks/blk_poll_01'
import BlkActionList01 from '@/components/blocks/blk_action_list_01'
import BlkCalendar01 from '@/components/blocks/blk_calendar_01'
import BlkTable01 from '@/components/blocks/blk_table_01'
import BlkTimeline01 from '@/components/blocks/blk_timeline_01'
import BlkFileDownload01 from '@/components/blocks/blk_file_download_01'
import BlkReview01 from '@/components/blocks/blk_review_01'
import BlkRanking01 from '@/components/blocks/blk_ranking_01'
import BlkFloatingButton01 from '@/components/blocks/blk_floating_button_01'
import BlkRoulette01 from '@/components/blocks/blk_roulette_01'
import BlkScratch01 from '@/components/blocks/blk_scratch_01'
import BlkFortune01 from '@/components/blocks/blk_fortune_01'

const BlockRegistry: Record<string, React.FC<{ config: any, isPreview?: boolean, onAction?: any }>> = {
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
  blk_profile_grid_01: BlkProfileGrid01,
  blk_feature_grid_01: BlkFeatureGrid01,
  blk_content_card_grid_01: BlkContentCardGrid01,
  blk_board_list_01: BlkBoardList01,
  blk_feed_01: BlkFeed01,
  blk_progress_01: BlkProgress01,
  blk_chart_01: BlkChart01,
  blk_poll_01: BlkPoll01,
  blk_action_list_01: BlkActionList01,
  blk_calendar_01: BlkCalendar01,
  blk_table_01: BlkTable01,
  blk_timeline_01: BlkTimeline01,
  blk_file_download_01: BlkFileDownload01,
  blk_review_01: BlkReview01,
  blk_ranking_01: BlkRanking01,
  blk_floating_button_01: BlkFloatingButton01,
  blk_roulette_01: BlkRoulette01,
  blk_scratch_01: BlkScratch01,
  blk_fortune_01: BlkFortune01,
}

function BlockRenderer({
  block,
  isPreviewMode,
  onAction,
}: {
  block: CanvasBlock
  isPreviewMode: boolean
  onAction?: (config: any, formData?: any) => void
}) {
  const config = block.inputConfig || {}
  const Component = BlockRegistry[block.blockId]
  if (Component) {
    return (
      <BlockProvider instanceId={block.instanceId} isPreviewMode={isPreviewMode}>
        <Component config={config} isPreview={isPreviewMode} onAction={onAction} />
      </BlockProvider>
    )
  }
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
  onAction?: (config: any, formData?: any) => void
}

function DraggableBlock({ block, canvasRef, onDragStart, onDragMove, onDragEnd, onAction }: DraggableBlockProps) {
  const { selectBlock, selectedInstanceId, isPreviewMode, projectType, deviceViewport, updateBlockInputData } = useBuilderStore()
  const isWebPreview = projectType === 'WEB' && deviceViewport !== 'desktop'
  const isReadOnly = isPreviewMode || isWebPreview
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
        updateBlockInputData(block.instanceId, { blockHeight: h }, true) // skipDirty = true
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

  const isFloating = block.blockId === 'blk_floating_button_01'
  const wrapperStyle = isFloating 
    ? undefined 
    : { position: 'absolute', left: posX, top: posY, width: blockWidth }
  
  const floatingClass = isFloating 
    ? 'fixed bottom-6 right-6 lg:right-[344px] z-50 w-auto pointer-events-none' 
    : ''

  if (isReadOnly) {
    return (
      <div
        style={wrapperStyle as React.CSSProperties}
        className={floatingClass}
        ref={blockRef}
      >
        <BlockRenderer block={block} isPreviewMode={true} onAction={onAction} />
      </div>
    )
  }

  return (
    <div
      id={`snap-block-${block.instanceId}`}
      data-sortable-block="true"
      style={wrapperStyle as React.CSSProperties}
      className={cn(
        'group overflow-visible select-none',
        isSelected ? 'ring-2 ring-inset ring-sky-500 z-10' : 'hover:ring-1 hover:ring-inset hover:ring-slate-300'
      )}
      onClick={(e) => { e.stopPropagation(); selectBlock(block.instanceId, 'background') }}
    >
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
          <BlockRenderer block={block} isPreviewMode={false} onAction={onAction} />
        </BlockResizeHandles>
      </div>

      {/* 선택 시 혹은 호버 시 블록 이동 핸들 툴바 표출 */}
      <FloatingQuickToolbar 
        instanceId={block.instanceId}
        onPointerDown={isFloating ? undefined : handlePointerDown}
      />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// 데스크톱 뷰 캔버스 (절대 좌표 + 스냅 그리드)
// ──────────────────────────────────────────────────────────────
function DesktopCanvas() {
  const { canvasBlocks, selectBlock, pages, setActivePage, isPreviewMode } = useBuilderStore()
  const canvasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const onNavigatePage = useCallback((slug: string) => {
    const cleanSlug = slug.trim().toLowerCase().replace(/^\//, '')
    const target = pages.find((p) => {
      const pClean = p.slug.trim().toLowerCase().replace(/^\//, '')
      return p.id === slug || p.slug === slug || pClean === cleanSlug
    })
    if (target) {
      setActivePage(target.id)
      emitToast(`📄 "${target.title}" (${target.slug}) 화면으로 이동했습니다.`, 'success')
    } else {
      emitToast(`📄 [테스트] "${slug}" 화면으로 이동합니다.`, 'info')
    }
  }, [pages, setActivePage])

  const { handleAction } = useActionHandler({
    isPreview: isPreviewMode,
    pages,
    onNavigatePage,
  })

  const handleBlockAction = useCallback(
    (config: BlockInputConfig, formData?: Record<string, string>) => {
      if (!isPreviewMode) return
      handleAction(config, formData)
    },
    [isPreviewMode, handleAction]
  )

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
                onAction={handleBlockAction}
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
  const { canvasBlocks, selectBlock, selectedInstanceId, isPreviewMode, projectType, pages, setActivePage } = useBuilderStore()
  
  const isPwa = projectType === 'PWA'
  const isReadOnly = (projectType === 'WEB' && viewport !== 'desktop') || isPreviewMode

  const onNavigatePage = useCallback((slug: string) => {
    const cleanSlug = slug.trim().toLowerCase().replace(/^\//, '')
    const target = pages.find((p) => {
      const pClean = p.slug.trim().toLowerCase().replace(/^\//, '')
      return p.id === slug || p.slug === slug || pClean === cleanSlug
    })
    if (target) {
      setActivePage(target.id)
      emitToast(`📄 "${target.title}" (${target.slug}) 화면으로 이동했습니다.`, 'success')
    } else {
      emitToast(`📄 [테스트] "${slug}" 화면으로 이동합니다.`, 'info')
    }
  }, [pages, setActivePage])

  const { handleAction } = useActionHandler({
    isPreview: isReadOnly,
    pages,
    onNavigatePage,
  })

  const handleBlockAction = useCallback(
    (config: BlockInputConfig, formData?: Record<string, string>) => {
      if (!isReadOnly) return
      handleAction(config, formData)
    },
    [isReadOnly, handleAction]
  )

  // 모바일 뷰에서는 블록들을 posY 기준으로 정렬하여 차례대로 표시
  const sortedBlocks = useMemo(() => {
    return [...canvasBlocks].sort((a, b) => (a.inputConfig?.posY ?? 0) - (b.inputConfig?.posY ?? 0))
  }, [canvasBlocks])

  return (
    <div 
      className="flex-1 bg-slate-50 flex flex-col items-center min-h-0 w-full"
      onClick={() => selectBlock(null)}
    >
      {/* 실제 모바일 화면에서는 100% 폭, PC 목업 보기에서는 지정한 375px/768px 폭 유지 */}
      <div 
        className={cn(
          'bg-white flex flex-col relative transition-all duration-300 w-full flex-1 min-h-0 transform-gpu overflow-hidden',
          viewport === 'mobile' ? 'max-w-md sm:my-4 sm:rounded-[32px] sm:shadow-2xl sm:border sm:border-slate-300' : 'max-w-2xl sm:my-4 sm:rounded-[32px] sm:shadow-2xl sm:border sm:border-slate-300',
          isPwa && 'sm:border-slate-800 sm:ring-4 sm:ring-slate-900/10'
        )}
      >
        {/* 상단 얇은 프리뷰 상태 안내 바 */}
        <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 flex items-center justify-between px-4 font-medium shrink-0 border-b border-slate-800">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {isPwa ? '📱 PWA 모바일 앱' : viewport === 'mobile' ? '📱 모바일 화면' : '💻 태블릿 화면'}
          </span>
          <span className="text-[10px] text-amber-400 font-bold">
            모바일 미리보기 모드
          </span>
        </div>

        <div className="flex-1 flex flex-col w-full relative overflow-y-auto min-h-0 pt-3 pb-16">
          {sortedBlocks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 min-h-[300px]">
              <p className="text-xs font-semibold text-center text-slate-500">
                {isPwa ? 'PWA 앱 메인 화면에 블록이 없습니다' : '미리보기 할 작성된 블록이 없습니다'}
              </p>
            </div>
          ) : (
            sortedBlocks.map((block, index) => {
              const isSelected = selectedInstanceId === block.instanceId

              const isFloating = block.blockId === 'blk_floating_button_01'

              return (
                <div 
                  key={block.instanceId}
                  className={cn(
                    'relative transition-all shrink-0',
                    isFloating ? 'fixed bottom-6 right-6 z-50 w-auto' : 'w-full overflow-visible',
                    !isReadOnly && !isFloating && 'cursor-pointer hover:ring-1 hover:ring-inset hover:ring-slate-300',
                    !isReadOnly && isSelected && !isFloating && 'ring-2 ring-inset ring-sky-500 z-20',
                    !isReadOnly && isSelected && isFloating && '[&>div]:ring-2 [&>div]:ring-sky-500 [&>div]:rounded-full [&>div]:ring-offset-2 z-20'
                  )}
                  onClick={(e) => {
                    if (isReadOnly) return
                    e.stopPropagation()
                    selectBlock(block.instanceId, 'background')
                  }}
                >
                  <BlockRenderer block={block} isPreviewMode={isReadOnly} onAction={handleBlockAction} />
                  {!isReadOnly && isSelected && (
                    <FloatingQuickToolbar 
                      instanceId={block.instanceId} 
                      isTopEdge={index === 0}
                      insideBlock={true}
                    />
                  )}
                </div>
              )
            })
          )}
        </div>
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
