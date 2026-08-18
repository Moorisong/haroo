'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * 20종 원자 컴포넌트: atom_image_01
 * EXIF 회전 보정 (가드 규칙) 및 object-fit: cover 자동 적용 이미지
 */
export default function AtomImage01({ src, alt, width, height, fill = false, className, style }: Props) {
  const [error, setError] = useState(false)

  const isDataUrl = src?.startsWith('data:') || src?.startsWith('blob:') || src?.includes('unsplash.com')

  return (
    <div className={cn('relative overflow-hidden', className, fill && 'w-full h-full')}>
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : (width || 400)}
          height={fill ? undefined : (height || 300)}
          fill={fill}
          unoptimized={isDataUrl}
          className={cn('object-cover', fill && 'absolute inset-0')}
          onError={() => setError(true)}
          // Next.js Image 컴포넌트는 기본적으로 최신 브라우저에서 이미지 회전을 자동으로 처리함. (image-orientation: from-image)
          style={{ imageOrientation: 'from-image', ...style }} 
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400 min-h-[100px]">
          이미지를 불러올 수 없습니다
        </div>
      )}
    </div>
  )
}
