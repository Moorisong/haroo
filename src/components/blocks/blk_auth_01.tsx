'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props { config: BlockInputConfig }

const LOGIN_PROVIDERS = [
  { key: 'kakao', label: '카카오로 시작하기', emoji: '💬', bg: '#FEE500', color: '#000000' },
  { key: 'google', label: 'Google로 시작하기', emoji: '🔵', bg: '#4285F4', color: '#ffffff' },
]

export default function BlkAuth01({ config }: Props) {
  const {
    title = '로그인하고 혜택을 받으세요',
    subtitle = '간편하게 로그인하여 예약, 스탬프, 쿠폰을 관리하세요.',
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
          <AtomBadge01 variant="default" className="mb-4 mx-auto">🔑 소셜 로그인</AtomBadge01>
          <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>
          <AtomText01 as="p" className="opacity-70 text-sm mb-8">{subtitle}</AtomText01>

          <div className="flex flex-col gap-3 mb-6">
            {LOGIN_PROVIDERS.map((p) => (
              <AtomBtn01
                key={p.key}
                className="w-full flex items-center justify-center gap-3 py-3 font-bold rounded-xl"
                style={{ backgroundColor: p.bg, color: p.color, border: 'none' }}
              >
                <span>{p.emoji}</span>
                {p.label}
              </AtomBtn01>
            ))}
          </div>

          <AtomDivider01 className="mb-4" />
          <AtomText01 as="p" className="text-xs text-slate-400">
            로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
          </AtomText01>
        </div>
      </div>
    </AtomCard01>
  )
}
