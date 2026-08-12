'use client'

import React, { useState } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { BlockInputConfig } from '@/types'
import RevisionMeter from './RevisionMeter'
import PanelContentTab from './panel/PanelContentTab'
import PanelStyleTab from './panel/PanelStyleTab'
import PanelActionTab from './panel/PanelActionTab'
import { PANEL_LABELS } from './panel/constants'

// Keep capability map here to avoid circular dependencies with constants if any, or move to constants
export interface BlockCapability {
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasButton?: boolean
  hasButtonAction?: boolean
  allowedActions?: string[]
  hasImage?: boolean
  hasVideo?: boolean
  customFieldType?: 'MAP_ADDRESS' | 'DDAY_DATE' | 'COUPON' | 'STAMP' | 'PAYMENT' | 'BOARD_VIEW_TYPE' | 'PROGRESS' | 'CHART' | 'NONE' | 'POLL_OPTIONS' | 'ACTION_ITEMS' | 'CALENDAR_EVENTS' | 'TABLE_DATA' | 'TIMELINE_ITEMS' | 'FILE_ITEMS' | 'REVIEW_ITEMS' | 'RANKING_ITEMS' | 'FLOATING_BUTTON'
}

const BLOCK_CAPABILITIES: Record<string, BlockCapability> = {
  blk_hero_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, hasImage: true, hasVideo: true, allowedActions: ['NAVIGATE_PAGE', 'OPEN_URL', 'CALL_PHONE', 'OPEN_KAKAO', 'SCROLL_TO_BLOCK', 'SHOW_MODAL', 'CUSTOM_INTERACTION'] },
  blk_txt_01: { hasTitle: true, hasSubtitle: true },
  blk_share_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['OPEN_KAKAO', 'COPY_TO_CLIPBOARD', 'OPEN_URL'] },
  blk_video_01: { hasTitle: true, hasSubtitle: true, hasVideo: true },
  blk_dday_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'DDAY_DATE' },
  blk_pricing_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['PG_CHECKOUT', 'NAVIGATE_PAGE', 'OPEN_URL'] },
  blk_form_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['SUBMIT_FORM'] },
  blk_talk_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['OPEN_KAKAO', 'CALL_PHONE'] },
  blk_map_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'MAP_ADDRESS' },
  blk_album_01: { hasTitle: true, hasSubtitle: true, hasImage: true },
  blk_faq_01: { hasTitle: true, hasSubtitle: true },
  blk_stamp_card_01: { hasTitle: true, hasSubtitle: true, hasButton: true, customFieldType: 'STAMP' },
  blk_curriculum_01: { hasTitle: true, hasSubtitle: true },
  blk_like_01: { hasTitle: true, hasSubtitle: true },
  blk_auth_01: { hasTitle: true, hasSubtitle: true },
  blk_pay_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['PG_CHECKOUT'], customFieldType: 'PAYMENT' },
  blk_stats_01: { hasTitle: true, hasSubtitle: true },
  blk_coupon_01: { hasTitle: true, hasSubtitle: true, hasButton: true, customFieldType: 'COUPON' },
  blk_consulting_slot_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['SUBMIT_FORM'] },
  blk_profile_grid_01: { hasTitle: true, hasSubtitle: true, hasImage: true },
  blk_feature_grid_01: { hasTitle: true, hasSubtitle: true },
  blk_content_card_grid_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, hasImage: true, allowedActions: ['NAVIGATE_PAGE', 'OPEN_URL', 'SHOW_MODAL'] },
  blk_board_list_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['NAVIGATE_PAGE', 'SHOW_MODAL'], customFieldType: 'BOARD_VIEW_TYPE' },
  blk_feed_01: { hasTitle: true, hasSubtitle: true, hasButton: true, hasButtonAction: true, allowedActions: ['SHOW_MODAL', 'NAVIGATE_PAGE', 'OPEN_URL', 'SUBMIT_FORM'] },
  blk_progress_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'PROGRESS' },
  blk_chart_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'CHART' },
  blk_poll_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'POLL_OPTIONS' },
  blk_action_list_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'ACTION_ITEMS' },
  blk_calendar_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'CALENDAR_EVENTS' },
  blk_table_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'TABLE_DATA' },
  blk_timeline_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'TIMELINE_ITEMS' },
  blk_file_download_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'FILE_ITEMS' },
  blk_review_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'REVIEW_ITEMS' },
  blk_ranking_01: { hasTitle: true, hasSubtitle: true, customFieldType: 'RANKING_ITEMS' },
  blk_floating_button_01: { customFieldType: 'FLOATING_BUTTON' },
}

export default function SidePropertyPanel() {
  const { selectedInstanceId, canvasBlocks, updateBlockInputData, projectType, deviceViewport, isPreviewMode } = useBuilderStore()
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'action'>('content')
  
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
  const cap: BlockCapability = BLOCK_CAPABILITIES[block.blockId] || {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: config.buttonText !== undefined,
    hasButtonAction: config.buttonLink !== undefined || config.actionType !== undefined,
    hasImage: config.imageUrl !== undefined,
    hasVideo: config.videoUrl !== undefined,
  }

  const handleChange = (field: string, value: any) => {
    updateBlockInputData(selectedInstanceId, { [field]: value })
  }

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 border-b border-slate-100 flex flex-col gap-3 bg-slate-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">블록 속성 편집</h3>
          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">{block.name}</span>
        </div>
        
        {/* 3-Tab Navigation */}
        <div className="flex bg-slate-200/50 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'content' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {PANEL_LABELS.TAB_CONTENT}
          </button>
          <button 
            onClick={() => setActiveTab('style')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'style' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {PANEL_LABELS.TAB_STYLE}
          </button>
          <button 
            onClick={() => setActiveTab('action')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'action' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {PANEL_LABELS.TAB_ACTION}
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        {activeTab === 'content' && (
          <PanelContentTab cap={cap} config={config} handleChange={handleChange} />
        )}
        
        {activeTab === 'style' && (
          <PanelStyleTab config={config} handleChange={handleChange} />
        )}

        {activeTab === 'action' && (
          <PanelActionTab cap={cap} config={config} handleChange={handleChange} />
        )}

        <RevisionMeter originalTier={block.tier} />
      </div>
    </div>
  )
}
