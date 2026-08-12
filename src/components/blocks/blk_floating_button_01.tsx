'use client'

import React from 'react'
import { MessageCircle, HelpCircle, Phone, ArrowUp } from 'lucide-react'
import type { BlockInputConfig } from '@/types'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkFloatingButton01({ config, isPreview, onAction }: Props) {
  const { 
    floatingButton = {
      icon: 'message',
      text: '빠른 상담',
      actionType: 'OPEN_MODAL',
    }
  } = config

  // 플로팅 버튼은 화면 우하단에 고정 (fixed) 되므로 컨테이너 레이아웃(padding 등) 적용 안함.
  // 미리보기(isPreview) 모드일 때는 빌더 캔버스 내부에 absolute로 띄워서 시각적 방해를 줄임.

  const positionClass = isPreview 
    ? 'absolute bottom-4 right-4 z-10' 
    : 'fixed bottom-6 right-6 z-50'

  const getIcon = () => {
    switch(floatingButton.icon) {
      case 'help': return <HelpCircle className="w-6 h-6" />
      case 'phone': return <Phone className="w-6 h-6" />
      case 'up': return <ArrowUp className="w-6 h-6" />
      case 'message':
      default: return <MessageCircle className="w-6 h-6" />
    }
  }

  return (
    <div className={positionClass}>
      <button 
        onClick={() => onAction?.(config, { action: floatingButton.actionType || 'CLICK' })}
        className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white shadow-lg rounded-full px-5 py-3 transition-transform hover:scale-105"
      >
        {getIcon()}
        {floatingButton.text && (
          <span className="font-semibold text-sm sm:text-base">{floatingButton.text}</span>
        )}
      </button>
    </div>
  )
}
