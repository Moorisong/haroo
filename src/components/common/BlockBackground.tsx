'use client'

import React, { useRef, useState } from 'react'
import AtomCard01 from '@/components/atoms/atom_card_01'
import AtomImage01 from '@/components/atoms/atom_image_01'
import { useElementSelector, useBlockContext } from '@/contexts/BlockContext'
import { useBuilderStore } from '@/stores/useBuilderStore'
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
 * - 마우스 직접 드래그 배경 사진 위치(Position X/Y) 조율 (히어로 블록과 100% 동일)
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
  const blockContext = useBlockContext()
  const instanceId = blockContext?.instanceId
  const updateBlockInputData = useBuilderStore((state) => state.updateBlockInputData)

  const { backgroundStyle, backgroundColor, textColor } = config

  const bgType = backgroundStyle?.bgType || (backgroundStyle?.backgroundImage ? 'image' : 'color')
  const bgImage = backgroundStyle?.backgroundImage
  const bgColor = backgroundStyle?.backgroundColor || backgroundColor || 'var(--surface)'
  const bgOpacity = backgroundStyle?.opacity ?? 1
  const imagePos = backgroundStyle?.imagePosition || { x: 50, y: 50 }

  // 드래그 위치 이동 상태 (히어로 블록과 동일)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number; moved: boolean } | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    } else if (!isPreview) {
      selectElement('background', e)
    }
  }

  // 이미지 100% 마우스 직접 드래그 위치 제어 (히어로 섹션과 100% 동일한 로직)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPreview || bgType !== 'image') return
    // 버튼, 입력창, 링크, 제목/텍스트 요소 클릭 시 드래그 미발동
    if ((e.target as HTMLElement).closest('button, input, textarea, a, h1, h2, h3, h4, h5, h6, p, span')) return

    setIsDragging(true)
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: imagePos.x,
      startPosY: imagePos.y,
      moved: false,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current || !instanceId) return

    const deltaX = e.clientX - dragStartRef.current.startX
    const deltaY = e.clientY - dragStartRef.current.startY

    // 마우스 5px 이상 이동 시 단순 클릭이 아닌 드래그 이동으로 인정
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      dragStartRef.current.moved = true
    }

    // 마우스 이동거리를 % 비율로 환산
    const newX = Math.min(100, Math.max(0, dragStartRef.current.startPosX - deltaX * 0.15))
    const newY = Math.min(100, Math.max(0, dragStartRef.current.startPosY - deltaY * 0.15))

    updateBlockInputData(instanceId, {
      backgroundStyle: {
        ...backgroundStyle,
        imagePosition: { x: Math.round(newX), y: Math.round(newY) },
      },
    })
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  return (
    <AtomCard01 
      noPadding 
      className="border-none rounded-none w-full overflow-hidden relative bg-transparent"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div
        className={cn(
          'haroo-block-theme relative w-full transition-colors select-none',
          bgType === 'image' && !isPreview && 'cursor-grab active:cursor-grabbing',
          className
        )}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          ...style,
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
