'use client'

import React from 'react'
import { MessageCircle, HelpCircle, Phone, ArrowUp } from 'lucide-react'
import type { BlockInputConfig } from '@/types'
import { useBlockContext } from '@/contexts/BlockContext'

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

  const blockContext = useBlockContext()
  // 빌더 내부(BlockContext 존재)이거나 isPreview가 참이면 캔버스/블록 내부 absolute로 고정하여 우측 옵션창을 가리지 않도록 함
  const isInsideBuilder = !!blockContext || isPreview

  const positionClass = isInsideBuilder 
    ? 'relative flex justify-end items-center z-10 w-auto h-auto pointer-events-auto' 
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
