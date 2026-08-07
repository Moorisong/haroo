'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'

export default function SidePropertyPanel() {
  const { selectedInstanceId, canvasBlocks, updateBlockInputData } = useBuilderStore()
  
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

  const handleChange = (field: string, value: string) => {
    updateBlockInputData(selectedInstanceId, { [field]: value })
  }

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-sm">블록 속성 편집</h3>
        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">{block.name}</span>
      </div>
      
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        
        {/* 공통 텍스트 속성 (예시) */}
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
        </div>

        {/* 미디어 속성 (예시) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">미디어</h4>
          
          <div className="space-y-1.5">
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

        {/* 스타일 속성 (예시) */}
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
        </div>

      </div>
    </div>
  )
}
