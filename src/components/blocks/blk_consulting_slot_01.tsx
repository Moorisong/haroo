'use client'

import { useState } from 'react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomLabel01 from '../atoms/atom_label_01'
import AtomInput01 from '../atoms/atom_input_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface TimeSlot { time: string; available: boolean }

const generateSlots = (): TimeSlot[] => [
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '13:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: false },
  { time: '16:00', available: true },
]

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void

}

export default function BlkConsultingSlot01({ config, isPreview, onAction  }: Props) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const slots = generateSlots()

  const {
    title = '타임 슬롯 / 일정 예약',
    subtitle = '원하시는 날짜와 시간대를 선택하여 간편하게 예약해 보세요.',
    buttonText = '일정 예약 확정',
    sessionDuration = '50분',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
  } = config as BlockInputConfig & { sessionDuration?: string }

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  if (booked) {
    return (
      <BlockBackground config={config} isPreview={isPreview}>
        <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
          <div className={`${layout.innerClass} text-center`}>
            <div className="text-6xl mb-4">🎉</div>
            <AtomBadge01 variant="success" className="mb-3 mx-auto">예약 완료</AtomBadge01>
            <AtomText01 as="h2" className="text-xl font-bold mb-2">{name}님, 예약이 확정되었어요!</AtomText01>
            <AtomText01 as="p" className="text-sm opacity-70">선택 시간: {selectedTime} ({sessionDuration})</AtomText01>
            <AtomText01 as="p" className="text-xs text-slate-400 mt-2">확인 안내가 {phone}으로 발송됩니다.</AtomText01>
          </div>
        </div>
      </BlockBackground>
    )
  }

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-8">
            <AtomBadge01 variant="info" className="mb-3 mx-auto">📅 일정 예약</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2 break-keep">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm break-keep">{subtitle}</AtomText01>
          </div>

          {/* 시간 슬롯 선택 */}
          <AtomCard01 className="mb-4">
            <AtomText01 as="p" className="text-xs font-bold text-slate-400 mb-3">시간 선택 ({sessionDuration} 세션)</AtomText01>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    !slot.available ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed' :
                    selectedTime === slot.time ? 'bg-slate-900 text-white border-slate-900' :
                    'bg-white text-slate-700 border-slate-200 hover:border-slate-900'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </AtomCard01>

          {/* 예약자 정보 */}
          <AtomCard01 className="mb-6 space-y-3">
            <div>
              <AtomLabel01 className="mb-1 block">이름 <span className="text-red-500">*</span></AtomLabel01>
              <AtomInput01 placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <AtomLabel01 className="mb-1 block">연락처 <span className="text-red-500">*</span></AtomLabel01>
              <AtomInput01 type="tel" placeholder="010-0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </AtomCard01>

          <AtomBtn01
            className="w-full"
            disabled={!selectedTime || !name || !phone}
            onClick={() => {
              setBooked(true)
              onAction?.(config, { name, phone, selectedTime: selectedTime || '' })
            }}
          >
            {selectedTime ? `${selectedTime} ${buttonText}` : '시간을 먼저 선택해 주세요'}
          </AtomBtn01>
        </div>
      </div>
    </BlockBackground>
  )
}
