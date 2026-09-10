import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema, type CanvasBlock } from '../types/index.ts'
import { checkBlocksOverlap, resolveBlockCollisions, getBlockBounds } from '../lib/snapGrid.ts'

/**
 * 히어로 마스터 블록 (blk_hero_01) 고도화 단위 테스트
 * - 배경 유형 (단색 색상 vs 배경 사진) 데이터 스키마 유효성
 * - 이미지 위치(x, y) 좌표 갱신 유효성
 * - 옵션 fallback 파싱 검증
 */
test('blk_hero_01 (히어로 섹션) 고도화 검증 테스트', async (t) => {
  await t.test('1. 배경 단색 색상 모드 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '테스트 히어로 타이틀',
      subtitle: '테스트 서브타이틀',
      backgroundStyle: {
        bgType: 'color' as const,
        backgroundColor: '#1e293b',
      },
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.backgroundStyle?.bgType, 'color')
      assert.strictEqual(parsed.data.backgroundStyle?.backgroundColor, '#1e293b')
    }
  })

  await t.test('2. 배경 사진 모드 및 이미지 위치(x, y %) 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '이미지 배경 히어로',
      backgroundStyle: {
        bgType: 'image' as const,
        backgroundImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df',
        opacity: 0.8,
        imagePosition: {
          x: 75,
          y: 30,
        },
      },
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.backgroundStyle?.bgType, 'image')
      assert.strictEqual(parsed.data.backgroundStyle?.imagePosition?.x, 75)
      assert.strictEqual(parsed.data.backgroundStyle?.imagePosition?.y, 30)
    }
  })

  await t.test('3. 배경 설정이 없을 때 기본값이 안전하게 보장되어야 한다.', () => {
    const config = {
      title: '기본 히어로',
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
  })

  await t.test('4. 버튼 크기(sm/md/lg/xl) 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '버튼 크기 테스트 히어로',
      buttonStyle: {
        size: 'xl' as const,
        backgroundColor: '#0284c7',
      },
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.buttonStyle?.size, 'xl')
    }
  })

  await t.test('5. 상단 알약 뱃지 5종(none/NEW/HOT/BEST/EVENT) 및 커스텀 색상 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '뱃지 테스트 히어로',
      badgeText: 'HOT',
      badgeColor: '#ef4444',
      badgeTextColor: '#ffffff',
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.badgeText, 'HOT')
      assert.strictEqual(parsed.data.badgeColor, '#ef4444')
      assert.strictEqual(parsed.data.badgeTextColor, '#ffffff')
    }
  })

  /**
   * [시나리오 6]: 히어로 섹션과 하단 블록 간 영역 겹침 방지 및 밀림 처리 검증
   */
  await t.test('6. 히어로 블록과 하단 블록이 겹치지 않고 온전히 배치되어야 한다.', () => {
    const heroBlock: CanvasBlock = {
      instanceId: 'hero-1',
      blockId: 'blk_hero_01',
      name: '히어로',
      tier: 'STARTER',
      inputConfig: { posX: 0, posY: 0, customWidthPx: 1200, blockHeight: 650 },
    }

    const nextBlock: CanvasBlock = {
      instanceId: 'next-1',
      blockId: 'blk_pricing_01',
      name: '요금제',
      tier: 'STARTER',
      inputConfig: { posX: 0, posY: 400, customWidthPx: 1200, blockHeight: 500 }, // 겹침 발생 위치
    }

    // 겹침 여부 확인
    assert.strictEqual(
      checkBlocksOverlap(getBlockBounds(heroBlock), getBlockBounds(nextBlock)),
      true,
      '충돌 해결 전에는 두 블록이 겹쳐 있어야 함'
    )

    // 충돌 해결 후 검증
    const resolved = resolveBlockCollisions([heroBlock, nextBlock])
    const resolvedNext = resolved.find((b) => b.instanceId === 'next-1')

    assert.ok(resolvedNext)
    assert.ok(
      (resolvedNext.inputConfig?.posY ?? 0) >= 650,
      '하단 블록의 posY는 상단 히어로 블록의 높이(650) 이상으로 밀려나야 함'
    )
    assert.strictEqual(
      checkBlocksOverlap(getBlockBounds(resolved[0]), getBlockBounds(resolved[1])),
      false,
      '해결 후에는 두 블록이 절대 겹치지 않아야 함'
    )
  })
})

