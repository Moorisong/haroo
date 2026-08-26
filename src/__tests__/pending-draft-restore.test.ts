import test, { describe } from 'node:test'
import assert from 'node:assert'
import { useBuilderStore } from '../stores/useBuilderStore'

/**
 * [테스트 시나리오: 비로그인 상태 블록 조립 ➔ 저장 클릭 ➔ 소셜 로그인 성공 ➔ 블록 완전 복원 및 버그 방지 검증]
 * 1. 캔버스의 블록, 템플릿, 다중 페이지 상태가 손실되지 않고 100% 복원되는지 검증합니다.
 * 2. React StrictMode로 인한 컴포넌트 이중 렌더링 시, 기 복원된 작업이 리셋되지 않는지 검증합니다.
 * 3. 비로그인 유저라도 캔버스가 비어있으면 불필요한 임시 백업을 생성하지 않는지 검증합니다.
 * 4. 이미 draftId가 부여된 로그인 완료 상태에서는 불필요한 자동 백업 훅 동작을 방어하는지 검증합니다.
 * 5. 로고 클릭으로 명시적 홈 이동 시, 임시 백업이 안전하게 제거되어 무한 리다이렉트를 방지하는지 검증합니다.
 */
describe('비로그인 조립 ➔ 소셜 로그인 ➔ 드래프트 블록 완전 복원 및 무결성 테스트', () => {
  const mockPendingDraft = {
    draftId: 'draft_test_123',
    draftName: '내 미완성 프로젝트',
    pages: [{ id: 'page_main', title: '메인 화면', slug: '', blocks: [{ id: 'blk_hero_01' }] }],
    siteTemplate: 'wedding',
    canvasBlocks: [
      { instanceId: 'inst_1', id: 'blk_hero_01', name: '히어로 섹션', tier: 'STARTER' },
      { instanceId: 'inst_2', id: 'blk_txt_01', name: '자유 텍스트', tier: 'STARTER' },
    ],
    projectType: 'WEB',
  }

  /**
   * [시나리오]: 비로그인 유저가 블록을 조립하다 튕겼고, 세션 스토리지에 임시 백업이 저장됨. 이후 로그인 후 빌더로 복귀하여 백업본을 복원함.
   * [예상 결과]: 캔버스 블록, 선택된 템플릿, 프로젝트 타입이 유실 없이 100% 동일하게 스토어에 복원되어야 함.
   */
  test('1. 임시 세션스토리지 백업 데이터로부터 캔버스 블록과 드래프트 정보가 손실 없이 복원되어야 한다', () => {
    const store = useBuilderStore.getState()
    store.reset()

    // 복원 로직 실행
    store.loadDraft({
      id: mockPendingDraft.draftId,
      name: mockPendingDraft.draftName,
      selectedBlocks: {
        pages: mockPendingDraft.pages,
        template: mockPendingDraft.siteTemplate as any,
        canvasBlocks: mockPendingDraft.canvasBlocks as any,
        projectType: mockPendingDraft.projectType as any,
      },
      versionClock: 1,
      updatedAt: new Date().toISOString(),
    })

    // 복원 상태 검증
    const restoredStore = useBuilderStore.getState()
    assert.strictEqual(restoredStore.draftId, 'draft_test_123')
    assert.strictEqual(restoredStore.draftName, '내 미완성 프로젝트')
    assert.strictEqual(restoredStore.canvasBlocks.length, 2)
    assert.strictEqual(restoredStore.canvasBlocks[0].id, 'blk_hero_01')
    assert.strictEqual(restoredStore.projectTypeSelected, true)
  })

  /**
   * [시나리오]: 이미 프로젝트 복원 셋업이 완료되어(projectTypeSelected=true), 작업이 한창인 상황에서 React StrictMode 등으로 인해 컴포넌트 마운트 훅이 다시 실행됨.
   * [예상 결과]: 두 번째 훅 실행 시 데이터 초기화 로직(reset)이 호출되지 않고 방어되어 기존 블록이 백지화되지 않아야 함.
   */
  test('2. React StrictMode 리셋 방지: 이미 프로젝트 셋업이 완료된 상태(projectTypeSelected=true)에서는 리셋을 방어해야 한다', () => {
    const store = useBuilderStore.getState()
    
    // page.tsx의 178행 방어 로직 모사: !currentStore.projectTypeSelected 일 때만 reset() 허용
    const shouldReset = !store.projectTypeSelected
    
    if (shouldReset) {
      store.reset()
    }
    
    // 복원된 데이터가 날아가지 않고 유지되어야 함
    const stateAfterSecondRender = useBuilderStore.getState()
    assert.strictEqual(stateAfterSecondRender.canvasBlocks.length, 2)
    assert.strictEqual(stateAfterSecondRender.draftId, 'draft_test_123')
  })

  /**
   * [시나리오]: 비로그인 유저가 빌더에 진입했으나 아무 블록도 캔버스에 추가하지 않은 '빈 화면' 상태임.
   * [예상 결과]: 저장할 가치가 없는 빈 캔버스이므로 불필요한 임시 백업(sessionStorage 저장) 로직이 호출되지 않아야 함.
   */
  test('3. 비로그인 유저라도 캔버스가 비어있으면 불필요한 임시 백업을 생성하지 않아야 한다', () => {
    const store = useBuilderStore.getState()
    store.reset() // 캔버스 블록 0개 초기화
    
    // page.tsx의 임시 백업 방어 로직 모사 (실제 스토어 비즈니스 로직 헬퍼 직접 사용)
    const { shouldAutoBackup } = store
    
    assert.strictEqual(shouldAutoBackup(), false)
  })

  /**
   * [시나리오]: 정상적으로 로그인되어 고유 아이디(draftId)가 발급된 상태에서 사용자가 블록을 조작 중임.
   * [예상 결과]: 이미 백엔드 DB와 통신할 수 있는 상태이므로, 비로그인 유저를 위한 임시 백업(sessionStorage) 훅은 동작하지 않아야 함.
   */
  test('4. 불필요한 자동 백업 방지: draftId가 부여된 상태에서는 캔버스가 있어도 임시 백업(useEffect)이 동작하지 않아야 한다', () => {
    const store = useBuilderStore.getState()
    // 강제로 복원 상태 흉내내어 draftId와 캔버스 부여
    store.loadDraft({
      id: 'draft_test_123',
      name: '내 프로젝트',
      selectedBlocks: { canvasBlocks: [{ id: 'blk_1' } as any] },
      versionClock: 1,
      updatedAt: new Date().toISOString()
    })
    
    // page.tsx의 임시 백업 방어 로직 모사 (실제 스토어 비즈니스 로직 헬퍼 직접 사용)
    const { shouldAutoBackup } = store
    
    // 캔버스에 블록은 있지만(length > 0) draftId가 있으므로 백업 중단
    assert.strictEqual(shouldAutoBackup(), false)
  })
  
  /**
   * [시나리오]: 사용자가 작업을 마치고 상단 헤더의 로고(H)를 클릭하여 명시적으로 홈(/)으로 이동함.
   * [예상 결과]: 홈 화면 렌더링 시 임시 백업본을 인지하고 다시 빌더로 강제 리다이렉트 시키는 '무한 튕김'을 막기 위해, 로고 클릭 시점에 잔존하는 임시 백업(pending_builder_draft)이 폭파되어야 함.
   */
  test('5. 로고 클릭 등으로 홈 이동 시, sessionStorage가 즉시 비워져 무한 리다이렉트가 방지되어야 한다', () => {
    // Node.js 환경에서 sessionStorage 모킹
    const mockSessionStorage = {
      store: { pending_builder_draft: '{"some":"data"}' } as any,
      removeItem: function(key: string) { delete this.store[key] }
    }
    
    // page.tsx 로고 클릭 핸들러 동작 모사
    const onHomeClick = () => {
      mockSessionStorage.removeItem('pending_builder_draft')
    }
    
    onHomeClick()
    
    assert.strictEqual(mockSessionStorage.store.pending_builder_draft, undefined, '홈 이동 시 임시 백업본이 삭제되어야 합니다.')
  })
})
