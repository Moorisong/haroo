import test from 'node:test'
import assert from 'node:assert'
import { z } from 'zod'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('Diet Sharing Web App Blocks Architecture Test', async (t) => {
  await t.test('should successfully construct and validate a canvas sequence with new versatile blocks', () => {
    // 1. 다이어트 서비스 캔버스 구성 시뮬레이션
    const canvasBlocks: CanvasBlock[] = [
      {
        instanceId: uuidv4(),
        blockId: 'blk_album_01',
        name: '이미지 갤러리',
        tier: 'STANDARD',
        inputConfig: {
          title: '오늘의 식단 사진',
          containerWidth: 'medium',
          paddingY: 'normal',
          backgroundColor: '#ffffff',
          textColor: '#0f172a'
        }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_dday_01',
        name: '카운트다운 타이머',
        tier: 'STARTER',
        inputConfig: {
          title: '치팅 데이까지 남은 시간',
          containerWidth: 'medium',
          paddingY: 'normal',
          backgroundColor: '#ffffff',
          textColor: '#0f172a'
        }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_progress_01',
        name: '목표 달성 진행률',
        tier: 'STANDARD',
        inputConfig: {
          title: '다이어트 2주 목표 진행률',
          containerWidth: 'medium',
          paddingY: 'normal',
          backgroundColor: '#ffffff',
          textColor: '#0f172a',
          // @ts-ignore : schema does not enforce exact keys, passing custom props for tests
          progressValue: 2,
          progressTarget: 3,
          progressLabel: '감량 (kg)',
          progressUnit: 'kg'
        }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_chart_01',
        name: '커스텀 데이터 차트',
        tier: 'PROFESSIONAL',
        inputConfig: {
          title: '공복 시간 변화 추이',
          containerWidth: 'medium',
          paddingY: 'normal',
          backgroundColor: '#ffffff',
          textColor: '#0f172a',
          // @ts-ignore
          chartType: 'bar',
          chartColor: '#0ea5e9'
        }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_feed_01',
        name: '다목적 피드/코멘트',
        tier: 'STANDARD',
        inputConfig: {
          title: '다이어트 일기 및 감량 기억',
          containerWidth: 'medium',
          paddingY: 'normal',
          backgroundColor: '#ffffff',
          textColor: '#0f172a'
        }
      }
    ]

    // 2. 인스턴스 ID 고유성 검증
    const ids = canvasBlocks.map(b => b.instanceId)
    const uniqueIds = new Set(ids)
    assert.strictEqual(uniqueIds.size, canvasBlocks.length, 'IDs should be unique')

    // 3. Zod 스키마 검증
    canvasBlocks.forEach((block) => {
      const parsedConfig = BlockInputConfigSchema.safeParse(block.inputConfig)
      if (!parsedConfig.success) {
        console.error(`Schema validation failed for block ${block.blockId}:`, parsedConfig.error)
      }
      assert.ok(parsedConfig.success, `Schema validation should succeed for ${block.blockId}`)
    })
    
    assert.strictEqual(canvasBlocks.length, 5, 'Should have exactly 5 blocks')
  })
})
