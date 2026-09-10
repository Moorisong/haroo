'use client'

import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface UnsavedLeaveWarningModalProps {
  isOpen: boolean
  isSubmitting?: boolean
  onClose: () => void
  onConfirmLeaveWithoutSave: () => void
  onSaveAndLeave: () => void
}

export default function UnsavedLeaveWarningModal({
  isOpen,
  isSubmitting = false,
  onClose,
  onConfirmLeaveWithoutSave,
  onSaveAndLeave,
}: UnsavedLeaveWarningModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-center relative overflow-hidden">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} />
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-2">
          저장되지 않은 변경사항이 있습니다
        </h2>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          이 페이지를 벗어나시겠습니까?<br />
          저장하지 않은 수정 내역은 파기될 수 있습니다.
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={onSaveAndLeave}
            disabled={isSubmitting}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>저장 및 이동 중...</span>
              </>
            ) : (
              '💾 저장하고 이동하기'
            )}
          </button>
          <button
            onClick={onConfirmLeaveWithoutSave}
            disabled={isSubmitting}
            className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            저장하지 않고 이동하기
          </button>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full py-2 text-slate-400 hover:text-slate-600 text-xs font-semibold transition-colors mt-1 disabled:opacity-50"
          >
            취소 (계속 편집)
          </button>
        </div>
      </div>
    </div>
  )
}
