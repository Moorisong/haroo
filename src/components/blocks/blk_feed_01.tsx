'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface FeedItem {
  id: string
  name: string
  content: string
  date?: string
}

const DEFAULT_FEED: FeedItem[] = [
  { id: '1', name: '사용자 A', content: '오늘 식단은 샐러드와 닭가슴살이었습니다.', date: '방금 전' },
  { id: '2', name: '사용자 B', content: '예전에 2주만에 3kg 감량했던 기억이 나네요. 이번에도 화이팅!', date: '2시간 전' },
  { id: '3', name: '사용자 C', content: '점심에 피자를 먹어버렸습니다 ㅠㅠ 저녁은 굶어야겠어요.', date: '4시간 전' },
]

interface Props { config: BlockInputConfig; isPreview?: boolean; onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void 
}

export default function BlkFeed01({ config, isPreview, onAction  }: Props) {
  const {
    title = '기록 / 코멘터리',
    subtitle = '매일의 기록을 남겨보세요.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    buttonText,
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const items = config.items || DEFAULT_FEED

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>}
              {subtitle && <AtomText01 as="p" className="opacity-70 text-sm">{subtitle}</AtomText01>}
            </div>
          )}

          <div className="space-y-4">
            {items.map((item: any, index: number) => (
              <div key={item.id || index} className="p-4 bg-slate-50 rounded-xl" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
                <div className="flex justify-between items-baseline mb-2">
                  <AtomText01 as="span" className="font-bold text-sm">{item.name || item.title || '사용자'}</AtomText01>
                  {item.date && <AtomText01 as="span" className="text-xs opacity-50">{item.date}</AtomText01>}
                </div>
                <AtomText01 as="p" className="text-sm opacity-90 break-keep leading-relaxed">
                  {item.content || item.description || ''}
                </AtomText01>
              </div>
            ))}
          </div>

          {buttonText && (
            <div className="mt-8 text-center">
              <AtomBtn01
                onClick={() => onAction?.(config)}
                className="w-full sm:w-auto min-w-[200px]"
                variant="default"
              >
                {buttonText}
              </AtomBtn01>
            </div>
          )}
        </div>
      </div>
    </BlockBackground>
  )
}
