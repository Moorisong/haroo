'use client'

import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomProgress01 from '../atoms/atom_progress_01'
import AtomDivider01 from '../atoms/atom_divider_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface CurriculumUnit {
  title: string
  duration: string
  completed?: boolean
}

const DEFAULT_UNITS: CurriculumUnit[] = [
  { title: '오리엔테이션 & 기초 이론', duration: '30분', completed: true },
  { title: '핵심 스킬 실습 1', duration: '45분', completed: true },
  { title: '핵심 스킬 실습 2', duration: '45분', completed: false },
  { title: '응용 프로젝트', duration: '60분', completed: false },
  { title: '최종 평가 & 수료증', duration: '30분', completed: false },
]

interface Props { config: BlockInputConfig }

export default function BlkCurriculum01({ config }: Props) {
  const {
    title = '단계별 프로세스 리스트',
    subtitle = '체계적인 단계 구성에 따라 순서대로 확인해 보세요.',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    curriculumUnits = DEFAULT_UNITS,
  } = config as BlockInputConfig & { curriculumUnits?: CurriculumUnit[] }

  const completedCount = curriculumUnits.filter((u) => u.completed).length
  const progress = Math.round((completedCount / curriculumUnits.length) * 100)

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
          <div className="text-center mb-8">
            <AtomBadge01 variant="info" className="mb-3 mx-auto">프로세스</AtomBadge01>
            <AtomText01 as="h2" className="text-2xl font-bold mb-2">{title}</AtomText01>
            <AtomText01 as="p" className="opacity-70 text-sm mb-6">{subtitle}</AtomText01>
            <AtomProgress01 value={progress} max={100} showLabel size="md" />
          </div>

          <AtomCard01>
            <ul className="space-y-0 divide-y divide-slate-100">
              {curriculumUnits.map((unit, i) => (
                <li key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${unit.completed ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {unit.completed ? '✓' : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <AtomText01 as="p" className={`text-sm font-semibold truncate ${unit.completed ? 'line-through opacity-50' : ''}`}>
                      {unit.title}
                    </AtomText01>
                  </div>
                  <AtomBadge01 className="flex-shrink-0 text-xs">{unit.duration}</AtomBadge01>
                </li>
              ))}
            </ul>
          </AtomCard01>
        </div>
      </div>
    </AtomCard01>
  )
}
