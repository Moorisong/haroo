'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { BlockInputConfig } from '@/types'
import RevisionMeter from './RevisionMeter'
import TextPropertyPanel from './panel/TextPropertyPanel'
import ButtonPropertyPanel from './panel/ButtonPropertyPanel'
import BackgroundPropertyPanel from './panel/BackgroundPropertyPanel'
import BadgePropertyPanel from './panel/BadgePropertyPanel'

export interface BlockCapability {
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasButton?: boolean
  hasButtonAction?: boolean
  allowedActions?: string[]
  hasImage?: boolean
  hasVideo?: boolean
  customFieldType?: string
}

const BLOCK_CAPABILITIES: Record<string, BlockCapability> = {
  blk_hero_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, hasImage: true, hasVideo: true, allowedActions: ['NAVIGATE_PAGE', 'OPEN_URL', 'SCROLL_TO_BLOCK', 'CALL_PHONE', 'COPY_TO_CLIPBOARD', 'DOWNLOAD_FILE', 'SHOW_MODAL', 'SHARE_PAGE'] },
  // 필요 시 다른 블록들의 능력치도 추가
}

// 기본적으로 모든 버튼은 8가지 최적화 액션을 모두 지원함
const DEFAULT_CAP: BlockCapability = {
  allowedActions: ['NAVIGATE_PAGE', 'OPEN_URL', 'SCROLL_TO_BLOCK', 'CALL_PHONE', 'COPY_TO_CLIPBOARD', 'DOWNLOAD_FILE', 'SHOW_MODAL', 'SHARE_PAGE']
}

export default function SidePropertyPanel() {
  const { selectedInstanceId, selectedElementKey, canvasBlocks, updateBlockInputData, projectType, deviceViewport, isPreviewMode } = useBuilderStore()
  
  const isWebPreview = projectType === 'WEB' && deviceViewport !== 'desktop'
  const isReadOnly = isWebPreview || isPreviewMode

  if (isReadOnly) {
    return (
      <div className="w-80 h-full bg-slate-50 border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm text-center px-2">
          <span className="text-2xl mb-2">👁️</span>
          <span className="font-bold text-slate-600 mb-1">
            {isPreviewMode ? '미리보기 모드' : '반응형 미리보기 모드'}
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isWebPreview
              ? '태블릿/모바일 미리보기 화면에서는 속성을 편집할 수 없습니다.\n데스크톱 모드에서 편집해 주세요.'
              : '미리보기 모드 중에는 속성을 편집할 수 없습니다.\n편집 모드로 전환해 주세요.'}
          </p>
        </div>
        <RevisionMeter />
      </div>
    )
  }

  if (!selectedInstanceId) {
    return (
      <div className="w-80 h-full bg-slate-50 border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm text-center">
          캔버스에서 블록을 선택하면<br/>속성을 편집할 수 있습니다.
        </div>
        <RevisionMeter />
      </div>
    )
  }

  const block = canvasBlocks.find(b => b.instanceId === selectedInstanceId)
  if (!block) return null

  const config = (block.inputConfig || {}) as BlockInputConfig & Record<string, any>
  const cap: BlockCapability = BLOCK_CAPABILITIES[block.blockId] || DEFAULT_CAP

  const handleChange = (fieldOrData: string | Record<string, any>, value?: any) => {
    if (typeof fieldOrData === 'string') {
      updateBlockInputData(selectedInstanceId, { [fieldOrData]: value })
    } else if (typeof fieldOrData === 'object' && fieldOrData !== null) {
      updateBlockInputData(selectedInstanceId, fieldOrData)
    }
  }

  const renderPanel = () => {
    if (selectedElementKey === 'badge' || selectedElementKey === 'badgeText') {
      return <BadgePropertyPanel config={config} handleChange={handleChange} />
    }
    if (selectedElementKey === 'title' || selectedElementKey === 'subtitle') {
      return <TextPropertyPanel elementKey={selectedElementKey} config={config} handleChange={handleChange} />
    }
    if (selectedElementKey === 'button' || selectedElementKey === 'button-1') {
      return <ButtonPropertyPanel cap={cap} config={config} handleChange={handleChange} />
    }
    if (selectedElementKey === 'background') {
      return <BackgroundPropertyPanel config={config} handleChange={handleChange} />
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg p-6">
        <span className="text-2xl mb-2">👆</span>
        블록 내부의 요소(제목, 버튼 등)를<br/>클릭하면 해당 속성을<br/>상세하게 편집할 수 있습니다.
      </div>
    )
  }

  const getPanelTitle = () => {
    if (selectedElementKey === 'badge' || selectedElementKey === 'badgeText') return '알약 뱃지 설정'
    if (selectedElementKey === 'title') return '제목 설정'
    if (selectedElementKey === 'subtitle') return '부제목 설정'
    if (selectedElementKey === 'button' || selectedElementKey === 'button-1') return '버튼 설정'
    if (selectedElementKey === 'background') return '배경 설정'
    return '블록 설정'
  }

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 border-b border-slate-100 flex flex-col gap-3 bg-slate-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">{getPanelTitle()}</h3>
          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">{block.name}</span>
        </div>
      </div>
      
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        {renderPanel()}
        <div className="mt-8">
          <RevisionMeter originalTier={block.tier} />
        </div>
      </div>
    </div>
  )
}
