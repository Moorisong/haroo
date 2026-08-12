import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('Bookclub Web App Blocks Architecture Test', async (t) => {
  await t.test('should successfully construct and validate a canvas sequence', () => {
    const canvasBlocks: CanvasBlock[] = [
      {
        instanceId: uuidv4(),
        blockId: 'blk_hero_01',
        name: '히어로 배너',
        tier: 'STARTER',
        inputConfig: { title: '이번 달 선정 도서', containerWidth: 'wide', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_dday_01',
        name: '디데이 카운터',
        tier: 'STARTER',
        inputConfig: { title: '모임까지 남은 시간', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_talk_01',
        name: '방명록',
        tier: 'STANDARD',
        inputConfig: { title: '인사이트 공유', containerWidth: 'medium', paddingY: 'normal' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_table_01',
        name: '데이터 테이블',
        tier: 'PROFESSIONAL',
        inputConfig: { title: '지난달 대화 및 추천 도서', containerWidth: 'medium', paddingY: 'normal' }
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
