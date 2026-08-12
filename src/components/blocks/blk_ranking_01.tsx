'use client'

import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import { Trophy, Medal, User } from 'lucide-react'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkRanking01({ config, isPreview, onAction }: Props) {
  const { 
    title = '주간 명예의 전당', 
    subtitle = '가장 많은 인기를 얻은 TOP 5', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    rankingItems = [
      { id: '1', rank: 1, title: 'Supernova', subtitle: '투표수 12,450', score: '99.5' },
      { id: '2', rank: 2, title: 'How Sweet', subtitle: '투표수 10,200', score: '92.0' },
      { id: '3', rank: 3, title: 'Bubble Gum', subtitle: '투표수 8,500', score: '88.5' },
      { id: '4', rank: 4, title: 'Magnetic', subtitle: '투표수 6,300', score: '76.0' },
      { id: '5', rank: 5, title: '해야 (HEYA)', subtitle: '투표수 5,100', score: '72.5' },
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} max-w-2xl mx-auto flex flex-col gap-6`}>
          
          <div className="flex flex-col items-center space-y-2 mb-2">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-sky-600" />
            </div>
            <AtomText01 variant="h2" className="text-xl sm:text-2xl font-bold tracking-tight text-center">
              {title}
            </AtomText01>
            {subtitle && (
              <AtomText01 variant="p" className="text-sm sm:text-base opacity-80 text-center">
                {subtitle}
              </AtomText01>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {rankingItems.sort((a, b) => a.rank - b.rank).map((item, index) => (
              <div 
                key={item.id} 
                className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
                  index === 0 ? 'border-sky-500 bg-sky-50 shadow-sm' : 
                  index === 1 ? 'border-slate-300 bg-slate-50' : 
                  index === 2 ? 'border-slate-200 bg-slate-50/50' : 'border-slate-100 bg-white'
                }`}
              >
                <div className="flex-shrink-0 w-8 flex justify-center">
                  {index === 0 ? <Medal className="w-7 h-7 text-yellow-500 fill-yellow-500" /> :
                   index === 1 ? <Medal className="w-6 h-6 text-slate-400 fill-slate-300" /> :
                   index === 2 ? <Medal className="w-6 h-6 text-amber-700 fill-amber-600" /> :
                   <span className="text-lg font-bold text-slate-400">{item.rank}</span>}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.avatarUrl ? (
                    <img src={item.avatarUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <AtomText01 variant="h4" className={`text-base font-bold truncate ${index === 0 ? 'text-sky-900' : 'text-slate-900'}`}>
                    {item.title}
                  </AtomText01>
                  {item.subtitle && (
                    <AtomText01 variant="p" className="text-xs sm:text-sm text-slate-500 truncate">
                      {item.subtitle}
                    </AtomText01>
                  )}
                </div>

                {item.score && (
                  <div className="flex-shrink-0 text-right">
                    <AtomText01 variant="h3" className={`text-lg font-bold ${index === 0 ? 'text-sky-600' : 'text-slate-700'}`}>
                      {item.score}
                    </AtomText01>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </AtomCard01>
  )
}
