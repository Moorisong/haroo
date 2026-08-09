import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomImage01 from '../atoms/atom_image_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config?: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

/**
 * 45종 마스터 블록: blk_hero_01 (히어로 배너)
 * 원자 컴포넌트 100% 재사용 조합
 */
export default function BlkHero01({ config, isPreview, onAction }: Props) {
  const safeConfig = config ?? {}
  const {
    title = '세상에서 가장 쉬운 매장 웹사이트',
    subtitle = '5분 만에 만들고 오늘부터 고객을 받아보세요.',
    imageUrl = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop',
    buttonText = '지금 바로 예약하기',
    containerWidth = 'full',
    paddingY = 'normal',
  } = safeConfig as BlockInputConfig

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  // 임시 badge (config 스키마 확장에 따라 추가 가능)
  const badgeText = 'NEW'

  return (
    <AtomCard01 noPadding className="border-none rounded-none w-full">
      {/* 히어로는 배경 이미지가 전체 폭 — paddingY로 세로 크기 조절 */}
      <div className={`relative ${layout.paddingClass} ${layout.wrapperClass}`} style={{ minHeight: '16rem' }}>
        <AtomImage01 src={imageUrl} alt="히어로 이미지" fill className="absolute inset-0" />
        <div className="absolute inset-0 bg-slate-900/40" />

        <div className={`relative z-10 flex flex-col items-center justify-center h-full text-center ${layout.paddingXClass} ${layout.innerClass}`}>
          {badgeText && (
            <AtomBadge01 variant="success" className="mb-4 shadow-sm border-none bg-emerald-500 text-white">
              {badgeText}
            </AtomBadge01>
          )}

          <AtomText01 as="h1" className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 leading-tight tracking-tight break-keep">
            {title}
          </AtomText01>

          <AtomText01 as="p" className="text-sm sm:text-lg md:text-xl text-slate-200 mb-6 md:mb-8 max-w-2xl font-normal leading-relaxed break-keep">
            {subtitle}
          </AtomText01>

          <AtomBtn01
            size="lg"
            className="px-8 md:px-10 py-3 md:py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm md:text-base rounded-xl shadow-lg transition-all"
            onClick={() => onAction?.(safeConfig as BlockInputConfig)}
          >
            {buttonText}
          </AtomBtn01>
        </div>
      </div>
    </AtomCard01>
  )
}
