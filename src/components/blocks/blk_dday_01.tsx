'use client'

import { useState, useEffect } from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import type { BlockInputConfig } from '@/types'

interface Props { config: BlockInputConfig }

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function BlkDday01({ config }: Props) {
  const {
    title = 'D-Day 카운트다운',
    subtitle = '특별한 날까지 얼마나 남았을까요?',
    targetDate = new Date(Date.now() + 7 * 86400000).toISOString(),
    backgroundColor = '#0f172a',
    textColor = '#ffffff',
  } = config as BlockInputConfig & { targetDate?: string }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: '일', value: timeLeft.days },
    { label: '시간', value: timeLeft.hours },
    { label: '분', value: timeLeft.minutes },
    { label: '초', value: timeLeft.seconds },
  ]

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className="w-full px-6 py-16 flex justify-center">
        <div className="w-full max-w-lg text-center">
          <AtomBadge01 className="mb-4 mx-auto bg-white/20 text-white border-white/30">⏰ D-Day</AtomBadge01>
          <AtomText01 as="h2" className="text-2xl font-bold mb-2" style={{ color: textColor }}>{title}</AtomText01>
          <AtomText01 as="p" className="opacity-70 text-sm mb-10" style={{ color: textColor }}>{subtitle}</AtomText01>

          <div className="grid grid-cols-4 gap-3">
            {units.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square flex items-center justify-center bg-white/15 rounded-2xl">
                  <AtomText01 as="span" className="text-3xl sm:text-4xl font-black tabular-nums" style={{ color: textColor }}>
                    {String(value).padStart(2, '0')}
                  </AtomText01>
                </div>
                <AtomText01 as="span" className="text-xs font-semibold opacity-60" style={{ color: textColor }}>{label}</AtomText01>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AtomCard01>
  )
}
