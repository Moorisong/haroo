'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props { config: BlockInputConfig }

export default function BlkMap01({ config }: Props) {
  const {
    title = '지도 / 위치 안내',
    subtitle = '상세 주소 및 위치 정보를 안내해 드립니다.',
    mapAddress = '서울특별시 강남구 테헤란로 123',
    mapPins = [],
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config as BlockInputConfig & { mapAddress?: string, mapPins?: Array<{id: string, lat: number, lng: number, title?: string, description?: string}> }

  // 핀이 없으면 기본 주소 사용, 있으면 핀 목록 사용
  const displayPins = mapPins.length > 0 
    ? mapPins 
    : [{ id: 'default', lat: 37.5665, lng: 126.9780, title: '기본 위치', description: mapAddress }]

  // 다중 핀인 경우 첫 번째 핀 기준으로 중심 이동을 위해 (시뮬레이션 용도)
  const firstPin = displayPins[0]
  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent(firstPin.description || mapAddress)}`

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="mb-8 text-center">
            <AtomBadge01 variant="info" className="mb-3 mx-auto">📍 위치 안내</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2 break-keep">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm break-keep">{subtitle}</AtomText01>
          </div>

          {/* 지도 프레임 */}
          <AtomCard01 noPadding className="overflow-hidden mb-6 border-slate-200">
            <div className="relative w-full aspect-video bg-slate-100 flex flex-col items-center justify-center">
              <span className="text-5xl mb-3">🗺️</span>
              <AtomText01 as="p" className="text-sm text-slate-400 mb-2">
                카카오맵 (핀 {displayPins.length}개)
              </AtomText01>
              <a
                href={kakaoMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-600 underline font-medium z-10"
              >
                지도에서 크게 보기
              </a>
              
              {/* 마커 시뮬레이션 UI */}
              <div className="absolute inset-0 pointer-events-none opacity-50 flex items-center justify-center">
                <div className="relative w-full h-full max-w-sm max-h-48">
                  {displayPins.map((pin, i) => (
                    <div 
                      key={pin.id} 
                      className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                      style={{ 
                        left: `${50 + (i * 15 - (displayPins.length - 1) * 7.5)}%`, 
                        top: `${50 + (i % 2 === 0 ? 10 : -10)}%` 
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AtomCard01>

          {/* 주소 정보 목록 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayPins.map((pin) => (
              <AtomCard01 key={pin.id} className="bg-slate-50 flex flex-col p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-xl mt-0.5">📍</span>
                  <div className="flex flex-col">
                    <AtomText01 as="h4" className="text-sm font-bold text-slate-900">{pin.title || '위치'}</AtomText01>
                    {pin.description && (
                      <AtomText01 as="p" className="text-xs text-slate-600 mt-1">{pin.description}</AtomText01>
                    )}
                  </div>
                </div>
              </AtomCard01>
            ))}
          </div>

        </div>
      </div>
    </AtomCard01>
  )
}
