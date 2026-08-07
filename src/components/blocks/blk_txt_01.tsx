import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import type { BlockInputConfig } from '@/types'

interface Props {
  config: BlockInputConfig
}

export default function BlkTxt01({ config }: Props) {
  const { 
    title = '자유롭게 텍스트를 작성하세요', 
    subtitle = '여기에 내용을 입력하시면 됩니다. 에디터를 통해 서식을 지정할 수도 있습니다.', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a'
  } = config

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className="w-full px-6 py-12 flex justify-center">
        <div className="w-full max-w-2xl text-center">
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
