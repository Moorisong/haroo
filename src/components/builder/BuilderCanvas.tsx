'use client'

import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { DragOverlay, useDndContext, useDraggable } from '@dnd-kit/core'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { useActionHandler, emitToast } from '@/hooks/useActionHandler'
import FloatingQuickToolbar from './FloatingQuickToolbar'
import BlockResizeHandles from './BlockResizeHandles'
import type { CanvasBlock, ContainerWidth, PaddingYOption, BlockInputConfig } from '@/types'
import { cn } from '@/lib/utils'

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

// 실제 배포 블록 컴포넌트 매핑 레지스트리
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
}

// 블록 렌더러 - 매핑된 컴포넌트가 있으면 렌더링, 없으면 Fallback
function BlockRenderer({
  block,
  isPreviewMode,
  onAction,
}: {
  block: CanvasBlock
  isPreviewMode: boolean
  onAction: (config: BlockInputConfig, formData?: Record<string, string>) => void
}) {
  const config = block.inputConfig || {}
  const Component = BlockRegistry[block.blockId]
  
  if (Component) {
    return <Component config={config} isPreview={isPreviewMode} onAction={onAction} />
  }

  // 매핑되지 않은 블록들을 위한 Fallback
  return (
    <div 
      className="p-8 flex flex-col items-center justify-center min-h-[200px] border border-dashed border-slate-300 bg-slate-50"
    >
      <h2 className="text-xl font-bold mb-2 text-slate-400">{block.name}</h2>
      <p className="text-sm opacity-50 text-center">(실물 UI 컴포넌트 미구현 - {block.blockId})</p>
    </div>
  )
}

function DraggableCanvasBlock({ block }: { block: CanvasBlock }) {
  const { selectBlock, selectedInstanceId, isPreviewMode, pages, setActivePage } = useBuilderStore()
  const isSelected = selectedInstanceId === block.instanceId
  const config = block.inputConfig || {}

  const onNavigatePage = React.useCallback((slug: string) => {
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
  const containerWidth = (config.containerWidth as ContainerWidth) || 'wide'
  const customWidthPx = config.customWidthPx as number | undefined

  // 절대 위치 가져오기 (없으면 0)
  const posX = config.posX || 0
  const posY = config.posY || 0

  const WIDTH_STEPS: { key: ContainerWidth; label: string; maxPx: number }[] = [
    { key: 'narrow', label: '좁음', maxPx: 576 },
    { key: 'medium', label: '보통', maxPx: 896 },
    { key: 'wide',   label: '넓음', maxPx: 1152 },
    { key: 'full',   label: '꽉참', maxPx: 1400 },
  ]
  const baseMaxPx = WIDTH_STEPS.find((s) => s.key === containerWidth)?.maxPx || 1152
  const currentMaxPx = customWidthPx || baseMaxPx

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: block.instanceId })

  // 드래그 중 실시간 변환
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${posX}px`,
    top: `${posY}px`,
    width: `${currentMaxPx}px`,
    maxWidth: '100%',
    zIndex: isDragging ? 50 : (isSelected ? 10 : 1),
    transform: CSS.Translate.toString(transform),
  }

  if (isPreviewMode) {
    return (
      <div id={`block-${block.instanceId}`} style={{ position: 'absolute', left: `${posX}px`, top: `${posY}px`, width: `${currentMaxPx}px`, maxWidth: '100%' }}>
        <BlockRenderer block={block} isPreviewMode={true} onAction={handleAction} />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-sortable-block="true" // BlockResizeHandles에서 부모를 찾기 위한 속성
      onClick={(e) => {
        e.stopPropagation()
        selectBlock(block.instanceId)
      }}
      className={cn(
        'group cursor-pointer shrink-0',
        isSelected ? 'ring-1 ring-indigo-500 ring-offset-0' : 'hover:ring-1 hover:ring-slate-300'
      )}
    >
      {/* 1px 인디고 가이드라인 및 Floating Toolbar */}
      {isSelected && <FloatingQuickToolbar />}
      
      {/* DnD Drag Handle */}
      <div 
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-30 p-1 bg-white/80 rounded shadow-sm opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing hover:bg-slate-100"
        title="드래그하여 자유 이동"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </div>

      <BlockResizeHandles
        instanceId={block.instanceId}
        isSelected={isSelected}
        containerWidth={containerWidth}
        paddingY={config.paddingY as PaddingYOption}
        customWidthPx={customWidthPx}
        customPaddingYPx={config.customPaddingYPx as number | undefined}
      >
        <BlockRenderer block={block} isPreviewMode={false} onAction={handleAction} />
      </BlockResizeHandles>
    </div>
  )
}

export default function BuilderCanvas() {
  const { canvasBlocks, deviceViewport, selectBlock, isPreviewMode, pages, activePageId } = useBuilderStore()
  const activePage = pages.find((p) => p.id === activePageId)

  // 뷰포트에 따른 Width 설정
  const getCanvasWidthClass = () => {
    switch (deviceViewport) {
      case 'mobile': return 'max-w-[375px]'
      case 'tablet': return 'max-w-[768px]'
      case 'desktop': return 'max-w-[1200px]'
      default: return 'max-w-[1200px]'
    }
  }

  return (
    <div 
      className="flex-1 overflow-y-auto bg-slate-100 pt-14 pb-8 px-8 flex justify-center overflow-x-hidden"
      onClick={() => selectBlock(null)} // 캔버스 빈 공간 클릭 시 선택 해제
    >
      <div className={cn(
        'w-full bg-white shadow-sm min-h-[1200px] transition-all duration-300 relative',
        getCanvasWidthClass()
      )}>
        {canvasBlocks.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            <p className="font-bold text-base text-slate-700 mb-1">
              "{activePage?.title || '선택한 화면'}" ({activePage?.slug}) 에 아직 블록이 없습니다.
            </p>
            <p className="text-xs text-slate-500">
              {isPreviewMode
                ? '상단 [✏️ 다시 화면 편집하기] 버튼을 눌러 이 화면에 블록을 조립해 보세요.'
                : '좌측 팔레트에서 블록을 추가하여 캔버스를 구성해 보세요.'}
            </p>
          </div>
        ) : (
          canvasBlocks.map((block) => (
            <DraggableCanvasBlock key={block.instanceId} block={block} />
          ))
        )}
      </div>
    </div>
  )
}
