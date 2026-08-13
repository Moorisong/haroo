import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock, Draft, BlockTier, DeviceViewport, BlockInputConfig, ProjectType, PageItem, SiteTemplateCategory } from '@/types'
import { BlockInputConfigSchema } from '@/types'
import { getNextBlockY, CANVAS_WIDTH, snapToGrid } from '@/lib/snapGrid'

interface BlockDefinition {
  id: string
  name: string
  tier: BlockTier
  icon?: React.ElementType
}

const DEFAULT_MAIN_PAGE: PageItem = {
  id: 'page_main',
  title: '메인 화면',
  slug: '/',
  isHome: true,
  blocks: [],
}

interface BuilderState {
  // 다중 페이지 상태
  pages: PageItem[]
  activePageId: string

  // 캔버스 상태 (현재 activePage의 blocks와 하위호환 동기화)
  canvasBlocks: CanvasBlock[]
  selectedInstanceId: string | null
  selectedElementKey: string | null
  draftName: string
  draftId: string | null
  versionClock: number
  isDirty: boolean

  // 2단계 스타트 템플릿 및 모드 확정 상태
  projectType: ProjectType
  projectTypeSelected: boolean
  siteTemplate: SiteTemplateCategory | null
  siteTemplateSelected: boolean

  deviceViewport: DeviceViewport
  isPreviewMode: boolean

  // 저장된 드래프트 목록
  drafts: Draft[]

  // 다중 페이지 Actions
  setActivePage: (pageId: string) => void
  addPage: (title: string, customSlug?: string) => string
  removePage: (pageId: string) => void
  updatePageTitle: (pageId: string, title: string) => void
  confirmSiteTemplate: (template: SiteTemplateCategory) => void

  // Undo / Redo 역사의 상태 스택
  pastHistory: CanvasBlock[][]
  futureHistory: CanvasBlock[][]
  undo: () => void
  redo: () => void

  // Block Actions
  addBlock: (def: BlockDefinition) => void
  removeBlock: (instanceId: string) => void
  moveBlock: (fromIndex: number, toIndex: number) => void
  selectBlock: (instanceId: string | null, elementKey?: string | null) => void
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
  pages: [DEFAULT_MAIN_PAGE],
  activePageId: 'page_main',
  canvasBlocks: [] as CanvasBlock[],
  selectedInstanceId: null,
  selectedElementKey: null,
  draftName: '새 프로젝트',
  draftId: null,
  versionClock: 0,
  isDirty: false,
  projectType: 'WEB' as ProjectType,
  projectTypeSelected: false,
  siteTemplate: null as SiteTemplateCategory | null,
  siteTemplateSelected: false,
  deviceViewport: 'desktop' as DeviceViewport,
  isPreviewMode: false,
  drafts: [] as Draft[],
  pastHistory: [] as CanvasBlock[][],
  futureHistory: [] as CanvasBlock[][],
}

/**
 * 빌더 전역 상태 스토어 (Zustand)
 * 도메인별 분리 원칙 준수 (ConventionsWebConventions.md)
 */
