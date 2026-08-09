'use client'

import { useState } from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomProgress01 from '../atoms/atom_progress_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

const TOTAL_STAMPS = 10

export default function BlkStampCard01({ config, isPreview, onAction }: Props) {
  const [stamps, setStamps] = useState(3) // 미리보기용 기본값
  const {
    title = '스탬프 카드',
    subtitle = `${TOTAL_STAMPS}개 모으면 쿠폰을 드려요!`,
    buttonText = '도장 받기',
    rewardText = '10회 방문 쿠폰 증정 🎁',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config as BlockInputConfig & { rewardText?: string }

  const handleStamp = () => {
    setStamps((s) => Math.min(s + 1, TOTAL_STAMPS))
    onAction?.(config)
  }

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-8">
            <AtomBadge01 variant="success" className="mb-3 mx-auto">🎯 스탬프</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2 break-keep">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm break-keep">{subtitle}</AtomText01>
          </div>

          <AtomCard01 className="mb-6">
            {/* 스탬프 격자 */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {Array.from({ length: TOTAL_STAMPS }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                    i < stamps
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-100 border-slate-200 text-slate-300'
                  }`}
                >
                  {i < stamps ? '⭐' : '○'}
                </div>
              ))}
            </div>

            <AtomProgress01 value={stamps} max={TOTAL_STAMPS} showLabel size="md" className="mb-4" />

            {stamps >= TOTAL_STAMPS ? (
              <AtomBadge01 variant="success" className="w-full justify-center py-2 text-sm">{rewardText}</AtomBadge01>
            ) : (
              <AtomText01 as="p" className="text-center text-xs text-slate-400">
                {TOTAL_STAMPS - stamps}개 더 모으면 보상을 받을 수 있어요
              </AtomText01>
            )}
          </AtomCard01>

          <AtomBtn01 className="w-full" onClick={handleStamp} disabled={stamps >= TOTAL_STAMPS}>
            {stamps >= TOTAL_STAMPS ? '🎉 쿠폰 수령 완료!' : buttonText}
          </AtomBtn01>
        </div>
      </div>
    </AtomCard01>
  )
}
