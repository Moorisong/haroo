import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('Party Web App Blocks Architecture Test', async (t) => {
  await t.test('should successfully construct and validate a canvas sequence', () => {
    const canvasBlocks: CanvasBlock[] = [
      {
        instanceId: uuidv4(),
        blockId: 'blk_hero_01',
        name: '히어로 배너',
        tier: 'STARTER',
        inputConfig: { title: '파티 컨셉 및 드레스 코드', containerWidth: 'wide', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_map_01',
        name: '지도 위젯',
        tier: 'STARTER',
        inputConfig: { title: '장소 및 주차 안내', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_form_01',
        name: '수집 폼',
        tier: 'STANDARD',
        inputConfig: { title: '참석 및 알러지 조사', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_feed_01',
        name: '축하 피드',
        tier: 'STANDARD',
        inputConfig: { title: '축하 메시지', containerWidth: 'medium', paddingY: 'normal' }
      }
    ]

    const ids = canvasBlocks.map(b => b.instanceId)
    assert.strictEqual(new Set(ids).size, canvasBlocks.length, 'IDs should be unique')

    canvasBlocks.forEach((block) => {
      const parsedConfig = BlockInputConfigSchema.safeParse(block.inputConfig)
      assert.ok(parsedConfig.success, `Schema validation should succeed for ${block.blockId}`)
    })
  })
})
