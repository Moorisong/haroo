'use client'

import { useState } from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props { config: BlockInputConfig 
  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

export default function BlkLike01({ config, isPreview  }: Props) {
  const [liked, setLiked] = useState(false)
  const [scraped, setScraped] = useState(false)
  const [count, setCount] = useState(128)

  const {
    title = '이 콘텐츠가 도움이 되셨나요?',
    subtitle = '좋아요와 스크랩으로 응원해 주세요!',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config

  const handleLike = () => {
    setLiked((v) => !v)
    setCount((c) => liked ? c - 1 : c + 1)
  }

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} text-center`}>
          <AtomText01 as="h2" className="text-xl font-bold mb-2">{title}</AtomText01>
          <AtomText01 as="p" className="opacity-60 text-sm mb-8">{subtitle}</AtomText01>

          <div className="flex items-center justify-center gap-4">
            {/* 좋아요 버튼 */}
            <button
              type="button"
              onClick={handleLike}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 transition-all ${liked ? 'bg-red-50 border-red-300 scale-110' : 'bg-slate-50 border-slate-200 hover:border-red-300'}`}>
                {liked ? '❤️' : '🤍'}
              </div>
              <AtomText01 as="span" className="text-xs font-semibold text-slate-500">{count}</AtomText01>
            </button>

            {/* 스크랩 버튼 */}
            <button
              type="button"
              onClick={() => setScraped((v) => !v)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 transition-all ${scraped ? 'bg-amber-50 border-amber-300 scale-110' : 'bg-slate-50 border-slate-200 hover:border-amber-300'}`}>
                {scraped ? '🔖' : '📌'}
              </div>
              <AtomText01 as="span" className="text-xs font-semibold text-slate-500">스크랩</AtomText01>
            </button>
          </div>

          {(liked || scraped) && (
            <AtomBadge01 variant="success" className="mt-6 mx-auto">
              {liked && scraped ? '❤️🔖 좋아요 & 스크랩 완료!' : liked ? '❤️ 좋아요 완료!' : '🔖 스크랩 완료!'}
            </AtomBadge01>
          )}
        </div>
      </div>
    </BlockBackground>
  )
}
