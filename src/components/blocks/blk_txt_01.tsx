import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
}

export default function BlkTxt01({ config }: Props) {
  const { 
    title = '자유롭게 텍스트를 작성하세요', 
    subtitle = '여기에 내용을 입력하시면 됩니다. 에디터를 통해 서식을 지정할 수도 있습니다.', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} text-center max-w-4xl mx-auto`}>
          <AtomText01 variant="h2" className="text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-5 font-black tracking-tight leading-tight">
            {title}
          </AtomText01>
          <AtomText01 variant="p" className="text-xs sm:text-sm md:text-lg lg:text-xl opacity-80 leading-relaxed whitespace-pre-wrap font-normal">
            {subtitle}
          </AtomText01>
        </div>
      </div>
    </AtomCard01>
  )
}
