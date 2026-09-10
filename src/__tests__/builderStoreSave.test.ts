import { useBuilderStore } from '../stores/useBuilderStore'

export function runBuilderSaveTests() {
  console.log('--- 🧪 빌더 저장 및 이탈 감지(isDirty) 빽빽한 통합 검증 시작 ---')

  // 1. 빌더 초기 진입 시 isDirty 검증
  useBuilderStore.getState().reset()
  let state = useBuilderStore.getState()
  if (!state.isDirty && state.draftName === '' && state.draftId === null) {
    console.log('✅ [PASS] 1. 빌더 초기 진입/reset 시 isDirty === false, draftName === ""')
  } else {
    throw new Error('❌ [FAIL] 1. 빌더 초기 상태 검증 실패')
  }

  // 2. 블록 추가(addBlock) 시 isDirty === true 검증
  const mockBlockDef = {
    id: 'block_hero_test',
    name: '테스트 히어로',
    desc: '테스트 블록',
    tier: 'STARTER' as const,
    category: 'HERO' as const,
    icon: () => null,
    defaultInputData: { title: '안녕' },
  }
  useBuilderStore.getState().addBlock(mockBlockDef as any)
  state = useBuilderStore.getState()
  if (state.isDirty && state.canvasBlocks.length === 1) {
    console.log('✅ [PASS] 2. 블록 추가 시 isDirty === true 변경 감지 성공')
  } else {
    throw new Error('❌ [FAIL] 2. 블록 추가 이탈 감지 실패')
  }

  // 3. 프로젝트 이름 변경(setDraftName) 시 isDirty === true 검증
  useBuilderStore.getState().setDraftName('나만의 카페 프로젝트')
  state = useBuilderStore.getState()
  if (state.isDirty && state.draftName === '나만의 카페 프로젝트') {
    console.log('✅ [PASS] 3. 프로젝트 명 변경 시 isDirty === true 변경 감지 성공')
  } else {
    throw new Error('❌ [FAIL] 3. 프로젝트 명 변경 감지 실패')
  }

  // 4. 수동 저장 완료(markSaved) 시 isDirty === false 회복 검증
  useBuilderStore.getState().markSaved('draft_9999')
  state = useBuilderStore.getState()
  if (!state.isDirty && state.draftId === 'draft_9999' && state.projectTypeSelected && state.siteTemplateSelected) {
    console.log('✅ [PASS] 4. 수동 저장 완료(markSaved) 시 isDirty === false 회복 및 모달 차단 가드 성공')
  } else {
    throw new Error('❌ [FAIL] 4. 수동 저장 완료 상태 회복 실패')
  }

  // 5. 저장된 드래프트 로드(loadDraft) 시 isDirty === false 및 모달 가드 검증
  const mockDraft = {
    id: 'draft_saved_77',
    name: '기존 피트니스 센터',
    selectedBlocks: {
      pages: [
        {
          id: 'page_main',
          title: '메인 화면',
          slug: '/',
          isHome: true,
          blocks: [],
        },
      ],
      template: 'COMPANY' as const,
      projectType: 'WEB' as const,
    },
    versionClock: 2,
    updatedAt: '2026-08-13T10:00:00Z',
  }
  useBuilderStore.getState().loadDraft(mockDraft as any)
  state = useBuilderStore.getState()
  if (!state.isDirty && state.draftId === 'draft_saved_77' && state.projectTypeSelected && state.siteTemplateSelected) {
    console.log('✅ [PASS] 5. 드래프트 로드(loadDraft) 시 isDirty === false 및 서비스 선택 모달 숨김 가드 성공')
  } else {
    throw new Error('❌ [FAIL] 5. 드래프트 로드 검증 실패')
  }

  // 6. 블록 삭제(removeBlock) 시 isDirty === true 재감지 검증
  useBuilderStore.getState().addBlock(mockBlockDef as any)
  useBuilderStore.getState().markSaved('draft_77')
  const instanceId = useBuilderStore.getState().canvasBlocks[0].instanceId
  useBuilderStore.getState().removeBlock(instanceId)
  state = useBuilderStore.getState()
  if (state.isDirty && state.canvasBlocks.length === 0) {
    console.log('✅ [PASS] 6. 저장 후 블록 삭제 시 isDirty === true 변경 재감지 성공')
  } else {
    throw new Error('❌ [FAIL] 6. 블록 삭제 이탈 감지 실패')
  }

  // 7. PWA 모드 저장 프로젝트 로드 시 projectType === 'PWA' 및 deviceViewport === 'mobile' 모드 복원 검증
  const mockPwaDraft = {
    id: 'draft_pwa_100',
    name: '모바일 PWA 앱 프로젝트',
    selectedBlocks: {
      pages: [],
      template: 'COMMERCE' as const,
      projectType: 'PWA' as const,
    },
    versionClock: 1,
    updatedAt: '2026-08-13T10:30:00Z',
  }
  useBuilderStore.getState().loadDraft(mockPwaDraft as any)
  state = useBuilderStore.getState()
  if (state.projectType === 'PWA' && state.deviceViewport === 'mobile') {
    console.log('✅ [PASS] 7. PWA 프로젝트 복원 시 projectType: PWA 및 deviceViewport: mobile 자동 전환 성공')
  } else {
    throw new Error('❌ [FAIL] 7. PWA 프로젝트 모드 복원 실패')
  }

  // 8. updateBlockInputData 실행 시 skipDirty 파라미터 작동 검증 (시스템 렌더링 업데이트 시 isDirty 오작동 방지)
  useBuilderStore.getState().reset()
  useBuilderStore.getState().addBlock(mockBlockDef as any)
  useBuilderStore.getState().markSaved('draft_skip_dirty')
  const testInstanceId = useBuilderStore.getState().canvasBlocks[0].instanceId
  
  // 사용자 수동 입력(skipDirty=false)인 경우 isDirty = true 가 되어야 함
  useBuilderStore.getState().updateBlockInputData(testInstanceId, { title: '변경된 제목' }, false)
  state = useBuilderStore.getState()
  if (state.isDirty) {
    console.log('✅ [PASS] 8-1. updateBlockInputData 일반 업데이트 시 isDirty === true 감지 성공')
  } else {
    throw new Error('❌ [FAIL] 8-1. 일반 업데이트 시 isDirty 감지 실패')
  }
  
  useBuilderStore.getState().markSaved('draft_skip_dirty') // 다시 isDirty = false 로 리셋
  
  // 시스템(ResizeObserver 등)에 의한 자동 높이 업데이트인 경우 isDirty = false 유지 
  useBuilderStore.getState().updateBlockInputData(testInstanceId, { blockHeight: 500 }, true)
  state = useBuilderStore.getState()
  if (!state.isDirty) {
    console.log('✅ [PASS] 8-2. updateBlockInputData skipDirty=true 전달 시 isDirty === false 유지 성공')
  } else {
    throw new Error('❌ [FAIL] 8-2. skipDirty 전달 시 isDirty 차단 실패')
  }

  // 9. updateBlockInputData 실행 시 상태 격리 및 얕은 복사/깊은 복사 불변성 검증 (State Pollution 방어)
  useBuilderStore.getState().reset()
  useBuilderStore.getState().addBlock({ ...mockBlockDef, id: 'block_a' } as any)
  useBuilderStore.getState().addBlock({ ...mockBlockDef, id: 'block_b' } as any)
  const blockA_Id = useBuilderStore.getState().canvasBlocks[0].instanceId
  const blockB_Id = useBuilderStore.getState().canvasBlocks[1].instanceId

  useBuilderStore.getState().updateBlockInputData(blockA_Id, { 
    backgroundStyle: { bgType: 'image', imagePosition: { x: 10, y: 10 } } 
  }, false)

  state = useBuilderStore.getState()
  const blockA = state.canvasBlocks[0]
  const blockB = state.canvasBlocks[1]

  if (blockA.inputConfig?.backgroundStyle?.bgType === 'image' && !blockB.inputConfig?.backgroundStyle) {
    console.log('✅ [PASS] 9. updateBlockInputData 실행 시 블록 인스턴스 간 상태 격리(State Isolation) 불변성 유지 성공')
  } else {
    throw new Error('❌ [FAIL] 9. 상태 격리 불변성 훼손 (데이터 오염 발생)')
  }

  console.log('--- 🏁 빌더 저장 및 서비스 모드 복원 테스트 완료 ---')
}

runBuilderSaveTests()
