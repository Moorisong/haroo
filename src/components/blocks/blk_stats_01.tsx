'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomProgress01 from '../atoms/atom_progress_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface StatItem { label: string; value: string; change: string; positive: boolean }

const DEFAULT_STATS: StatItem[] = [
  { label: '오늘 방문자', value: '247', change: '+18%', positive: true },
  { label: '이번 주 방문자', value: '1,432', change: '+7%', positive: true },
  { label: '총 문의', value: '38', change: '-2', positive: false },
  { label: '전환율', value: '15.4%', change: '+3.1%', positive: true },
]

interface Props { config: BlockInputConfig }

export default function BlkStats01({ config }: Props) {
  const {
    title = '방문자 통계',
    subtitle = '실시간으로 방문자 현황을 확인하세요.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <AtomText01 as="h2" className="text-2xl font-bold">{title}</AtomText01>
              <AtomText01 as="p" className="opacity-70 text-sm mt-1 break-keep">{subtitle}</AtomText01>
            </div>
            <AtomBadge01 variant="success" className="flex-shrink-0">● 실시간</AtomBadge01>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {DEFAULT_STATS.map((stat) => (
              <AtomCard01 key={stat.label}>
                <AtomText01 as="p" className="text-xs text-slate-400 mb-2">{stat.label}</AtomText01>
                <AtomText01 as="p" className="text-2xl font-black mb-1 break-keep">{stat.value}</AtomText01>
                <AtomBadge01
                  className={`text-xs ${stat.positive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-500 border-red-100'}`}
                >
                  {stat.change}
                </AtomBadge01>
              </AtomCard01>
            ))}
          </div>

          <AtomDivider01 className="mb-6" />

          <AtomCard01 className="bg-slate-50">
            <AtomText01 as="p" className="text-xs font-bold text-slate-400 mb-4">이번 주 일별 방문자 추이</AtomText01>
            <div className="flex items-end justify-between gap-2 h-24">
              {[40, 65, 50, 80, 70, 90, 100].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-md bg-slate-900" style={{ height: `${v}%` }} />
                  <AtomText01 as="span" className="text-[10px] text-slate-400">
                    {['월', '화', '수', '목', '금', '토', '일'][i]}
                  </AtomText01>
                </div>
              ))}
            </div>
          </AtomCard01>
        </div>
      </div>
    </AtomCard01>
  )
}
