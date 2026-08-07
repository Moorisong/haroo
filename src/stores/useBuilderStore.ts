import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock, Draft, BlockTier, DeviceViewport, BlockInputConfig, ProjectType } from '@/types'
import { BlockInputConfigSchema } from '@/types'
import { getNextBlockY, CANVAS_WIDTH, snapToGrid } from '@/lib/snapGrid'

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

  // WYSIWYG 및 프로젝트 모드 상태
  projectType: ProjectType
  projectTypeSelected: boolean
  deviceViewport: DeviceViewport
  isPreviewMode: boolean

  // 저장된 드래프트 목록
  drafts: Draft[]

  // Actions
  addBlock: (def: BlockDefinition) => void
  removeBlock: (instanceId: string) => void
  moveBlock: (fromIndex: number, toIndex: number) => void
  selectBlock: (instanceId: string | null) => void
  updateBlockInputData: (instanceId: string, data: Partial<BlockInputConfig>) => void
  setProjectType: (type: ProjectType) => void
  confirmProjectType: (type: ProjectType) => void
  setDeviceViewport: (viewport: DeviceViewport) => void
  togglePreviewMode: () => void
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
  projectType: 'WEB' as ProjectType,
  projectTypeSelected: false,
  deviceViewport: 'desktop' as DeviceViewport,
  isPreviewMode: false,
  drafts: [] as Draft[],
}

/**
 * 빌더 전역 상태 스토어 (Zustand)
 * 도메인별 분리 원칙 준수 (ConventionsWebConventions.md)
 */
export const useBuilderStore = create<BuilderState>((set, get) => ({
  ...initialState,

  addBlock: (def) => {
    const currentBlocks = get().canvasBlocks
    const nextY = getNextBlockY(currentBlocks)
    const newBlock: CanvasBlock = {
      instanceId: uuidv4(),
      blockId: def.id,
      name: def.name,
      tier: def.tier,
      icon: def.icon,
      inputConfig: {
        posX: 0,
        posY: snapToGrid(nextY),
        customWidthPx: CANVAS_WIDTH,
      },
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
    if (fromIndex < 0 || fromIndex >= blocks.length || toIndex < 0 || toIndex >= blocks.length) return

    const [moved] = blocks.splice(fromIndex, 1)
    blocks.splice(toIndex, 0, moved)

    // posY 기준 스냅 그리드 좌표 재계산 (데스크톱 및 PWA 캔버스 모두 동기화)
    let currentY = 16
    const updatedBlocks = blocks.map((b) => {
      const h = b.inputConfig?.blockHeight || 200
      const updated = {
        ...b,
        inputConfig: {
          ...b.inputConfig,
          posY: snapToGrid(currentY),
        },
      }
      currentY += h + 16
      return updated
    })

    set({ canvasBlocks: updatedBlocks, versionClock: get().versionClock + 1, isDirty: true })
  },

  selectBlock: (instanceId) => {
    set({ selectedInstanceId: instanceId })
  },

  updateBlockInputData: (instanceId, data) => {
    set((state) => {
      const blocks = [...state.canvasBlocks]
      const index = blocks.findIndex((b) => b.instanceId === instanceId)
      if (index > -1) {
        const currentConfig = blocks[index].inputConfig || {}
        const newConfig = { ...currentConfig, ...data }
        
        // Zod validation 방어 로직 (0.01초 내 단방향 갱신)
        const parsed = BlockInputConfigSchema.safeParse(newConfig)
        if (parsed.success) {
          blocks[index].inputConfig = parsed.data
        } else {
          console.warn('Block input validation failed', parsed.error)
          // Fallback으로 검증에 실패해도 업데이트를 강제할지는 결정 가능하나 안전하게 파싱된 값 또는 원본 값 활용
          blocks[index].inputConfig = newConfig // 실시간 피드백을 위해 일단 병합 (엄격한 방어가 필요하면 생략)
        }
      }
      return { canvasBlocks: blocks, versionClock: state.versionClock + 1, isDirty: true }
    })
  },

  setProjectType: (type) => {
    if (type === 'PWA') {
      set({ projectType: 'PWA', deviceViewport: 'mobile' })
    } else {
      set({ projectType: 'WEB' })
    }
  },

  confirmProjectType: (type) => {
    if (type === 'PWA') {
      set({ projectType: 'PWA', deviceViewport: 'mobile', projectTypeSelected: true })
    } else {
      set({ projectType: 'WEB', deviceViewport: 'desktop', projectTypeSelected: true })
    }
  },

  setDeviceViewport: (viewport) => {
    set({ deviceViewport: viewport })
  },

  togglePreviewMode: () => {
    set((state) => ({ isPreviewMode: !state.isPreviewMode, selectedInstanceId: null }))
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
