import React, { useState } from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import AtomProgress01 from '../atoms/atom_progress_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import { CheckCircle2 } from 'lucide-react'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkPoll01({ config, isPreview, onAction }: Props) {
  const { 
    title = '오늘 점심 뭐 먹을까?', 
    subtitle = '가장 끌리는 메뉴를 선택해주세요', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    pollOptions = [
      { id: '1', label: '제육볶음', votes: 15, percentage: 45 },
      { id: '2', label: '돈까스', votes: 12, percentage: 35 },
      { id: '3', label: '순대국', votes: 7, percentage: 20 },
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const [votedId, setVotedId] = useState<string | null>(null)

  const handleVote = (id: string) => {
    if (votedId) return
    setVotedId(id)
    onAction?.(config, { action: 'VOTE', pollOptionId: id })
  }

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} max-w-2xl mx-auto flex flex-col gap-6`}>
          
          <div className="text-center space-y-2">
            <AtomText01 variant="h3" className="text-xl sm:text-2xl font-bold tracking-tight">
              {title}
            </AtomText01>
            <AtomText01 variant="p" className="text-sm sm:text-base opacity-80">
              {subtitle}
            </AtomText01>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {pollOptions.map((opt) => (
              <div 
                key={opt.id} 
                className={`relative p-4 rounded-xl border transition-all cursor-pointer ${votedId === opt.id ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-slate-300'} ${votedId && votedId !== opt.id ? 'opacity-70' : ''}`}
                onClick={() => handleVote(opt.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <AtomText01 variant="h4" className="font-semibold text-sm sm:text-base">{opt.label}</AtomText01>
                    {votedId === opt.id && <CheckCircle2 className="w-4 h-4 text-sky-500" />}
                  </div>
                  <AtomText01 variant="p" className="text-xs sm:text-sm font-medium">{opt.percentage}%</AtomText01>
                </div>
                <AtomProgress01 
                  value={opt.percentage || 0} 
                  max={100} 
                  size="sm" 
                  className={votedId === opt.id ? '[&>div>div]:bg-sky-500' : ''} 
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </AtomCard01>
  )
}
