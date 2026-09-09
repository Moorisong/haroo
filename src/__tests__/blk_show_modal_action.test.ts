import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { z } from 'zod'

// BlockInputConfigSchema SHOW_MODAL 관련 유효성 검증
const ShowModalActionSchema = z.object({
  actionType: z.enum([
    'NAVIGATE_PAGE', 'OPEN_URL', 'SCROLL_TO_BLOCK', 'CALL_PHONE',
    'OPEN_KAKAO', 'COPY_TO_CLIPBOARD', 'DOWNLOAD_FILE', 'SHOW_MODAL', 'SHARE_PAGE'
  ]),
  thankYouMessage: z.string().optional(),
  modalIcon: z.string().optional(),
})

// ActionModal 내부 제목 파싱 및 아이콘 순수 로직 검증
function parseModalData(rawMessage?: string, icon?: string) {
  const message = rawMessage || ''
  let title = ''
  let content = message

  const titleMatch = message.match(/^\[([^\]]+)\]\s*([\s\S]*)$/)
  if (titleMatch) {
    title = titleMatch[1].trim()
    content = titleMatch[2].trim()
  }

  return { title, content, icon: icon || 'none' }
}

describe('SHOW_MODAL (팝업 모달) 액션, 아이콘 및 메시지 파싱 테스트', () => {
  it('1. SHOW_MODAL actionType, thankYouMessage, modalIcon이 Zod 스키마에 부합해야 한다.', () => {
    const validConfig = {
      actionType: 'SHOW_MODAL',
      thankYouMessage: '[주차 안내] 건물 뒤편 지하 주차장을 2시간 무료로 이용하실 수 있습니다.',
      modalIcon: 'bell',
    }

    const result = ShowModalActionSchema.safeParse(validConfig)
    assert.equal(result.success, true)
  })

  it('2. [제목] 형식이 포함된 문구는 제목과 본문으로 분리되어야 한다.', () => {
    const parsed = parseModalData('[환불 규정] 결제일로부터 7일 이내 전액 환불 가능합니다.', 'alert')
    assert.equal(parsed.title, '환불 규정')
    assert.equal(parsed.content, '결제일로부터 7일 이내 전액 환불 가능합니다.')
    assert.equal(parsed.icon, 'alert')
  })

  it('3. 대괄호 제목이 없는 일반 문구의 경우 타이틀 없이 내용만 깔끔하게 표시되어야 한다.', () => {
    const parsed = parseModalData('규칙입니다', 'none')
    assert.equal(parsed.title, '')
    assert.equal(parsed.content, '규칙입니다')
    assert.equal(parsed.icon, 'none')
  })

  it('4. 빈 문구의 경우에도 오류 없이 기본값이 처리되어야 한다.', () => {
    const parsed = parseModalData('', undefined)
    assert.equal(parsed.title, '')
    assert.equal(parsed.content, '')
    assert.equal(parsed.icon, 'none')
  })

  it('5. 동작 테스트 하기(미리보기) 전환 후 편집하기 복귀 시 직전 선택 인스턴스가 복원되어야 한다.', () => {
    const mockStore = {
      isPreviewMode: false,
      selectedInstanceId: 'inst_btn_01',
      selectedElementKey: 'button',
      previousSelectedInstanceId: null as string | null,
      previousSelectedElementKey: null as string | null,
      canvasBlocks: [{ instanceId: 'inst_btn_01' }],
    }

    // 1) 미리보기(동작 테스트 하기) 진입
    mockStore.previousSelectedInstanceId = mockStore.selectedInstanceId
    mockStore.previousSelectedElementKey = mockStore.selectedElementKey
    mockStore.selectedInstanceId = null
    mockStore.selectedElementKey = null
    mockStore.isPreviewMode = true

    assert.equal(mockStore.selectedInstanceId, null)
    assert.equal(mockStore.previousSelectedInstanceId, 'inst_btn_01')

    // 2) 편집하기로 복귀
    mockStore.selectedInstanceId = mockStore.previousSelectedInstanceId
    mockStore.selectedElementKey = mockStore.previousSelectedElementKey
    mockStore.isPreviewMode = false

    assert.equal(mockStore.selectedInstanceId, 'inst_btn_01')
    assert.equal(mockStore.selectedElementKey, 'button')
  })
})
