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
        <div className={`${layout.innerClass} text-center`}>
          <AtomText01 variant="h2" className="mb-4 font-bold tracking-tight">
            {title}
          </AtomText01>
          <AtomText01 variant="p" className="opacity-90 leading-relaxed whitespace-pre-wrap">
            {subtitle}
          </AtomText01>
        </div>
      </div>
    </AtomCard01>
  )
}
