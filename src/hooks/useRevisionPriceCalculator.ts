import { useMemo } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { REVISION_CASES } from '@/lib/constants'
import type { BlockTier } from '@/types'

interface RevisionPrice {
  caseType: 'A' | 'B' | 'C' | 'D'
  label: string
  price: number
}

interface RevisionCalculation {
  currentMaxTier: BlockTier
  prices: RevisionPrice[]
  totalRevisionCost: number
}

/**
 * 수정 케이스별 요금 자동 계산 Hook
 * 케이스 A/B → 0원, C → 티어 업그레이드 차액, D → 10,000원/컬럼
 */
export function useRevisionPriceCalculator(originalTier: BlockTier = 'STARTER'): RevisionCalculation {
  const { canvasBlocks } = useBuilderStore()

  return useMemo(() => {
    const TIER_ORDER: BlockTier[] = ['STARTER', 'STANDARD', 'PROFESSIONAL']

    // 현재 캔버스의 최상위 티어 계산
    const tierIndices = canvasBlocks.map((b) => TIER_ORDER.indexOf(b.tier))
    const maxTierIndex = tierIndices.length > 0 ? Math.max(...tierIndices) : 0
    const currentMaxTier = TIER_ORDER[maxTierIndex]

    const origIndex = TIER_ORDER.indexOf(originalTier)
    const currIndex = TIER_ORDER.indexOf(currentMaxTier)

    const prices: RevisionPrice[] = [
      { caseType: 'A', label: '문구·사진·색상 변경', price: REVISION_CASES.A },
      { caseType: 'B', label: '동티어 블록 추가/순서 변경', price: REVISION_CASES.B },
      {
        caseType: 'C',
        label: '상위 티어 업그레이드',
        price: currIndex > origIndex ? REVISION_CASES.C : 0,
      },
      { caseType: 'D', label: 'DB 구조 변동', price: REVISION_CASES.D },
    ]

    const totalRevisionCost = prices.reduce((sum, p) => sum + p.price, 0)

    return { currentMaxTier, prices, totalRevisionCost }
  }, [canvasBlocks, originalTier])
}
