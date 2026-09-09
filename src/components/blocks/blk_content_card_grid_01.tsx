'use client'

import React from 'react'
import AtomText01 from '@/components/atoms/atom_text_01'
import AtomCard01 from '@/components/atoms/atom_card_01'
import AtomImage01 from '@/components/atoms/atom_image_01'
import AtomBadge01 from '@/components/atoms/atom_badge_01'
import { getBlockLayout, getResponsiveGridCols } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig

  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

export default function BlkContentCardGrid01({ config, isPreview  }: Props) {
  const {
    title = '추천 장소',
    subtitle = '회원님을 위한 맞춤형 핫플레이스를 소개합니다.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    items = [
      { 
        title: '올림픽 공원 산책로', 
        description: '넓고 쾌적한 환경에서 반려동물과 함께 산책하기 좋은 곳입니다.', 
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80',
        badges: ['추천', '무료주차']
      },
      { 
        title: '시민의 숲', 
        description: '자연과 어우러진 도심 속 힐링 포인트입니다.', 
        image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
        badges: ['핫플레이스', '반려견 동반']
      },
      { 
        title: '한강 공원 반려견 놀이터', 
        description: '안전한 울타리 안에서 자유롭게 뛰어놀 수 있습니다.', 
        image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80',
        badges: ['잔디밭', '소형견 전용']
      }
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const gridCols = getResponsiveGridCols(containerWidth as ContainerWidth)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
      <div className={layout.innerClass}>
        
        {/* 헤더 영역 */}
        {(title || subtitle) && (
          <div className="mb-10 sm:mb-12">
            {title && <AtomText01 variant="h2" className="text-2xl sm:text-3xl font-bold mb-3">{title}</AtomText01>}
            {subtitle && <AtomText01 variant="p" className="text-base sm:text-lg opacity-70">{subtitle}</AtomText01>}
          </div>
        )}

        {/* 그리드 영역 */}
        <div className={`grid ${gridCols.cols3} gap-6 sm:gap-8`}>
          {items.map((item: any, i: number) => (
            <AtomCard01 key={i} noPadding className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group">
              {item.image && (
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <AtomImage01 
                    src={item.image} 
                    alt={item.title || '썸네일'} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                {item.badges && item.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.badges.map((badge: string, bIdx: number) => (
                      <AtomBadge01 key={bIdx} variant={bIdx === 0 ? 'default' : 'outline'}>
                        {badge}
                      </AtomBadge01>
                    ))}
                  </div>
                )}
                {item.title && (
                  <AtomText01 variant="h3" className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </AtomText01>
                )}
                {item.description && (
                  <AtomText01 variant="p" className="text-sm opacity-80 leading-relaxed line-clamp-3">
                    {item.description}
                  </AtomText01>
                )}
              </div>
            </AtomCard01>
          ))}
        </div>

      </div>
    </div>
    </BlockBackground>
  )
}
