'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props { config: BlockInputConfig }

const PAYMENT_METHODS = ['💳 신용카드', '📱 카카오페이', '🍎 애플페이', '🏦 실시간 계좌이체']

export default function BlkPay01({ config }: Props) {
  const {
    title = '안전하게 결제하세요',
    subtitle = '다양한 결제 수단을 지원합니다.',
    buttonText = '결제하기',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    price = '29,000',
    productName = '월정액 구독권',
  } = config as BlockInputConfig & { price?: string; productName?: string }

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-8">
            <AtomBadge01 variant="default" className="mb-3 mx-auto">💳 결제</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm">{subtitle}</AtomText01>
          </div>

          {/* 상품 정보 */}
          <AtomCard01 className="mb-4 bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <AtomText01 as="p" className="text-xs text-slate-400 mb-1">결제 상품</AtomText01>
                <AtomText01 as="p" className="text-sm font-bold">{productName}</AtomText01>
              </div>
              <AtomText01 as="span" className="text-2xl font-black">{price}원</AtomText01>
            </div>
          </AtomCard01>

          {/* 결제 수단 */}
          <AtomCard01 className="mb-6">
            <AtomText01 as="p" className="text-xs font-bold text-slate-400 mb-3">지원 결제 수단</AtomText01>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <AtomBadge01 key={m} className="text-xs">{m}</AtomBadge01>
              ))}
            </div>
          </AtomCard01>

          <AtomDivider01 className="mb-6" />
          <AtomBtn01 className="w-full py-4 text-base font-bold">
            {buttonText} · {price}원
          </AtomBtn01>
          <AtomText01 as="p" className="text-center text-xs text-slate-400 mt-3">
            포트원(PortOne) PG 결제 시스템으로 안전하게 처리됩니다.
          </AtomText01>
        </div>
      </div>
    </AtomCard01>
  )
}
