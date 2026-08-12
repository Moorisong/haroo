'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props { config: BlockInputConfig; isPreview?: boolean; onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void }

export default function BlkProgress01({ config }: Props) {
  const {
    title = '목표 달성 현황',
    subtitle = '현재 목표까지 얼마나 남았는지 확인해보세요.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  
  const progressValue = config.progressValue || 65
  const progressTarget = config.progressTarget || 100
  const progressLabel = config.progressLabel || '진행률'
  const progressUnit = config.progressUnit || '%'
  
  const percentage = Math.min(100, Math.max(0, (progressValue / progressTarget) * 100))

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>}
              {subtitle && <AtomText01 as="p" className="opacity-70 text-sm">{subtitle}</AtomText01>}
            </div>
          )}

          <div className="p-6 rounded-2xl border" style={{ borderColor: 'rgba(0,0,0,0.05)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
            <div className="flex justify-between items-end mb-4">
              <div>
                <AtomText01 as="p" className="text-sm font-semibold opacity-70 mb-1">{progressLabel}</AtomText01>
                <div className="flex items-baseline gap-1">
                  <AtomText01 as="span" className="text-3xl font-black">{progressValue}</AtomText01>
                  <AtomText01 as="span" className="text-sm opacity-50">/ {progressTarget}{progressUnit}</AtomText01>
                </div>
              </div>
              <AtomBadge01 variant="info" className="text-sm font-bold border-none bg-sky-100 text-sky-600">
                {Math.round(percentage)}% 달성
              </AtomBadge01>
            </div>
            
            <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out bg-sky-500" 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </AtomCard01>
  )
}
