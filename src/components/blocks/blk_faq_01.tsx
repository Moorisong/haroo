'use client'

import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomAccordion01, { type AccordionItem } from '../atoms/atom_accordion_01'
import BlockBackground from '../common/BlockBackground'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

const DEFAULT_FAQS: AccordionItem[] = [
  { id: '1', question: '예약은 어떻게 하나요?', answer: '상단의 예약 폼을 통해 이름, 연락처, 원하시는 날짜를 입력하시면 24시간 내 확인 문자를 보내드립니다.' },
  { id: '2', question: '취소/환불 규정은 어떻게 되나요?', answer: '예약 3일 전까지는 전액 환불이 가능합니다. 그 이후에는 환불이 어려울 수 있으니 꼭 미리 연락 주시기 바랍니다.' },
  { id: '3', question: '주차는 가능한가요?', answer: '네, 건물 지하 1~2층에 주차 공간이 마련되어 있습니다. 방문 시 주차권을 발급해 드립니다.' },
  { id: '4', question: '운영 시간이 어떻게 되나요?', answer: '평일은 오전 10시부터 오후 7시, 주말 및 공휴일은 오전 11시부터 오후 6시까지 운영합니다.' },
]

interface Props { 
  config: BlockInputConfig 
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkFaq01({ config, isPreview, onAction }: Props) {
  const {
    title = '제목을 입력하세요',
    subtitle = '부제목 또는 내용을 입력하세요.',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    faqItems = DEFAULT_FAQS,
    titleStyle,
    subtitleStyle,
  } = config as BlockInputConfig & { faqItems?: AccordionItem[] }

  const selectElement = useElementSelector()
  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} flex flex-col`}>
          <div className="text-center mb-8 flex flex-col items-center">
            <AtomBadge01 
              variant="default" 
              className={cn(
                "mb-3 mx-auto pointer-events-auto",
                !isPreview && "cursor-pointer hover:opacity-90"
              )}
              onClick={(e: React.MouseEvent) => {
                if (isPreview) return
                e.stopPropagation()
                selectElement('badge', e)
              }}
            >
              아코디언
            </AtomBadge01>
            
            <AtomText01 
              as="h2" 
              className={cn(
                "text-2xl font-bold mb-2 break-keep break-words break-all w-full max-w-4xl p-1 rounded pointer-events-auto",
                !isPreview && "cursor-pointer hover:ring-1 hover:ring-slate-300"
              )}
              style={{
                color: titleStyle?.color || textColor,
                fontFamily: titleStyle?.fontFamily,
                fontWeight: titleStyle?.fontWeight,
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
                "opacity-70 text-sm break-keep break-words break-all w-full max-w-4xl p-1 rounded pointer-events-auto",
                !isPreview && "cursor-pointer hover:ring-1 hover:ring-slate-300"
              )}
              style={{
                color: subtitleStyle?.color || textColor,
                fontFamily: subtitleStyle?.fontFamily,
                fontWeight: subtitleStyle?.fontWeight,
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
          </div>
          <div 
            className="w-full pointer-events-auto"
            onClick={(e) => {
              // 아코디언 컴포넌트 자체를 클릭했을 때 리스트 패널을 열도록 (옵션)
              if (isPreview) return
              e.stopPropagation()
              selectElement('list', e)
            }}
          >
            <AtomAccordion01 items={faqItems} />
          </div>
        </div>
      </div>
    </BlockBackground>
  )
}