export const useBuilderStore = create<BuilderState>((set, get) => ({
  ...initialState,

  undo: () => {
    const { pastHistory, canvasBlocks, futureHistory, pages, activePageId } = get()
    if (pastHistory.length === 0) return

    const previous = pastHistory[pastHistory.length - 1]
    const newPast = pastHistory.slice(0, pastHistory.length - 1)
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: previous } : p))

    set({
      pastHistory: newPast,
      canvasBlocks: previous,
      futureHistory: [canvasBlocks, ...futureHistory],
      pages: updatedPages,
      isDirty: true
    })
  },

  redo: () => {
    const { futureHistory, canvasBlocks, pastHistory, pages, activePageId } = get()
    if (futureHistory.length === 0) return

    const next = futureHistory[0]
    const newFuture = futureHistory.slice(1)
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: next } : p))

    set({
      futureHistory: newFuture,
      canvasBlocks: next,
      pastHistory: [...pastHistory, canvasBlocks],
      pages: updatedPages,
      isDirty: true
    })
  },

  setActivePage: (pageId) => {
    const { pages, canvasBlocks, activePageId } = get()
    // 이전 페이지의 blocks 저장
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: canvasBlocks } : p))
    const targetPage = updatedPages.find((p) => p.id === pageId)
    if (targetPage) {
      set({
        pages: updatedPages,
        activePageId: pageId,
        canvasBlocks: targetPage.blocks,
        selectedInstanceId: null,
        selectedElementKey: null,
      })
    }
  },

  addPage: (title, customSlug) => {
    const { pages, canvasBlocks, activePageId } = get()
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: canvasBlocks } : p))
    const newId = `page_${uuidv4().slice(0, 8)}`
    
    // 유저가 직접 입력한 영문 주소 정제 (소문자, 하이픈 정규화)
    let formattedSlug = customSlug ? customSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '') : ''
    if (!formattedSlug) {
      formattedSlug = `page-${updatedPages.length + 1}`
    }
    if (!formattedSlug.startsWith('/')) {
      formattedSlug = `/${formattedSlug}`
    }

    const newPage: PageItem = {
      id: newId,
      title: title || `새 화면 ${updatedPages.length + 1}`,
      slug: formattedSlug,
      blocks: [],
    }
    const nextPages = [...updatedPages, newPage]
    set({
      pages: nextPages,
      activePageId: newId,
      canvasBlocks: [],
      selectedInstanceId: null,
      selectedElementKey: null,
      versionClock: get().versionClock + 1,
      isDirty: true,
    })
    return newId
  },

  removePage: (pageId) => {
    const { pages, activePageId } = get()
    if (pages.length <= 1) return // 최소 1개 페이지 유지
    const pageToRemove = pages.find((p) => p.id === pageId)
    if (pageToRemove?.isHome) return // 메인 페이지는 삭제 불가

    const nextPages = pages.filter((p) => p.id !== pageId)
    const nextActiveId = activePageId === pageId ? nextPages[0].id : activePageId
    const nextActivePage = nextPages.find((p) => p.id === nextActiveId)

    set({
      pages: nextPages,
      activePageId: nextActiveId,
      canvasBlocks: nextActivePage ? nextActivePage.blocks : [],
      selectedInstanceId: null,
      selectedElementKey: null,
      versionClock: get().versionClock + 1,
      isDirty: true,
    })
  },

  updatePageTitle: (pageId, title) => {
    set((state) => ({
      pages: state.pages.map((p) => (p.id === pageId ? { ...p, title } : p)),
      isDirty: true,
    }))
  },

  confirmSiteTemplate: (template) => {
    set({
      siteTemplate: template,
      siteTemplateSelected: true,
      isDirty: true,
    })
  },

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
    const updatedBlocks = [...currentBlocks, newBlock]
    const { pages, activePageId, pastHistory } = get()
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: updatedBlocks } : p))

    set((state) => ({
      pastHistory: [...pastHistory, currentBlocks],
      futureHistory: [],
      pages: updatedPages,
      canvasBlocks: updatedBlocks,
      versionClock: state.versionClock + 1,
      isDirty: true,
    }))
  },

  removeBlock: (instanceId) => {
    const currentBlocks = get().canvasBlocks
    const nextBlocks = currentBlocks.filter((b) => b.instanceId !== instanceId)
    const { pages, activePageId, pastHistory } = get()
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: nextBlocks } : p))

    set((state) => ({
      pastHistory: [...pastHistory, currentBlocks],
      futureHistory: [],
      pages: updatedPages,
      canvasBlocks: nextBlocks,
      selectedInstanceId: state.selectedInstanceId === instanceId ? null : state.selectedInstanceId,
      selectedElementKey: state.selectedInstanceId === instanceId ? null : state.selectedElementKey,
      versionClock: state.versionClock + 1,
      isDirty: true,
    }))
  },

  moveBlock: (fromIndex, toIndex) => {
    const currentBlocks = get().canvasBlocks
    const blocks = [...currentBlocks]
    if (fromIndex < 0 || fromIndex >= blocks.length || toIndex < 0 || toIndex >= blocks.length) return

    const [moved] = blocks.splice(fromIndex, 1)
    blocks.splice(toIndex, 0, moved)

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

    const { pages, activePageId, pastHistory } = get()
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: updatedBlocks } : p))

    set({ 
      pastHistory: [...pastHistory, currentBlocks],
      futureHistory: [],
      pages: updatedPages, 
      canvasBlocks: updatedBlocks, 
      versionClock: get().versionClock + 1, 
      isDirty: true 
    })
  },

  selectBlock: (instanceId, elementKey = null) => {
    set({ selectedInstanceId: instanceId, selectedElementKey: elementKey })
  },

  updateBlockInputData: (instanceId, data) => {
    const currentBlocks = get().canvasBlocks
    const { pages, activePageId, pastHistory } = get()
    
    set((state) => {
      const blocks = [...state.canvasBlocks]
      const index = blocks.findIndex((b) => b.instanceId === instanceId)
      if (index > -1) {
        const currentConfig = blocks[index].inputConfig || {}
        const newConfig = { ...currentConfig, ...data }
        
        const parsed = BlockInputConfigSchema.safeParse(newConfig)
        if (parsed.success) {
          blocks[index].inputConfig = parsed.data
        } else {
          console.warn('Block input validation failed', parsed.error)
          blocks[index].inputConfig = newConfig
        }
      }
      const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks } : p))

      return { 
        pastHistory: [...pastHistory, currentBlocks],
        futureHistory: [],
        pages: updatedPages, 
        canvasBlocks: blocks, 
        versionClock: state.versionClock + 1, 
        isDirty: true 
      }
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
    set((state) => ({ isPreviewMode: !state.isPreviewMode, selectedInstanceId: null, selectedElementKey: null }))
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
    const isMultiPageFormat = draft.selectedBlocks && !Array.isArray(draft.selectedBlocks) && 'pages' in (draft.selectedBlocks as any)
    
    let nextPages = get().pages
    let nextCanvasBlocks = []
    let nextTemplate = get().siteTemplate
    
    if (isMultiPageFormat) {
      const data = draft.selectedBlocks as { pages: PageItem[]; template?: import('@/types').SiteTemplateCategory }
      nextPages = data.pages || get().pages
      nextTemplate = data.template || get().siteTemplate
      // 활성 페이지의 블록 복원 (첫 번째 페이지로 기본 설정)
      nextCanvasBlocks = nextPages.length > 0 ? nextPages[0].blocks : []
    } else {
      // 구버전 단일 페이지 배열 포맷
      nextCanvasBlocks = (draft.selectedBlocks as CanvasBlock[]) || []
      nextPages = [{
        id: 'page_main',
        title: '메인 화면',
        slug: '/',
        isHome: true,
        blocks: nextCanvasBlocks,
      }]
    }

    set({
      pages: nextPages,
      activePageId: nextPages.length > 0 ? nextPages[0].id : 'page_main',
      canvasBlocks: nextCanvasBlocks,
      siteTemplate: nextTemplate,
      siteTemplateSelected: !!nextTemplate,
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
