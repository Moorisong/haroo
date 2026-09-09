import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock, Draft, BlockTier, DeviceViewport, BlockInputConfig, ProjectType, PageItem, SiteTemplateCategory } from '@/types'
import { BlockInputConfigSchema, TIER_PAGE_LIMITS } from '@/types'
import { getNextBlockY, CANVAS_WIDTH, snapToGrid } from '@/lib/snapGrid'
import { emitToast } from '@/hooks/useActionHandler'

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
  // 프로젝트 티어 상태
  userTier: BlockTier

  // 다중 페이지 상태
  pages: PageItem[]
  activePageId: string

  // 캔버스 상태 (현재 activePage의 blocks와 하위호환 동기화)
  canvasBlocks: CanvasBlock[]
  selectedInstanceId: string | null
  selectedElementKey: string | null
  previousSelectedInstanceId: string | null
  previousSelectedElementKey: string | null
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
  isPageSwitcherHighlighted: boolean

  // 저장된 드래프트 목록
  drafts: Draft[]

  // 다중 페이지 Actions
  setUserTier: (tier: BlockTier) => void
  setActivePage: (pageId: string) => void
  addPage: (title: string, customSlug?: string) => string | null
  removePage: (pageId: string) => void
  updatePageTitle: (pageId: string, title: string) => void
  confirmSiteTemplate: (template: SiteTemplateCategory) => void
  highlightPageSwitcher: (highlight?: boolean) => void

  // Block Actions
  addBlock: (def: BlockDefinition) => void
  removeBlock: (instanceId: string) => void
  moveBlock: (fromIndex: number, toIndex: number) => void
  selectBlock: (instanceId: string | null, elementKey?: string | null) => void
  updateBlockInputData: (instanceId: string, data: Partial<BlockInputConfig>, skipDirty?: boolean) => void
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

  // 방어 로직 헬퍼 (테스트 내 가짜 구현 방지 목적)
  shouldAutoBackup: () => boolean
  shouldPreventUnload: (skipBeforeUnload: boolean) => boolean
}

const initialState = {
  userTier: 'STARTER' as BlockTier,
  pages: [DEFAULT_MAIN_PAGE],
  activePageId: 'page_main',
  canvasBlocks: [] as CanvasBlock[],
  selectedInstanceId: null,
  selectedElementKey: null,
  previousSelectedInstanceId: null,
  previousSelectedElementKey: null,
  draftName: '',
  draftId: null,
  versionClock: 0,
  isDirty: false,
  projectType: 'WEB' as ProjectType,
  projectTypeSelected: false,
  siteTemplate: null as SiteTemplateCategory | null,
  siteTemplateSelected: false,
  deviceViewport: 'desktop' as DeviceViewport,
  isPreviewMode: false,
  isPageSwitcherHighlighted: false,
  drafts: [] as Draft[],
}

/**
 * 빌더 전역 상태 스토어 (Zustand)
 * 도메인별 분리 원칙 준수 (ConventionsWebConventions.md)
 */
