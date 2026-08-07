'use client'

import React, { useRef } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'

export default function SidePropertyPanel() {
  const { selectedInstanceId, canvasBlocks, updateBlockInputData } = useBuilderStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  if (!selectedInstanceId) {
    return (
      <div className="w-80 h-full bg-slate-50 border-l border-slate-200 p-6 flex items-center justify-center text-slate-400 text-sm text-center">
        캔버스에서 블록을 선택하면<br/>속성을 편집할 수 있습니다.
      </div>
    )
  }

  const block = canvasBlocks.find(b => b.instanceId === selectedInstanceId)
  if (!block) return null

  const config = block.inputConfig || {}

  const handleChange = (field: string, value: any) => {
    updateBlockInputData(selectedInstanceId, { [field]: value })
  }

  // 파일 선택/드롭을 통한 이미지 처리 (DataURL 0.01초 실시간 인코딩)
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
        
        {/* 공통 텍스트 속성 */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">콘텐츠</h4>
          
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
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">서브카피</label>
            <textarea 
              value={config.subtitle || ''} 
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm min-h-[80px] focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="서브카피 입력"
            />
          </div>

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
        </div>

        {/* 미디어 / 이미지 업로드 속성 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">미디어 & 배경 이미지</h4>
          
          {/* 이미지 업로드 컨트롤 */}
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
        </div>

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

      </div>
    </div>
  )
}
