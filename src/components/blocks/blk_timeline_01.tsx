import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import { CheckCircle2, Circle } from 'lucide-react'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig

  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

export default function BlkTimeline01({ config, isPreview  }: Props) {
  const { 
    title = '진행 상황', 
    subtitle = '어디까지 왔는지 확인하세요', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    timelineItems = [
      { id: '1', date: '2026.08.01', title: '프로젝트 시작', description: '킥오프 미팅 진행', status: 'completed' },
      { id: '2', date: '2026.08.15', title: '중간 점검', status: 'in-progress' },
      { id: '3', date: '2026.08.30', title: '최종 마감', status: 'pending' }
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} max-w-3xl mx-auto flex flex-col gap-8`}>
          
          <div className="space-y-2 text-center">
            <AtomText01 variant="h3" className="text-xl sm:text-2xl font-bold tracking-tight">
              {title}
            </AtomText01>
            {subtitle && (
              <AtomText01 variant="p" className="text-sm sm:text-base opacity-80">
                {subtitle}
              </AtomText01>
            )}
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 py-4">
            {timelineItems.map((item, idx) => (
              <div key={item.id || idx} className="relative pl-6 sm:pl-8">
                {/* Timeline Dot */}
                <span className="absolute -left-[11px] bg-white rounded-full">
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-sky-500" />
                  ) : item.status === 'in-progress' ? (
                    <div className="w-5 h-5 rounded-full border-4 border-sky-500 bg-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </span>
                
                <div className="flex flex-col gap-1">
                  {item.date && (
                    <span className="text-xs sm:text-sm font-semibold text-sky-500">
                      {item.date}
                    </span>
                  )}
                  <AtomText01 variant="h4" className="text-base sm:text-lg font-bold text-slate-900">
                    {item.title}
                  </AtomText01>
                  {item.description && (
                    <AtomText01 variant="p" className="text-sm text-slate-500 mt-1">
                      {item.description}
                    </AtomText01>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </BlockBackground>
  )
}
