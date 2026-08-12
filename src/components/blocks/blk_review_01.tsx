'use client'

import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import { Star, User } from 'lucide-react'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkReview01({ config, isPreview, onAction }: Props) {
  const { 
    title = '수강생 생생 후기', 
    subtitle = '먼저 경험하신 분들의 이야기입니다', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    reviewItems = [
      { id: '1', author: '김수강', rating: 5, content: '정말 유익한 강의였습니다. 실무에 바로 적용할 수 있었어요!', date: '2026.08.10' },
      { id: '2', author: '이초보', rating: 4, content: '기초부터 탄탄하게 알려주셔서 이해하기 쉬웠습니다.', date: '2026.08.05' },
      { id: '3', author: '박심화', rating: 5, content: '심화 과정까지 다뤄주셔서 제 실력이 한 단계 업그레이드 된 기분입니다.', date: '2026.08.01' },
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} max-w-4xl mx-auto flex flex-col gap-8`}>
          
          <div className="text-center space-y-2">
            <AtomText01 variant="h2" className="text-2xl sm:text-3xl font-bold tracking-tight">
              {title}
            </AtomText01>
            {subtitle && (
              <AtomText01 variant="p" className="text-sm sm:text-base opacity-80">
                {subtitle}
              </AtomText01>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviewItems.map((review) => (
              <div key={review.id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-100 text-slate-200'}`} 
                    />
                  ))}
                </div>
                
                <AtomText01 variant="p" className="text-sm text-slate-700 leading-relaxed flex-1">
                  "{review.content}"
                </AtomText01>

                <div className="flex items-center gap-3 mt-2 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {review.avatarUrl ? (
                      <img src={review.avatarUrl} alt={review.author} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <AtomText01 variant="h4" className="text-sm font-semibold text-slate-900">{review.author}</AtomText01>
                    {review.date && (
                      <AtomText01 variant="p" className="text-xs text-slate-500">{review.date}</AtomText01>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AtomCard01>
  )
}
