import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig

  isPreview?: boolean
  onAction?: (config: any, formData?: any) => void
}

export default function BlkTable01({ config, isPreview  }: Props) {
  const { 
    title = '데이터 보드', 
    subtitle = '상세 내역을 확인해보세요', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    tableColumns = [
      { key: 'name', label: '이름' },
      { key: 'amount', label: '금액' },
      { key: 'status', label: '상태' }
    ],
    tableData = [
      { name: '김철수', amount: '50,000원', status: '완료' },
      { name: '이영희', amount: '35,000원', status: '대기' }
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} flex flex-col gap-6`}>
          
          <div className="space-y-2">
            <AtomText01 variant="h3" className="text-xl sm:text-2xl font-bold tracking-tight">
              {title}
            </AtomText01>
            {subtitle && (
              <AtomText01 variant="p" className="text-sm sm:text-base opacity-80">
                {subtitle}
              </AtomText01>
            )}
          </div>

          <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {tableColumns.map((col) => (
                    <th key={col.key} className="py-3 px-4 text-xs sm:text-sm font-semibold text-slate-600">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    {tableColumns.map((col) => (
                      <td key={col.key} className="py-3 px-4 text-xs sm:text-sm text-slate-900">
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </BlockBackground>
  )
}
