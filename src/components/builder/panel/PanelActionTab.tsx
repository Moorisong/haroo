import React, { useState, useEffect } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ACTION_OPTIONS, PANEL_LABELS } from './constants'
import type { BlockInputConfig } from '@/types'
import type { BlockCapability } from '../SidePropertyPanel'

interface PanelActionTabProps {
  cap: BlockCapability
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

export default function PanelActionTab({ cap, config, handleChange }: PanelActionTabProps) {
  const { pages, canvasBlocks, highlightPageSwitcher } = useBuilderStore()
  const [selectedBtnIndex, setSelectedBtnIndex] = useState<number>(0)

  const isActionAllowed = (action: string) => {
    if (!cap.allowedActions) return true
    return cap.allowedActions.includes(action)
  }

  // Ensure config.buttons array is initialized or sync with legacy buttonText/actionType
  const buttons = config.buttons && config.buttons.length > 0 ? config.buttons : [
    {
      id: 'btn_primary',
      text: config.buttonText || '버튼 1',
      variant: 'primary',
      actionType: config.actionType || '',
      buttonLink: config.buttonLink || '',
      notifyKakao: config.notifyKakao,
      thankYouMessage: config.thankYouMessage,
      paymentAmount: config.paymentAmount,
      paymentSuccessUrl: config.paymentSuccessUrl,
      customTargetId: config.customTargetId,
      customEffect: config.customEffect
    }
  ]

  const currentBtn = buttons[selectedBtnIndex] || buttons[0]

  useEffect(() => {
    if (currentBtn?.actionType === 'NAVIGATE_PAGE' && pages.length <= 1) {
      highlightPageSwitcher(true)
    }
  }, [currentBtn?.actionType, pages.length, highlightPageSwitcher])

  const handleUpdateButton = (field: string, value: any) => {
    const updatedButtons = [...buttons]
    updatedButtons[selectedBtnIndex] = {
      ...updatedButtons[selectedBtnIndex],
      [field]: value
    }
    handleChange('buttons', updatedButtons)

    // Legacy sync for single button compatibility
    if (selectedBtnIndex === 0) {
      handleChange(field, value)
    }
  }

  const handleAddButton = () => {
    if (buttons.length >= 3) return
    const newBtn = {
      id: `btn_${Date.now()}`,
      text: `보조 버튼 ${buttons.length}`,
      variant: 'outline',
      actionType: 'OPEN_URL'
    }
    const updated = [...buttons, newBtn]
    handleChange('buttons', updated)
    setSelectedBtnIndex(updated.length - 1)
  }

  const handleRemoveButton = (index: number) => {
    if (buttons.length <= 1) return
    const updated = buttons.filter((_: any, i: number) => i !== index)
    handleChange('buttons', updated)
    setSelectedBtnIndex(0)
  }

  return (
    <div className="space-y-6">
      {cap.hasButton && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{PANEL_LABELS.SECTION_ACTION}</h4>

          {/* Button Selection Chip Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600">편집할 버튼 선택</label>
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg">
              {buttons.map((btn: any, idx: number) => (
                <button
                  key={btn.id || idx}
                  onClick={() => setSelectedBtnIndex(idx)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${selectedBtnIndex === idx ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <span>{idx === 0 ? '🔵 주 버튼' : `⚪ 버튼 ${idx + 1}`}</span>
                  {buttons.length > 1 && idx > 0 && (
                    <span onClick={(e) => { e.stopPropagation(); handleRemoveButton(idx) }} className="ml-1 text-slate-400 hover:text-red-500">×</span>
                  )}
                </button>
              ))}
              {buttons.length < 3 && (
                <button
                  onClick={handleAddButton}
                  className="px-2 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50 rounded-md"
                >
                  + 추가
                </button>
              )}
            </div>
          </div>

          {/* Active Button Settings */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.BUTTON_TEXT}</label>
              <input 
                type="text" 
                value={currentBtn.text || ''} 
                onChange={(e) => handleUpdateButton('text', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500"
                placeholder="버튼 문구 입력"
              />
            </div>

            {cap.hasButtonAction && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.ACTION_TYPE}</label>
                <select
                  value={currentBtn.actionType || ''}
                  onChange={(e) => handleUpdateButton('actionType', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:border-sky-500"
                >
                  <option value="">-- 동작 선택 --</option>
                  {Object.entries(ACTION_OPTIONS).map(([key, label]) => (
                    isActionAllowed(key) ? <option key={key} value={key}>{label}</option> : null
                  ))}
                </select>
              </div>
            )}

            {/* 1. NAVIGATE_PAGE */}
            {currentBtn.actionType === 'NAVIGATE_PAGE' && (
              <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">이동할 내 사이트 화면</label>
                {pages.length <= 1 ? (
                  <div className="p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-xl flex flex-col gap-1.5 text-indigo-900">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900">
                      <span className="text-sm leading-none">💡</span>
                      <span>연결 가능한 다른 화면이 없습니다</span>
                    </div>
                    <p className="text-[11px] text-indigo-600/90 leading-relaxed">
                      현재 추가로 연결할 수 있는 화면이 없어요.
                      <br />
                      새로운 화면을 추가해주세요.
                    </p>
                  </div>
                ) : (
                  <select
                    value={currentBtn.buttonLink || ''}
                    onChange={(e) => handleUpdateButton('buttonLink', e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="">-- 화면 선택 --</option>
                    {pages.map((p) => <option key={p.id} value={p.slug}>{p.title} ({p.slug})</option>)}
                  </select>
                )}
              </div>
            )}

            {/* 2. OPEN_URL */}
            {currentBtn.actionType === 'OPEN_URL' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">연결할 링크 (URL)</label>
                <input type="text" value={currentBtn.buttonLink || ''} onChange={(e) => handleUpdateButton('buttonLink', e.target.value)} placeholder="https://..." className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            )}

            {/* 3. SCROLL_TO_BLOCK */}
            {currentBtn.actionType === 'SCROLL_TO_BLOCK' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">이동할 화면 영역 (블록)</label>
                {canvasBlocks.length === 0 ? (
                  <p className="text-xs text-slate-500">화면에 배치된 블록이 없습니다.</p>
                ) : (
                  <select
                    value={currentBtn.customTargetId || ''}
                    onChange={(e) => handleUpdateButton('customTargetId', e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="">-- 이동할 블록 선택 --</option>
                    {canvasBlocks.map((b: any, idx: number) => (
                      <option key={`panel-block-opt-${b.instanceId || idx}`} value={b.instanceId}>
                        {idx + 1}. {b.name || b.blockId || '영역'}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* 4. CALL_PHONE */}
            {currentBtn.actionType === 'CALL_PHONE' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">연결할 전화번호</label>
                <input type="tel" value={currentBtn.buttonLink || ''} onChange={(e) => handleUpdateButton('buttonLink', e.target.value)} placeholder="예: 010-0000-0000" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            )}

            {/* 5. OPEN_KAKAO */}
            {currentBtn.actionType === 'OPEN_KAKAO' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">카카오 오픈채팅 / 채널 링크</label>
                <input type="text" value={currentBtn.buttonLink || ''} onChange={(e) => handleUpdateButton('buttonLink', e.target.value)} placeholder="예: https://open.kakao.com/..." className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            )}

            {/* 6. COPY_TO_CLIPBOARD */}
            {currentBtn.actionType === 'COPY_TO_CLIPBOARD' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">복사될 주소 / 텍스트</label>
                <input type="text" value={currentBtn.buttonLink || ''} onChange={(e) => handleUpdateButton('buttonLink', e.target.value)} placeholder="예: 국민 123456-04-123456" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            )}

            {/* 7. DOWNLOAD_FILE */}
            {currentBtn.actionType === 'DOWNLOAD_FILE' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">다운로드 파일 URL</label>
                <input type="text" value={currentBtn.buttonLink || ''} onChange={(e) => handleUpdateButton('buttonLink', e.target.value)} placeholder="https://..." className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            )}

            {/* 8. SHOW_MODAL */}
            {currentBtn.actionType === 'SHOW_MODAL' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-slate-600">팝업 안내 문구</label>
                <textarea rows={2} value={currentBtn.thankYouMessage || ''} onChange={(e) => handleUpdateButton('thankYouMessage', e.target.value)} placeholder="예: 신청이 완료되었습니다." className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs resize-none" />
              </div>
            )}

            {/* 9. SHARE_PAGE */}
            {currentBtn.actionType === 'SHARE_PAGE' && (
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col gap-1.5 text-slate-600 animate-in fade-in duration-200 mt-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700">
                  <span className="text-sm leading-none">💡</span>
                  <span>페이지 공유 안내</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  클릭 시 기기의 스마트폰 기본 공유창이 열리거나 현재 주소가 복사됩니다.
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
