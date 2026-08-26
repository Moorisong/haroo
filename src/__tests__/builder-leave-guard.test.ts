import test, { describe } from 'node:test'
import assert from 'node:assert'
import { useBuilderStore } from '../stores/useBuilderStore'

/**
 * [테스트 시나리오: 페이지 이탈 시 커스텀 모달과 브라우저 경고창(beforeunload) 간의 중복 노출 방지 플로우 세부 검증]
 */
describe('페이지 이탈 방어 및 중복 경고창 방지(skipBeforeUnload) 무결성 테스트', () => {

  const createMockEvent = () => {
    let preventDefaultCalled = false
    let returnValueSet = false
    return {
      event: {
        preventDefault: () => { preventDefaultCalled = true },
        set returnValue(val: string) { returnValueSet = true }
      },
      check: () => ({ preventDefaultCalled, returnValueSet })
    }
  }

  // page.tsx의 handleBeforeUnload 로직 모사 함수 (단, 실제 스토어의 비즈니스 로직 헬퍼를 직접 사용)
  const runBeforeUnloadHandler = (mockEvent: any, skipBeforeUnloadCurrent: boolean) => {
    const { shouldPreventUnload } = useBuilderStore.getState()
    if (shouldPreventUnload(skipBeforeUnloadCurrent)) {
      mockEvent.preventDefault()
      mockEvent.returnValue = ''
    }
  }
  
  /**
   * [시나리오]: 프로젝트 저장 후 변경사항이 전혀 없는 상태(isDirty=false)에서 새로고침이나 탭 닫기를 시도함.
   * [예상 결과]: 사용자 작업을 가로막는 브라우저 경고창(beforeunload 이벤트 내 preventDefault)이 발생하지 않아야 함.
   */
  test('1. 변경사항이 없을 때(isDirty=false), 브라우저 경고창이 발생하지 않아야 한다', () => {
    useBuilderStore.setState({ isDirty: false })
    const { event, check } = createMockEvent()
    
    runBeforeUnloadHandler(event, false)
    
    const { preventDefaultCalled, returnValueSet } = check()
    assert.strictEqual(preventDefaultCalled, false, 'isDirty가 false이면 경고창이 차단되어야 합니다.')
    assert.strictEqual(returnValueSet, false)
  })

  /**
   * [시나리오]: 작업 중인 변경사항이 있는 상태(isDirty=true)에서 쌩으로 브라우저를 새로고침하거나 탭을 닫음.
   * [예상 결과]: 브라우저 기본 경고창이 호출되어(preventDefault 및 returnValue 세팅) 작업 유실을 방어해야 함.
   */
  test('2. 변경사항이 있을 때(isDirty=true), 명시적 이동이 아니면 브라우저 경고창이 정상적으로 발생해야 한다', () => {
    useBuilderStore.setState({ isDirty: true })
    const { event, check } = createMockEvent()
    
    runBeforeUnloadHandler(event, false)
    
    const { preventDefaultCalled, returnValueSet } = check()
    assert.strictEqual(preventDefaultCalled, true, 'isDirty가 true이면 브라우저 경고창(preventDefault)이 발생해야 합니다.')
    assert.strictEqual(returnValueSet, true)
  })

  /**
   * [시나리오]: 변경사항이 있는 상태(isDirty=true)에서 커스텀 모달이 떴고, 사용자가 "저장하지 않고 이동하기"를 클릭하여 명시적 이동 함수(executeTargetSwitch)가 호출됨.
   * [예상 결과]: skipBeforeUnload 플래그가 true로 전환되면서, 뒤이어 발생하는 beforeunload 이벤트에서 경고창 팝업 로직이 차단(무력화)되어야 함.
   */
  test('3. 커스텀 모달에서 명시적 이동(저장하지 않고 이동 등)을 선택하면, isDirty가 true이더라도 브라우저 중복 경고가 차단되어야 한다', () => {
    useBuilderStore.setState({ isDirty: true })
    const skipBeforeUnload = { current: false }
    
    // 명시적 이동(executeTargetSwitch) 실행 모사
    const executeTargetSwitch = () => {
      skipBeforeUnload.current = true // 플래그 활성화
    }
    executeTargetSwitch()
    
    const { event, check } = createMockEvent()
    runBeforeUnloadHandler(event, skipBeforeUnload.current)
    
    const { preventDefaultCalled } = check()
    assert.strictEqual(preventDefaultCalled, false, 'skipBeforeUnload 플래그가 활성화되면 경고창 호출을 즉시 중단해야 합니다.')
  })
})
