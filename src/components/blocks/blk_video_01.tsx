'use client'

import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

export default function BlkVideo01({ config, isPreview }: Props) {
  const safeConfig = config ?? {}
  const { 
    title = '비디오 타이틀', 
    subtitle = '영상을 통해 더 자세한 내용을 확인해보세요.',
    videoUrl,
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    titleStyle,
    subtitleStyle,
  } = safeConfig

  const selectElement = useElementSelector()

  // 유튜브 URL을 embed용 URL로 변환하는 헬퍼
  const getEmbedUrl = (url?: string) => {
    if (!url) return ''
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  const embedUrl = getEmbedUrl(videoUrl)
  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={safeConfig} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-8">
            <AtomText01
              as="h2"
              className={cn(
                'text-lg sm:text-xl md:text-4xl font-black mb-1.5 md:mb-3 tracking-tight break-keep p-1 rounded pointer-events-auto',
                !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
              )}
              style={{
                color: titleStyle?.color || textColor,
                fontFamily: titleStyle?.fontFamily,
                fontWeight: titleStyle?.fontWeight || '900',
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
                'opacity-70 text-[11px] sm:text-sm md:text-base max-w-2xl mx-auto break-keep p-1 rounded pointer-events-auto',
                !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
              )}
              style={{
                color: subtitleStyle?.color || textColor,
                fontFamily: subtitleStyle?.fontFamily,
                fontWeight: subtitleStyle?.fontWeight || '400',
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
            className={cn(
              'w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl flex items-center justify-center relative transition-all',
              !isPreview && 'cursor-pointer hover:ring-2 hover:ring-sky-500'
            )}
            onClick={(e) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('video', e)
            }}
          >
            {embedUrl ? (
              <div className="relative w-full h-full">
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
                {/* 편집 모드일 때 클릭 가로채기 방지 및 속성창 호출 오버레이 */}
                {!isPreview && (
                  <div
                    className="absolute inset-0 bg-transparent z-10"
                    title="클릭하여 영상 링크를 수정하세요"
                  />
                )}
              </div>
            ) : (
              <div className="text-white/50 flex flex-col items-center select-none p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4 text-white/70"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <p className="text-sm font-medium text-white/80 mb-1">
                  {!isPreview ? '클릭하여 비디오 URL을 입력해주세요' : '비디오가 등록되지 않았습니다'}
                </p>
                {!isPreview && (
                  <span className="text-xs text-white/40">유튜브 링크를 지원합니다</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockBackground>
  )
}
