'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { useBuilderStore } from '@/stores/useBuilderStore'

interface TouchDndProviderProps {
  children: React.ReactNode
}

/**
 * DnD 프로바이더 - 터치(모바일) + 포인터(데스크톱) 동시 지원
 * @dnd-kit/core의 TouchSensor로 iOS/Android 드래그 이슈 해결
 */
export default function TouchDndProvider({ children }: TouchDndProviderProps) {
  const { canvasBlocks, moveBlock } = useBuilderStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = canvasBlocks.findIndex((b) => b.instanceId === active.id)
    const newIndex = canvasBlocks.findIndex((b) => b.instanceId === over.id)
    if (oldIndex !== -1 && newIndex !== -1) {
      moveBlock(oldIndex, newIndex)
    }
  }

  const blockIds = canvasBlocks.map((b) => b.instanceId)

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={blockIds} strategy={rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
