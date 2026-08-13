import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('인터랙티브 3종 신규 블록 (룰렛, 스크래치, 포춘쿠키) 단독 & 조립 테스트', async (t) => {
  await t.test('1. blk_roulette_01 Zod 밸리데이션 & 캔버스 조립 검증', () => {
    const rouletteBlock: CanvasBlock = {
      instanceId: uuidv4(),
      blockId: 'blk_roulette_01',
      name: '인터랙티브 룰렛',
      tier: 'STANDARD',
      inputConfig: {
        title: '오늘의 점심 룰렛',
        subtitle: '돌려서 메뉴 정하기',
        buttonText: '돌리기 Start!',
        winnerMessageTemplate: '오늘의 당첨은 바로 {winner}!',
        rouletteItems: ['짜장면', '짬뽕', '탕수육', '볶음밥']
      }
    }

    assert.ok(BlockInputConfigSchema.safeParse(rouletteBlock.inputConfig).success)
    assert.strictEqual(rouletteBlock.blockId, 'blk_roulette_01')
  })

  await t.test('2. blk_scratch_01 Zod 밸리데이션 & 캔버스 조립 검증', () => {
    const scratchBlock: CanvasBlock = {
      instanceId: uuidv4(),
      blockId: 'blk_scratch_01',
      name: '스크래치 복권',
      tier: 'STANDARD',
      inputConfig: {
        title: '행운의 복권 긁기',
        subtitle: '문질러서 당첨 쿠폰을 확인하세요',
        hiddenContent: '🎁 50% 할인 쿠폰 코드: SAVE50',
        scratchColor: '#C0C0C0',
        completionThreshold: 50
      }
    }

    assert.ok(BlockInputConfigSchema.safeParse(scratchBlock.inputConfig).success)
    assert.strictEqual(scratchBlock.blockId, 'blk_scratch_01')
  })

  await t.test('3. blk_fortune_01 Zod 밸리데이션 & 캔버스 조립 검증', () => {
    const fortuneBlock: CanvasBlock = {
      instanceId: uuidv4(),
      blockId: 'blk_fortune_01',
      name: '오늘의 운세 포춘쿠키',
      tier: 'STANDARD',
      inputConfig: {
        cardTitle: '매일매일 포춘쿠키',
        subtitle: '버튼을 눌러 오늘의 행운을 확인하세요',
        buttonText: '행운 뽑기 🥠',
        fortunePool: [
          '🥠 오늘은 최고의 하루가 될 것입니다!',
          '✨ 생각하지 못한 기쁜 소식이 찾아옵니다.'
        ]
      }
    }

    assert.ok(BlockInputConfigSchema.safeParse(fortuneBlock.inputConfig).success)
    assert.strictEqual(fortuneBlock.blockId, 'blk_fortune_01')
  })

  await t.test('4. 신규 3종 인터랙티브 블록 + 기존 대표 블록 캔버스 연속 조립 테스트', () => {
    const canvasBlocks: CanvasBlock[] = [
      {
        instanceId: uuidv4(),
        blockId: 'blk_hero_01',
        name: '히어로 배너',
        tier: 'STARTER',
        inputConfig: { title: '이벤트 메인' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_roulette_01',
        name: '룰렛 블록',
        tier: 'STANDARD',
        inputConfig: { title: '룰렛 이벤트' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_scratch_01',
        name: '스크래치 블록',
        tier: 'STANDARD',
        inputConfig: { title: '스크래치 쿠폰' }
      },
      {
        instanceId: uuidv4(),
        blockId: 'blk_fortune_01',
        name: '포춘쿠키 블록',
        tier: 'STANDARD',
        inputConfig: { cardTitle: '오늘의 운세' }
      }
    ]

    assert.strictEqual(canvasBlocks.length, 4)
    canvasBlocks.forEach(block => {
      assert.ok(BlockInputConfigSchema.safeParse(block.inputConfig).success)
    })
  })
})
