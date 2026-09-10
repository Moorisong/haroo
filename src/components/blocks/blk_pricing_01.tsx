'use client'

import React from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"
import { DEFAULT_PLANS, type PricingPlan } from '../builder/panel/pricingTypes'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkPricing01({ config, isPreview, onAction }: Props) {
  const safeConfig = config ?? {}
  const {
    title = '요금제를 선택하세요',
    subtitle = '당신의 비즈니스에 꼭 맞는 플랜을 골라보세요.',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    titleStyle,
    subtitleStyle,
    plans: configPlans,
  } = safeConfig as BlockInputConfig & { plans?: PricingPlan[] }

  const selectElement = useElementSelector()
  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const plans: PricingPlan[] = configPlans && Array.isArray(configPlans) && configPlans.length > 0
    ? configPlans
    : DEFAULT_PLANS

  // 카드 수에 따른 동적 그리드 컬럼 클래스 결정 (1개~4개 이상)
  const gridColsClass = plans.length === 1
    ? 'grid-cols-1 max-w-md mx-auto'
    : plans.length === 2
    ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
    : plans.length === 3
    ? 'grid-cols-1 sm:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'

  return (
    <BlockBackground config={safeConfig} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-12">
            <AtomText01
              as="h2"
              className={cn(
                'text-3xl font-black mb-3 break-keep p-1 rounded pointer-events-auto',
                !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
              )}
              style={{
                color: titleStyle?.color || textColor,
                fontFamily: titleStyle?.fontFamily,
                fontWeight: titleStyle?.fontWeight || '900',
                fontSize: titleStyle?.fontSize,
              }}
              onClick={(e) => {
                if (isPreview) return
                e.stopPropagation()
                selectElement('title', e)
              }}
            >
              {title}
            </AtomText01>

            <AtomText01
              as="p"
              className={cn(
                'opacity-70 break-keep p-1 rounded pointer-events-auto',
                !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
              )}
              style={{
                color: subtitleStyle?.color || textColor,
                fontFamily: subtitleStyle?.fontFamily,
                fontWeight: subtitleStyle?.fontWeight || '400',
                fontSize: subtitleStyle?.fontSize,
              }}
              onClick={(e) => {
                if (isPreview) return
                e.stopPropagation()
                selectElement('subtitle', e)
              }}
            >
              {subtitle}
            </AtomText01>
          </div>

          <div className={cn('grid gap-4', gridColsClass)}>
            {plans.map((plan, idx) => (
              <div
                key={plan.id || idx}
                className={cn(
                  'relative transition-all pointer-events-auto h-full flex flex-col',
                  !isPreview && 'cursor-pointer hover:ring-2 hover:ring-sky-400 rounded-xl'
                )}
                onClick={(e) => {
                  if (isPreview) return
                  e.stopPropagation()
                  selectElement(`plan-${idx}`, e)
                }}
              >
                <AtomCard01
                  className={cn(
                    'h-full flex flex-col justify-between transition-shadow',
                    plan.highlight
                      ? 'border-slate-900 border-2 shadow-md relative bg-white'
                      : 'border border-slate-200 shadow-sm bg-white'
                  )}
                >
                  {plan.highlight && (
                    <AtomBadge01
                      variant="default"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white border-none shadow-sm"
                    >
                      추천
                    </AtomBadge01>
                  )}
                  <div>
                    <AtomText01 as="h3" className="text-sm font-bold mb-3 opacity-60">
                      {plan.name}
                    </AtomText01>
                    <div className="flex items-end gap-1 mb-4 flex-wrap">
                      <AtomText01 as="span" className="text-3xl font-black">
                        {plan.price}
                      </AtomText01>
                      {plan.period && (
                        <AtomText01 as="span" className="text-sm opacity-60 mb-1">
                          {plan.period}
                        </AtomText01>
                      )}
                    </div>
                    <AtomDivider01 className="mb-4" />
                    <ul className="space-y-2 mb-6">
                      {(plan.features || []).map((f, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <AtomText01 as="span" className="text-sm">
                            {f}
                          </AtomText01>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <AtomBtn01
                    className="w-full mt-auto"
                    variant={plan.highlight ? 'default' : 'outline'}
                    onClick={(e) => {
                      if (isPreview) {
                        const planActionConfig: BlockInputConfig = {
                          ...config,
                          actionType: plan.actionType || config.actionType,
                          buttonLink: plan.buttonLink || config.buttonLink,
                          downloadFileUrl: plan.downloadFileUrl || plan.buttonLink || config.downloadFileUrl,
                          downloadFileName: plan.downloadFileName || config.downloadFileName,
                          downloadFileSize: plan.downloadFileSize || config.downloadFileSize,
                          thankYouMessage: plan.thankYouMessage || config.thankYouMessage,
                          modalIcon: plan.modalIcon || config.modalIcon,
                          customTargetId: plan.customTargetId || config.customTargetId,
                        }
                        onAction?.(planActionConfig)
                      } else {
                        e.stopPropagation()
                        selectElement(`plan-${idx}`, e)
                      }
                    }}
                  >
                    {plan.cta || '신청하기'}
                  </AtomBtn01>
                </AtomCard01>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockBackground>
  )
}
