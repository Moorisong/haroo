'use client'

/**
 * ActionModal
 * haroo:show-modal 커스텀 이벤트를 구독하여 팝업(모달)을 표시하는 고품질 모달 컴포넌트.
 * 빌더 미리보기 및 실제 배포 사이트 공통으로 사용됩니다.
 */

import React, { useEffect, useState, useCallback } from 'react'
import {
  Info,
  Bell,
  CheckCircle2,
  Sparkles,
  Gift,
  AlertTriangle,
  HelpCircle,
  X,
  Check,
} from 'lucide-react'

interface ModalPayload {
  title?: string
  message: string
  icon?: string
}

const ICON_MAP: Record<string, { component: React.ComponentType<{ size: number; className?: string }>; bg: string; text: string }> = {
  info: { component: Info, bg: 'bg-indigo-50', text: 'text-indigo-600' },
  bell: { component: Bell, bg: 'bg-sky-50', text: 'text-sky-600' },
  check: { component: CheckCircle2, bg: 'bg-emerald-50', text: 'text-emerald-600' },
  sparkles: { component: Sparkles, bg: 'bg-amber-50', text: 'text-amber-500' },
  gift: { component: Gift, bg: 'bg-pink-50', text: 'text-pink-500' },
  alert: { component: AlertTriangle, bg: 'bg-rose-50', text: 'text-rose-500' },
  help: { component: HelpCircle, bg: 'bg-purple-50', text: 'text-purple-600' },
}

export default function ActionModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalPayload | null>(null)

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const handleShowModal = (e: Event) => {
      const customEvent = e as CustomEvent<ModalPayload>
      if (customEvent.detail) {
        const rawMessage = customEvent.detail.message || ''
        let title = customEvent.detail.title || ''
        let message = rawMessage
        const icon = customEvent.detail.icon || 'none'

        // 메시지가 [제목] 으로 시작하는 경우에만 제목을 추출하고, 없으면 본문만 노출
        const titleMatch = rawMessage.match(/^\[([^\]]+)\]\s*([\s\S]*)$/)
        if (titleMatch) {
          title = titleMatch[1].trim()
          message = titleMatch[2].trim()
        }

        setModalData({ title, message, icon })
        setIsOpen(true)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('haroo:show-modal', handleShowModal)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('haroo:show-modal', handleShowModal)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

  if (!isOpen || !modalData) return null

  const selectedIcon = modalData.icon && ICON_MAP[modalData.icon] ? ICON_MAP[modalData.icon] : null
  const IconComponent = selectedIcon?.component

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 헤더: 선택한 아이콘과 닫기 버튼 */}
        <div className="flex items-center justify-between px-6 pt-5 pb-1">
          {selectedIcon && IconComponent ? (
            <div className={`w-10 h-10 rounded-2xl ${selectedIcon.bg} ${selectedIcon.text} flex items-center justify-center shadow-inner`}>
              <IconComponent size={22} className="stroke-[2.2]" />
            </div>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={closeModal}
            aria-label="닫기"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 모달 본문 영역 */}
        <div className="px-6 pb-4 pt-2">
          {modalData.title && (
            <h3 className="text-lg font-bold text-slate-900 mb-2.5 leading-snug">
              {modalData.title}
            </h3>
          )}
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {modalData.message}
            </p>
          </div>
        </div>

        {/* 하단 확인 버튼 */}
        <div className="px-6 pb-6 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Check size={18} />
            <span>확인</span>
          </button>
        </div>
      </div>
    </div>
  )
}
