import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomImage01 from '../atoms/atom_image_01'
import AtomBadge01 from '../atoms/atom_badge_01'

import type { BlockInputConfig } from '@/types'

interface Props {
  config?: BlockInputConfig
}

/**
 * 45종 마스터 블록: blk_hero_01 (히어로 배너)
 * 원자 컴포넌트 100% 재사용 조합
 */
export default function BlkHero01({ config = {} }: Props) {
  const {
    title = '세상에서 가장 쉬운 매장 웹사이트',
    subtitle = '5분 만에 만들고 오늘부터 고객을 받아보세요.',
    imageUrl = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop',
    buttonText = '지금 바로 예약하기',
    backgroundColor, // fallback or overlay color
  } = config

  // 임시 badge (config 스키마 확장에 따라 추가 가능)
  const badgeText = 'NEW'

  return (
    <AtomCard01 noPadding className="border-none rounded-none w-full">
      <div className="relative h-64 sm:h-80 w-full">
        <AtomImage01 src={imageUrl} alt="히어로 이미지" fill />
        <div className="absolute inset-0 bg-slate-900/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {badgeText && (
            <AtomBadge01 variant="success" className="mb-4 shadow-sm border-none bg-emerald-500 text-white">
              {badgeText}
            </AtomBadge01>
          )}
          
          <AtomText01 as="h1" className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
            {title}
          </AtomText01>
          
          <AtomText01 as="p" className="text-sm sm:text-base text-slate-200 mb-6 max-w-md">
            {subtitle}
          </AtomText01>
          
          <AtomBtn01 size="lg" className="px-8 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl">
            {buttonText}
          </AtomBtn01>
        </div>
      </div>
    </AtomCard01>
  )
}
