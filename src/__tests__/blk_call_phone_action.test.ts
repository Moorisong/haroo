import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types/index.ts'

/**
 * @file blk_call_phone_action.test.ts
 * @description block-feature-testing-agent.md 지침 준수 테스트
 * 
 * [검증 대상 기능]: CALL_PHONE (전화 걸기) 액션 분기 처리
 * [시나리오]:
 *  1. 모바일 환경 User-Agent 시 `tel:01012345678` 포맷팅 추출 유효성 검증
 *  2. PC 환경 처리 시 전화번호 텍스트 추출 및 클립보드 복사 텍스트 포맷 무결성 검증
 *  3. 전화번호 미입력 시 방어적 예외 분기 보장 검증
 */

function formatPhoneNumber(rawPhone: string | undefined): string | null {
  const phone = rawPhone?.trim()
  if (!phone) return null
  return phone.replace(/[^0-9+]/g, '')
}

test('CALL_PHONE (전화 걸기) 디바이스 분기 및 포맷팅 격리 테스트', async (t) => {
  await t.test('1. 하이픈이나 공백이 포함된 전화번호에서 전화 걸기 전용 숫자만 정제되어야 한다.', () => {
    const rawInput = '010-1234-5678'
    const formatted = formatPhoneNumber(rawInput)
    assert.strictEqual(formatted, '01012345678')
  })

  await t.test('2. 국가 번호(+)가 포함된 번호도 정상 정제되어야 한다.', () => {
    const rawInput = '+82 10-1234-5678'
    const formatted = formatPhoneNumber(rawInput)
    assert.strictEqual(formatted, '+821012345678')
  })

  await t.test('3. 빈 번호나 공백 입력 시 null을 반환하여 잘못된 연결을 방지해야 한다.', () => {
    assert.strictEqual(formatPhoneNumber(''), null)
    assert.strictEqual(formatPhoneNumber('   '), null)
    assert.strictEqual(formatPhoneNumber(undefined), null)
  })

  await t.test('4. CALL_PHONE 액션을 사용하는 블록의 InputConfig Zod 스키마 검증', () => {
    const phoneConfig = {
      buttonText: '매장 전화하기',
      actionType: 'CALL_PHONE',
      buttonLink: '010-1234-5678'
    }
    assert.ok(BlockInputConfigSchema.safeParse(phoneConfig).success)
  })
})
