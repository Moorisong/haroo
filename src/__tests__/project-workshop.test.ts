import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('Workshop Web App Blocks Architecture Test', async (t) => {
  await t.test('should successfully construct and validate a canvas sequence', () => {
    const canvasBlocks: CanvasBlock[] = [
      {
        instanceId: uuidv4(),
        blockId: 'blk_form_01',
        name: '상세 옵션 폼',
        tier: 'STANDARD',
        inputConfig: { title: '오더메이드 접수', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_timeline_01',
        name: '로드맵 타임라인',
        tier: 'STANDARD',
        inputConfig: { title: '작업 공정 및 배송', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_review_01',
        name: '리뷰 보드',
        tier: 'STANDARD',
        inputConfig: { title: '베스트셀러 후기', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_album_01',
        name: '갤러리 앨범',
        tier: 'STANDARD',
        inputConfig: { title: '작업물 사진', containerWidth: 'medium', paddingY: 'normal' }
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
