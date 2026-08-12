'use client'

import React, { useRef } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { BlockInputConfig, CanvasBlock, PageItem } from '@/types'
import RevisionMeter from './RevisionMeter'

interface BlockCapability {
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
  blk_hero_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: true,
    hasVideo: true,
    allowedActions: ['NAVIGATE_PAGE', 'OPEN_URL', 'CALL_PHONE', 'OPEN_KAKAO', 'SCROLL_TO_BLOCK', 'SHOW_MODAL', 'CUSTOM_INTERACTION'],
  },
  blk_txt_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
  },
  blk_share_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    hasVideo: false,
    allowedActions: ['OPEN_KAKAO', 'COPY_TO_CLIPBOARD', 'OPEN_URL'],
  },
  blk_video_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: true,
  },
  blk_dday_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'DDAY_DATE',
  },
  blk_pricing_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    hasVideo: false,
    allowedActions: ['PG_CHECKOUT', 'NAVIGATE_PAGE', 'OPEN_URL'],
  },
  blk_form_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    hasVideo: false,
    allowedActions: ['SUBMIT_FORM'],
  },
  blk_talk_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    hasVideo: false,
    allowedActions: ['OPEN_KAKAO', 'CALL_PHONE'],
  },
  blk_map_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'MAP_ADDRESS',
  },
  blk_album_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: true,
    hasVideo: false,
  },
  blk_faq_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
  },
  blk_stamp_card_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'STAMP',
  },
  blk_curriculum_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
  },
  blk_like_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
  },
  blk_auth_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
  },
  blk_pay_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    hasVideo: false,
    allowedActions: ['PG_CHECKOUT'],
    customFieldType: 'PAYMENT',
  },
  blk_stats_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
  },
  blk_coupon_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'COUPON',
  },
  blk_consulting_slot_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    hasVideo: false,
    allowedActions: ['SUBMIT_FORM'],
  },
  blk_profile_grid_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: true,
    hasVideo: false,
  },
  blk_feature_grid_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
  },
  blk_content_card_grid_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: true,
    hasVideo: false,
    allowedActions: ['NAVIGATE_PAGE', 'OPEN_URL', 'SHOW_MODAL'],
  },
  blk_board_list_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    hasVideo: false,
    allowedActions: ['NAVIGATE_PAGE', 'SHOW_MODAL'],
    customFieldType: 'BOARD_VIEW_TYPE',
  },
  blk_feed_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: true,
    hasButtonAction: true,
    hasImage: false,
    allowedActions: ['SHOW_MODAL', 'NAVIGATE_PAGE', 'OPEN_URL', 'SUBMIT_FORM'],
  },
  blk_progress_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    customFieldType: 'PROGRESS',
  },
  blk_chart_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    customFieldType: 'CHART',
  },
  blk_poll_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'POLL_OPTIONS',
  },
  blk_action_list_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'ACTION_ITEMS',
  },
  blk_calendar_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'CALENDAR_EVENTS',
  },
  blk_table_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'TABLE_DATA',
  },
  blk_timeline_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'TIMELINE_ITEMS',
  },
  blk_file_download_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasButtonAction: false, // 다운로드 버튼이 리스트에 이미 포함됨
    hasImage: false,
    hasVideo: false,
    customFieldType: 'FILE_ITEMS',
  },
  blk_review_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'REVIEW_ITEMS',
  },
  blk_ranking_01: {
    hasTitle: true,
    hasSubtitle: true,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'RANKING_ITEMS',
  },
  blk_floating_button_01: {
    hasTitle: false,
    hasSubtitle: false,
    hasButton: false,
    hasImage: false,
    hasVideo: false,
    customFieldType: 'FLOATING_BUTTON',
  },
}

