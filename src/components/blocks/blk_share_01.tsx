'use client'

import React from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from '@/components/common/BlockBackground'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

const SHARE_CHANNELS = [
  { key: 'kakao', label: '카카오톡 공유', icon: '💬', color: '#FEE500', textColor: '#000000' },
  { key: 'copy', label: 'URL 복사', icon: '', color: '#0f172a', textColor: '#ffffff' },
  { key: 'native', label: '기본 공유하기', icon: '', color: '#10b981', textColor: '#ffffff' },
]

export default function BlkShare01({ config, isPreview, onAction }: Props) {
  const safeConfig = config ?? {}
  const {
    title = '이 페이지를 공유해 보세요',
    subtitle = '친구에게 소식을 알려보세요!',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    titleStyle,
    subtitleStyle,
  } = safeConfig

  const selectElement = useElementSelector()
  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={safeConfig} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} text-center w-full max-w-full overflow-hidden`}>
          <AtomText01
            as="h2"
            className={cn(
              'text-lg sm:text-xl md:text-4xl font-black mb-1.5 md:mb-3 tracking-tight break-keep p-1 rounded pointer-events-auto',
              !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
            )}
            style={{
              color: titleStyle?.color || textColor,
              fontFamily: titleStyle?.fontFamily,
              fontWeight: titleStyle?.fontWeight || '900',
              fontSize: titleStyle?.fontSize,
            }}
            onClick={(e) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('title', e)
            }}
          >
            {title}
          </AtomText01>

          <AtomText01
            as="p"
            className={cn(
              'opacity-70 mb-4 md:mb-8 text-[11px] sm:text-sm md:text-base max-w-2xl mx-auto break-keep p-1 rounded pointer-events-auto',
              !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
            )}
            style={{
              color: subtitleStyle?.color || textColor,
              fontFamily: subtitleStyle?.fontFamily,
              fontWeight: subtitleStyle?.fontWeight || '400',
              fontSize: subtitleStyle?.fontSize,
            }}
            onClick={(e) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('subtitle', e)
            }}
          >
            {subtitle}
          </AtomText01>

          <AtomCard01 className="w-full max-w-full md:max-w-3xl mx-auto shadow-sm border-slate-200 p-3 md:p-6 rounded-[14px] md:rounded-2xl overflow-hidden bg-slate-50/50">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
              {SHARE_CHANNELS.map((ch) => (
                <AtomBtn01
                  key={ch.key}
                  className={cn(
                    "flex-1 min-w-[240px] flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-4 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base font-extrabold shadow-sm transition-all hover:scale-[1.02] whitespace-nowrap pointer-events-auto",
                    !isPreview && (ch.key === 'copy' || ch.key === 'kakao') && 'cursor-pointer hover:ring-2 hover:ring-indigo-500'
                  )}
                  style={{ backgroundColor: ch.color, color: ch.textColor, border: 'none' }}
                  onClick={(e) => {
                    if (!isPreview && ch.key === 'kakao') {
                      e.stopPropagation()
                      selectElement('kakaoShare', e)
                      return
                    }
                    if (!isPreview && ch.key === 'copy') {
                      e.stopPropagation()
                      selectElement('shareUrl', e)
                      return
                    }
                    if (!isPreview) return

                    const fallbackType = ch.key === 'copy' ? 'COPY_TO_CLIPBOARD' : ch.key === 'kakao' ? 'SHARE_KAKAO' : 'SHARE_PAGE'
                    onAction?.({ 
                      ...safeConfig, 
                      actionType: safeConfig.actionType || fallbackType,
                      buttonLink: ch.key === 'copy' ? (safeConfig.shareUrl || window.location.href) : undefined
                    })
                  }}
                >
                  {ch.icon && <span className="text-sm md:text-lg">{ch.icon}</span>}
                  {ch.label}
                </AtomBtn01>
              ))}
            </div>
          </AtomCard01>
        </div>
      </div>
    </BlockBackground>
  )
}
