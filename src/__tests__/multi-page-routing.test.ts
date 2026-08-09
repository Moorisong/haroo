import test, { beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import { useBuilderStore } from '../stores/useBuilderStore'

describe('다중 페이지(Multi-Page) 관리 및 2단계 템플릿 선택 테스트', () => {
  beforeEach(() => {
    useBuilderStore.getState().reset()
  })

  test('초기에는 메인 화면 하나만 존재해야 한다', () => {
    const { pages, activePageId } = useBuilderStore.getState()
    assert.strictEqual(pages.length, 1)
    assert.strictEqual(pages[0].title, '메인 화면')
    assert.strictEqual(pages[0].isHome, true)
    assert.strictEqual(activePageId, pages[0].id)
  })

  test('새 화면을 생성하고 활성화할 수 있다', () => {
    const store = useBuilderStore.getState()
    const newId = store.addPage('회사 소개')

    const updated = useBuilderStore.getState()
    assert.strictEqual(updated.pages.length, 2)
    assert.strictEqual(updated.activePageId, newId)
    const newPage = updated.pages.find((p) => p.id === newId)
    assert.strictEqual(newPage?.title, '회사 소개')
  })

  test('2단계 스타트 템플릿 목적 선택 시 siteTemplate 상태가 확정된다', () => {
    const store = useBuilderStore.getState()
    store.confirmSiteTemplate('COMPANY')

    const updated = useBuilderStore.getState()
    assert.strictEqual(updated.siteTemplate, 'COMPANY')
    assert.strictEqual(updated.siteTemplateSelected, true)
    assert.strictEqual(updated.isDirty, true)
  })

  test('페이지를 전환하면 이전 페이지의 블록과 독립된 블록 상태가 유지된다', () => {
    const store = useBuilderStore.getState()
    
    // 메인 화면에 블록 추가
    store.addBlock({ id: 'blk_hero_01', name: '히어로', tier: 'STARTER' })
    assert.strictEqual(useBuilderStore.getState().canvasBlocks.length, 1)

    // 새 화면 생성 및 전환
    const secondPageId = store.addPage('문의하기')
    assert.strictEqual(useBuilderStore.getState().canvasBlocks.length, 0)

    // 새 화면에 블록 추가
    useBuilderStore.getState().addBlock({ id: 'blk_form_01', name: '문의 폼', tier: 'STANDARD' })
    assert.strictEqual(useBuilderStore.getState().canvasBlocks.length, 1)

    // 메인 화면으로 다시 이동
    const mainPageId = useBuilderStore.getState().pages[0].id
    useBuilderStore.getState().setActivePage(mainPageId)

    assert.strictEqual(useBuilderStore.getState().canvasBlocks.length, 1)
    assert.strictEqual(useBuilderStore.getState().canvasBlocks[0].blockId, 'blk_hero_01')
  })
})
