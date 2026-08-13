import { createContext, useContext } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'

interface BlockContextType {
  instanceId: string
  isPreviewMode: boolean
}

const BlockContext = createContext<BlockContextType | null>(null)

export function BlockProvider({ 
  instanceId, 
  isPreviewMode, 
  children 
}: BlockContextType & { children: React.ReactNode }) {
  return (
    <BlockContext.Provider value={{ instanceId, isPreviewMode }}>
      {children}
    </BlockContext.Provider>
  )
}

export function useBlockContext() {
  return useContext(BlockContext)
}

/**
 * 하위 요소 클릭 시 호출할 이벤트 훅
 */
export function useElementSelector() {
  const context = useBlockContext()
  const { selectBlock } = useBuilderStore()

  const selectElement = (elementKey: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    if (context && !context.isPreviewMode) {
      selectBlock(context.instanceId, elementKey)
    }
  }

  return selectElement
}
