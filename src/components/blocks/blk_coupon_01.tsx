'use client'

import { useState } from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomInput01 from '../atoms/atom_input_01'
import AtomLabel01 from '../atoms/atom_label_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

function generateCode() {
  return 'HAROO-' + Math.random().toString(36).toUpperCase().slice(2, 8)
}

export default function BlkCoupon01({ config, isPreview, onAction }: Props) {
  const [issued, setIssued] = useState(false)
  const [code, setCode] = useState('')

  const {
    title = '쿠폰 발급기',
    subtitle = '아래 버튼을 눌러 할인 쿠폰을 받으세요!',
    buttonText = '쿠폰 발급받기',
    discountText = '10% 할인',
    expiryText = '발급 후 30일 유효',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config as BlockInputConfig & { discountText?: string; expiryText?: string }

  const handleIssue = () => {
    setCode(generateCode())
    setIssued(true)
    onAction?.(config)
  }

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} text-center`}>
          <AtomBadge01 variant="success" className="mb-4 mx-auto">🎫 쿠폰</AtomBadge01>
          <AtomText01 as="h2" className="text-2xl font-bold mb-2 break-keep">{title}</AtomText01>
          <AtomText01 as="p" className="opacity-70 text-sm mb-8 break-keep">{subtitle}</AtomText01>

          {!issued ? (
            <AtomCard01 className="border-dashed border-2 border-slate-300 bg-slate-50 mb-6">
              <div className="text-6xl mb-3">🎁</div>
              <AtomText01 as="p" className="text-3xl font-black text-slate-900 mb-1 break-keep">{discountText}</AtomText01>
              <AtomText01 as="p" className="text-xs text-slate-400">{expiryText}</AtomText01>
            </AtomCard01>
          ) : (
            <AtomCard01 className="border-2 border-emerald-400 bg-emerald-50 mb-6">
              <AtomBadge01 variant="success" className="mb-3 mx-auto">✓ 발급 완료</AtomBadge01>
              <AtomText01 as="p" className="text-2xl font-black text-emerald-700 mb-2 break-keep">{discountText}</AtomText01>
              <AtomDivider01 className="my-3 border-emerald-200" />
              <AtomLabel01 className="text-xs text-slate-400 block mb-1">쿠폰 코드</AtomLabel01>
              <AtomText01 as="p" className="font-mono text-base font-bold tracking-wider text-slate-800">{code}</AtomText01>
              <AtomText01 as="p" className="text-xs text-slate-400 mt-2">{expiryText}</AtomText01>
            </AtomCard01>
          )}

          <AtomBtn01
            className="w-full"
            onClick={handleIssue}
            disabled={issued}
          >
            {issued ? '✓ 쿠폰이 발급되었습니다' : buttonText}
          </AtomBtn01>
        </div>
      </div>
    </AtomCard01>
  )
}
