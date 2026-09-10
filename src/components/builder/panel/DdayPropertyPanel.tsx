'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
}

/**
 * 카운트다운 타이머(D-Day) 목표 일시 설정 패널
 */
export default function DdayPropertyPanel({ config, handleChange }: Props) {
  // ISO string -> datetime-local format (YYYY-MM-DDTHH:mm)
  const formatForInput = (isoDate?: string) => {
    if (!isoDate) return ''
    try {
      const d = new Date(isoDate)
      if (isNaN(d.getTime())) return ''
      // 한국 시간대 기준 로컬 YYYY-MM-DDTHH:mm 변환
      const pad = (n: number) => String(n).padStart(2, '0')
      const year = d.getFullYear()
      const month = pad(d.getMonth() + 1)
      const day = pad(d.getDate())
      const hours = pad(d.getHours())
      const minutes = pad(d.getMinutes())
      return `${year}-${month}-${day}T${hours}:${minutes}`
    } catch {
      return ''
    }
  }

  const currentInputValue = formatForInput(config.targetDate)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!val) {
      handleChange('targetDate', '')
      return
    }
    try {
      const iso = new Date(val).toISOString()
      handleChange('targetDate', iso)
    } catch {
      handleChange('targetDate', val)
    }
  }

  // 빠른 선택 헬퍼
  const setQuickDays = (days: number) => {
    const target = new Date(Date.now() + days * 86400000)
    handleChange('targetDate', target.toISOString())
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">목표 날짜 및 시간</label>
        <input
          type="datetime-local"
          value={currentInputValue}
          onChange={handleDateChange}
          className="w-full text-sm border border-slate-300 rounded-md p-2 bg-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-medium"
        />
        <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
          설정한 목표 일시까지 남은 일/시/분/초가 실시간으로 카운트다운됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-600">빠른 일시 설정</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setQuickDays(3)}
            className="px-2 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium transition-colors"
          >
            +3일 후
          </button>
          <button
            type="button"
            onClick={() => setQuickDays(7)}
            className="px-2 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium transition-colors"
          >
            +7일 후
          </button>
          <button
            type="button"
            onClick={() => setQuickDays(30)}
            className="px-2 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium transition-colors"
          >
            +30일 후
          </button>
        </div>
      </div>
    </div>
  )
}
