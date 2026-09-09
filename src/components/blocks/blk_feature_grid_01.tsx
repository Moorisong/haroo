'use client'

import React from 'react'
import { BlockInputConfig } from '@/types'
import AtomText01 from '@/components/atoms/atom_text_01'
import AtomCard01 from '@/components/atoms/atom_card_01'
import { CheckCircle } from 'lucide-react'
import AtomIcon01 from '@/components/atoms/atom_icon_01'
import { getBlockLayout, getResponsiveGridCols } from '@/lib/blockLayout'
import type { ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig

  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

export default function BlkFeatureGrid01({ config, isPreview  }: Props) {
  const {
    title = '핵심 특징',
    subtitle = '저희 서비스만의 특별한 장점을 소개합니다.',
    backgroundColor = '#f8fafc',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    items = [
      { title: '신속한 처리', description: '요청 즉시 처리되는 빠른 시스템을 자랑합니다.' },
      { title: '믿을 수 있는 품질', description: '수많은 고객이 증명하는 확실한 결과를 제공합니다.' },
      { title: '합리적인 가격', description: '거품 없는 투명한 가격 정책을 유지합니다.' },
      { title: '전문가의 손길', description: '각 분야 최고의 전문가들이 함께합니다.' },
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const gridCols = getResponsiveGridCols(containerWidth as ContainerWidth)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
      <div className={layout.innerClass}>
        {/* 헤더 영역 */}
        <div className="text-center mb-16">
          <AtomText01 variant="h2" className="text-3xl md:text-4xl font-bold mb-4">{title}</AtomText01>
          <AtomText01 variant="p" className="text-lg opacity-80">{subtitle}</AtomText01>
        </div>

        {/* 그리드 영역 */}
        <div className={`grid ${gridCols.cols4} gap-6`}>
          {items.map((item: any, i: number) => (
            <AtomCard01 key={i} className="flex flex-col items-start p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
                <AtomIcon01 icon={CheckCircle} size={24} />
              </div>
              <AtomText01 variant="h3" className="text-xl font-bold text-slate-900 mb-3">{item.title}</AtomText01>
              <AtomText01 variant="p" className="text-slate-600 text-sm leading-relaxed">{item.description}</AtomText01>
            </AtomCard01>
          ))}
        </div>
      </div>
    </div>
    </BlockBackground>
  )
}
