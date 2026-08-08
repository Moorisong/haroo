'use client'

import React from 'react'
import { BlockInputConfig } from '@/types'
import AtomText01 from '@/components/atoms/atom_text_01'
import AtomCard01 from '@/components/atoms/atom_card_01'
import AtomImage01 from '@/components/atoms/atom_image_01'
import { getBlockLayout, getResponsiveGridCols } from '@/lib/blockLayout'
import type { ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
}

export default function BlkProfileGrid01({ config }: Props) {
  const {
    title = '전문가 소개',
    subtitle = '함께하는 구성원을 소개합니다.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    items = [
      { name: '김철수', role: '전문가', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', description: '풍부한 경험을 바탕으로 최선의 결과를 제공합니다.' },
      { name: '이영희', role: '컨설턴트', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80', description: '친절하고 섬세한 케어를 약속드립니다.' },
      { name: '박민수', role: '수석 연구원', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80', description: '최신 데이터와 노하우를 바탕으로 임합니다.' }
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const gridCols = getResponsiveGridCols(containerWidth as ContainerWidth)

  return (
    <div style={{ backgroundColor, color: textColor }} className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
      <div className={layout.innerClass}>
        {/* 헤더 영역 */}
        <div className="text-center mb-16">
          <AtomText01 variant="h2" className="text-3xl md:text-4xl font-bold mb-4">{title}</AtomText01>
          <AtomText01 variant="p" className="text-lg opacity-80">{subtitle}</AtomText01>
        </div>

        {/* 그리드 영역 */}
        <div className={`grid ${gridCols.cols3} gap-8`}>
          {items.map((item: any, i: number) => (
            <AtomCard01 key={i} noPadding className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-64 relative">
                <AtomImage01 src={item.image} alt={item.name} fill />
              </div>
              <div className="p-8 flex flex-col items-center text-center flex-1">
                <AtomText01 variant="h3" className="text-xl font-bold text-slate-900 mb-2">{item.name}</AtomText01>
                <AtomText01 variant="span" className="text-sm text-sky-600 font-semibold mb-5">{item.role}</AtomText01>
                <AtomText01 variant="p" className="text-slate-600 text-sm leading-relaxed">{item.description}</AtomText01>
              </div>
            </AtomCard01>
          ))}
        </div>
      </div>
    </div>
  )
}
