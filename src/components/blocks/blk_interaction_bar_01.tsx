'use client'

import React from 'react'
import { Heart, Share2, AlertTriangle, ShieldOff, MessageSquare, Bookmark } from 'lucide-react'
import AtomText01 from '@/components/atoms/atom_text_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
}

const ICON_MAP: Record<string, React.ReactNode> = {
  heart: <Heart className="w-5 h-5" />,
  share: <Share2 className="w-5 h-5" />,
  alert: <AlertTriangle className="w-5 h-5" />,
  shield: <ShieldOff className="w-5 h-5" />,
  message: <MessageSquare className="w-5 h-5" />,
  bookmark: <Bookmark className="w-5 h-5" />
}

export default function BlkInteractionBar01({ config }: Props) {
  const {
    backgroundColor = '#ffffff',
    textColor = '#475569',
    containerWidth = 'wide',
    paddingY = 'compact',
    alignment = 'center', // 'left', 'center', 'right'
    buttons = [
      { id: 'like', icon: 'heart', label: '좋아요', action: 'like' },
      { id: 'comment', icon: 'message', label: '댓글달기', action: 'comment' },
      { id: 'share', icon: 'share', label: '공유하기', action: 'share' },
      { id: 'report', icon: 'alert', label: '신고', action: 'report', isDanger: true },
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  // 정렬 클래스 맵
  const alignClassMap: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }
  const justifyClass = alignClassMap[alignment as string] || 'justify-center'

  return (
    <div style={{ backgroundColor, color: textColor }} className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass} border-y border-slate-100`}>
      <div className={`${layout.innerClass} flex ${justifyClass} flex-wrap gap-2 sm:gap-4`}>
        {buttons.map((btn: any, i: number) => {
          const isDanger = btn.isDanger
          return (
            <button
              key={i}
              className={`
                flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full
                transition-all duration-200 active:scale-95
                ${isDanger ? 'hover:bg-red-50 text-red-500' : 'hover:bg-slate-50 text-slate-600'}
              `}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  // 범용 이벤트 에밋 (추후 시스템 연동)
                  console.log(`Interaction action triggered: ${btn.action}`)
                  alert(`${btn.label} 동작이 실행되었습니다.`)
                }
              }}
            >
              {ICON_MAP[btn.icon] || <MessageSquare className="w-5 h-5" />}
              {btn.label && (
                <AtomText01 variant="span" className="font-medium text-sm sm:text-base whitespace-nowrap">
                  {btn.label}
                </AtomText01>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