export const useBuilderStore = create<BuilderState>((set, get) => ({
  ...initialState,

  highlightPageSwitcher: (highlight = true) => {
    set({ isPageSwitcherHighlighted: highlight })
  },

  setUserTier: (tier) => {
    set({ userTier: tier })
  },

  shouldAutoBackup: () => {
    const state = get()
    return state.canvasBlocks.length > 0 && !state.draftId
  },

  shouldPreventUnload: (skipBeforeUnload: boolean) => {
    const state = get()
    return state.isDirty && !skipBeforeUnload
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
    const { pages, canvasBlocks, activePageId, userTier } = get()
    const limit = TIER_PAGE_LIMITS[userTier] || 3
    if (pages.length >= limit) {
      emitToast(`⚠️ 현재 플랜(${userTier})의 최대 화면 수(${limit}개)에 도달했습니다. 추가 화면 작성을 원하시면 플랜을 업그레이드해 주세요.`, 'warning')
      return null
    }

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
    const { pages, activePageId } = get()
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: updatedBlocks } : p))

    set((state) => ({
      pages: updatedPages,
      canvasBlocks: updatedBlocks,
      versionClock: state.versionClock + 1,
      isDirty: true,
    }))
  },

  removeBlock: (instanceId) => {
    const currentBlocks = get().canvasBlocks
    const nextBlocks = currentBlocks.filter((b) => b.instanceId !== instanceId)
    const { pages, activePageId } = get()
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: nextBlocks } : p))

    set((state) => ({
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

    let currentY = 0
    const updatedBlocks = blocks.map((b) => {
      const h = b.inputConfig?.blockHeight || 200
      const updated = {
        ...b,
        inputConfig: {
          ...b.inputConfig,
          posY: snapToGrid(currentY),
        },
      }
      currentY += h
      return updated
    })

    const { pages, activePageId } = get()
    const updatedPages = pages.map((p) => (p.id === activePageId ? { ...p, blocks: updatedBlocks } : p))

    set({ 
      pages: updatedPages, 
      canvasBlocks: updatedBlocks, 
      versionClock: get().versionClock + 1, 
      isDirty: true 
    })
  },

  selectBlock: (instanceId, elementKey = null) => {
    set({ selectedInstanceId: instanceId, selectedElementKey: elementKey })
  },

  updateBlockInputData: (instanceId, data, skipDirty = false) => {
    const { pages, activePageId } = get()
    
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
        pages: updatedPages, 
        canvasBlocks: blocks, 
        versionClock: state.versionClock + (skipDirty ? 0 : 1), 
        isDirty: skipDirty ? state.isDirty : true 
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
    set((state) => {
      const nextPreview = !state.isPreviewMode
      if (nextPreview) {
        // 동작 테스트 하기(미리보기)로 전환 시: 현재 선택된 블록/요소를 기억하고 선택 해제
        return {
          isPreviewMode: true,
          previousSelectedInstanceId: state.selectedInstanceId,
          previousSelectedElementKey: state.selectedElementKey,
          selectedInstanceId: null,
          selectedElementKey: null,
        }
      } else {
        // 편집하기로 복귀 시: 직전 선택했던 블록이 현재 캔버스에 여전히 존재하는지 확인 후 복원
        const canRestore = state.previousSelectedInstanceId &&
          state.canvasBlocks.some((b) => b.instanceId === state.previousSelectedInstanceId)

        return {
          isPreviewMode: false,
          selectedInstanceId: canRestore ? state.previousSelectedInstanceId : (state.canvasBlocks[0]?.instanceId || null),
          selectedElementKey: canRestore ? state.previousSelectedElementKey : null,
        }
      }
    })
  },

  setDraftName: (name) => {
    set({ draftName: name, isDirty: true })
  },

  setDraftId: (id) => {
    set({ draftId: id })
  },

  markSaved: (draftId) => {
    set({ draftId, isDirty: false, projectTypeSelected: true, siteTemplateSelected: true })
  },

  loadDraft: (draft) => {
    const isMultiPageFormat = draft.selectedBlocks && !Array.isArray(draft.selectedBlocks) && 'pages' in (draft.selectedBlocks as any)
    
    let nextPages = get().pages
    let nextCanvasBlocks = []
    let nextTemplate = get().siteTemplate
    let nextProjectType: ProjectType = 'WEB'
    
    if (isMultiPageFormat) {
      const data = draft.selectedBlocks as {
        pages: PageItem[]
        template?: import('@/types').SiteTemplateCategory
        projectType?: ProjectType
        canvasBlocks?: CanvasBlock[]
      }
      nextPages = data.pages || get().pages
      nextTemplate = data.template || get().siteTemplate
      if (data.projectType) {
        nextProjectType = data.projectType
      } else if (draft.name && (draft.name.toLowerCase().includes('pwa') || draft.name.includes('앱') || draft.name.includes('모바일'))) {
        nextProjectType = 'PWA'
      }
      // 활성 페이지의 블록 복원 (canvasBlocks 직접 지정 시 우선 적용)
      if (Array.isArray(data.canvasBlocks) && data.canvasBlocks.length > 0) {
        nextCanvasBlocks = data.canvasBlocks
      } else {
        nextCanvasBlocks = nextPages.length > 0 ? (nextPages[0].blocks || []) : []
      }
    } else {
      // 구버전 단일 페이지 배열 포맷
      nextCanvasBlocks = (draft.selectedBlocks as CanvasBlock[]) || []
      if (draft.name && (draft.name.toLowerCase().includes('pwa') || draft.name.includes('앱') || draft.name.includes('모바일'))) {
        nextProjectType = 'PWA'
      }
      nextPages = [{
        id: 'page_main',
        title: '메인 화면',
        slug: '/',
        isHome: true,
        blocks: nextCanvasBlocks,
      }]
    }

    const nextViewport: DeviceViewport = nextProjectType === 'PWA' ? 'mobile' : 'desktop'

    set({
      pages: nextPages,
      activePageId: nextPages.length > 0 ? nextPages[0].id : 'page_main',
      canvasBlocks: nextCanvasBlocks,
      siteTemplate: nextTemplate,
      siteTemplateSelected: true,
      projectType: nextProjectType,
      projectTypeSelected: true,
      deviceViewport: nextViewport,
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
