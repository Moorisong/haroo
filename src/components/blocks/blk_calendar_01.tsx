import React, { useState } from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void
}

export default function BlkCalendar01({ config, isPreview, onAction }: Props) {
  const { 
    title = '우리의 일정', 
    subtitle = '중요한 이벤트를 놓치지 마세요', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    calendarEvents = [
      { id: '1', date: new Date().toISOString().split('T')[0], title: '오늘의 주요 일정', description: '중요한 미팅이 있습니다.', isHighlighted: true },
      { id: '2', date: '2026-08-15', title: '광복절 행사', isHighlighted: false },
    ],
    titleStyle,
    subtitleStyle,
    backgroundStyle,
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const selectElement = useElementSelector()
  
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(today)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(clickedDate)
    
    // YYYY-MM-DD formatting (local time)
    const yyyy = clickedDate.getFullYear()
    const mm = String(clickedDate.getMonth() + 1).padStart(2, '0')
    const dd = String(clickedDate.getDate()).padStart(2, '0')
    const dateStr = `${yyyy}-${mm}-${dd}`
    
    onAction?.(config, { action: 'SELECT_DATE', date: dateStr })
  }

  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
  }

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear
  }

  const getEventsForDay = (day: number) => {
    const yyyy = currentYear
    const mm = String(currentMonth + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    const dateStr = `${yyyy}-${mm}-${dd}`
    return calendarEvents.filter(ev => ev.date === dateStr)
  }

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <AtomCard01 
      noPadding 
      className="w-full border-none rounded-none" 
      style={{ 
        backgroundColor: backgroundStyle?.backgroundColor || backgroundColor, 
        color: textColor,
        opacity: backgroundStyle?.opacity,
        backgroundImage: backgroundStyle?.backgroundImage ? `url(${backgroundStyle.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onClick={(e) => selectElement('background', e)}
    >
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} max-w-4xl mx-auto flex flex-col gap-8`}>
          
          <div className="text-center space-y-2">
            <AtomText01 
              variant="h3" 
              className={cn(
                'text-xl sm:text-2xl md:text-3xl font-bold tracking-tight p-1 rounded transition-all',
                !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
              )}
              style={{
                color: titleStyle?.color || textColor,
                fontFamily: titleStyle?.fontFamily,
                fontWeight: titleStyle?.fontWeight,
                fontSize: titleStyle?.fontSize,
              }}
              onClick={(e) => {
                if (isPreview) return
                selectElement('title', e)
              }}
            >
              {title}
            </AtomText01>
            {subtitle && (
              <AtomText01 
                variant="p" 
                className={cn(
                  'text-sm sm:text-base opacity-80 p-1 rounded transition-all',
                  !isPreview && 'cursor-pointer hover:ring-1 hover:ring-slate-300'
                )}
                style={{
                  color: subtitleStyle?.color || textColor,
                  fontFamily: subtitleStyle?.fontFamily,
                  fontWeight: subtitleStyle?.fontWeight,
                  fontSize: subtitleStyle?.fontSize,
                }}
                onClick={(e) => {
                  if (isPreview) return
                  selectElement('subtitle', e)
                }}
              >
                {subtitle}
              </AtomText01>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* 캘린더 헤더 */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
              <AtomBtn01 variant="ghost" size="sm" onClick={prevMonth} className="h-8 w-8 p-0 rounded-full">
                <ChevronLeft className="w-5 h-5 text-slate-500" />
              </AtomBtn01>
              <AtomText01 variant="h4" className="font-bold text-lg text-slate-800">
                {currentYear}년 {currentMonth + 1}월
              </AtomText01>
              <AtomBtn01 variant="ghost" size="sm" onClick={nextMonth} className="h-8 w-8 p-0 rounded-full">
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </AtomBtn01>
            </div>

            {/* 캘린더 그리드 */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {daysOfWeek.map((day, i) => (
                  <div key={day} className={`text-center py-2 text-xs sm:text-sm font-semibold ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-slate-500'}`}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2 sm:p-3" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayEvents = getEventsForDay(day)
                  const hasHighlightedEvent = dayEvents.some(ev => ev.isHighlighted)
                  
                  return (
                    <div 
                      key={day} 
                      onClick={() => handleDayClick(day)}
                      className={`
                        relative flex flex-col items-center p-2 sm:p-3 min-h-[60px] sm:min-h-[80px] rounded-xl cursor-pointer transition-colors border border-transparent
                        ${isSelected(day) ? 'bg-sky-50 border-sky-200' : 'hover:bg-slate-50'}
                      `}
                    >
                      <span className={`
                        flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium mb-1
                        ${isToday(day) ? 'bg-sky-500 text-white' : ''}
                        ${!isToday(day) && isSelected(day) ? 'text-sky-700 font-bold' : ''}
                      `}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-1 mt-auto">
                          {dayEvents.slice(0, 3).map((ev, idx) => (
                            <span key={idx} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${ev.isHighlighted ? 'bg-red-400' : 'bg-sky-400'}`} />
                          ))}
                          {dayEvents.length > 3 && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300" />}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* 선택된 날짜 이벤트 목록 */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-6 min-h-[120px]">
              <AtomText01 variant="h4" className="font-semibold text-slate-800 mb-3 text-sm sm:text-base">
                {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 일정
              </AtomText01>
              <div className="space-y-3">
                {getEventsForDay(selectedDate.getDate()).length > 0 ? (
                  getEventsForDay(selectedDate.getDate()).map((ev) => (
                    <div key={ev.id} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200">
                      <div className={`w-1.5 h-full min-h-[40px] rounded-full mt-0.5 ${ev.isHighlighted ? 'bg-red-400' : 'bg-sky-400'}`} />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-slate-900">{ev.title}</span>
                        {ev.description && <span className="text-xs text-slate-500 mt-0.5">{ev.description}</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 text-center py-4">일정이 없습니다.</div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </AtomCard01>
  )
}
