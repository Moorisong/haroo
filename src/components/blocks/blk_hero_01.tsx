'use client'

import React, { useRef, useState } from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomImage01 from '../atoms/atom_image_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { BlockInputConfig, PaddingYOption } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  config?: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

/**
 * 마스터 블록: blk_hero_01 (히어로 배너 고도화 버전)
 * - 원자 컴포넌트 100% 재사용
 * - 배경 모드 분기 (단색 색상 vs 배경 사진)
 * - 사진 모드 캔버스 클릭 시 파일 업로드 / 단색 모드 클릭 시 색상 변경
 * - 배경 사진 마우스 드래그 이미지 위치(Position X/Y) 조율
 * - 콘텐츠 가로폭 옵션 제거 (전폭 레이아웃)
 */
export default function BlkHero01({ config, isPreview, onAction }: Props) {
  const safeConfig = config ?? {}
  const {
    title = '제목을 입력하세요',
    subtitle = '부제목 또는 내용을 입력하세요.',
    imageUrl = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop',
    buttonText = '버튼 텍스트',
    paddingY = 'normal',
    titleStyle,
    subtitleStyle,
    buttonStyle,
    backgroundStyle,
  } = safeConfig as BlockInputConfig

  const selectElement = useElementSelector()
  const selectedInstanceId = useBuilderStore((state) => state.selectedInstanceId)
  const updateBlockInputData = useBuilderStore((state) => state.updateBlockInputData)

  // 배경 설정 데이터 파싱
  const bgType = backgroundStyle?.bgType || (backgroundStyle?.backgroundImage ? 'image' : 'color')
  const bgImage = backgroundStyle?.backgroundImage || imageUrl
  const bgColor = backgroundStyle?.backgroundColor || '#0f172a'
  const bgOpacity = backgroundStyle?.opacity ?? 1
  const imagePos = backgroundStyle?.imagePosition || { x: 50, y: 50 }
  const btnSize = buttonStyle?.size || 'lg'

  // 드래그 위치 이동 상태
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number; moved: boolean } | null>(null)

  // 상하 여백 레이아웃 (가로폭 옵션 제거하고 full 레이아웃 사용)
  const layout = getBlockLayout('full', paddingY as PaddingYOption)

  // 뱃지 설정 파싱 (없음, NEW, HOT, BEST, EVENT)
  const rawBadge = safeConfig.badgeText ?? 'NEW'
  const isBadgeVisible = rawBadge && rawBadge !== 'none' && rawBadge !== '없음'

  const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
    NEW: { label: 'NEW', className: 'bg-emerald-500 text-white' },
    HOT: { label: 'HOT', className: 'bg-rose-500 text-white' },
    BEST: { label: 'BEST', className: 'bg-purple-600 text-white' },
    EVENT: { label: 'EVENT', className: 'bg-amber-500 text-white' },
  }
  const currentBadge = BADGE_CONFIG[rawBadge] || { label: rawBadge, className: 'bg-emerald-500 text-white' }
  const customBadgeStyle: React.CSSProperties = {
    ...(safeConfig.badgeColor ? { backgroundColor: safeConfig.badgeColor } : {}),
    ...(safeConfig.badgeTextColor ? { color: safeConfig.badgeTextColor } : {}),
  }

  // 히어로 배경 클릭 시 속성 패널 선택만 수행
  const handleBackgroundClick = (e: React.MouseEvent) => {
    selectElement('background', e)
  }

  // 이미지 100% 마우스 직접 드래그 위치 제어 (블록 이동 DND와 100% 분리됨)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPreview || bgType !== 'image') return
    // 버튼이나 텍스트 요소를 누른 경우 드래그 미발동
    if ((e.target as HTMLElement).closest('button, h1, p, span')) return

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
    if (!isDragging || !dragStartRef.current || !selectedInstanceId) return

    const deltaX = e.clientX - dragStartRef.current.startX
    const deltaY = e.clientY - dragStartRef.current.startY

    // 마우스 5px 이상 이동 시 단순 클릭이 아닌 드래그 이동으로 인정
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      dragStartRef.current.moved = true
    }

    // 마우스 이동거리를 % 비율로 환산
    const newX = Math.min(100, Math.max(0, dragStartRef.current.startPosX - deltaX * 0.15))
    const newY = Math.min(100, Math.max(0, dragStartRef.current.startPosY - deltaY * 0.15))

    updateBlockInputData(selectedInstanceId, {
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
      className="border-none rounded-none w-full overflow-hidden bg-transparent"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={cn(
          `relative ${layout.paddingClass} w-full transition-colors select-none`,
          bgType === 'image' && !isPreview && 'cursor-grab active:cursor-grabbing'
        )}
        style={{
          minHeight: '20rem',
          backgroundColor: bgColor,
        }}
        onClick={handleBackgroundClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 1. 이미지 배경 모드 */}
        {bgType === 'image' && (
          <>
            <AtomImage01
              src={bgImage}
              alt="히어로 배경 이미지"
              fill
              className="absolute inset-0 transition-all duration-75 pointer-events-none"
              style={{
                objectFit: 'cover',
                objectPosition: `${imagePos.x}% ${imagePos.y}%`,
                opacity: bgOpacity,
              }}
            />
            <div className="absolute inset-0 bg-slate-900/40 pointer-events-none" />
          </>
        )}

        {/* 2. 콘텐츠 컨테이너 (100% 원자 컴포넌트 조합) */}
        <div className={`relative z-10 flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto ${layout.paddingXClass}`}>
          {isBadgeVisible && (
            <AtomBadge01
              style={customBadgeStyle}
              className={cn(
                'mb-4 shadow-sm border-none pointer-events-auto transition-opacity',
                currentBadge.className,
                !isPreview && 'cursor-pointer hover:opacity-90'
              )}
              onClick={(e: React.MouseEvent) => {
                if (isPreview) return
                e.stopPropagation()
                selectElement('badge', e)
              }}
            >
              {currentBadge.label}
            </AtomBadge01>
          )}

          <AtomText01
            as="h1"
            className={cn(
              'mb-3 md:mb-4 leading-tight tracking-tight text-center break-words break-all max-w-full p-1 rounded pointer-events-auto',
              !isPreview && 'cursor-pointer hover:ring-1 hover:ring-white/50'
            )}
            style={{
              color: titleStyle?.color || (bgType === 'image' ? 'white' : '#ffffff'),
              fontFamily: titleStyle?.fontFamily,
              fontWeight: titleStyle?.fontWeight || '900',
              fontSize: titleStyle?.fontSize || '3rem',
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
              'mb-6 md:mb-8 max-w-3xl text-center font-normal leading-relaxed break-words break-all w-full p-1 rounded pointer-events-auto',
              !isPreview && 'cursor-pointer hover:ring-1 hover:ring-white/50'
            )}
            style={{
              color: subtitleStyle?.color || (bgType === 'image' ? '#e2e8f0' : '#94a3b8'),
              fontFamily: subtitleStyle?.fontFamily,
              fontWeight: subtitleStyle?.fontWeight || '400',
              fontSize: subtitleStyle?.fontSize || '1.125rem',
            }}
            onClick={(e) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('subtitle', e)
            }}
          >
            {subtitle}
          </AtomText01>

          <AtomBtn01
            className={cn(
              'h-auto shadow-lg transition-all pointer-events-auto font-semibold',
              btnSize === 'sm' && 'px-4 py-2',
              btnSize === 'md' && 'px-6 py-3',
              (btnSize === 'lg' || !btnSize) && 'px-8 py-4',
              btnSize === 'xl' && 'px-10 py-5'
            )}
            style={{
              backgroundColor: buttonStyle?.backgroundColor || '#ffffff',
              color: buttonStyle?.textColor || '#0f172a',
              borderRadius: buttonStyle?.borderRadius || '0.75rem',
              fontWeight: buttonStyle?.fontWeight || 'bold',
              fontSize: buttonStyle?.fontSize || (
                btnSize === 'sm' ? '0.8125rem' :
                btnSize === 'md' ? '0.9375rem' :
                btnSize === 'xl' ? '1.25rem' : '1.0625rem'
              ),
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (!isPreview) {
                selectElement('button', e)
              } else {
                onAction?.(safeConfig as BlockInputConfig)
              }
            }}
          >
            {buttonText}
          </AtomBtn01>
        </div>
      </div>
    </AtomCard01>
  )
}
