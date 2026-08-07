'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props { config: BlockInputConfig }

const SHARE_CHANNELS = [
  { key: 'kakao', label: '카카오톡 공유', icon: '💬', color: '#FEE500', textColor: '#000000' },
  { key: 'copy', label: 'URL 복사', icon: '🔗', color: '#0f172a', textColor: '#ffffff' },
  { key: 'twitter', label: 'X (트위터)', icon: '✕', color: '#1D9BF0', textColor: '#ffffff' },
]

export default function BlkShare01({ config }: Props) {
  const {
    title = '이 페이지를 공유해 보세요',
    subtitle = '친구에게 소식을 알려보세요!',
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
          <AtomBadge01 variant="info" className="mb-4 mx-auto">공유하기</AtomBadge01>
          <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>
          <AtomText01 as="p" className="opacity-70 mb-8 text-sm">{subtitle}</AtomText01>

          <div className="flex flex-col gap-3">
            {SHARE_CHANNELS.map((ch) => (
              <AtomBtn01
                key={ch.key}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: ch.color, color: ch.textColor, border: 'none' }}
              >
                <span className="text-base">{ch.icon}</span>
                {ch.label}
              </AtomBtn01>
            ))}
          </div>
        </div>
      </div>
    </AtomCard01>
  )
}
