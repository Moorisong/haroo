'use client'

import React from 'react'
import AtomCard01 from '@/components/atoms/atom_card_01'
import AtomImage01 from '@/components/atoms/atom_image_01'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig } from '@/types'

interface BlockBackgroundProps {
  config?: BlockInputConfig
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  isPreview?: boolean
  onClick?: (e: React.MouseEvent) => void
}

/**
 * 모든 블록의 표준 배경 래퍼 컴포넌트 (BlockBackground)
 * - 단색 배경(backgroundColor / backgroundStyle.backgroundColor)
 * - 배경 사진(backgroundStyle.backgroundImage) + 투명도(opacity) + 오버레이
 * - 빌더 모드에서 배경 클릭 시 속성 패널('background') 자동 활성화
 * - UI/UX 100% 동결 보장
 */
export default function BlockBackground({
  config = {},
  children,
  className,
  style = {},
  isPreview = false,
  onClick,
}: BlockBackgroundProps) {
  const selectElement = useElementSelector()
  const { backgroundStyle, backgroundColor, textColor } = config

  const bgType = backgroundStyle?.bgType || (backgroundStyle?.backgroundImage ? 'image' : 'color')
  const bgImage = backgroundStyle?.backgroundImage
  const bgColor = backgroundStyle?.backgroundColor || backgroundColor || '#ffffff'
  const bgOpacity = backgroundStyle?.opacity ?? 1
  const imagePos = backgroundStyle?.imagePosition || { x: 50, y: 50 }

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    } else if (!isPreview) {
      selectElement('background', e)
    }
  }

  return (
    <AtomCard01 noPadding className="border-none rounded-none w-full overflow-hidden relative">
      <div
        className={cn(
          'relative w-full transition-colors select-none',
          bgType === 'image' && !isPreview && 'cursor-pointer',
          className
        )}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          ...style,
        }}
        onClick={handleClick}
      >
        {/* 배경 사진 모드 */}
        {bgType === 'image' && bgImage && (
          <>
            <AtomImage01
              src={bgImage}
              alt="블록 배경 이미지"
              fill
              className="absolute inset-0 transition-all duration-75 pointer-events-none"
              style={{
                objectFit: 'cover',
                objectPosition: `${imagePos.x}% ${imagePos.y}%`,
                opacity: bgOpacity,
              }}
            />
            <div className="absolute inset-0 bg-slate-900/30 pointer-events-none" />
          </>
        )}

        {/* 블록 본문 컨텐츠 (z-index 10으로 배경 위에 안정적 배치) */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </AtomCard01>
  )
}
