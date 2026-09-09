import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomSwitch01 from '../atoms/atom_switch_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import BlockBackground from '../common/BlockBackground'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import { cn } from '@/lib/utils'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkActionList01({ config, isPreview, onAction }: Props) {
  const { 
    title = '제목을 입력하세요', 
    subtitle = '부제목 또는 내용을 입력하세요.', 
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    actionItems = [
      { id: '1', title: '컨디션은 좋으신가요?', description: '어제 푹 주무셨는지 체크해주세요', controlType: 'switch', defaultChecked: true },
      { id: '2', title: '오늘 외출 약속이 있나요?', controlType: 'switch', defaultChecked: false },
      { id: '3', title: '긴급 연락처 등록', description: '응급 시 보호자에게 알림이 갑니다', controlType: 'button', buttonText: '등록하기' },
    ],
    titleStyle,
    subtitleStyle,
  } = config

  const selectElement = useElementSelector()
  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} max-w-3xl mx-auto flex flex-col gap-6`}>
          
          <div className="space-y-2 flex flex-col">
            <AtomText01 
              variant="h3" 
              className={cn(
                "text-xl sm:text-2xl font-bold tracking-tight break-keep break-words break-all w-full p-1 rounded pointer-events-auto",
                !isPreview && "cursor-pointer hover:ring-1 hover:ring-slate-300"
              )}
              style={{
                color: titleStyle?.color || textColor,
                fontFamily: titleStyle?.fontFamily,
                fontWeight: titleStyle?.fontWeight,
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
            {subtitle && (
              <AtomText01 
                variant="p" 
                className={cn(
                  "text-sm sm:text-base opacity-80 break-keep break-words break-all w-full p-1 rounded pointer-events-auto",
                  !isPreview && "cursor-pointer hover:ring-1 hover:ring-slate-300"
                )}
                style={{
                  color: subtitleStyle?.color || textColor,
                  fontFamily: subtitleStyle?.fontFamily,
                  fontWeight: subtitleStyle?.fontWeight,
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
            )}
          </div>

          <div 
            className={cn(
              "flex flex-col rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 bg-white pointer-events-auto",
              !isPreview && "cursor-pointer hover:ring-1 hover:ring-slate-300"
            )}
            onClick={(e) => {
              if (isPreview) return
              e.stopPropagation()
              selectElement('list', e)
            }}
          >
            {actionItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col gap-1 flex-1 pr-4">
                  <AtomText01 variant="h4" className="font-semibold text-sm sm:text-base text-slate-900">
                    {item.title}
                  </AtomText01>
                  {item.description && (
                    <AtomText01 variant="p" className="text-xs sm:text-sm text-slate-500">
                      {item.description}
                    </AtomText01>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  {item.controlType === 'switch' ? (
                    <AtomSwitch01 
                      defaultChecked={item.defaultChecked} 
                      onChange={(checked) => onAction?.(config, { action: 'TOGGLE_SWITCH', itemId: item.id, checked: String(checked) })}
                    />
                  ) : (
                    <AtomBtn01 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isPreview) {
                          onAction?.(config, { action: 'CLICK_BUTTON', itemId: item.id })
                        }
                      }}
                    >
                      {item.buttonText || '실행'}
                    </AtomBtn01>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </BlockBackground>
  )
}
