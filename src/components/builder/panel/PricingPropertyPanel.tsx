import React from 'react'
import type { BlockInputConfig } from '@/types'
import PlanActionSection from './PlanActionSection'
import { DEFAULT_PLANS, type PricingPlan } from './pricingTypes'

export type { PricingPlan }
export { DEFAULT_PLANS }

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (field: string, value: any) => void
  selectedIndex?: number | null
  onSelectIndex?: (index: number | null) => void
}

export default function PricingPropertyPanel({
  config,
  handleChange,
  selectedIndex,
  onSelectIndex,
}: Props) {
  const plans: PricingPlan[] = config.plans && Array.isArray(config.plans) ? config.plans : DEFAULT_PLANS

  // 각 플랜 카드의 접힘/펼침 여부를 관리하는 상태 (기본적으로 첫 번째 또는 선택된 플랜을 펼침)
  const [expandedIndices, setExpandedIndices] = React.useState<number[]>(() => {
    if (selectedIndex !== null && selectedIndex !== undefined && selectedIndex >= 0) {
      return [selectedIndex]
    }
    return [0]
  })

  // 캔버스 등 외부에서 selectedIndex가 변경되었을 때 해당 카드를 자동으로 펼치기
  React.useEffect(() => {
    if (selectedIndex !== null && selectedIndex !== undefined && selectedIndex >= 0) {
      setExpandedIndices((prev) => (prev.includes(selectedIndex) ? prev : [...prev, selectedIndex]))
    }
  }, [selectedIndex])

  // 화살표 또는 헤더 클릭 시 개별 카드 토글 핸들러
  const handleToggleExpand = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setExpandedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
    if (onSelectIndex) {
      onSelectIndex(idx)
    }
  }

  // 텍스트에어리어의 줄바꿈/공백 입력을 온전히 유지하기 위한 로컬 텍스트 맵
  const [featuresTextMap, setFeaturesTextMap] = React.useState<Record<number, string>>({})

  // plans 변경 시 동기화
  React.useEffect(() => {
    setFeaturesTextMap((prev) => {
      const next: Record<number, string> = {}
      plans.forEach((p, idx) => {
        // 이미 사용자가 타이핑 중인 텍스트가 있으면 유지, 없으면 features 배열로부터 생성
        if (prev[idx] !== undefined) {
          next[idx] = prev[idx]
        } else {
          next[idx] = (p.features || []).join('\n')
        }
      })
      return next
    })
  }, [plans])

  const updatePlans = (nextPlans: PricingPlan[]) => {
    handleChange('plans', nextPlans)
  }

  const handleAddPlan = () => {
    const newPlan: PricingPlan = {
      id: `plan-${Date.now()}`,
      name: `새 요금제 ${plans.length + 1}`,
      price: '19,000원',
      period: '/ 월',
      features: ['혜택 1', '혜택 2', '혜택 3'],
      cta: '신청하기',
      highlight: false,
    }
    const next = [...plans, newPlan]
    const newIdx = next.length - 1
    updatePlans(next)
    setExpandedIndices((prev) => (prev.includes(newIdx) ? prev : [...prev, newIdx]))
    if (onSelectIndex) onSelectIndex(newIdx)
  }

  const handleRemovePlan = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (plans.length <= 1) {
      alert('최소 1개의 요금제 카드가 필요합니다.')
      return
    }
    const next = plans.filter((_, i) => i !== idx)
    updatePlans(next)
    setExpandedIndices((prev) =>
      prev
        .filter((i) => i !== idx)
        .map((i) => (i > idx ? i - 1 : i))
    )
    if (selectedIndex === idx && onSelectIndex) {
      onSelectIndex(null)
    } else if (selectedIndex !== null && selectedIndex !== undefined && selectedIndex > idx && onSelectIndex) {
      onSelectIndex(selectedIndex - 1)
    }
  }

  const handlePlanChange = (
    idx: number,
    fieldOrUpdates: keyof PricingPlan | Partial<PricingPlan>,
    value?: any
  ) => {
    const next = plans.map((p, i) => {
      if (i !== idx) return p
      if (typeof fieldOrUpdates === 'string') {
        return { ...p, [fieldOrUpdates]: value }
      }
      return { ...p, ...fieldOrUpdates }
    })
    updatePlans(next)
  }

  const handleFeaturesTextChange = (idx: number, text: string) => {
    // 1. 줄바꿈, 띄어쓰기 등 입력 중인 전체 문자열을 로컬 상태에 실시간 보존
    setFeaturesTextMap((prev) => ({ ...prev, [idx]: text }))

    // 2. 상위 블록 config에는 줄바꿈 기준으로 분리하되, 빈 줄은 제외하여 배열 저장
    const featureArr = text
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    handlePlanChange(idx, 'features', featureArr)
  }

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-800">요금제 플랜 카드 목록 ({plans.length}개)</label>
          <span className="text-[11px] text-slate-400">카드를 추가하거나 제목·가격을 수정하세요</span>
        </div>
        <button
          type="button"
          onClick={handleAddPlan}
          className="px-2.5 py-1 text-xs bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-sm transition-colors flex items-center gap-1"
        >
          <span>+</span> 플랜 추가
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {plans.map((plan, idx) => {
          const isExpanded = expandedIndices.includes(idx)

          return (
            <div
              key={plan.id || idx}
              className={`border rounded-lg overflow-hidden transition-all bg-white shadow-sm ${
                isExpanded ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-200'
              }`}
            >
              {/* 헤더 바 */}
              <div
                onClick={(e) => handleToggleExpand(idx, e)}
                className="flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 cursor-pointer select-none border-b border-slate-100"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {plan.name || '이름 없음'}
                  </span>
                  <span className="text-xs font-semibold text-sky-600 truncate">
                    {plan.price}
                  </span>
                  {plan.highlight && (
                    <span className="px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] font-bold rounded">
                      추천
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleRemovePlan(idx, e)}
                    className="text-slate-400 hover:text-rose-600 px-1.5 py-0.5 text-xs transition-colors rounded hover:bg-slate-200/60"
                    title="플랜 삭제"
                  >
                    삭제
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleToggleExpand(idx, e)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 text-xs transition-colors"
                    aria-label={isExpanded ? '접기' : '펼치기'}
                  >
                    {isExpanded ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {/* 편집 바디 */}
              {isExpanded && (
                <div className="p-3 flex flex-col gap-3 bg-white text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-slate-600">플랜 제목</label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => handlePlanChange(idx, 'name', e.target.value)}
                        placeholder="예: STARTER"
                        className="border border-slate-200 rounded p-1.5 focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-slate-600">가격</label>
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) => handlePlanChange(idx, 'price', e.target.value)}
                        placeholder="예: 29,000원 / 무료"
                        className="border border-slate-200 rounded p-1.5 focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-slate-600">결제 주기 / 단위</label>
                      <input
                        type="text"
                        value={plan.period || ''}
                        onChange={(e) => handlePlanChange(idx, 'period', e.target.value)}
                        placeholder="예: / 월 (비워두기 가능)"
                        className="border border-slate-200 rounded p-1.5 focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-slate-600">버튼 문구</label>
                      <input
                        type="text"
                        value={plan.cta ?? ''}
                        onChange={(e) => handlePlanChange(idx, 'cta', e.target.value)}
                        placeholder="예: 지금 시작"
                        className="border border-slate-200 rounded p-1.5 focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id={`plan-highlight-${idx}`}
                      checked={!!plan.highlight}
                      onChange={(e) => handlePlanChange(idx, 'highlight', e.target.checked)}
                      className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <label htmlFor={`plan-highlight-${idx}`} className="text-xs font-medium text-slate-700 select-none cursor-pointer">
                      ‘추천’ 강조 카드로 표시 (배경 및 뱃지 강조)
                    </label>
                  </div>

                  <div className="flex flex-col gap-1 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="font-medium text-slate-600">포함 혜택 목록 (엔터로 구분)</label>
                      <span className="text-[10px] text-slate-400">한 줄에 하나씩</span>
                    </div>
                    <textarea
                      rows={4}
                      value={featuresTextMap[idx] !== undefined ? featuresTextMap[idx] : (plan.features || []).join('\n')}
                      onChange={(e) => handleFeaturesTextChange(idx, e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder={'기본 혜택 1\n기본 혜택 2\n기본 혜택 3'}
                      className="border border-slate-200 rounded p-1.5 leading-relaxed focus:border-sky-500 focus:outline-none whitespace-pre-wrap font-sans"
                    />
                  </div>

                  {/* 버튼 클릭 액션 설정 섹션 */}
                  <PlanActionSection
                    plan={plan}
                    index={idx}
                    onPlanChange={handlePlanChange}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
