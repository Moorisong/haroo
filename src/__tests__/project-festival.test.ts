import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('Festival Web App Blocks Architecture Test', async (t) => {
  await t.test('should successfully construct and validate a canvas sequence', () => {
    const canvasBlocks: CanvasBlock[] = [
      {
        instanceId: uuidv4(),
        blockId: 'blk_content_card_grid_01',
        name: '카탈로그',
        tier: 'STANDARD',
        inputConfig: { title: '주점 메뉴판', containerWidth: 'wide', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_feed_01',
        name: '칭찬 피드',
        tier: 'STANDARD',
        inputConfig: { title: '방명록 및 칭찬', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_form_01',
        name: '간편 폼',
        tier: 'STANDARD',
        inputConfig: { title: '지원서', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_map_01',
        name: '지도 위젯',
        tier: 'STARTER',
        inputConfig: { title: '찾아오는 길', containerWidth: 'medium', paddingY: 'normal' }
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
