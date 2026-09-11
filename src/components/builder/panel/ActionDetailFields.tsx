'use client'

import React from 'react'
import type { Page } from '@/stores/useBuilderStore'
import ModalIconSelector from './ModalIconSelector'

interface Props {
  actionType: string
  buttonLink?: string
  customTargetId?: string
  thankYouMessage?: string
  modalIcon?: string
  downloadFileName?: string
  downloadFileSize?: string
  pages: Page[]
  canvasBlocks: any[]
  onUpdate: (field: string, value: any) => void
  onUpdateMultiple?: (updates: Record<string, any>) => void
}

export default function ActionDetailFields({
  actionType,
  buttonLink,
  customTargetId,
  thankYouMessage,
  modalIcon = 'none',
  pages,
  canvasBlocks,
  onUpdate,
}: Props) {
  return (
    <>
      {/* 1. NAVIGATE_PAGE */}
      {actionType === 'NAVIGATE_PAGE' && (
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
              value={buttonLink || ''}
              onChange={(e) => onUpdate('buttonLink', e.target.value)}
              className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:border-sky-500"
            >
              <option value="">-- 화면 선택 --</option>
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
      {actionType === 'OPEN_URL' && (
        <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-600">연결할 링크 (URL)</label>
          <input
            type="text"
            value={buttonLink || ''}
            onChange={(e) => onUpdate('buttonLink', e.target.value)}
            placeholder="https://"
            className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
          />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            💡 홈페이지 웹주소 외에도 카카오톡 오픈채팅, 네이버 예약, SNS 등 원하는 외부 링크를 입력할 수 있습니다.
          </p>
        </div>
      )}

      {/* 3. SCROLL_TO_BLOCK */}
      {actionType === 'SCROLL_TO_BLOCK' && (
        <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-600">이동할 화면 영역 (블록)</label>
          {canvasBlocks.length === 0 ? (
            <p className="text-xs text-slate-500">화면에 배치된 블록이 없습니다.</p>
          ) : (
            <select
              value={customTargetId || ''}
              onChange={(e) => onUpdate('customTargetId', e.target.value)}
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
      {actionType === 'CALL_PHONE' && (
        <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-600">연결할 전화번호</label>
          <input
            type="tel"
            value={buttonLink || ''}
            onChange={(e) => onUpdate('buttonLink', e.target.value)}
            placeholder="예: 010-0000-0000"
            className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
          />
        </div>
      )}

      {/* 6. COPY_TO_CLIPBOARD */}
      {actionType === 'COPY_TO_CLIPBOARD' && (
        <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-600">복사할 텍스트</label>
          <input
            type="text"
            value={buttonLink || ''}
            onChange={(e) => onUpdate('buttonLink', e.target.value)}
            placeholder="예: 국민 123-45-67890 또는 매장 주소"
            className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
          />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            💡 계좌번호, 매장 주소 등 복사되길 원하는 텍스트를 입력하세요.
          </p>
        </div>
      )}

      {/* 8. SHOW_MODAL */}
      {actionType === 'SHOW_MODAL' && (
        <div className="space-y-2.5 pt-1 animate-in fade-in duration-200">
          <ModalIconSelector
            selectedId={modalIcon}
            onChange={(id) => onUpdate('modalIcon', id)}
          />

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">팝업 내용</label>
              <span className={`text-[11px] font-mono ${(thankYouMessage || '').length >= 500 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                {(thankYouMessage || '').length}/500자
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={500}
              value={thankYouMessage || ''}
              onChange={(e) => onUpdate('thankYouMessage', e.target.value)}
              placeholder="예: [주차 안내] 건물 뒤편 지하 주차장을 2시간 무료로 이용하실 수 있습니다. 또는 공지사항, 혜택, 이벤트 내용을 자유롭게 입력하세요."
              className="w-full px-2.5 py-2 border border-slate-300 rounded text-xs resize-none focus:outline-none focus:border-sky-500 leading-relaxed"
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              💡 안내, 공지, 쿠폰, 이벤트 혜택 등 방문자가 화면 이동 없이 즉시 확인할 수 있는 모달 팝업이 뜹니다.
            </p>
          </div>
        </div>
      )}

      {/* 9. SHARE_PAGE */}
      {actionType === 'SHARE_PAGE' && (
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

      {/* 10. APPLY_NOTIFICATION */}
      {actionType === 'APPLY_NOTIFICATION' && (
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex flex-col gap-1.5 text-amber-900 animate-in fade-in duration-200 mt-2">
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900">
            <span className="text-sm leading-none">🔔</span>
            <span>알림 신청 팝업 연동</span>
          </div>
          <p className="text-[11px] text-amber-700 leading-relaxed">
            방문자가 버튼 클릭 시 전화번호를 입력하여 카카오톡 알림을 신청할 수 있는 팝업이 연결됩니다.
          </p>
        </div>
      )}
    </>
  )
}
