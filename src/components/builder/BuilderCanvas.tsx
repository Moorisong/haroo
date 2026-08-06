'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Settings, Layout, Plus } from 'lucide-react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { CanvasBlock } from '@/types'
import { cn } from '@/lib/utils'

const TIER_BADGE: Record<string, string> = {
  STARTER: 'bg-slate-100 text-slate-600 border-slate-200',
  STANDARD: 'bg-sky-50 text-sky-600 border-sky-200',
  PROFESSIONAL: 'bg-slate-900 text-white border-slate-900',
}

function SortableBlockItem({ block }: { block: CanvasBlock }) {
  const { removeBlock, selectBlock, selectedInstanceId } = useBuilderStore()
  const isSelected = selectedInstanceId === block.instanceId

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
  }

  const Icon = block.icon ?? Layout

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectBlock(block.instanceId)}
      className={cn(
        'group flex items-center gap-3 px-3 py-3 hover:bg-slate-50 transition-colors cursor-pointer',
        isSelected && 'bg-sky-50 border-l-2 border-sky-500',
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 flex-shrink-0 touch-none"
      >
        <GripVertical size={14} />
      </div>
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-slate-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-slate-800 truncate">{block.name}</div>
        <span className={cn('inline-block px-1.5 py-0.5 text-[9px] font-bold rounded border mt-0.5', TIER_BADGE[block.tier])}>
          {block.tier}
        </span>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); selectBlock(block.instanceId) }}
          className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
        >
          <Settings size={12} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); removeBlock(block.instanceId) }}
          className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  )
}

/**
 * 빌더 캔버스 - 조립된 블록 목록 표시 (DnD sortable)
 * 빈 상태: 플레이스홀더 / 블록 있음: SortableItem 목록
 */
export default function BuilderCanvas() {
  const { canvasBlocks } = useBuilderStore()

  if (canvasBlocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center px-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
          <Plus size={20} className="text-slate-400" />
        </div>
        <p className="text-sm font-semibold text-slate-700">블록을 추가해보세요</p>
        <p className="text-xs text-slate-400 mt-1">왼쪽 팔레트에서 원하는 블록을 선택하세요</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-100">
      {canvasBlocks.map((block) => (
        <SortableBlockItem key={block.instanceId} block={block} />
      ))}
    </div>
  )
}
