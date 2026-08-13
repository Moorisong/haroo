'use client'

import React, { useRef, useState, useEffect } from 'react'
import { BlockInputConfig } from '@/types'
import { getBlockLayout } from '@/lib/blockLayout'
import AtomCard01 from '@/components/atoms/atom_card_01'
import AtomText01 from '@/components/atoms/atom_text_01'
import AtomBtn01 from '@/components/atoms/atom_btn_01'
import AtomBadge01 from '@/components/atoms/atom_badge_01'
import AtomIcon01 from '@/components/atoms/atom_icon_01'
import type { ContainerWidth, PaddingYOption } from '@/types'
import { Gift, Sparkles, RefreshCw } from 'lucide-react'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkScratch01({ config, onAction }: Props) {
  const layout = getBlockLayout(config?.containerWidth as ContainerWidth, config?.paddingY as PaddingYOption)
  const title = config?.title || '스크래치 숨은 쿠폰 뽑기'
  const subtitle = config?.subtitle || '손가락이나 마우스로 회색 영역을 문질러보세요!'
  const hiddenContent = config?.hiddenContent || '축하합니다! 50% 할인 쿠폰 코드: SAVE50'
  const scratchColor = config?.scratchColor || '#C0C0C0'
  const completionThreshold = config?.completionThreshold || 50

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  const initCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = scratchColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add overlay texture text
    ctx.fillStyle = '#64748B'
    ctx.font = 'bold 16px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('여기에 긁어보세요', canvas.width / 2, canvas.height / 2)

    setIsRevealed(false)
  }

  useEffect(() => {
    initCanvas()
  }, [scratchColor])

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current
    if (!canvas || isRevealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let clearedCount = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        clearedCount++
      }
    }

    const percentage = (clearedCount / (pixels.length / 4)) * 100
    if (percentage >= completionThreshold) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setIsRevealed(true)
      onAction?.(config, { hiddenContent })
    }
  }

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas || isRevealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()

    checkScratchPercentage()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    scratch(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    scratch(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      scratch(touch.clientX, touch.clientY)
    }
  }

  return (
    <div className={`w-full ${layout.wrapperClass} ${layout.paddingClass}`}>
      <div className={layout.innerClass}>
        <AtomCard01 className="p-6 md:p-8 flex flex-col items-center bg-white shadow-xl rounded-3xl border border-slate-100">
        {/* Title */}
        <div className="text-center mb-6">
          <AtomBadge01 variant="info" className="mb-2 inline-flex items-center gap-1">
            <AtomIcon01 icon={Gift} size={14} />
            스크래치 복권
          </AtomBadge01>
          <AtomText01 variant="h2" className="font-bold text-slate-900">
            {title}
          </AtomText01>
          <AtomText01 variant="p" className="text-slate-500 mt-1">
            {subtitle}
          </AtomText01>
        </div>

        {/* Scratch Area Container */}
        <div className="relative w-full max-w-sm h-48 rounded-2xl shadow-inner border-2 border-dashed border-amber-300 overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 my-2 select-none">
          {/* Hidden Content Underneath */}
          <div className="p-6 text-center z-0">
            <AtomIcon01 icon={Sparkles} className="text-amber-500 mx-auto mb-2" size={28} />
            <AtomText01 variant="h3" className="font-bold text-amber-900 text-lg md:text-xl">
              {hiddenContent}
            </AtomText01>
          </div>

          {/* Canvas Scratch Layer */}
          <canvas
            ref={canvasRef}
            width={384}
            height={192}
            className={`absolute inset-0 z-10 cursor-pointer transition-opacity duration-500 ${isRevealed ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
          />
        </div>

        {/* Status / Reset */}
        {isRevealed && (
          <div className="mt-4 flex flex-col items-center gap-2 animate-fade-in">
            <AtomBadge01 variant="info" className="px-4 py-1.5 text-sm font-semibold">
              당첨 확인 완료!
            </AtomBadge01>
            <AtomBtn01 variant="outline" className="mt-2 flex items-center gap-2 rounded-xl" onClick={initCanvas}>
              <AtomIcon01 icon={RefreshCw} size={16} />
              다시 긁기
            </AtomBtn01>
          </div>
        )}
      </AtomCard01>
      </div>
    </div>
  )
}
