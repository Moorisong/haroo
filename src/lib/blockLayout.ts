import type { ContainerWidth, PaddingYOption } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// 이중 반응형 헬퍼: 영역 크기 조절 + 기기 맞춤형 반응형 Tailwind 클래스 도출
// ─────────────────────────────────────────────────────────────────────────────

/** 컨테이너 폭 → Tailwind max-w 클래스 */
export const CONTAINER_WIDTH_CLASS: Record<ContainerWidth, string> = {
  full:   'max-w-full',
  wide:   'max-w-6xl',
  medium: 'max-w-4xl',
  narrow: 'max-w-xl',
}

/** 상하 패딩 → Tailwind py 클래스 (기기 반응형 sm: 조합 포함) */
export const PADDING_Y_CLASS: Record<PaddingYOption, string> = {
  compact:       'py-6 sm:py-8',
  normal:        'py-10 sm:py-14',
  spacious:      'py-16 sm:py-20',
  extraSpacious: 'py-20 sm:py-28',
}

/**
 * 블록 외부 래퍼에 적용되는 이중 반응형 컨테이너 클래스 반환
 * - 유저 지정 containerWidth: 블록 전체 가로 폭 결정
 * - 유저 지정 paddingY: 상하 여백(높이) 결정
 * - Narrow 폭에서 내부 그리드가 1열로 auto-reflow되도록 자식 그리드 컬럼 변수 반환
 */
export function getBlockLayout(
  containerWidth: ContainerWidth = 'wide',
  paddingY: PaddingYOption = 'normal'
) {
  return {
    wrapperClass: 'w-full flex justify-center',
    innerClass: `w-full ${CONTAINER_WIDTH_CLASS[containerWidth]}`,
    paddingClass: PADDING_Y_CLASS[paddingY],
  }
}

/**
 * 컨테이너 폭 기반 그리드 열 수 추천 반환 (Narrow → 1열, Wider → 다열)
 * - 블록 그리드 auto-reflow용으로 활용
 */
export function getResponsiveGridCols(containerWidth: ContainerWidth = 'wide'): {
  cols1: string
  cols2: string
  cols3: string
} {
  if (containerWidth === 'narrow') {
    return { cols1: 'grid-cols-1', cols2: 'grid-cols-1', cols3: 'grid-cols-1' }
  }
  if (containerWidth === 'medium') {
    return { cols1: 'grid-cols-1', cols2: 'grid-cols-2', cols3: 'grid-cols-2' }
  }
  // wide | full: 기기 반응형 브레이크포인트 적용
  return {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-1 sm:grid-cols-2',
    cols3: 'grid-cols-1 sm:grid-cols-3',
  }
}
