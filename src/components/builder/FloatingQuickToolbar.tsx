'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'

interface FloatingQuickToolbarProps {
  instanceId?: string
  className?: string
}

export default function FloatingQuickToolbar({ instanceId, className }: FloatingQuickToolbarProps) {
  const { selectedInstanceId, canvasBlocks, moveBlock, removeBlock, addBlock } = useBuilderStore()
  
  const targetId = instanceId || selectedInstanceId
  if (!targetId) return null
  
  const blockIndex = canvasBlocks.findIndex(b => b.instanceId === targetId)
  if (blockIndex === -1) return null

  const currentBlock = canvasBlocks[blockIndex]

  const handleDuplicate = () => {
    addBlock({
      id: currentBlock.blockId,
      name: currentBlock.name,
      tier: currentBlock.tier,
      icon: currentBlock.icon
    })
  }

  const isTopEdge = (currentBlock.inputConfig?.posY ?? 0) < 50 || blockIndex === 0
  const positionClass = isTopEdge ? 'top-3 left-1/2 -translate-x-1/2' : '-top-12 left-1/2 -translate-x-1/2'

  const isFirst = blockIndex === 0
  const isLast = blockIndex === canvasBlocks.length - 1

  return (
    <div className={`absolute ${positionClass} z-50 flex items-center space-x-1 p-1 bg-slate-800/95 backdrop-blur-sm text-white rounded-lg shadow-xl border border-slate-700 animate-in fade-in zoom-in duration-200 ${className || ''}`}>
      {/* 위로 이동 */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (!isFirst) moveBlock(blockIndex, blockIndex - 1)
        }}
        disabled={isFirst}
        className="p-1.5 text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent rounded transition-colors"
        title="위로 이동"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </button>

      {/* 아래로 이동 */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (!isLast) moveBlock(blockIndex, blockIndex + 1)
        }}
        disabled={isLast}
        className="p-1.5 text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent rounded transition-colors"
        title="아래로 이동"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>

      <div className="w-[1px] h-4 bg-slate-700 mx-0.5" />

      {/* 복제 */}
      <button onClick={(e) => { e.stopPropagation(); handleDuplicate() }} className="p-1.5 text-white hover:bg-slate-700 rounded transition-colors" title="복제">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      </button>

      {/* 삭제 */}
      <button onClick={(e) => { e.stopPropagation(); removeBlock(targetId) }} className="p-1.5 text-red-400 hover:bg-slate-700 hover:text-red-300 rounded transition-colors" title="삭제">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      </button>
    </div>
  )
}
