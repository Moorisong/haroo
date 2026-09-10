import test from 'node:test'
import assert from 'node:assert/strict'
import { checkBlocksOverlap, resolveBlockCollisions, getBlockBounds } from '../lib/snapGrid.ts'
import type { CanvasBlock } from '../types/index.ts'

interface PricingPlan {
  id?: string
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  highlight?: boolean
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'STARTER',
    price: '무료',
    period: '',
    features: ['기본 블록 6종', '하루 서브도메인', '월 1,000 PV'],
    cta: '체험해보기',
    highlight: false,
  },
  {
    id: 'plan-2',
    name: 'STANDARD',
    price: '29,000원',
    period: '/ 월',
    features: ['표준 블록 12종', '카카오 알림톡 100건', '폼 데이터 수집', '갤러리 앨범'],
    cta: '지금 시작',
    highlight: true,
  },
  {
    id: 'plan-3',
    name: 'PROFESSIONAL',
    price: '59,000원',
    period: '/ 월',
    features: ['전체 블록 45종', '커스텀 도메인 연결', '전자결제 포트원', '통계 엔진'],
    cta: '프로 시작',
    highlight: false,
  },
]

test('blk_pricing_01 (가격표/플랜 카드 블록) 기본 설정 및 동적 플랜 확장 검증', () => {
  // 1. 기본 플랜이 3개 정의되어 있어야 함
  assert.equal(DEFAULT_PLANS.length, 3, '기본 요금제 플랜은 3개여야 함')
  assert.equal(DEFAULT_PLANS[0].name, 'STARTER')
  assert.equal(DEFAULT_PLANS[1].name, 'STANDARD')
  assert.equal(DEFAULT_PLANS[2].name, 'PROFESSIONAL')

  // 2. 새로운 플랜 추가 시 데이터 무결성 검증
  const nextPlans: PricingPlan[] = [
    ...DEFAULT_PLANS,
    {
      id: 'plan-custom',
      name: 'ENTERPRISE',
      price: '문의',
      period: '',
      features: ['전담 매니저 지원', 'SLA 99.9% 보장'],
      cta: '영업팀 문의',
      highlight: true,
    },
  ]
  assert.equal(nextPlans.length, 4, '플랜이 4개로 증가해야 함')
  assert.equal(nextPlans[3].name, 'ENTERPRISE')
  assert.equal(nextPlans[3].price, '문의')
  assert.equal(nextPlans[3].highlight, true)

  // 3. 플랜 삭제 동작 검증
  const filteredPlans = nextPlans.filter((_, idx) => idx !== 0)
  assert.equal(filteredPlans.length, 3)
  assert.equal(filteredPlans[0].name, 'STANDARD')

  // 4. 제목 및 텍스트 스타일 스키마 검증
  const mockConfig = {
    title: '우리 서비스 요금제',
    subtitle: '합리적인 가격으로 시작해보세요',
    titleStyle: { color: '#1e293b', fontSize: '32px' },
    subtitleStyle: { color: '#64748b' },
    plans: nextPlans,
  }
  assert.equal(mockConfig.title, '우리 서비스 요금제')
  assert.equal(mockConfig.titleStyle.color, '#1e293b')
  assert.equal(mockConfig.plans.length, 4)

  // 5. 플랜 카드 개별 버튼 액션 (화면 이동, 외부 링크, 모달 팝업 등) 스키마 검증
  const planWithAction: PricingPlan & { actionType?: string; buttonLink?: string; thankYouMessage?: string } = {
    ...nextPlans[0],
    actionType: 'NAVIGATE_PAGE',
    buttonLink: '/checkout',
  }
  assert.equal(planWithAction.actionType, 'NAVIGATE_PAGE')
  assert.equal(planWithAction.buttonLink, '/checkout')

  // 6. 요금제 플랜 대량 확장 시 타 블록(동영상 등)과의 영역 겹침 방지 및 자동 밀림 검증
  const pricingBlock: CanvasBlock = {
    instanceId: 'test-pricing-instance',
    blockId: 'blk_pricing_01',
    name: '요금제',
    tier: 'STARTER',
    inputConfig: {
      posX: 0,
      posY: 0,
      customWidthPx: 1200,
      blockHeight: 1200, // 플랜 카드 12개 추가로 높이가 1200px로 증가
    },
  }

  const videoBlock: CanvasBlock = {
    instanceId: 'test-video-instance',
    blockId: 'blk_video_01',
    name: '동영상',
    tier: 'STARTER',
    inputConfig: {
      posX: 0,
      posY: 400, // 기존 초기 높이 기준으로 배치되어 400px에 위치 (1200px 높이의 pricingBlock과 겹침 발생 상태)
      customWidthPx: 1200,
      blockHeight: 600,
    },
  }

  // 초기 겹침 상태 확인
  const isOverlappedInitially = checkBlocksOverlap(
    getBlockBounds(pricingBlock),
    getBlockBounds(videoBlock)
  )
  assert.equal(isOverlappedInitially, true, '충돌 해결 전에는 두 블록이 겹친 상태여야 함')

  // 충돌 해결(resolveBlockCollisions) 적용
  const resolved = resolveBlockCollisions([pricingBlock, videoBlock])
  const resolvedVideo = resolved.find((b) => b.instanceId === 'test-video-instance')

  assert.ok(resolvedVideo, '비디오 블록이 존재해야 함')
  assert.ok(
    (resolvedVideo.inputConfig?.posY ?? 0) >= 1200,
    `비디오 블록의 posY(${resolvedVideo.inputConfig?.posY})는 확장된 pricingBlock 높이(1200) 이상으로 밀려나야 함`
  )

  // 충돌 해결 후 겹침이 완벽히 0%로 해소되었는지 검증
  const isOverlappedAfter = checkBlocksOverlap(
    getBlockBounds(resolved[0]),
    getBlockBounds(resolved[1])
  )
  assert.equal(isOverlappedAfter, false, '충돌 해결 후에는 서로 다른 블록끼리 절대 겹치지 않아야 함')
})

