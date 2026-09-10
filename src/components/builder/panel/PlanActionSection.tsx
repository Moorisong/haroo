'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ACTION_OPTIONS } from './constants'
import ActionDetailFields from './ActionDetailFields'
import FileUploadField from './FileUploadField'
import type { PricingPlan } from './pricingTypes'

interface Props {
  plan: PricingPlan
  index: number
  onPlanChange: (idx: number, fieldOrUpdates: keyof PricingPlan | Partial<PricingPlan>, value?: any) => void
}

/**
 * 요금제 플랜 카드 개별 버튼 액션 설정 섹션
 * - 내 사이트 다른 화면 이동, 외부 링크, 모달 팝업, 파일 다운로드, 전화, 복사 등 8대 액션 지원
 */
export default function PlanActionSection({ plan, index, onPlanChange }: Props) {
  const { pages, canvasBlocks } = useBuilderStore()
  const actionType = plan.actionType || ''

  // 다른 액션으로 변경하거나 동작 해제 시 이전 액션에서 사용하던 파라미터 값 완전 초기화 (clear)
  const handleActionTypeChange = (newAction: string) => {
    if (newAction === actionType) return

    onPlanChange(index, {
      actionType: newAction,
      buttonLink: '',
      downloadFileUrl: '',
      downloadFileName: '',
      downloadFileSize: '',
      customTargetId: '',
      thankYouMessage: '',
      modalIcon: 'none',
    })
  }

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-slate-700 text-xs flex items-center gap-1">
          <span>⚡ 버튼 클릭 시 동작</span>
        </label>
        {actionType && (
          <button
            type="button"
            onClick={() => handleActionTypeChange('')}
            className="text-[10px] text-rose-500 hover:underline"
          >
            동작 해제
          </button>
        )}
      </div>

      <select
        value={actionType}
        onChange={(e) => handleActionTypeChange(e.target.value)}
        className="border border-slate-300 rounded p-1.5 text-xs bg-white focus:border-sky-500 focus:outline-none font-medium text-slate-700"
      >
        <option value="">동작 없음 (클릭 효과만)</option>
        {Object.entries(ACTION_OPTIONS).map(([val, label]) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </select>

      {actionType && (
        <div className="bg-slate-50/70 p-2 rounded-md border border-slate-200/60 mt-1">
          {actionType === 'DOWNLOAD_FILE' ? (
            <FileUploadField
              fileUrl={plan.downloadFileUrl || plan.buttonLink}
              fileName={plan.downloadFileName}
              fileSize={plan.downloadFileSize}
              onChange={({ fileUrl, fileName, fileSize }) => {
                onPlanChange(index, {
                  buttonLink: fileUrl,
                  downloadFileUrl: fileUrl,
                  downloadFileName: fileName,
                  downloadFileSize: fileSize,
                })
              }}
              onClear={() => {
                onPlanChange(index, {
                  buttonLink: '',
                  downloadFileUrl: '',
                  downloadFileName: '',
                  downloadFileSize: '',
                })
              }}
            />
          ) : (
            <ActionDetailFields
              actionType={actionType}
              buttonLink={plan.buttonLink}
              customTargetId={plan.customTargetId}
              thankYouMessage={plan.thankYouMessage}
              modalIcon={plan.modalIcon}
              pages={pages}
              canvasBlocks={canvasBlocks}
              onUpdate={(field, val) => onPlanChange(index, field as keyof PricingPlan, val)}
            />
          )}
        </div>
      )}
    </div>
  )
}
