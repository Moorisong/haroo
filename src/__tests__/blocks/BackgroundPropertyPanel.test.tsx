import test from 'node:test'
import assert from 'node:assert'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import BackgroundPropertyPanel from '../../components/builder/panel/BackgroundPropertyPanel'

/**
 * 🧪 [Block Feature Testing Agent] 
 * 배경 이미지 위치 조정 UI 격리 테스트
 * - 배경 설정 패널(BackgroundPropertyPanel)에서 X/Y 좌표를 조절하는 슬라이더 UI가 렌더링되지 않음을 검증.
 * - 오직 캔버스 드래그 안내 문구만 렌더링됨을 보장.
 */
test('BackgroundPropertyPanel UI Rendering Test (State Isolation & No Mocking)', async (t) => {
  await t.test('배경 타입이 image일 때, 가로/세로 위치 조절 슬라이더(range input)가 나타나지 않아야 한다.', () => {
    const mockConfig = {
      backgroundStyle: {
        bgType: 'image' as const,
        backgroundImage: 'data:image/png;base64,...',
      }
    }
    const mockHandleChange = () => {}

    const html = renderToStaticMarkup(
      <BackgroundPropertyPanel config={mockConfig} handleChange={mockHandleChange} />
    )

    // 가짜 하드코딩 검증 금지 대원칙에 따라, 실제 HTML DOM 문자열 결과를 기반으로 검증
    assert.strictEqual(html.includes('type="range"'), true) // 투명도 슬라이더 1개는 여전히 존재해야 함
    
    // 하지만 X/Y 조절용 슬라이더나 "사진 위치" 레이블은 제거되었으므로 나타나면 안 됨
    assert.strictEqual(html.includes('사진 위치 (가로 / 세로)'), false)
    assert.strictEqual(html.includes('가로'), false)
    assert.strictEqual(html.includes('세로'), false)

    // 대신 대체 힌트 텍스트가 정상 노출되어야 함
    assert.strictEqual(html.includes('캔버스에서 배경 사진을 마우스로 직접 드래그하여 원하는 위치로 조절할 수 있습니다.'), true)
  })
})
