import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig

  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

export default function BlkVideo01({ config, isPreview  }: Props) {
  const { 
    title = '비디오 타이틀', 
    subtitle = '영상을 통해 더 자세한 내용을 확인해보세요.',
    videoUrl,
    backgroundColor = '#f8fafc',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config

  // 유튜브 URL을 embed용 URL로 변환하는 간단한 헬퍼
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
    return url // 그 외는 일단 원본 반환
  }

  const embedUrl = getEmbedUrl(videoUrl)

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
        <div className="text-center mb-8">
          <AtomText01 variant="h2" className="mb-2 font-bold">{title}</AtomText01>
          <AtomText01 variant="p" className="opacity-80">{subtitle}</AtomText01>
        </div>
        
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
          {embedUrl ? (
            <iframe 
              src={embedUrl} 
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title={title}
            ></iframe>
          ) : (
            <div className="text-white/50 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <p>비디오 URL을 입력해주세요.</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </BlockBackground>
  )
}
