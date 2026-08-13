import React, { useState } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ACTION_OPTIONS, CUSTOM_EFFECT_OPTIONS, PANEL_LABELS } from './constants'

interface PanelActionTabProps {
  cap: any
  config: any
  handleChange: (field: string, value: any) => void
}

export default function PanelActionTab({ cap, config, handleChange }: PanelActionTabProps) {
  const { pages, addPage } = useBuilderStore()
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

            {/* Conditional Action Details for Current Button */}
            {currentBtn.actionType === 'NAVIGATE_PAGE' && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-600">이동할 내 사이트 화면</label>
                <select
                  value={currentBtn.buttonLink || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val === '__CREATE_NEW__') {
                      const title = prompt('새 화면의 이름(한글 가능)을 입력해 주세요:')
                      if (title && title.trim()) {
                        const rawSlug = prompt('주소에 사용될 영문 주소(소문자/하이픈)를 입력해 주세요 (예: contact, about):')
                        if (rawSlug && rawSlug.trim()) {
                          const newId = addPage(title.trim(), rawSlug.trim())
                          const createdPage = useBuilderStore.getState().pages.find((p) => p.id === newId)
                          if (createdPage) handleUpdateButton('buttonLink', createdPage.slug)
                        }
                      }
                    } else {
                      handleUpdateButton('buttonLink', val)
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

            {(currentBtn.actionType === 'OPEN_URL' || currentBtn.actionType === 'OPEN_KAKAO' || currentBtn.actionType === 'DOWNLOAD_FILE') && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-600">
                  {currentBtn.actionType === 'OPEN_KAKAO' ? '카카오 오픈채팅 링크' : '연결할 URL 주소'}
                </label>
                <input type="text" value={currentBtn.buttonLink || ''} onChange={(e) => handleUpdateButton('buttonLink', e.target.value)} placeholder="https://..." className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            )}

            {currentBtn.actionType === 'CALL_PHONE' && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-600">연결할 전화번호</label>
                <input type="text" value={currentBtn.buttonLink || ''} onChange={(e) => handleUpdateButton('buttonLink', e.target.value)} placeholder="예: 010-1234-5678" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            )}

            {currentBtn.actionType === 'SUBMIT_FORM' && (
              <div className="space-y-3 pt-1">
                <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={currentBtn.notifyKakao ?? true} onChange={(e) => handleUpdateButton('notifyKakao', e.target.checked)} className="rounded text-sky-500 focus:ring-sky-500" />
                  <span>접수 시 내 카톡으로 알림 받기</span>
                </label>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">완료 후 보여줄 안내 메시지</label>
                  <input type="text" value={currentBtn.thankYouMessage || ''} onChange={(e) => handleUpdateButton('thankYouMessage', e.target.value)} placeholder="예: 성공적으로 접수되었습니다!" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
                </div>
              </div>
            )}

            {currentBtn.actionType === 'PG_CHECKOUT' && (
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">결제할 상품 금액 (원)</label>
                  <input type="number" value={currentBtn.paymentAmount || ''} onChange={(e) => handleUpdateButton('paymentAmount', parseInt(e.target.value))} placeholder="예: 50000" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
