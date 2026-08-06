import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock, Draft, BlockTier } from '@/types'

interface BlockDefinition {
  id: string
  name: string
  tier: BlockTier
  icon?: React.ElementType
}

interface BuilderState {
  // 캔버스 상태
  canvasBlocks: CanvasBlock[]
  selectedInstanceId: string | null
  draftName: string
  draftId: string | null
  versionClock: number
  isDirty: boolean

  // 저장된 드래프트 목록
  drafts: Draft[]

  // Actions
  addBlock: (def: BlockDefinition) => void
  removeBlock: (instanceId: string) => void
  moveBlock: (fromIndex: number, toIndex: number) => void
  selectBlock: (instanceId: string | null) => void
  setDraftName: (name: string) => void
  setDraftId: (id: string | null) => void
  markSaved: (draftId: string) => void
  loadDraft: (draft: Draft) => void
  setDrafts: (drafts: Draft[]) => void
  reset: () => void
}

const initialState = {
  canvasBlocks: [] as CanvasBlock[],
  selectedInstanceId: null,
  draftName: '새 프로젝트',
  draftId: null,
  versionClock: 0,
  isDirty: false,
  drafts: [] as Draft[],
}

/**
 * 빌더 전역 상태 스토어 (Zustand)
 * 도메인별 분리 원칙 준수 (ConventionsWebConventions.md)
 */
export const useBuilderStore = create<BuilderState>((set, get) => ({
  ...initialState,

  addBlock: (def) => {
    const newBlock: CanvasBlock = {
      instanceId: uuidv4(),
      blockId: def.id,
      name: def.name,
      tier: def.tier,
      icon: def.icon,
    }
    set((state) => ({
      canvasBlocks: [...state.canvasBlocks, newBlock],
      versionClock: state.versionClock + 1,
      isDirty: true,
    }))
  },

  removeBlock: (instanceId) => {
    set((state) => ({
      canvasBlocks: state.canvasBlocks.filter((b) => b.instanceId !== instanceId),
      selectedInstanceId: state.selectedInstanceId === instanceId ? null : state.selectedInstanceId,
      versionClock: state.versionClock + 1,
      isDirty: true,
    }))
  },

  moveBlock: (fromIndex, toIndex) => {
    const blocks = [...get().canvasBlocks]
    const [moved] = blocks.splice(fromIndex, 1)
    blocks.splice(toIndex, 0, moved)
    set({ canvasBlocks: blocks, versionClock: get().versionClock + 1, isDirty: true })
  },

  selectBlock: (instanceId) => {
    set({ selectedInstanceId: instanceId })
  },

  setDraftName: (name) => {
    set({ draftName: name, isDirty: true })
  },

  setDraftId: (id) => {
    set({ draftId: id })
  },

  markSaved: (draftId) => {
    set({ draftId, isDirty: false })
  },

  loadDraft: (draft) => {
    set({
      canvasBlocks: draft.selectedBlocks,
      draftName: draft.name,
      draftId: draft.id,
      versionClock: draft.versionClock,
      isDirty: false,
    })
  },

  setDrafts: (drafts) => {
    set({ drafts })
  },

  reset: () => {
    set(initialState)
  },
}))
