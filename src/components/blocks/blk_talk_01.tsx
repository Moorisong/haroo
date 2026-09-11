'use client'

import React from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"
import { cn } from '@/lib/utils'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

/**
 * 마스터 블록: blk_talk_01 (다목적 안내 및 공지/프로모션 카드 블록)
 * - 20종 원자 컴포넌트 100% 재사용
 * - 제목/부제목/뱃지/버튼 useElementSelector 인터랙티브 연동
 * - 버튼 8종 표준 액션 및 크기/스타일 완전 적용
 */
export default function BlkTalk01({ config, isPreview, onAction }: Props) {
  const selectElement = useElementSelector()
  const {
    title = '안내 및 주요 소식',
    subtitle = '중요 안내, 신청 연락, 주요 혜택 소식을 수신자에게 전송해 드립니다.',
    buttonText = '신청 및 설정하기',
    badgeText,
    badgeColor,
    badgeTextColor,
    containerWidth = 'wide',
    paddingY = 'normal',
    titleStyle,
    subtitleStyle,
    buttonStyle,
  } = config

  const rawBadge = badgeText ?? '공지'
  const isBadgeVisible = rawBadge && rawBadge !== 'none' && rawBadge !== '없음'

  const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
    공지: { label: '공지', className: 'bg-black/10 text-black border-black/20' },
    NEW: { label: 'NEW', className: 'bg-emerald-500 text-white border-transparent' },
    HOT: { label: 'HOT', className: 'bg-rose-500 text-white border-transparent' },
    EVENT: { label: 'EVENT', className: 'bg-amber-500 text-white border-transparent' },
  }
  const currentBadge = BADGE_CONFIG[rawBadge] || {
    label: rawBadge,
    className: 'bg-black/10 text-black border-black/20',
  }

  const customBadgeStyle: React.CSSProperties = {
    ...(badgeColor ? { backgroundColor: badgeColor } : {}),
    ...(badgeTextColor ? { color: badgeTextColor } : {}),
  }

  const DEFAULT_FEATURES = [
    { icon: '✉️', text: '월 100건 무료 발송 (초과 시 LMS 자동 전환)' },
    { icon: '⚡', text: '이벤트 및 조건 충족 시 즉시 자동 발송' },
    { icon: '📋', text: '메시지 템플릿 커스터마이징 지원' },
  ]
  const features = config.noticeFeatures && config.noticeFeatures.length > 0 ? config.noticeFeatures : DEFAULT_FEATURES

  const btnSize = buttonStyle?.size || 'lg'
  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          {isBadgeVisible && (
            <AtomBadge01
              style={customBadgeStyle}
              className={cn(
                'mb-4 pointer-events-auto transition-opacity',
                currentBadge.className,
                !isPreview && 'cursor-pointer hover:opacity-80'
              )}
              onClick={(e: React.MouseEvent) => {
                if (isPreview) return
                e.stopPropagation()
                selectElement('badge', e)
              }}
            >
              {rawBadge}
            </AtomBadge01>
          )}

          <AtomText01
            as="h2"
            className={cn(
              'text-2xl font-black mb-2 break-keep pointer-events-auto',
              !isPreview && 'cursor-pointer hover:opacity-80 transition-opacity'
            )}
            style={{
              color: titleStyle?.color,
              fontFamily: titleStyle?.fontFamily,
              fontWeight: titleStyle?.fontWeight || '900',
              fontSize: titleStyle?.fontSize,
            }}
            onClick={(e: React.MouseEvent) => {
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
              'opacity-70 text-sm mb-8 break-keep pointer-events-auto',
              !isPreview && 'cursor-pointer hover:opacity-100 transition-opacity'
            )}
            style={{
              color: subtitleStyle?.color,
              fontFamily: subtitleStyle?.fontFamily,
              fontWeight: subtitleStyle?.fontWeight || '400',
              fontSize: subtitleStyle?.fontSize,
            }}
            onClick={(e: React.MouseEvent) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('subtitle', e)
            }}
          >
            {subtitle}
          </AtomText01>

          <AtomCard01
            className={cn(
              'mb-6 border-black/10 bg-white/60 pointer-events-auto transition-all',
              !isPreview && 'cursor-pointer hover:border-black/30 hover:shadow-sm'
            )}
            onClick={(e: React.MouseEvent) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('features', e)
            }}
          >
            <ul className="space-y-4">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{f.icon || '📌'}</span>
                  <AtomText01 as="span" className="text-sm font-medium leading-relaxed">{f.text}</AtomText01>
                </li>
              ))}
            </ul>
          </AtomCard01>

          <AtomDivider01 className="mb-6 border-black/20" />

          <AtomBtn01
            className={cn(
              'w-full h-auto font-bold transition-all pointer-events-auto shadow-md',
              btnSize === 'sm' && 'px-4 py-2',
              btnSize === 'md' && 'px-6 py-3',
              (btnSize === 'lg' || !btnSize) && 'px-8 py-4',
              btnSize === 'xl' && 'px-10 py-5'
            )}
            style={{
              backgroundColor: buttonStyle?.backgroundColor || '#000000',
              color: buttonStyle?.textColor || '#FEE500',
              borderRadius: buttonStyle?.borderRadius || '0.75rem',
              fontWeight: buttonStyle?.fontWeight || 'bold',
              fontSize: buttonStyle?.fontSize || (
                btnSize === 'sm' ? '0.8125rem' :
                btnSize === 'md' ? '0.9375rem' :
                btnSize === 'xl' ? '1.25rem' : '1.0625rem'
              ),
              border: 'none',
            }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              if (!isPreview) {
                selectElement('button', e)
              } else {
                onAction?.(config)
              }
            }}
          >
            {buttonText}
          </AtomBtn01>
        </div>
      </div>
    </BlockBackground>
  )
}
