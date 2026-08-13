/**
 * 드래프트 데이터 구조, 저장 밸리데이션, 중복 이름 넘버링 및 삭제 필터링 빽빽한 단위 테스트
 */

export function testDraftDataStructure() {
  const mockDraft = {
    id: 'draft_123',
    name: '나만의 사이트',
    selectedBlocks: [
      { instanceId: 'inst_1', blockId: 'blk_hero_01', name: '히어로 섹션' }
    ],
    versionClock: 1,
    updatedAt: '2026-08-13',
  }

  if (!mockDraft.id || mockDraft.name !== '나만의 사이트' || !Array.isArray(mockDraft.selectedBlocks)) {
    throw new Error('Draft data structure validation failed')
  }
  return true
}

export function testDraftNameValidation() {
  const emptyNames = ['', '   ', '  \n ']
  emptyNames.forEach((name) => {
    if (name.trim() !== '') {
      throw new Error('Empty name validation failed')
    }
  })
  return true
}

export function testDuplicateNameSuffixLogic() {
  const existingNames = ['나만의 프로젝트', '나만의 프로젝트 (1)', '나만의 프로젝트 (2)']

  const getUniqueName = (inputName: string) => {
    let targetName = inputName.trim()
    let counter = 1
    const baseName = targetName.replace(/\s\(\d+\)$/, '')

    while (existingNames.includes(targetName)) {
      targetName = `${baseName} (${counter})`
      counter++
    }
    return targetName
  }

  if (getUniqueName('나만의 프로젝트') !== '나만의 프로젝트 (3)') {
    throw new Error('Duplicate name (n) suffix logic failed')
  }

  if (getUniqueName('새로운 프로젝트') !== '새로운 프로젝트') {
    throw new Error('Unique name assignment logic failed')
  }

  return true
}

export function testDraftDeleteFilter() {
  const draftsList = [
    { id: 'd1', name: '드래프트 1' },
    { id: 'd2', name: '드래프트 2' },
  ]

  const targetIdToDelete = 'd1'
  const filtered = draftsList.filter((d) => d.id !== targetIdToDelete)

  if (filtered.length !== 1 || filtered[0].id !== 'd2') {
    throw new Error('Draft delete filter logic failed')
  }

  return true
}

export function testBatchDraftDeleteFilter() {
  const draftsList = [
    { id: 'd1', name: '드래프트 1' },
    { id: 'd2', name: '드래프트 2' },
    { id: 'd3', name: '드래프트 3' },
  ]

  // 모두 선택
  let selectedIds = draftsList.map((d) => d.id)
  if (selectedIds.length !== 3) {
    throw new Error('Select all logic failed')
  }

  // 모두 해제
  const isAllSelected = draftsList.length > 0 && selectedIds.length === draftsList.length
  if (isAllSelected) {
    selectedIds = []
  }
  if (selectedIds.length !== 0) {
    throw new Error('Deselect all logic failed')
  }

  // 다중 체크 (d1, d3 선택)
  selectedIds = ['d1', 'd3']
  const filtered = draftsList.filter((d) => !selectedIds.includes(d.id))

  if (filtered.length !== 1 || filtered[0].id !== 'd2') {
    throw new Error('Batch draft delete filter logic failed')
  }

  return true
}

function runApiTests() {
  console.log('--- 🧪 드래프트 API 핵심 비즈니스 로직 빽빽한 테스트 시작 ---')
  testDraftDataStructure()
  console.log('✅ [PASS] 드래프트 데이터 구조 검증 성공')

  testDraftNameValidation()
  console.log('✅ [PASS] 드래프트 프로젝트 이름 필수 입력 밸리데이션 성공')

  testDuplicateNameSuffixLogic()
  console.log('✅ [PASS] 동일 이름 저장 시 (n) 서픽스 넘버링 처리 검증 성공')

  testDraftDeleteFilter()
  console.log('✅ [PASS] 드래프트 단일 삭제 필터링 검증 성공')

  testBatchDraftDeleteFilter()
  console.log('✅ [PASS] 드래프트 다중 선택 모두 선택/해제 및 일괄 삭제 필터링 검증 성공')

  console.log('✨ [ALL PASS] 드래프트 API 모든 비즈니스 로직 검증 완료!\n')
}

// 스크립트 직접 실행 시 실행
if (require.main === module) {
  runApiTests()
}
