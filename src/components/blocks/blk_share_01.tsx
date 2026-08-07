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
    <AtomCard01 noPadding className="w-full border-none rounded-none overflow-hidden" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-3 sm:px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} text-center w-full max-w-full overflow-hidden`}>
          <AtomBadge01 variant="info" className="mb-2 mx-auto text-[10px] sm:text-xs px-2 py-0.5 font-bold">공유하기</AtomBadge01>
          <AtomText01 as="h2" className="text-lg sm:text-xl md:text-4xl font-black mb-1.5 md:mb-3 tracking-tight break-keep">{title}</AtomText01>
          <AtomText01 as="p" className="opacity-70 mb-4 md:mb-8 text-[11px] sm:text-sm md:text-base max-w-2xl mx-auto break-keep">{subtitle}</AtomText01>

          <AtomCard01 className="w-full max-w-full md:max-w-3xl mx-auto shadow-sm border-slate-200 p-3 md:p-6 rounded-[14px] md:rounded-2xl overflow-hidden bg-slate-50/50">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
              {SHARE_CHANNELS.map((ch) => (
                <AtomBtn01
                  key={ch.key}
                  className="flex-1 min-w-[240px] flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-4 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base font-extrabold shadow-sm transition-all hover:scale-[1.02] whitespace-nowrap"
                  style={{ backgroundColor: ch.color, color: ch.textColor, border: 'none' }}
                >
                  <span className="text-sm md:text-lg">{ch.icon}</span>
                  {ch.label}
                </AtomBtn01>
              ))}
            </div>
          </AtomCard01>
        </div>
      </div>
    </AtomCard01>
  )
}
