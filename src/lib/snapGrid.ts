// ============================================================
// Snap Grid 유틸리티 - 8px 그리드 스냅 & 스마트 가이드 계산
// ============================================================
import type { CanvasBlock } from '@/types'

/** 기준 캔버스 폭 (논리적 고정 폭) */
export const CANVAS_WIDTH = 1200

/** 그리드 스냅 단위 (px) */
export const GRID_SIZE = 8

/** 스마트 가이드 감지 임계값 (px) - 이 거리 이내면 스냅 */
export const SNAP_THRESHOLD = 6

/** 뷰포트별 스케일 비율 */
export const VIEWPORT_SCALES: Record<string, number> = {
  desktop: 1,
  tablet: 768 / CANVAS_WIDTH,
  mobile: 375 / CANVAS_WIDTH,
}

/**
 * 값을 그리드 단위로 스냅 (8px 배수로 반올림)
 */
export function snapToGrid(value: number, gridSize = GRID_SIZE): number {
  return Math.round(value / gridSize) * gridSize
}

/**
 * 새 블록 추가 시 현재 블록들 중 최하단 y 좌표 계산
 */
export function getNextBlockY(blocks: CanvasBlock[]): number {
  if (blocks.length === 0) return 0
  let maxY = 0
  for (const b of blocks) {
    const bY = (b.inputConfig?.posY || 0) + (b.inputConfig?.blockHeight || 200)
    if (bY > maxY) maxY = bY
  }
  // 8px 그리드로 스냅 후 16px 여백
  return snapToGrid(maxY) + 16
}

/**
 * 블록의 bounding box 반환 (스냅 그리드 좌표 기준)
 */
export interface BlockBounds {
  x: number
  y: number
  w: number
  h: number
  centerX: number
  centerY: number
  right: number
  bottom: number
}

export function getBlockBounds(block: CanvasBlock): BlockBounds {
  const x = block.inputConfig?.posX || 0
  const y = block.inputConfig?.posY || 0
  const w = block.inputConfig?.customWidthPx || CANVAS_WIDTH
  const h = block.inputConfig?.blockHeight || 200
  return {
    x, y, w, h,
    centerX: x + w / 2,
    centerY: y + h / 2,
    right: x + w,
    bottom: y + h,
  }
}

/**
 * 스마트 가이드 타입
 */
export interface SmartGuide {
  type: 'horizontal' | 'vertical'
  position: number // px (논리 캔버스 기준)
}

/**
 * 드래그 중인 블록과 다른 블록들 사이의 스마트 가이드 라인 계산
 * 스냅 가능한 좌표가 있으면 snappedX, snappedY도 반환
 */
export function getSmartGuides(
  draggingBounds: { x: number; y: number; w: number; h: number },
  otherBlocks: CanvasBlock[]
): {
  guides: SmartGuide[]
  snappedX: number | null
  snappedY: number | null
} {
  const guides: SmartGuide[] = []
  let snappedX: number | null = null
  let snappedY: number | null = null

  const { x, y, w, h } = draggingBounds
  const dCenterX = x + w / 2
  const dCenterY = y + h / 2
  const dRight = x + w
  const dBottom = y + h

  for (const b of otherBlocks) {
    const bounds = getBlockBounds(b)

    // ── 수직 정렬 가이드 (X축 정렬) ──
    const xChecks = [
      { drag: x,       ref: bounds.x,       val: bounds.x },
      { drag: x,       ref: bounds.right,   val: bounds.right },
      { drag: dRight,  ref: bounds.x,       val: bounds.x - w },
      { drag: dRight,  ref: bounds.right,   val: bounds.right - w },
      { drag: dCenterX,ref: bounds.centerX, val: bounds.centerX - w / 2 },
    ]
    for (const c of xChecks) {
      if (Math.abs(c.drag - c.ref) < SNAP_THRESHOLD) {
        guides.push({ type: 'vertical', position: c.ref })
        if (snappedX === null) snappedX = c.val
      }
    }

    // ── 수평 정렬 가이드 (Y축 정렬) ──
    const yChecks = [
      { drag: y,       ref: bounds.y,       val: bounds.y },
      { drag: y,       ref: bounds.bottom,  val: bounds.bottom },
      { drag: dBottom, ref: bounds.y,       val: bounds.y - h },
      { drag: dBottom, ref: bounds.bottom,  val: bounds.bottom - h },
      { drag: dCenterY,ref: bounds.centerY, val: bounds.centerY - h / 2 },
    ]
    for (const c of yChecks) {
      if (Math.abs(c.drag - c.ref) < SNAP_THRESHOLD) {
        guides.push({ type: 'horizontal', position: c.ref })
        if (snappedY === null) snappedY = c.val
      }
    }
  }

  return { guides, snappedX, snappedY }
}

/**
 * 모바일/태블릿 뷰 변환 시 캔버스 scale 반환
 */
export function getViewportScale(viewport: string): number {
  return VIEWPORT_SCALES[viewport] ?? 1
}
