'use client'

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useBuilderStore } from '@/stores/useBuilderStore'

interface TouchDndProviderProps {
  children: React.ReactNode
}

/**
 * DnD 프로바이더 - 터치(모바일) + 포인터(데스크톱) 동시 지원
 * 절대 좌표 기반 자유 드래그 모드
 */
export default function TouchDndProvider({ children }: TouchDndProviderProps) {
  const { canvasBlocks, updateBlockInputData } = useBuilderStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event
    if (!active || (delta.x === 0 && delta.y === 0)) return

    const block = canvasBlocks.find((b) => b.instanceId === active.id)
    if (block) {
      const config = block.inputConfig || {}
      const currentX = config.posX || 0
      const currentY = config.posY || 0

      // delta 값을 기존 좌표에 더하여 영구 저장
      updateBlockInputData(block.instanceId, {
        posX: Math.round(currentX + delta.x),
        posY: Math.round(currentY + delta.y),
      })
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  )
}
