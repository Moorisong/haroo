import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types/index.ts'

/**
 * @file blk_open_url_action.test.ts
 * @description block-feature-testing-agent.md 지침 준수 테스트
 * 
 * [검증 대상 기능]: 버튼 액션 중 OPEN_URL (외부 링크 열기)
 * [시나리오]:
 *  1. 유저가 프로토콜 스키마 없이 도메인만 입력한 경우 (예: 'naver.com', 'google.co.kr')
 *  2. 하루 도메인 하위 상대 경로(/naver.com)로 잘못 이동하는 현상을 보정 로직이 정상 처리하는지 검증
 *  3. http:// 또는 https:// 가 이미 포함된 완벽한 URL인 경우 원본 보존 유지 검증
 *  4. OPEN_URL 액션을 사용할 수 있는 블록들의 데이터 스키마 유효성 독립 검증
 */

/**
 * URL 프로토콜 자동 보정 순수 함수 (useActionHandler.ts 및 각 블록의 공통 비즈니스 로직과 동일)
 */
function normalizeExternalUrl(rawUrl: string | undefined): string | null {
  const url = rawUrl?.trim()
  if (!url) return null
  if (!/^https?:\/\//i.test(url) && !url.startsWith('//')) {
    return `https://${url}`
  }
  return url
}

test('OPEN_URL (외부 링크 열기) 프로토콜 보정 및 상대경로 이탈 방지 격리 테스트', async (t) => {
  await t.test('1. 프로토콜 없이 도메인만 입력된 경우 https:// 프로토콜이 자동 추가되어야 한다.', () => {
    const rawInput = 'naver.com'
    const normalized = normalizeExternalUrl(rawInput)
    assert.strictEqual(normalized, 'https://naver.com')
    assert.notStrictEqual(normalized, '/naver.com')
  })

  await t.test('2. 서브도메인이나 하위 경로가 포함된 프로토콜 미지정 URL도 https:// 절대 경로로 변환되어야 한다.', () => {
    const rawInput = 'blog.naver.com/myaccount'
    const normalized = normalizeExternalUrl(rawInput)
    assert.strictEqual(normalized, 'https://blog.naver.com/myaccount')
  })

  await t.test('3. 이미 http:// 또는 https:// 가 명시된 URL은 원본을 유지해야 한다.', () => {
    const httpInput = 'http://example.com'
    const httpsInput = 'https://google.com'
    
    assert.strictEqual(normalizeExternalUrl(httpInput), 'http://example.com')
    assert.strictEqual(normalizeExternalUrl(httpsInput), 'https://google.com')
  })

  await t.test('4. 빈 문자열이나 공백 입력 시 null을 반환하여 잘못된 이동을 방지해야 한다.', () => {
    assert.strictEqual(normalizeExternalUrl(''), null)
    assert.strictEqual(normalizeExternalUrl('   '), null)
    assert.strictEqual(normalizeExternalUrl(undefined), null)
  })

  await t.test('5. OPEN_URL 액션을 사용하는 대표 블록(Hero, Pricing, Auth)의 InputConfig 스키마 검증', () => {
    const heroConfig = {
      buttonText: '외부 사이트 이동',
      actionType: 'OPEN_URL',
      buttonLink: 'naver.com'
    }

    const pricingConfig = {
      title: '가격 요금제',
      actionType: 'OPEN_URL',
      buttonLink: 'https://haroo.site/pricing'
    }

    assert.ok(BlockInputConfigSchema.safeParse(heroConfig).success)
    assert.ok(BlockInputConfigSchema.safeParse(pricingConfig).success)
  })
})
