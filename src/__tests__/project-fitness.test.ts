import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('Fitness Web App Blocks Architecture Test', async (t) => {
  await t.test('should successfully construct and validate a canvas sequence', () => {
    const canvasBlocks: CanvasBlock[] = [
      {
        instanceId: uuidv4(),
        blockId: 'blk_stamp_card_01',
        name: '적립 카드',
        tier: 'STANDARD',
        inputConfig: { title: '출석 현황', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_calendar_01',
        name: '캘린더 폼',
        tier: 'STANDARD',
        inputConfig: { title: '예약', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_faq_01',
        name: '아코디언 FAQ',
        tier: 'STARTER',
        inputConfig: { title: '공지사항 및 팁', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_floating_button_01',
        name: '플로팅 버튼',
        tier: 'STARTER',
        inputConfig: { title: '상담', containerWidth: 'medium', paddingY: 'normal' }
      }
    ]

    const ids = canvasBlocks.map(b => b.instanceId)
    assert.strictEqual(new Set(ids).size, canvasBlocks.length, 'IDs should be unique')

    canvasBlocks.forEach((block) => {
      const parsedConfig = BlockInputConfigSchema.safeParse(block.inputConfig)
      assert.ok(parsedConfig.success, `Schema validation should succeed for ${block.blockId}`)
    })
    
    assert.strictEqual(canvasBlocks.length, 4, 'Should have exactly 4 blocks')
  })
})
