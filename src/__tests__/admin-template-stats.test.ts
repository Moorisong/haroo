import test, { describe } from 'node:test'
import assert from 'node:assert'
import React from 'react'

describe('어드민 인기 사이트 목적 통계 계산 검증', () => {
  test('템플릿 데이터 비율(%) 계산 및 합계가 올바르게 수행되어야 한다', () => {
    const mockData = {
      COMPANY: 50,
      EVENT: 30,
      PORTFOLIO: 10,
      COMMERCE: 10,
      BLANK: 0,
    }

    const total = Object.values(mockData).reduce((a, b) => a + b, 0)
    assert.strictEqual(total, 100)

    const companyPercentage = Math.round((mockData.COMPANY / total) * 100)
    assert.strictEqual(companyPercentage, 50)

    const eventPercentage = Math.round((mockData.EVENT / total) * 100)
    assert.strictEqual(eventPercentage, 30)
  })
})
