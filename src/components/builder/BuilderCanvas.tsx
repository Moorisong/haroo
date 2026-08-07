'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useBuilderStore } from '@/stores/useBuilderStore'
import FloatingQuickToolbar from './FloatingQuickToolbar'
import BlockResizeHandles from './BlockResizeHandles'
import type { CanvasBlock, ContainerWidth, PaddingYOption } from '@/types'
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

// 19종 실제 배포 블록 컴포넌트 매핑 레지스트리
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

// 블록 렌더러 - 매핑된 컴포넌트가 있으면 렌더링, 없으면 Fallback
function BlockRenderer({ block, isPreviewMode }: { block: CanvasBlock; isPreviewMode: boolean }) {
  const config = block.inputConfig || {}
  const Component = BlockRegistry[block.blockId]
  
  if (Component) {
    return <Component config={config} />
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

function SortableCanvasBlock({ block }: { block: CanvasBlock }) {
  const { selectBlock, selectedInstanceId, isPreviewMode } = useBuilderStore()
  const isSelected = selectedInstanceId === block.instanceId
  const config = block.inputConfig || {}
  const containerWidth = (config.containerWidth as ContainerWidth) || 'wide'
  const customWidthPx = config.customWidthPx as number | undefined

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
    transition,
    isDragging,
  } = useSortable({ id: block.instanceId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    width: `${currentMaxPx}px`,
    maxWidth: '100%',
  }

  if (isPreviewMode) {
    return (
      <div id={`block-${block.instanceId}`} style={{ width: `${currentMaxPx}px`, maxWidth: '100%' }}>
        <BlockRenderer block={block} isPreviewMode={true} />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        selectBlock(block.instanceId)
      }}
      className={cn(
        'relative group cursor-pointer transition-all duration-200 shrink-0',
        isSelected ? 'ring-1 ring-indigo-500 ring-offset-0 z-10' : 'hover:ring-1 hover:ring-slate-300'
      )}
    >
      {/* 1px 인디고 가이드라인 및 Floating Toolbar */}
      {isSelected && <FloatingQuickToolbar />}
      
      {/* DnD Drag Handle (옵션: 호버 시 표시) */}
      <div 
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-30 p-1 bg-white/80 rounded shadow-sm opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing hover:bg-slate-100"
        title="드래그하여 순서 이동"
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
        <BlockRenderer block={block} isPreviewMode={false} />
      </BlockResizeHandles>
    </div>
  )
}

export default function BuilderCanvas() {
  const { canvasBlocks, deviceViewport, selectBlock } = useBuilderStore()

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
      className="flex-1 overflow-y-auto bg-slate-100 pt-14 pb-8 px-8 flex justify-center"
      onClick={() => selectBlock(null)} // 캔버스 빈 공간 클릭 시 선택 해제
    >
      <div className={cn(
        'w-full bg-white shadow-sm min-h-[800px] transition-all duration-300 flex flex-col',
        getCanvasWidthClass()
      )}>
        {canvasBlocks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            <p className="font-medium text-sm">블록을 추가하여 실시간 라이브 캔버스를 채워보세요</p>
          </div>
        ) : (
          <div className="flex flex-wrap items-start content-start w-full h-full">
            {canvasBlocks.map((block) => (
              <SortableCanvasBlock key={block.instanceId} block={block} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
