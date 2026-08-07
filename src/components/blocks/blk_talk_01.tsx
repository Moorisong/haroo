'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import type { BlockInputConfig } from '@/types'

interface Props { config: BlockInputConfig }

export default function BlkTalk01({ config }: Props) {
  const {
    title = '자동 메시지 및 알림 안내',
    subtitle = '중요 안내, 확인 연락, 주요 소식을 수신자에게 자동으로 전송해 드립니다.',
    buttonText = '알림 서비스 설정하기',
    backgroundColor = '#FEE500',
    textColor = '#000000',
  } = config

  const features = [
    { icon: '✉️', text: '월 100건 무료 발송 (초과 시 LMS 자동 전환)' },
    { icon: '⚡', text: '이벤트 및 조건 충족 시 즉시 자동 발송' },
    { icon: '📋', text: '메시지 템플릿 커스터마이징 지원' },
  ]

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className="w-full px-6 py-14 flex justify-center">
        <div className="w-full max-w-lg">
          <AtomBadge01 className="mb-4 bg-black/10 text-black border-black/20">자동 메시지 알림</AtomBadge01>
          <AtomText01 as="h2" className="text-2xl font-black mb-2">{title}</AtomText01>
          <AtomText01 as="p" className="opacity-70 text-sm mb-8">{subtitle}</AtomText01>

          <AtomCard01 className="mb-6 border-black/10 bg-white/60">
            <ul className="space-y-4">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <AtomText01 as="span" className="text-sm font-medium">{f.text}</AtomText01>
                </li>
              ))}
            </ul>
          </AtomCard01>

          <AtomDivider01 className="mb-6 border-black/20" />
          <AtomBtn01 className="w-full bg-black text-yellow-400 font-bold hover:bg-black/90">
            {buttonText}
          </AtomBtn01>
        </div>
      </div>
    </AtomCard01>
  )
}
