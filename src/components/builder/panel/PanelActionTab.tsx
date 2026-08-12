import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ACTION_OPTIONS, CUSTOM_EFFECT_OPTIONS, PANEL_LABELS } from './constants'

interface PanelActionTabProps {
  cap: any
  config: any
  handleChange: (field: string, value: any) => void
}

export default function PanelActionTab({ cap, config, handleChange }: PanelActionTabProps) {
  const { pages, addPage } = useBuilderStore()

  const isActionAllowed = (action: string) => {
    if (!cap.allowedActions) return true
    return cap.allowedActions.includes(action)
  }

  return (
    <div className="space-y-6">
      {cap.hasButton && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{PANEL_LABELS.SECTION_ACTION}</h4>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.BUTTON_TEXT}</label>
            <input 
              type="text" 
              value={config.buttonText || ''} 
              onChange={(e) => handleChange('buttonText', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="버튼 문구 입력"
            />
          </div>

          {cap.hasButtonAction && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-sm font-medium text-slate-700">{PANEL_LABELS.ACTION_TYPE}</label>
              <select
                value={config.actionType || ''}
                onChange={(e) => handleChange('actionType', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:border-sky-500"
              >
                <option value="">-- 동작 선택 --</option>
                {Object.entries(ACTION_OPTIONS).map(([key, label]) => (
                  isActionAllowed(key) ? <option key={key} value={key}>{label}</option> : null
                ))}
              </select>
            </div>
          )}

          {/* Conditional UI based on actionType */}
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
                  {Object.entries(CUSTOM_EFFECT_OPTIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
