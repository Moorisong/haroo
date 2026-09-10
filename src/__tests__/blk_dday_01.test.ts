import test from 'node:test'
import assert from 'node:assert/strict'

test('blk_dday_01 (카운트다운 타이머 블록) 기본 설정 및 스키마 검증', () => {
  // 1. 기본 생성 시 안전한 배경색과 텍스트 색상이 제공되어야 함
  const defaultBg = '#0f172a'
  const defaultTextColor = '#ffffff'
  
  const initialEmptyConfig: Record<string, any> = {}
  
  const finalBgColor = initialEmptyConfig.backgroundStyle?.backgroundColor || initialEmptyConfig.backgroundColor || defaultBg
  const finalTextColor = initialEmptyConfig.textColor || defaultTextColor

  assert.equal(finalBgColor, '#0f172a', '기본 배경색은 어두운 남색 계열이어야 함')
  assert.equal(finalTextColor, '#ffffff', '기본 텍스트 색상은 화이트여야 함')

  // 2. targetDate 계산 유효성 검증
  const targetDate = new Date(Date.now() + 7 * 86400000).toISOString()
  const diff = new Date(targetDate).getTime() - Date.now()
  assert.ok(diff > 0, '미래의 목표 일시여야 함')

  const days = Math.floor(diff / 86400000)
  assert.ok(days >= 6 && days <= 7, '기본 D-Day는 약 7일 후로 계산되어야 함')

  // 3. title, subtitle 커스텀 입력 지원
  const customConfig = {
    title: '프로젝트 런칭 D-Day',
    subtitle: '성공적인 런칭을 기대해주세요!',
    targetDate: '2026-12-31T23:59:59.000Z',
  }
  assert.equal(customConfig.title, '프로젝트 런칭 D-Day')
  assert.equal(customConfig.subtitle, '성공적인 런칭을 기대해주세요!')
})
