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

  test('새 화면을 생성하고 유저 지정 영문 주소(URL)로 활성화할 수 있다', () => {
    const store = useBuilderStore.getState()
    const newId = store.addPage('회사 소개', 'about-us')

    const updated = useBuilderStore.getState()
    assert.strictEqual(updated.pages.length, 2)
    assert.strictEqual(updated.activePageId, newId)
    const newPage = updated.pages.find((p) => p.id === newId)
    assert.strictEqual(newPage?.title, '회사 소개')
    assert.strictEqual(newPage?.slug, '/about-us')
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

  // STARTER 티어 최대 3개 화면 생성 제한 및 초과 차단 검증
  test('STARTER 티어에서는 최대 3개 화면만 생성할 수 있고 초과 시 차단된다', () => {
    const store = useBuilderStore.getState()
    store.setUserTier('STARTER')

    const page2 = store.addPage('화면 2', 'page-2')
    const page3 = store.addPage('화면 3', 'page-3')
    assert.ok(page2)
    assert.ok(page3)
    assert.strictEqual(useBuilderStore.getState().pages.length, 3)

    const page4 = store.addPage('화면 4', 'page-4')
    assert.strictEqual(page4, null)
    assert.strictEqual(useBuilderStore.getState().pages.length, 3)
  })

  // STANDARD 티어 최대 10개 화면 생성 제한 검증
  test('STANDARD 티어에서는 최대 10개 화면 생성을 허용하고 11번째는 차단된다', () => {
    const store = useBuilderStore.getState()
    store.setUserTier('STANDARD')

    for (let i = 2; i <= 10; i++) {
      const added = store.addPage(`화면 ${i}`, `page-${i}`)
      assert.ok(added)
    }
    assert.strictEqual(useBuilderStore.getState().pages.length, 10)

    const page11 = store.addPage('화면 11', 'page-11')
    assert.strictEqual(page11, null)
    assert.strictEqual(useBuilderStore.getState().pages.length, 10)
  })

  // PROFESSIONAL 티어 최대 20개 화면 생성 제한 검증
  test('PROFESSIONAL 티어에서는 최대 20개 화면 생성을 허용한다', () => {
    const store = useBuilderStore.getState()
    store.setUserTier('PROFESSIONAL')

    for (let i = 2; i <= 20; i++) {
      const added = store.addPage(`화면 ${i}`, `page-${i}`)
      assert.ok(added)
    }
    assert.strictEqual(useBuilderStore.getState().pages.length, 20)

    const page21 = store.addPage('화면 21', 'page-21')
    assert.strictEqual(page21, null)
    assert.strictEqual(useBuilderStore.getState().pages.length, 20)
  })
})
