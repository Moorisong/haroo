'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import type { BlockInputConfig } from '@/types'

interface Props { config: BlockInputConfig }

export default function BlkMap01({ config }: Props) {
  const {
    title = '지도 / 위치 안내',
    subtitle = '상세 주소 및 위치 정보를 안내해 드립니다.',
    mapAddress = '서울특별시 강남구 테헤란로 123',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
  } = config as BlockInputConfig & { mapAddress?: string }

  // 카카오맵 임베드 URL (주소 → 검색)
  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent(mapAddress)}`
  const staticMapEmbed = `https://dapi.kakao.com/v2/maps/sdk.js` // placeholder

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className="w-full px-6 py-14 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <AtomBadge01 variant="info" className="mb-3 mx-auto">📍 위치 안내</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm">{subtitle}</AtomText01>
          </div>

          {/* 지도 프레임 */}
          <AtomCard01 noPadding className="overflow-hidden mb-4 border-slate-200">
            <div className="w-full aspect-video bg-slate-100 flex flex-col items-center justify-center">
              <span className="text-5xl mb-3">🗺️</span>
              <AtomText01 as="p" className="text-sm text-slate-400 mb-2">카카오맵</AtomText01>
              <a
                href={kakaoMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-600 underline font-medium"
              >
                {mapAddress}에서 지도 열기
              </a>
            </div>
          </AtomCard01>

          <AtomDivider01 className="mb-4" />

          {/* 주소 정보 */}
          <AtomCard01 className="bg-slate-50">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <AtomText01 as="p" className="text-xs font-semibold text-slate-400 mb-1">주소</AtomText01>
                <AtomText01 as="p" className="text-sm font-semibold">{mapAddress}</AtomText01>
              </div>
            </div>
          </AtomCard01>
        </div>
      </div>
    </AtomCard01>
  )
}
