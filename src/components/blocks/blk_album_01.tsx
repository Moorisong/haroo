'use client'

import { useState } from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomImage01 from '../atoms/atom_image_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop',
]

interface Props { config: BlockInputConfig }

export default function BlkAlbum01({ config }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const {
    title = '갤러리 앨범',
    subtitle = '우리 매장의 다양한 모습을 담았습니다.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    galleryImages = DEFAULT_IMAGES,
  } = config as BlockInputConfig & { galleryImages?: string[] }

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-8">
            <AtomBadge01 variant="default" className="mb-3 mx-auto">📸 갤러리</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm">{subtitle}</AtomText01>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {galleryImages.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(src)}
                className="relative aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              >
                <AtomImage01 src={src} alt={`갤러리 이미지 ${i + 1}`} fill />
              </button>
            ))}
          </div>

          {/* 라이트박스 */}
          {selected && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <div className="relative max-w-2xl w-full aspect-square rounded-2xl overflow-hidden">
                <AtomImage01 src={selected} alt="확대 이미지" fill />
              </div>
              <button
                type="button"
                className="absolute top-6 right-6 text-white text-3xl font-light"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </AtomCard01>
  )
}
