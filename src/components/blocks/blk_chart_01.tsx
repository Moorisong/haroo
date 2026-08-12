'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface ChartData {
  label: string
  value: number
}

const DEFAULT_CHART_DATA: ChartData[] = [
  { label: '월', value: 40 },
  { label: '화', value: 65 },
  { label: '수', value: 50 },
  { label: '목', value: 80 },
  { label: '금', value: 70 },
  { label: '토', value: 90 },
  { label: '일', value: 100 },
]

interface Props { config: BlockInputConfig; isPreview?: boolean; onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void }

export default function BlkChart01({ config }: Props) {
  const {
    title = '통계 차트',
    subtitle = '변화 추이를 확인하세요.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  
  const chartData = config.chartData || DEFAULT_CHART_DATA
  const chartType = config.chartType || 'bar' // 'bar' | 'dot'
  const chartColor = config.chartColor || '#0284C7'
  const legendLabel = config.legendLabel || '수치'

  const maxValue = Math.max(...chartData.map((d: ChartData) => d.value), 1)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              {title && <AtomText01 as="h2" className="text-2xl font-bold">{title}</AtomText01>}
              {subtitle && <AtomText01 as="p" className="opacity-70 text-sm mt-1">{subtitle}</AtomText01>}
            </div>
            {legendLabel && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: chartColor }} />
                <AtomText01 as="span" className="text-xs opacity-70">{legendLabel}</AtomText01>
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl border relative" style={{ borderColor: 'rgba(0,0,0,0.05)', backgroundColor: 'rgba(255,255,255,0.5)' }}>
            <div className="flex items-end justify-between gap-1 sm:gap-2 h-48 pt-4 relative">
              {chartType === 'line' && (
                <div className="absolute inset-x-0 bottom-6 top-4 pointer-events-none" style={{ left: 'calc(1.5rem / 2)', right: 'calc(1.5rem / 2)' }}>
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline 
                      fill="none" 
                      stroke={chartColor} 
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke"
                      points={chartData.map((d: ChartData, i: number) => {
                        const x = chartData.length > 1 ? (i / (chartData.length - 1)) * 100 : 50;
                        const y = 100 - ((d.value / maxValue) * 100);
                        return `${x},${y}`;
                      }).join(' ')} 
                    />
                  </svg>
                </div>
              )}
              {chartData.map((data: ChartData, i: number) => {
                const heightPercent = (data.value / maxValue) * 100
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                      {data.value}
                    </div>
                    {chartType === 'bar' ? (
                      <div 
                        className="w-full max-w-[40px] rounded-t-sm transition-all duration-500 opacity-90 hover:opacity-100" 
                        style={{ height: `${heightPercent}%`, backgroundColor: chartColor }} 
                      />
                    ) : (
                      <div className="w-full flex justify-center items-end" style={{ height: `${heightPercent}%` }}>
                        <div className="w-2.5 h-2.5 rounded-full opacity-100 transition-all hover:scale-150 border-2 border-white" style={{ backgroundColor: chartColor }} />
                      </div>
                    )}
                    <AtomText01 as="span" className="text-[10px] sm:text-xs opacity-50 font-medium whitespace-nowrap absolute -bottom-6">
                      {data.label}
                    </AtomText01>
                  </div>
                )
              })}
            </div>
            {/* Added bottom padding to accommodate absolutely positioned labels */}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </AtomCard01>
  )
}