export default function SidePropertyPanel() {
  const { selectedInstanceId, canvasBlocks, updateBlockInputData, projectType, deviceViewport, isPreviewMode, pages, addPage } = useBuilderStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
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

  const isActionAllowed = (action: string) => {
    if (!cap.allowedActions) return true
    return cap.allowedActions.includes(action)
  }

  const handleChange = (field: string, value: any) => {
    updateBlockInputData(selectedInstanceId, { [field]: value })
  }

  const handleImageFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      if (dataUrl) {
        handleChange('imageUrl', dataUrl)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleImageFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-sm">블록 속성 편집</h3>
        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">{block.name}</span>
      </div>
      
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        
        {(cap.hasTitle || cap.hasSubtitle) && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">콘텐츠</h4>
            
            {cap.hasTitle && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">타이틀</label>
                <input 
                  type="text" 
                  value={config.title || ''} 
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="타이틀 입력"
                />
              </div>
            )}
            
            {cap.hasSubtitle && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">서브카피</label>
                <textarea 
                  value={config.subtitle || ''} 
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm min-h-[80px] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="서브카피 입력"
                />
              </div>
            )}
          </div>
        )}

        {/* 블록 전용 맞춤 커스텀 필드 */}
        {cap.customFieldType && cap.customFieldType !== 'NONE' && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">블록 맞춤 설정</h4>
            
            {cap.customFieldType === 'MAP_ADDRESS' && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">📍 지도 표시 주소</label>
                <input 
                  type="text" 
                  value={config.mapAddress || '서울특별시 강남구 테헤란로 123'} 
                  onChange={(e) => handleChange('mapAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500"
                  placeholder="주소 입력 (예: 서울시 강남구 테헤란로 123)"
                />
              </div>
            )}

            {cap.customFieldType === 'DDAY_DATE' && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">⏰ 카운트다운 목표 날짜</label>
                <input 
                  type="datetime-local" 
                  value={config.targetDate ? new Date(config.targetDate).toISOString().slice(0, 16) : ''} 
                  onChange={(e) => handleChange('targetDate', new Date(e.target.value).toISOString())}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            )}

            {cap.customFieldType === 'COUPON' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">🎁 할인 혜택 문구</label>
                  <input 
                    type="text" 
                    value={config.discountText || '10% 할인'} 
                    onChange={(e) => handleChange('discountText', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="예: 10% 할인"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">⏳ 유효 기간 안내</label>
                  <input 
                    type="text" 
                    value={config.expiryText || '발급 후 30일 유효'} 
                    onChange={(e) => handleChange('expiryText', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="예: 발급 후 30일 유효"
                  />
                </div>
              </div>
            )}

            {cap.customFieldType === 'STAMP' && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">🏆 완점 달성 보상 안내</label>
                <input 
                  type="text" 
                  value={config.rewardText || '10회 방문 쿠폰 증정 🎁'} 
                  onChange={(e) => handleChange('rewardText', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="예: 무료 아메리카노 쿠폰 증정"
                />
              </div>
            )}

            {cap.customFieldType === 'PAYMENT' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">📦 상품/서비스 이름</label>
                  <input 
                    type="text" 
                    value={config.productName || '월정액 구독권'} 
                    onChange={(e) => handleChange('productName', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="예: 프리미엄 수강권"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">💳 표시 결제 금액</label>
                  <input 
                    type="text" 
                    value={config.price || '29,000'} 
                    onChange={(e) => handleChange('price', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="예: 29,000"
                  />
                </div>
              </div>
            )}

            {cap.customFieldType === 'BOARD_VIEW_TYPE' && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">게시판 뷰 타입</label>
                <select
                  value={config.boardViewType || 'table'}
                  onChange={(e) => handleChange('boardViewType', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white"
                >
                  <option value="table">테이블형 (목록)</option>
                  <option value="gallery">갤러리형 (썸네일 위주)</option>
                  <option value="list">리스트형 (블로그 스타일)</option>
                </select>
              </div>
            )}

            {cap.customFieldType === 'PROGRESS' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">🔥 진행률 라벨</label>
                  <input 
                    type="text" 
                    value={config.progressLabel || '진행률'} 
                    onChange={(e) => handleChange('progressLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">현재 수치</label>
                    <input 
                      type="number" 
                      value={config.progressValue ?? 65} 
                      onChange={(e) => handleChange('progressValue', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">목표 수치</label>
                    <input 
                      type="number" 
                      value={config.progressTarget ?? 100} 
                      onChange={(e) => handleChange('progressTarget', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">수치 단위</label>
                  <input 
                    type="text" 
                    value={config.progressUnit || '%'} 
                    onChange={(e) => handleChange('progressUnit', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
              </div>
            )}

            {cap.customFieldType === 'CHART' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">📈 차트 타입</label>
                  <select
                    value={config.chartType || 'bar'}
                    onChange={(e) => handleChange('chartType', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white"
                  >
                    <option value="bar">막대(Bar) 차트</option>
                    <option value="dot">점(Dot) 차트</option>
                    <option value="line">라인(Line) 차트</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">🎨 차트 포인트 색상</label>
                  <input 
                    type="color" 
                    value={config.chartColor || '#0284C7'} 
                    onChange={(e) => handleChange('chartColor', e.target.value)}
                    className="w-full h-10 border border-slate-300 rounded-md p-1"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">🏷️ 범례 라벨</label>
                  <input 
                    type="text" 
                    value={config.legendLabel || '수치'} 
                    onChange={(e) => handleChange('legendLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
              </div>
            )}

            {['POLL_OPTIONS', 'ACTION_ITEMS', 'CALENDAR_EVENTS', 'TABLE_DATA', 'TIMELINE_ITEMS', 'FILE_ITEMS', 'REVIEW_ITEMS', 'RANKING_ITEMS', 'FLOATING_BUTTON'].includes(cap.customFieldType || '') && (
              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
                  <span>고급 데이터 편집 (JSON)</span>
                </label>
                <textarea 
                  key={`${block.instanceId}-${cap.customFieldType}`}
                  defaultValue={JSON.stringify(
                    cap.customFieldType === 'POLL_OPTIONS' ? (config.pollOptions || [
                      { id: '1', label: '제육볶음', votes: 15, percentage: 45 },
                      { id: '2', label: '돈까스', votes: 12, percentage: 35 },
                      { id: '3', label: '순대국', votes: 7, percentage: 20 },
                    ]) :
                    cap.customFieldType === 'ACTION_ITEMS' ? (config.actionItems || [
                      { id: '1', title: '컨디션은 좋으신가요?', description: '어제 푹 주무셨는지 체크해주세요', controlType: 'switch', defaultChecked: true },
                      { id: '2', title: '오늘 외출 약속이 있나요?', controlType: 'switch', defaultChecked: false },
                      { id: '3', title: '긴급 연락처 등록', description: '응급 시 보호자에게 알림이 갑니다', controlType: 'button', buttonText: '등록하기' },
                    ]) :
                    cap.customFieldType === 'CALENDAR_EVENTS' ? (config.calendarEvents || [
                      { id: '1', date: new Date().toISOString().split('T')[0], title: '오늘의 주요 일정', description: '중요한 미팅이 있습니다.', isHighlighted: true },
                      { id: '2', date: '2026-08-15', title: '광복절 행사', isHighlighted: false },
                    ]) :
                    cap.customFieldType === 'TABLE_DATA' ? { 
                      columns: config.tableColumns || [
                        { key: 'name', label: '이름' },
                        { key: 'amount', label: '금액' },
                        { key: 'status', label: '상태' }
                      ], 
                      data: config.tableData || [
                        { name: '김철수', amount: '50,000원', status: '완료' },
                        { name: '이영희', amount: '35,000원', status: '대기' }
                      ] 
                    } :
                    cap.customFieldType === 'TIMELINE_ITEMS' ? (config.timelineItems || [
                      { id: '1', date: '2026.08.01', title: '프로젝트 시작', description: '킥오프 미팅 진행', status: 'completed' },
                      { id: '2', date: '2026.08.15', title: '중간 점검', status: 'in-progress' },
                      { id: '3', date: '2026.08.30', title: '최종 마감', status: 'pending' }
                    ]) :
                    cap.customFieldType === 'REVIEW_ITEMS' ? (config.reviewItems || [
                      { id: '1', author: '김수강', rating: 5, content: '정말 유익한 강의였습니다. 실무에 바로 적용할 수 있었어요!', date: '2026.08.10' },
                      { id: '2', author: '이초보', rating: 4, content: '기초부터 탄탄하게 알려주셔서 이해하기 쉬웠습니다.', date: '2026.08.05' },
                      { id: '3', author: '박심화', rating: 5, content: '심화 과정까지 다뤄주셔서 제 실력이 한 단계 업그레이드 된 기분입니다.', date: '2026.08.01' },
                    ]) :
                    cap.customFieldType === 'RANKING_ITEMS' ? (config.rankingItems || [
                      { id: '1', rank: 1, title: 'Supernova', subtitle: '투표수 12,450', score: '99.5' },
                      { id: '2', rank: 2, title: 'How Sweet', subtitle: '투표수 10,200', score: '92.0' },
                      { id: '3', rank: 3, title: 'Bubble Gum', subtitle: '투표수 8,500', score: '88.5' },
                      { id: '4', rank: 4, title: 'Magnetic', subtitle: '투표수 6,300', score: '76.0' },
                      { id: '5', rank: 5, title: '해야 (HEYA)', subtitle: '투표수 5,100', score: '72.5' },
                    ]) :
                    cap.customFieldType === 'FLOATING_BUTTON' ? (config.floatingButton || {
                      icon: 'message',
                      text: '빠른 상담',
                      actionType: 'OPEN_MODAL',
                    }) :
                    (config.fileItems || [
                      { id: '1', name: '이용가이드.pdf', size: '2.5MB' },
                      { id: '2', name: '신청서_양식.docx', size: '1.1MB' }
                    ]), null, 2
                  )}
                  onBlur={(e) => {
                    try { 
                      const parsed = JSON.parse(e.target.value)
                      if (cap.customFieldType === 'POLL_OPTIONS') handleChange('pollOptions', parsed)
                      if (cap.customFieldType === 'ACTION_ITEMS') handleChange('actionItems', parsed)
                      if (cap.customFieldType === 'CALENDAR_EVENTS') handleChange('calendarEvents', parsed)
                      if (cap.customFieldType === 'TABLE_DATA') {
                        handleChange('tableColumns', parsed.columns || [])
                        handleChange('tableData', parsed.data || [])
                      }
                      if (cap.customFieldType === 'TIMELINE_ITEMS') handleChange('timelineItems', parsed)
                      if (cap.customFieldType === 'FILE_ITEMS') handleChange('fileItems', parsed)
                      if (cap.customFieldType === 'REVIEW_ITEMS') handleChange('reviewItems', parsed)
                      if (cap.customFieldType === 'RANKING_ITEMS') handleChange('rankingItems', parsed)
                      if (cap.customFieldType === 'FLOATING_BUTTON') handleChange('floatingButton', parsed)
                    } catch (err) {
                      // ignore parse errors while typing
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono h-48 bg-slate-900 text-green-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  placeholder="JSON 데이터를 입력하세요"
                />
                <p className="text-[10px] text-slate-400 leading-tight">주의: 유효한 JSON 형식으로 입력한 뒤 입력창 밖을 클릭하면 캔버스에 즉시 반영됩니다.</p>
              </div>
            )}
          </div>
        )}

        {/* 버튼 속성 및 액션 */}
        {cap.hasButton && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">버튼 설정</h4>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">버튼 문구</label>
              <input 
                type="text" 
                value={config.buttonText || ''} 
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="버튼 문구 입력"
              />
            </div>

            {/* 버튼 액션이 유효한 블록일 때만 액션 선택창 노출 */}
            {cap.hasButtonAction && (
              <>
                <div className="space-y-1.5 pt-2">
                  <label className="text-sm font-medium text-slate-700">이 버튼을 누르면 어떤 동작을 하나요?</label>
                  <select
                    value={config.actionType || ''}
                    onChange={(e) => handleChange('actionType', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="">-- 동작 선택 --</option>
                    {isActionAllowed('NAVIGATE_PAGE') && <option value="NAVIGATE_PAGE">📄 내 사이트 다른 화면으로 이동</option>}
                    {isActionAllowed('OPEN_URL') && <option value="OPEN_URL">🔗 외부 링크 열기 (새창)</option>}
                    {isActionAllowed('SCROLL_TO_BLOCK') && <option value="SCROLL_TO_BLOCK">⬇️ 특정 화면 영역으로 스크롤</option>}
                    {isActionAllowed('CALL_PHONE') && <option value="CALL_PHONE">📞 전화 걸기</option>}
                    {isActionAllowed('OPEN_KAKAO') && <option value="OPEN_KAKAO">💬 카카오톡 오픈채팅/채널 연결</option>}
                    {isActionAllowed('SHOW_MODAL') && <option value="SHOW_MODAL">🔔 안내 모달(팝업) 띄우기</option>}
                    {isActionAllowed('SUBMIT_FORM') && <option value="SUBMIT_FORM">📩 신청/문의 폼 제출 및 카톡 알림</option>}
                    {isActionAllowed('PG_CHECKOUT') && <option value="PG_CHECKOUT">💳 신용카드/카카오페이 결제창 열기</option>}
                    {isActionAllowed('DOWNLOAD_FILE') && <option value="DOWNLOAD_FILE">💾 파일 다운로드 (안내장 등)</option>}
                    {isActionAllowed('COPY_TO_CLIPBOARD') && <option value="COPY_TO_CLIPBOARD">📋 주소나 텍스트 복사하기</option>}
                    {isActionAllowed('CUSTOM_INTERACTION') && <option value="CUSTOM_INTERACTION">✨ 커스텀 효과 / 대상 인터랙션 적용</option>}
                  </select>
                </div>

                {/* 2단계: Progressive Disclosure (선택한 actionType에 따른 조건부 렌더링) */}
                {config.actionType === 'NAVIGATE_PAGE' && (
                  <div className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-lg mt-2">
                    <label className="text-xs font-semibold text-slate-600">이동할 내 사이트 화면</label>
                    <select
                      value={config.buttonLink || ''}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === '__CREATE_NEW__') {
                          const title = prompt('새 화면의 이름(한글 가능)을 입력해 주세요:')
                          if (title && title.trim()) {
                            const rawSlug = prompt('주소에 사용될 영문 주소(소문자/하이픈)를 입력해 주세요 (예: contact, about):')
                            if (rawSlug && rawSlug.trim()) {
                              const newId = addPage(title.trim(), rawSlug.trim())
                              const createdPage = useBuilderStore.getState().pages.find((p) => p.id === newId)
                              if (createdPage) handleChange('buttonLink', createdPage.slug)
                            }
                          }
                        } else {
                          handleChange('buttonLink', val)
                        }
                      }}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="">-- 화면 선택 --</option>
                      {pages.map((p) => <option key={p.id} value={p.slug}>{p.title} ({p.slug})</option>)}
                      <option value="__CREATE_NEW__">+ 새 화면 만들고 바로 연결</option>
                    </select>
                  </div>
                )}

                {(config.actionType === 'OPEN_URL' || config.actionType === 'OPEN_KAKAO' || config.actionType === 'DOWNLOAD_FILE') && (
                  <div className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-lg mt-2">
                    <label className="text-xs font-semibold text-slate-600">
                      {config.actionType === 'OPEN_KAKAO' ? '카카오 오픈채팅 링크' : '연결할 URL 주소'}
                    </label>
                    <input type="text" value={config.buttonLink || ''} onChange={(e) => handleChange('buttonLink', e.target.value)} placeholder="https://..." className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
                  </div>
                )}

                {config.actionType === 'CALL_PHONE' && (
                  <div className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-lg mt-2">
                    <label className="text-xs font-semibold text-slate-600">연결할 전화번호</label>
                    <input type="text" value={config.buttonLink || ''} onChange={(e) => handleChange('buttonLink', e.target.value)} placeholder="예: 010-1234-5678" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
                  </div>
                )}

                {config.actionType === 'SUBMIT_FORM' && (
                  <div className="space-y-3 p-3 bg-slate-50 border border-slate-200 rounded-lg mt-2">
                    <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input type="checkbox" checked={config.notifyKakao ?? true} onChange={(e) => handleChange('notifyKakao', e.target.checked)} className="rounded text-sky-500 focus:ring-sky-500" />
                      <span>접수 시 내 카톡으로 알림 받기</span>
                    </label>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">완료 후 보여줄 안내 메시지</label>
                      <input type="text" value={config.thankYouMessage || ''} onChange={(e) => handleChange('thankYouMessage', e.target.value)} placeholder="예: 성공적으로 접수되었습니다!" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
                    </div>
                  </div>
                )}

                {config.actionType === 'PG_CHECKOUT' && (
                  <div className="space-y-3 p-3 bg-slate-50 border border-slate-200 rounded-lg mt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">결제할 상품 금액 (원)</label>
                      <input type="number" value={config.paymentAmount || ''} onChange={(e) => handleChange('paymentAmount', parseInt(e.target.value))} placeholder="예: 50000" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">결제 성공 후 이동할 화면</label>
                      <select value={config.paymentSuccessUrl || ''} onChange={(e) => handleChange('paymentSuccessUrl', e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white">
                        <option value="">-- 화면 선택 --</option>
                        {pages.map((p) => <option key={p.id} value={p.slug}>{p.title}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {config.actionType === 'CUSTOM_INTERACTION' && (
                  <div className="space-y-3 p-3 bg-slate-50 border border-slate-200 rounded-lg mt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">1. 대상 요소(Target) 지정</label>
                      <button className="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-200 text-slate-700 rounded text-xs hover:bg-slate-300 transition-colors">
                        🎯 캔버스에서 대상 찍기
                      </button>
                      <input type="text" value={config.customTargetId || ''} readOnly placeholder="(선택된 대상 블록 ID)" className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs bg-slate-100 text-slate-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">2. 적용할 효과 (Effect)</label>
                      <select value={config.customEffect || ''} onChange={(e) => handleChange('customEffect', e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white">
                        <option value="">-- 효과 선택 --</option>
                        <optgroup label="상태 토글">
                          <option value="TOGGLE_VISIBILITY">👁️ 숨기기 / 보여주기 토글</option>
                        </optgroup>
                        <optgroup label="색상 강조">
                          <option value="COLOR_PRIMARY">🎨 브랜드 색상으로 칠하기</option>
                          <option value="COLOR_DANGER">🔴 붉은색(경고)으로 칠하기</option>
                        </optgroup>
                        <optgroup label="애니메이션">
                          <option value="FADE_IN">✨ 서서히 나타나기 (Fade In)</option>
                          <option value="SHAKE">👋 흔들림 (Shake)</option>
                        </optgroup>
                      </select>
                    </div>
                    
                    <details className="mt-2 group">
                      <summary className="text-[10px] text-sky-600 cursor-pointer hover:underline outline-none">⚡ 고급: 커스텀 JS 이벤트 코드 작성</summary>
                      <div className="mt-2">
                        <textarea 
                          value={config.customCode || ''} 
                          onChange={(e) => handleChange('customCode', e.target.value)}
                          placeholder="target.style.backgroundColor = 'blue';" 
                          className="w-full h-24 px-2 py-1.5 border border-slate-300 rounded text-[10px] font-mono bg-slate-900 text-green-400 focus:outline-none"
                        />
                        <p className="text-[9px] text-slate-400 mt-1 leading-tight">개발자용: 버튼의 onClick 컨텍스트 내에서 동작합니다.</p>
                      </div>
                    </details>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* 미디어 / 이미지 업로드 속성 */}
        {(cap.hasImage || cap.hasVideo) && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">미디어 & 배경 이미지</h4>
            
            {/* 이미지 업로드 컨트롤 */}
            {cap.hasImage && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">대표 / 배경 이미지 업로드</label>
                
                {/* 썸네일 미리보기 */}
                {config.imageUrl ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={config.imageUrl} 
                      alt="업로드 이미지 미리보기" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-md hover:bg-slate-100"
                      >
                        변경
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleChange('imageUrl', '')}
                        className="px-2.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded-md hover:bg-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 드래그앤드롭 업로드 구역 */
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-6 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all flex flex-col items-center justify-center cursor-pointer text-center px-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <span className="text-xs font-semibold text-slate-700">클릭하거나 이미지를 드롭하세요</span>
                    <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP 지원</span>
                  </div>
                )}

                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden"
                />

                {/* URL 직접 입력 fallback */}
                <div className="pt-1">
                  <input 
                    type="text" 
                    value={config.imageUrl || ''} 
                    onChange={(e) => handleChange('imageUrl', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs font-mono text-slate-600 placeholder:font-sans focus:outline-none focus:border-sky-500"
                    placeholder="또는 이미지 URL 직접 입력 (https://...)"
                  />
                </div>
              </div>
            )}

            {cap.hasVideo && (
              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium text-slate-700">비디오 URL (YouTube/Vimeo)</label>
                <input 
                  type="text" 
                  value={config.videoUrl || ''} 
                  onChange={(e) => handleChange('videoUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="https://..."
                />
              </div>
            )}
          </div>
        )}

        {/* 스타일 속성 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">스타일</h4>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">배경 색상</label>
            <div className="flex space-x-2">
              <input 
                type="color" 
                value={config.backgroundColor || '#ffffff'} 
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-10 h-10 rounded border border-slate-300 cursor-pointer p-1"
              />
              <input 
                type="text" 
                value={config.backgroundColor || '#ffffff'} 
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm uppercase"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">텍스트 색상</label>
            <div className="flex space-x-2">
              <input 
                type="color" 
                value={config.textColor || '#0f172a'} 
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="w-10 h-10 rounded border border-slate-300 cursor-pointer p-1"
              />
              <input 
                type="text" 
                value={config.textColor || '#0f172a'} 
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm uppercase"
              />
            </div>
          </div>
        </div>

        <RevisionMeter originalTier={block.tier} />
      </div>
    </div>
  )
}
