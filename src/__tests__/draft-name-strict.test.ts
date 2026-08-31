import test, { describe } from 'node:test'
import assert from 'node:assert'
import { useBuilderStore } from '../stores/useBuilderStore'

/**
 * [테스트 시나리오: 프로젝트 이름(draftName) 임의 디폴트 값 차단 및 엄격한 빈값 유지 무결성 검증]
 * 1. reset() 호출 시 draftName이 시스템 임의 값 없이 반드시 빈 문자열('')이어야 한다.
 * 2. 복원(loadDraft) 시 유저가 설정한 draftName이 없으면(''), 임의의 대체명('나만의 프로젝트' 등)을 할당하지 않고 빈 문자열('')을 엄격히 유지해야 한다.
 * 3. 유저가 프로젝트 이름을 빈 문자열로 수동 변경할 경우에도 그대로 빈 문자열('')로 유지되어야 한다.
 */
describe('프로젝트 이름(draftName) 임의 값 입력 차단 및 무결성 검증', () => {

  /**
   * [시나리오]: 신규 프로젝트 생성 또는 reset() 실행 시 스토어 초기화.
   * [예상 결과]: draftName에 '나만의 프로젝트' 등 임의의 디폴트 문자열이 들어가지 않고 반드시 빈 문자열('')이어야 한다.
   */
  test('1. 프로젝트 초기화 시 draftName은 임의의 디폴트 문자열 없이 빈 문자열("")이어야 한다', () => {
    const store = useBuilderStore.getState()
    store.reset()

    const state = useBuilderStore.getState()
    assert.strictEqual(state.draftName, '', '초기화 시 프로젝트 이름은 임의 값 없이 빈 문자열이어야 합니다.')
    assert.notStrictEqual(state.draftName, '나만의 프로젝트', '임시 디폴트 이름이 들어가면 안 됩니다.')
  })

  /**
   * [시나리오]: 비로그인 복원 또는 임시 세션 복원 시 유저가 이름을 지정하지 않음 (pending.draftName = '').
   * [예상 결과]: loadDraft 수행 후 draftName은 '나만의 프로젝트'가 아닌 빈 문자열('')로 복원되어야 한다.
   */
  test('2. 복원 시 유저 지정 이름이 없으면 임의 대체명 대신 빈 문자열("") 상태를 엄격하게 유지해야 한다', () => {
    const store = useBuilderStore.getState()
    store.reset()

    store.loadDraft({
      id: 'draft_no_name_123',
      name: '', // 유저가 입력하지 않은 경우
      selectedBlocks: {
        pages: [],
        template: 'wedding' as any,
        canvasBlocks: [{ id: 'blk_1' } as any],
        projectType: 'WEB' as any,
      },
      versionClock: 1,
      updatedAt: new Date().toISOString(),
    })

    const restoredState = useBuilderStore.getState()
    assert.strictEqual(restoredState.draftName, '', '이름이 없는 드래프트 복원 시 draftName은 빈 문자열이어야 합니다.')
    assert.notStrictEqual(restoredState.draftName, '나만의 프로젝트')
  })

  /**
   * [시나리오]: 유저가 프로젝트 이름을 입력했다가 다시 지우거나 빈 문자열로 setDraftName을 호출함.
   * [예상 결과]: setDraftName('') 호출 시 임의 값 보충 없이 정확히 빈 문자열('')로 업데이트되어야 한다.
   */
  test('3. setDraftName("") 호출 시 임의 값 보충 없이 빈 문자열("")이 유지되어야 한다', () => {
    const store = useBuilderStore.getState()
    store.reset()

    store.setDraftName('기존 이름')
    assert.strictEqual(useBuilderStore.getState().draftName, '기존 이름')

    store.setDraftName('')
    assert.strictEqual(useBuilderStore.getState().draftName, '', '프로젝트 이름 소거 시 빈 문자열이 유지되어야 합니다.')
  })
})
