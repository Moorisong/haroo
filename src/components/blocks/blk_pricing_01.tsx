'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface PricingPlan {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  highlight?: boolean
}

interface Props { config: BlockInputConfig }

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: 'STARTER',
    price: '무료',
    period: '',
    features: ['기본 블록 6종', '하루 서브도메인', '월 1,000 PV'],
    cta: '무료로 시작',
    highlight: false,
  },
  {
    name: 'STANDARD',
    price: '29,000원',
    period: '/ 월',
    features: ['표준 블록 12종', '카카오 알림톡 100건', '폼 데이터 수집', '갤러리 앨범'],
    cta: '지금 시작',
    highlight: true,
  },
  {
    name: 'PROFESSIONAL',
    price: '59,000원',
    period: '/ 월',
    features: ['전체 블록 45종', '커스텀 도메인 연결', '전자결제 포트원', '통계 엔진'],
    cta: '프로 시작',
    highlight: false,
  },
]

export default function BlkPricing01({ config }: Props) {
  const {
    title = '요금제를 선택하세요',
    subtitle = '당신의 비즈니스에 꼭 맞는 플랜을 골라보세요.',
    backgroundColor = '#f8fafc',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-12">
            <AtomText01 as="h2" className="text-3xl font-black mb-3">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70">{subtitle}</AtomText01>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DEFAULT_PLANS.map((plan) => (
              <AtomCard01
                key={plan.name}
                className={plan.highlight ? 'border-slate-900 border-2 relative' : ''}
              >
                {plan.highlight && (
                  <AtomBadge01 variant="default" className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white border-none">
                    추천
                  </AtomBadge01>
                )}
                <AtomText01 as="h3" className="text-sm font-bold mb-3 opacity-60">{plan.name}</AtomText01>
                <div className="flex items-end gap-1 mb-4">
                  <AtomText01 as="span" className="text-3xl font-black">{plan.price}</AtomText01>
                  <AtomText01 as="span" className="text-sm opacity-60 mb-1">{plan.period}</AtomText01>
                </div>
                <AtomDivider01 className="mb-4" />
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <AtomText01 as="span" className="text-sm">{f}</AtomText01>
                    </li>
                  ))}
                </ul>
                <AtomBtn01
                  className="w-full"
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                </AtomBtn01>
              </AtomCard01>
            ))}
          </div>
        </div>
      </div>
    </AtomCard01>
  )
}
