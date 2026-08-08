import type { ContainerWidth, PaddingYOption } from '@/types'
import { useBuilderStore } from '@/stores/useBuilderStore'

// ─────────────────────────────────────────────────────────────────────────────
// 이중 반응형 헬퍼: 영역 크기 조절 + 기기 맞춤형 반응형 Tailwind 클래스 도출
// ─────────────────────────────────────────────────────────────────────────────

/** 컨테이너 폭 → Tailwind max-w 클래스 (데스크톱 최적 확장) */
export const CONTAINER_WIDTH_CLASS: Record<ContainerWidth, string> = {
  full:   'max-w-full',
  wide:   'max-w-7xl',
  medium: 'max-w-5xl',
  narrow: 'max-w-2xl',
}

/** 상하 패딩 → Tailwind py 클래스 (데스크톱 넉넉한 비율 확장) */
export const PADDING_Y_CLASS: Record<PaddingYOption, string> = {
  compact:       'py-6 sm:py-8 lg:py-12',
  normal:        'py-12 sm:py-16 lg:py-24',
  spacious:      'py-16 sm:py-24 lg:py-32',
  extraSpacious: 'py-24 sm:py-32 lg:py-40',
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
  let viewport = 'desktop'
  try {
    // SSR이나 빌더 외부 환경에서는 데스크톱으로 폴백, 빌더 내부에선 Zustand 값 동기적 읽기
    viewport = useBuilderStore.getState().deviceViewport
  } catch (e) {}

  let pyClass = PADDING_Y_CLASS[paddingY]
  let pxClass = 'px-4 sm:px-6 lg:px-8'

  if (viewport === 'mobile') {
    // 뷰포트가 mobile 강제 설정 시 (데스크톱 브라우저에서 볼 때도) 가장 좁은 패딩 사용
    pyClass = pyClass.split(' ')[0]
    pxClass = 'px-4'
  } else if (viewport === 'tablet') {
    // 태블릿 뷰포트 강제 시 sm: 패딩 사용
    const parts = pyClass.split(' ')
    pyClass = parts.length > 1 ? parts[1].replace('sm:', '') : parts[0]
    pxClass = 'px-6'
  }

  return {
    wrapperClass: 'w-full flex justify-center',
    innerClass: `w-full ${CONTAINER_WIDTH_CLASS[containerWidth]}`,
    paddingClass: pyClass,
    paddingXClass: pxClass,
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
  cols4: string
} {
  let viewport = 'desktop'
  try {
    viewport = useBuilderStore.getState().deviceViewport
  } catch (e) {}

  const isMobile = viewport === 'mobile'
  const isTablet = viewport === 'tablet'

  if (isMobile || containerWidth === 'narrow') {
    return { cols1: 'grid-cols-1', cols2: 'grid-cols-1', cols3: 'grid-cols-1', cols4: 'grid-cols-1' }
  }
  
  if (isTablet || containerWidth === 'medium') {
    return { cols1: 'grid-cols-1', cols2: 'grid-cols-2', cols3: 'grid-cols-2', cols4: 'grid-cols-2' }
  }

  // wide | full (Desktop) - 기기 반응형 브레이크포인트 적용
  return {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-1 sm:grid-cols-2',
    cols3: 'grid-cols-1 sm:grid-cols-3',
    cols4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }
}
