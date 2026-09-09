import React, { useRef } from 'react'
import PanelRepeaterField from './PanelRepeaterField'
import { PANEL_LABELS, BOARD_VIEW_OPTIONS, CHART_TYPE_OPTIONS } from './constants'

interface PanelContentTabProps {
  cap: any
  config: any
  handleChange: (field: string, value: any) => void
}

export default function PanelContentTab({ cap, config, handleChange }: PanelContentTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      if (dataUrl) handleChange('imageUrl', dataUrl)
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  return (
    <div className="space-y-6">
      {(cap.hasTitle || cap.hasSubtitle) && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{PANEL_LABELS.SECTION_CONTENT}</h4>
          
          {cap.hasTitle && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.TITLE}</label>
                <span className={`text-[11px] font-medium ${(config.title || '').length >= 50 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                  ({(config.title || '').length}/50자)
                </span>
              </div>
              <input 
                type="text" 
                maxLength={50}
                value={config.title || ''} 
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="타이틀 입력 (최대 50자)"
              />
            </div>
          )}
          
          {cap.hasSubtitle && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.SUBTITLE}</label>
                <span className={`text-[11px] font-medium ${(config.subtitle || '').length >= 120 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                  ({(config.subtitle || '').length}/120자)
                </span>
              </div>
              <textarea 
                maxLength={120}
                value={config.subtitle || ''} 
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm min-h-[80px] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="서브카피 입력 (최대 120자)"
              />
            </div>
          )}
        </div>
      )}

      {/* 커스텀 필드 (리피터) */}
      {cap.customFieldType && cap.customFieldType !== 'NONE' && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">블록 맞춤 설정</h4>
          
          {cap.customFieldType === 'MAP_ADDRESS' && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">📍 지도 표시 주소</label>
              <input type="text" value={config.mapAddress || ''} onChange={(e) => handleChange('mapAddress', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
            </div>
          )}

          {cap.customFieldType === 'DDAY_DATE' && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">⏰ 카운트다운 목표 날짜</label>
              <input type="datetime-local" value={config.targetDate ? new Date(config.targetDate).toISOString().slice(0, 16) : ''} onChange={(e) => handleChange('targetDate', new Date(e.target.value).toISOString())} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
            </div>
          )}

          {cap.customFieldType === 'BOARD_VIEW_TYPE' && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">게시판 뷰 타입</label>
              <select value={config.boardViewType || 'table'} onChange={(e) => handleChange('boardViewType', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white">
                {Object.entries(BOARD_VIEW_OPTIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          )}

          {/* 리피터 UI 대상 타입들 */}
          {['POLL_OPTIONS', 'ACTION_ITEMS', 'CALENDAR_EVENTS', 'TIMELINE_ITEMS', 'FILE_ITEMS', 'REVIEW_ITEMS', 'RANKING_ITEMS'].includes(cap.customFieldType || '') && (
            <PanelRepeaterField customFieldType={cap.customFieldType} config={config} handleChange={handleChange} />
          )}
        </div>
      )}

      {/* 미디어 / 이미지 업로드 속성 */}
      {(cap.hasImage || cap.hasVideo) && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{PANEL_LABELS.SECTION_MEDIA}</h4>
          
          {cap.hasImage && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">대표 / 배경 이미지 업로드</label>
              {config.imageUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-900">
                  <img src={config.imageUrl} alt="미리보기" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-2.5 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-md hover:bg-slate-100">변경</button>
                    <button type="button" onClick={() => handleChange('imageUrl', '')} className="px-2.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded-md hover:bg-red-700">삭제</button>
                  </div>
                </div>
              ) : (
                <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => fileInputRef.current?.click()} className="w-full py-6 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all flex flex-col items-center justify-center cursor-pointer text-center px-4">
                  <span className="text-xs font-semibold text-slate-700">클릭하거나 이미지를 드롭하세요</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <input type="text" value={config.imageUrl || ''} onChange={(e) => handleChange('imageUrl', e.target.value)} className="w-full mt-1 px-3 py-1.5 border border-slate-200 rounded-md text-xs" placeholder="또는 이미지 URL 직접 입력" />
            </div>
          )}

          {cap.hasVideo && (
            <div className="space-y-1.5 pt-2">
              <label className="text-sm font-medium text-slate-700">비디오 URL</label>
              <input type="text" value={config.videoUrl || ''} onChange={(e) => handleChange('videoUrl', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" placeholder="https://..." />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
