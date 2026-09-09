'use client'

import React, { useEffect } from 'react'
import type { BlockInputConfig } from '@/types'
import type { BlockCapability } from '../SidePropertyPanel'
import { ACTION_OPTIONS } from './constants'
import { useBuilderStore } from '@/stores/useBuilderStore'
import ButtonStyleSection from './ButtonStyleSection'

const ACTION_TYPE_OPTIONS = Object.entries(ACTION_OPTIONS).map(([value, label]) => ({ value, label }))

interface Props {
  cap: BlockCapability
  config: BlockInputConfig & Record<string, any>
  handleChange: (fieldOrData: string | Record<string, any>, value?: any) => void
}

export default function ButtonPropertyPanel({ cap, config, handleChange }: Props) {
  const { pages, canvasBlocks, highlightPageSwitcher } = useBuilderStore()
  const styleData = config.buttonStyle || {}

  useEffect(() => {
    if (config.actionType === 'NAVIGATE_PAGE' && pages.length <= 1) {
      highlightPageSwitcher(true)
    }
  }, [config.actionType, pages.length, highlightPageSwitcher])

  const updateStyle = (key: string, val: string) => {
    handleChange('buttonStyle', { ...styleData, [key]: val })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">버튼 문구</label>
          <span className={`text-[11px] font-medium ${(config.buttonText || '').length >= 25 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
            ({(config.buttonText || '').length}/25자)
          </span>
        </div>
        <input
          type="text"
          maxLength={25}
          value={config.buttonText || ''}
          onChange={(e) => handleChange('buttonText', e.target.value)}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
          placeholder="예: 신청하기, 더 알아보기 (최대 25자)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">버튼 액션 (클릭 시 동작)</label>
        <select
          value={config.actionType || ''}
          onChange={(e) => {
            const nextAction = e.target.value
            if (nextAction !== config.actionType) {
              const updates: Record<string, any> = {
                actionType: nextAction,
                buttonLink: '',
                customTargetId: '',
                thankYouMessage: '',
              }
              if (Array.isArray(config.buttons) && config.buttons.length > 0) {
                updates.buttons = config.buttons.map((btn: any, idx: number) =>
                  idx === 0
                    ? { ...btn, actionType: nextAction, buttonLink: '', customTargetId: '', thankYouMessage: '' }
                    : btn
                )
              }
              handleChange(updates)
            }
          }}
          className="w-full text-sm border border-slate-300 rounded-md p-2"
        >
          <option value="">-- 동작을 선택하세요 --</option>
          {ACTION_TYPE_OPTIONS.filter((opt) => cap.allowedActions?.includes(opt.value)).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 1. NAVIGATE_PAGE */}
      {config.actionType === 'NAVIGATE_PAGE' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">이동할 내 사이트 화면</label>
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
              value={config.buttonLink || ''}
              onChange={(e) => handleChange('buttonLink', e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-md p-2 bg-white"
            >
              <option value="">-- 이동할 화면 선택 --</option>
              {pages.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.title} ({p.slug})
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* 2. OPEN_URL */}
      {config.actionType === 'OPEN_URL' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">연결할 링크 (URL)</label>
          <input
            type="text"
            value={config.buttonLink || ''}
            onChange={(e) => handleChange('buttonLink', e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-md p-2"
            placeholder="https://"
          />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            💡 홈페이지 웹주소 외에도 카카오톡 오픈채팅, 네이버 예약, SNS 등 원하는 외부 링크를 자유롭게 입력할 수 있습니다.
          </p>
        </div>
      )}

      {/* 3. SCROLL_TO_BLOCK */}
      {config.actionType === 'SCROLL_TO_BLOCK' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">이동할 화면 영역 (블록)</label>
          {canvasBlocks.length === 0 ? (
            <p className="text-xs text-slate-500">화면에 배치된 블록이 없습니다.</p>
          ) : (
            <select
              value={config.customTargetId || ''}
              onChange={(e) => handleChange('customTargetId', e.target.value)}
              className="w-full text-sm border border-slate-300 rounded-md p-2 bg-white"
            >
              <option value="">-- 이동할 블록 선택 --</option>
              {canvasBlocks.map((b, idx) => (
                <option key={`block-opt-${b.instanceId || idx}`} value={b.instanceId}>
                  {idx + 1}. {b.name || b.blockId || '영역'}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* 4. CALL_PHONE */}
      {config.actionType === 'CALL_PHONE' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">연결할 전화번호</label>
          <input
            type="tel"
            value={config.buttonLink || ''}
            onChange={(e) => handleChange('buttonLink', e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-md p-2"
            placeholder="예: 010-0000-0000"
          />
        </div>
      )}

      {/* 6. COPY_TO_CLIPBOARD */}
      {config.actionType === 'COPY_TO_CLIPBOARD' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">복사될 주소 / 텍스트</label>
          <input
            type="text"
            value={config.buttonLink || ''}
            onChange={(e) => handleChange('buttonLink', e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-md p-2"
            placeholder="예: 국민 123456-04-123456"
          />
        </div>
      )}

      {/* 7. DOWNLOAD_FILE */}
      {config.actionType === 'DOWNLOAD_FILE' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">다운로드 파일 URL</label>
          <input
            type="text"
            value={config.buttonLink || ''}
            onChange={(e) => handleChange('buttonLink', e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-md p-2"
            placeholder="https://..."
          />
        </div>
      )}

      {/* 8. SHOW_MODAL */}
      {config.actionType === 'SHOW_MODAL' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700">팝업 안내 문구</label>
          <textarea
            rows={2}
            value={config.thankYouMessage || ''}
            onChange={(e) => handleChange('thankYouMessage', e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-md p-2 resize-none"
            placeholder="예: 신청이 완료되었습니다. 담당자가 곧 연락드릴 예정입니다."
          />
        </div>
      )}

      {/* 9. SHARE_PAGE */}
      {config.actionType === 'SHARE_PAGE' && (
        <div className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col gap-1.5 text-slate-600 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700">
            <span className="text-sm leading-none">💡</span>
            <span>페이지 공유 안내</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            버튼을 클릭하면 방문자의 기기(스마트폰) 기본 공유창이 나타나거나, 현재 페이지 주소가 자동으로 복사됩니다.
          </p>
        </div>
      )}

      <ButtonStyleSection styleData={styleData} updateStyle={updateStyle} />
    </div>
  )
}
