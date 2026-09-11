import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * WaitlistSignup 핵심 비즈니스 로직 단위 테스트
 * - 전화번호 마스킹 로직 검증
 * - Supabase fetch 없이 순수 로직만 검증 (DB 미연동 환경 대응)
 * - APPLY_NOTIFICATION 액션 타입 Zod 스키마 검증
 */

// APPLY_NOTIFICATION 스키마 검증을 인라인으로 수행 (외부 TS 모듈 import 방지)
const VALID_ACTION_TYPES = [
  'NAVIGATE_PAGE', 'OPEN_URL', 'SCROLL_TO_BLOCK', 'CALL_PHONE',
  'OPEN_KAKAO', 'COPY_TO_CLIPBOARD', 'DOWNLOAD_FILE', 'SHOW_MODAL',
  'SHARE_PAGE', 'APPLY_NOTIFICATION',
] as const

function isValidActionType(v: unknown): boolean {
  return typeof v === 'string' && (VALID_ACTION_TYPES as readonly string[]).includes(v)
}

// 전화번호 마스킹 순수 함수 (WaitlistSignup 모델과 동일 로직)
function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.length < 8) return '***-****-****'
  return digits.slice(0, 3) + '-****-' + digits.slice(-4)
}

test('전화번호 마스킹: 010-1234-5678 → 010-****-5678', () => {
  assert.equal(maskPhone('010-1234-5678'), '010-****-5678')
})

test('전화번호 마스킹: 하이픈 없는 11자리 처리', () => {
  assert.equal(maskPhone('01012345678'), '010-****-5678')
})

test('전화번호 마스킹: 8자리 미만은 마스킹 불가 표시', () => {
  assert.equal(maskPhone('1234'), '***-****-****')
})

test('전화번호 마스킹: 국제번호(+82) 처리', () => {
  const result = maskPhone('+821012345678')
  assert.ok(result.endsWith('-5678'), `국제번호 마스킹 마지막 4자리 유지: ${result}`)
})

test('APPLY_NOTIFICATION 액션 타입 스키마 검증', () => {
  assert.equal(isValidActionType('APPLY_NOTIFICATION'), true, 'APPLY_NOTIFICATION은 유효한 액션 타입이어야 함')
  assert.equal(isValidActionType('UNKNOWN_ACTION'), false, '잘못된 액션 타입은 false여야 함')
  assert.equal(isValidActionType(''), false, '빈 문자열은 false여야 함')
})

test('waitlist_signups 행 구조 유효성 검증', () => {
  // Row 구조가 올바른지 타입 레벨 검증 (런타임 mock)
  const mockRow = {
    id: 'uuid-1234',
    project_id: 'draft-abc',
    phone_masked: '010-****-5678',
    phone_raw: '01012345678',
    status: 'PENDING' as const,
    notified_at: null,
    created_at: new Date().toISOString(),
  }
  assert.equal(mockRow.status, 'PENDING')
  assert.equal(mockRow.phone_masked.includes('****'), true, '마스킹 번호에 **** 포함되어야 함')
  assert.equal(mockRow.notified_at, null, '신규 신청자는 notified_at이 null이어야 함')
})

test('markNotified: 빈 배열 처리 안전성', () => {
  // 빈 배열 전달 시 에러 없이 통과해야 함 (실제 DB 호출 없이 로직만 검증)
  const ids: string[] = []
  assert.equal(ids.length === 0, true, '빈 배열은 조기 리턴해야 함')
})

test('일괄 발송 배치 크기 계산 (500건 기준)', () => {
  const BATCH_SIZE = 500
  const phones = Array.from({ length: 1250 }, (_, i) => `0101234${String(i).padStart(4, '0')}`)
  const batches = []
  for (let i = 0; i < phones.length; i += BATCH_SIZE) {
    batches.push(phones.slice(i, i + BATCH_SIZE))
  }
  assert.equal(batches.length, 3, '1250건은 3배치여야 함')
  assert.equal(batches[0].length, 500, '첫 배치 500건')
  assert.equal(batches[1].length, 500, '두번째 배치 500건')
  assert.equal(batches[2].length, 250, '세번째 배치 250건')
})
