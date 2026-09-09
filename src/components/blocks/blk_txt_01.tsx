'use client'

import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import BlockBackground from '../common/BlockBackground'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkTxt01({ config, isPreview, onAction }: Props) {
  const { 
    title = '제목을 입력하세요', 
    subtitle = '부제목 또는 내용을 입력하세요.', 
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    titleStyle,
    subtitleStyle,
  } = config

  const selectElement = useElementSelector()
  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} text-center max-w-4xl mx-auto flex flex-col items-center justify-center`}>
          <AtomText01 
            as="h2" 
            className={cn(
              "text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-5 font-black tracking-tight leading-tight break-words break-all w-full p-1 rounded pointer-events-auto",
              !isPreview && "cursor-pointer hover:ring-1 hover:ring-slate-300"
            )}
            style={{
              color: titleStyle?.color || textColor,
              fontFamily: titleStyle?.fontFamily,
              fontWeight: titleStyle?.fontWeight,
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
              "text-xs sm:text-sm md:text-lg lg:text-xl opacity-80 leading-relaxed whitespace-pre-wrap font-normal break-words break-all w-full p-1 rounded pointer-events-auto",
              !isPreview && "cursor-pointer hover:ring-1 hover:ring-slate-300"
            )}
            style={{
              color: subtitleStyle?.color || textColor,
              fontFamily: subtitleStyle?.fontFamily,
              fontWeight: subtitleStyle?.fontWeight,
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
        </div>
      </div>
    </BlockBackground>
  )
}
