'use client'

import React, { useState } from 'react'
import { BlockInputConfig } from '@/types'
import { getBlockLayout } from '@/lib/blockLayout'
import AtomCard01 from '@/components/atoms/atom_card_01'
import AtomText01 from '@/components/atoms/atom_text_01'
import AtomBtn01 from '@/components/atoms/atom_btn_01'
import AtomBadge01 from '@/components/atoms/atom_badge_01'
import AtomIcon01 from '@/components/atoms/atom_icon_01'
import type { ContainerWidth, PaddingYOption } from '@/types'
import { Sparkles, Cookie, Share2, Check } from 'lucide-react'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void

}

const DEFAULT_FORTUNES = [
  '오늘은 뜻밖의 좋은 기회와 인연을 만나게 됩니다!',
  '마음먹은 일이 술술 풀리는 최고의 대길 하루!',
  '당신의 긍정적인 에너지가 주변 사람들을 행복하게 만듭니다.',
  '새로운 도전이 예상치 못한 성공으로 이어질 것입니다.',
  '잠시 여유를 가지고 아메리카노 한 잔의 행복을 누려보세요.'
]

export default function BlkFortune01({ config, isPreview, onAction  }: Props) {
  const layout = getBlockLayout(config?.containerWidth as ContainerWidth, config?.paddingY as PaddingYOption)
  const cardTitle = config?.cardTitle || config?.title || '매일매일 행운의 포춘쿠키'
  const subtitle = config?.subtitle || '버튼을 눌러 오늘의 행운 메시지를 확인해보세요!'
  const buttonText = config?.buttonText || '행운 뽑기'

  const fortunePool: string[] =
    Array.isArray(config?.fortunePool) && config.fortunePool.length > 0
      ? config.fortunePool
      : DEFAULT_FORTUNES

  const [currentFortune, setCurrentFortune] = useState<string | null>(null)
  const [isOpening, setIsOpening] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDrawFortune = () => {
    if (isOpening) return
    setIsOpening(true)
    setCurrentFortune(null)

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunePool.length)
      const selected = fortunePool[randomIndex]
      setCurrentFortune(selected)
      setIsOpening(false)
      onAction?.(config, { fortune: selected })
    }, 1200)
  }

  const handleCopy = () => {
    if (!currentFortune) return
    navigator.clipboard.writeText(currentFortune)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`w-full ${layout.wrapperClass} ${layout.paddingClass}`}>
      <div className={layout.innerClass}>
        <AtomCard01 className="p-6 md:p-8 flex flex-col items-center bg-gradient-to-br from-amber-50/50 via-white to-orange-50/50 shadow-xl rounded-3xl border border-amber-100/60">
        {/* Header */}
        <div className="text-center mb-6">
          <AtomBadge01 variant="info" className="mb-2 inline-flex items-center gap-1">
            <AtomIcon01 icon={Sparkles} size={14} />
            오늘의 운세
          </AtomBadge01>
          <AtomText01 variant="h2" className="font-bold text-slate-900">
            {cardTitle}
          </AtomText01>
          <AtomText01 variant="p" className="text-slate-500 mt-1">
            {subtitle}
          </AtomText01>
        </div>

        {/* Fortune Graphic Icon Container */}
        <div
          className={`w-36 h-36 md:w-44 md:h-44 my-4 flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-100 to-orange-200 shadow-inner cursor-pointer transition-transform duration-500 hover:scale-105 ${
            isOpening ? 'animate-bounce' : ''
          }`}
          onClick={handleDrawFortune}
        >
          <AtomIcon01 icon={Cookie} className="text-amber-700 drop-shadow-md" size={72} />
        </div>

        {/* Result Card Banner */}
        {currentFortune && (
          <div className="w-full max-w-md my-4 p-6 bg-white rounded-2xl shadow-lg border border-amber-200 text-center animate-fade-in">
            <AtomBadge01 variant="default" className="mb-2">
              오늘의 행운 메시지
            </AtomBadge01>
            <AtomText01 variant="p" className="font-bold text-slate-900 text-base md:text-lg leading-relaxed my-2">
              {currentFortune}
            </AtomText01>

            <AtomBtn01
              variant="ghost"
              className="mt-3 text-xs text-slate-500 flex items-center gap-1 mx-auto hover:text-slate-800"
              onClick={handleCopy}
            >
              <AtomIcon01 icon={copied ? Check : Share2} size={14} />
              {copied ? '복사되었습니다!' : '메시지 복사하기'}
            </AtomBtn01>
          </div>
        )}

        {/* Action Button */}
        <AtomBtn01
          variant="default"
          className="w-full max-w-xs mt-4 py-3 text-lg font-bold shadow-md rounded-2xl bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleDrawFortune}
          disabled={isOpening}
        >
          {isOpening ? '포춘쿠키 깨는 중...' : buttonText}
        </AtomBtn01>
      </AtomCard01>
      </div>
    </div>
    </BlockBackground>
  )
}
