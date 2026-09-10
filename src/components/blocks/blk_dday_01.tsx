'use client'

import React, { useState, useEffect } from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props { 
  config: BlockInputConfig 
  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function BlkDday01({ config, isPreview }: Props) {
  const selectElement = useElementSelector()
  const rawConfig = config ?? {}

  // 배경 및 텍스트 기본값 보장 (처음 생성 시 기본 다크 테마 '#0f172a' / '#ffffff' 적용)
  const defaultBg = '#0f172a'
  const defaultTextColor = '#ffffff'
  const finalBgColor = rawConfig.backgroundStyle?.backgroundColor || rawConfig.backgroundColor || defaultBg
  const finalTextColor = rawConfig.textColor || defaultTextColor

  const safeConfig: BlockInputConfig = {
    ...rawConfig,
    backgroundColor: finalBgColor,
    textColor: finalTextColor,
    backgroundStyle: {
      backgroundColor: finalBgColor,
      bgType: 'color',
      ...(rawConfig.backgroundStyle || {}),
    },
  }

  const {
    title = 'D-Day 카운트다운',
    subtitle = '특별한 날까지 얼마나 남았을까요?',
    targetDate = new Date(Date.now() + 7 * 86400000).toISOString(),
    containerWidth = 'wide',
    paddingY = 'normal',
    titleStyle,
    subtitleStyle,
  } = safeConfig as BlockInputConfig & { targetDate?: string }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: '일', value: timeLeft.days },
    { label: '시간', value: timeLeft.hours },
    { label: '분', value: timeLeft.minutes },
    { label: '초', value: timeLeft.seconds },
  ]

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={safeConfig} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} text-center`}>
          <AtomBadge01
            className={cn(
              'mb-4 mx-auto bg-white/20 text-white border-white/30 backdrop-blur-sm pointer-events-auto',
              !isPreview && 'cursor-pointer hover:ring-1 hover:ring-white/40'
            )}
            onClick={(e) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('targetDate', e)
            }}
          >
            ⏰ D-Day
          </AtomBadge01>

          <AtomText01
            as="h2"
            className={cn(
              'text-2xl sm:text-3xl font-bold mb-2 tracking-tight break-keep p-1 rounded pointer-events-auto',
              !isPreview && 'cursor-pointer hover:ring-1 hover:ring-white/30'
            )}
            style={{
              color: titleStyle?.color || finalTextColor,
              fontFamily: titleStyle?.fontFamily,
              fontWeight: titleStyle?.fontWeight || '700',
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
              'opacity-80 text-sm mb-10 break-keep p-1 rounded pointer-events-auto',
              !isPreview && 'cursor-pointer hover:ring-1 hover:ring-white/30'
            )}
            style={{
              color: subtitleStyle?.color || finalTextColor,
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

          <div
            className={cn(
              'grid grid-cols-4 gap-3 max-w-xl mx-auto pointer-events-auto p-2 rounded-xl transition-all',
              !isPreview && 'cursor-pointer hover:ring-2 hover:ring-white/30 hover:bg-white/5'
            )}
            onClick={(e) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('targetDate', e)
            }}
            title={!isPreview ? '클릭하여 목표 일시 변경' : undefined}
          >
            {units.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square flex items-center justify-center bg-white/15 border border-white/20 rounded-2xl shadow-inner backdrop-blur-sm">
                  <AtomText01
                    as="span"
                    className="text-3xl sm:text-4xl font-black tabular-nums"
                    style={{ color: finalTextColor }}
                  >
                    {String(value).padStart(2, '0')}
                  </AtomText01>
                </div>
                <AtomText01
                  as="span"
                  className="text-xs font-semibold opacity-75"
                  style={{ color: finalTextColor }}
                >
                  {label}
                </AtomText01>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockBackground>
  )
}

