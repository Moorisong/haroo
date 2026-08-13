'use client'

import React, { useState } from 'react'
import { BlockInputConfig } from '@/types'
import { getBlockLayout } from '@/lib/blockLayout'
import AtomCard01 from '@/components/atoms/atom_card_01'
import AtomText01 from '@/components/atoms/atom_text_01'
import AtomBtn01 from '@/components/atoms/atom_btn_01'
import AtomInput01 from '@/components/atoms/atom_input_01'
import AtomBadge01 from '@/components/atoms/atom_badge_01'
import AtomIcon01 from '@/components/atoms/atom_icon_01'
import type { ContainerWidth, PaddingYOption } from '@/types'
import { Sparkles, RotateCw, Plus, Trash2 } from 'lucide-react'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

const DEFAULT_ITEMS = ['치킨', '피자', '파스타', '족발', '삼겹살', '초밥']

export default function BlkRoulette01({ config, onAction }: Props) {
  const layout = getBlockLayout(config?.containerWidth as ContainerWidth, config?.paddingY as PaddingYOption)
  const title = config?.title || '오늘의 선택 룰렛'
  const subtitle = config?.subtitle || '버튼을 눌러 룰렛을 돌려보세요!'
  const buttonText = config?.buttonText || '돌리기 Start!'
  const winnerMessageTemplate = config?.winnerMessageTemplate || '오늘의 당첨은 바로 {winner}!'

  const [items, setItems] = useState<string[]>(
    Array.isArray(config?.rouletteItems) && config.rouletteItems.length > 0
      ? config.rouletteItems
      : DEFAULT_ITEMS
  )
  const [newItemText, setNewItemText] = useState('')
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  const handleAddItem = () => {
    if (!newItemText.trim() || items.length >= 10) return
    setItems([...items, newItemText.trim()])
    setNewItemText('')
  }

  const handleRemoveItem = (index: number) => {
    if (items.length <= 2) return
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSpin = () => {
    if (isSpinning || items.length < 2) return
    setIsSpinning(true)
    setWinner(null)

    const selectedIndex = Math.floor(Math.random() * items.length)
    const segmentAngle = 360 / items.length
    const extraTurns = 5 * 360
    const targetAngle = extraTurns + (items.length - selectedIndex - 0.5) * segmentAngle

    const newTotalRotation = rotation + targetAngle
    setRotation(newTotalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      const selectedWinner = items[selectedIndex]
      setWinner(selectedWinner)
      onAction?.(config, { winner: selectedWinner })
    }, 3000)
  }

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

  return (
    <div className={`w-full ${layout.wrapperClass} ${layout.paddingClass}`}>
      <div className={layout.innerClass}>
      <AtomCard01 className="p-6 md:p-8 flex flex-col items-center bg-white shadow-xl rounded-3xl border border-slate-100">
        {/* Title Header */}
        <div className="text-center mb-6">
          <AtomBadge01 variant="info" className="mb-2 inline-flex items-center gap-1">
            <AtomIcon01 icon={Sparkles} size={14} />
            인터랙티브 룰렛
          </AtomBadge01>
          <AtomText01 variant="h2" className="font-bold text-slate-900">
            {title}
          </AtomText01>
          <AtomText01 variant="p" className="text-slate-500 mt-1">
            {subtitle}
          </AtomText01>
        </div>

        {/* Roulette Wheel UI */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 my-4 flex items-center justify-center">
          {/* Wheel Pointer */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-600 drop-shadow-md" />

          {/* Rotating SVG Wheel */}
          <div
            className="w-full h-full rounded-full shadow-inner overflow-hidden transition-transform duration-[3000ms] cubic-bezier(0.15, 0.99, 0.18, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {items.map((item, idx) => {
                const angle = 360 / items.length
                const startAngle = idx * angle
                const endAngle = (idx + 1) * angle
                const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180)
                const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180)
                const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180)
                const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180)
                const largeArc = angle > 180 ? 1 : 0
                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`
                const midAngle = startAngle + angle / 2
                const textX = 50 + 32 * Math.cos((Math.PI * (midAngle - 90)) / 180)
                const textY = 50 + 32 * Math.sin((Math.PI * (midAngle - 90)) / 180)

                return (
                  <g key={idx}>
                    <path d={pathData} fill={colors[idx % colors.length]} stroke="#ffffff" strokeWidth="0.8" />
                    <text
                      x={textX}
                      y={textY}
                      fill="#ffffff"
                      fontSize="4"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                    >
                      {item}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Center Hub */}
          <div className="absolute z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg border-4 border-slate-100 flex items-center justify-center">
            <AtomIcon01 icon={RotateCw} className={`text-slate-700 ${isSpinning ? 'animate-spin' : ''}`} size={20} />
          </div>
        </div>

        {/* Winner Banner */}
        {winner && (
          <div className="my-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-2xl shadow-lg text-center animate-bounce">
            <AtomText01 variant="p" className="font-bold text-lg">
              {winnerMessageTemplate.replace('{winner}', winner)}
            </AtomText01>
          </div>
        )}

        {/* Action Button */}
        <AtomBtn01
          variant="default"
          className="w-full max-w-xs mt-4 py-3 text-lg font-bold shadow-md rounded-2xl"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? '두근두근 회전 중...' : buttonText}
        </AtomBtn01>

        {/* Items Input Control */}
        <div className="w-full max-w-md mt-6 pt-6 border-t border-slate-100">
          <AtomText01 variant="p" className="font-medium text-xs text-slate-600 mb-2 block">
            룰렛 항목 편집 ({items.length}/10)
          </AtomText01>
          <div className="flex gap-2 mb-3">
            <AtomInput01
              placeholder="새 항목 입력"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1"
            />
            <AtomBtn01 variant="outline" onClick={handleAddItem} disabled={items.length >= 10}>
              <AtomIcon01 icon={Plus} size={18} />
            </AtomBtn01>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item, idx) => (
              <AtomBadge01 key={idx} variant="default" className="flex items-center gap-1 px-3 py-1.5 text-sm">
                {item}
                {items.length > 2 && (
                  <button onClick={() => handleRemoveItem(idx)} className="text-slate-400 hover:text-red-500 ml-1">
                    <AtomIcon01 icon={Trash2} size={12} />
                  </button>
                )}
              </AtomBadge01>
            ))}
          </div>
        </div>
      </AtomCard01>
      </div>
    </div>
  )
}
