'use client'

import React from 'react'
import { Building2, PartyPopper, UserCheck, ShoppingBag, LayoutTemplate, PieChart } from 'lucide-react'
import type { SiteTemplateCategory } from '@/types'

interface TemplateStatItem {
  category: SiteTemplateCategory
  label: string
  count: number
  percentage: number
  color: string
  icon: React.ElementType
}

interface AdminTemplateStatsPanelProps {
  templateData?: Record<SiteTemplateCategory, number>
}

// 기본 mock 데이터 (드래프트 기반 수집 데이터 연결 fallbacks)
const DEFAULT_DATA: Record<SiteTemplateCategory, number> = {
  COMPANY: 1840,
  EVENT: 1120,
  PORTFOLIO: 640,
  COMMERCE: 410,
  BLANK: 200,
}

export default function AdminTemplateStatsPanel({ templateData = DEFAULT_DATA }: AdminTemplateStatsPanelProps) {
  const total = Object.values(templateData).reduce((acc, curr) => acc + curr, 0) || 1

  const items: TemplateStatItem[] = [
    {
      category: 'COMPANY',
      label: '회사 / 브랜드 소개',
      count: templateData.COMPANY || 0,
      percentage: Math.round(((templateData.COMPANY || 0) / total) * 100),
      color: 'bg-blue-500',
      icon: Building2,
    },
    {
      category: 'EVENT',
      label: '모바일 이벤트 / 청첩장',
      count: templateData.EVENT || 0,
      percentage: Math.round(((templateData.EVENT || 0) / total) * 100),
      color: 'bg-pink-500',
      icon: PartyPopper,
    },
    {
      category: 'PORTFOLIO',
      label: '개인 포트폴리오',
      count: templateData.PORTFOLIO || 0,
      percentage: Math.round(((templateData.PORTFOLIO || 0) / total) * 100),
      color: 'bg-emerald-500',
      icon: UserCheck,
    },
    {
      category: 'COMMERCE',
      label: '쇼핑몰 / 커머스',
      count: templateData.COMMERCE || 0,
      percentage: Math.round(((templateData.COMMERCE || 0) / total) * 100),
      color: 'bg-amber-500',
      icon: ShoppingBag,
    },
    {
      category: 'BLANK',
      label: '자유 구성 (빈 화면)',
      count: templateData.BLANK || 0,
      percentage: Math.round(((templateData.BLANK || 0) / total) * 100),
      color: 'bg-slate-400',
      icon: LayoutTemplate,
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">인기 사이트 목적 통계</h3>
            <p className="text-[11px] text-slate-400">2단계 템플릿 모달 유저 선택 비율</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
          총 {total.toLocaleString()}건
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="font-semibold text-slate-800">{item.count.toLocaleString()}건</span>
                  <span className="text-[11px] text-slate-400">({item.percentage}%)</span>
                </div>
              </div>

              {/* 프로그레스 바 */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
