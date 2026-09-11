import test from 'node:test'
import assert from 'node:assert/strict'
import { BlockInputConfigSchema } from '../types'

/**
 * blk_talk_01 (다목적 안내 및 공지/프로모션 카드 블록) 단위 테스트
 * - 기본 블록 설정 스키마 무결성 검증
 * - 제목/부제목/뱃지 커스텀 스타일 지원 검증
 * - 버튼 8종 액션(`actionType`) 및 버튼 스타일(크기, 색상, 반경) 무결성 검증
 */

test('blk_talk_01 (다목적 안내 카드) 기본 설정 및 Zod 스키마 검증', () => {
  const defaultConfig = {
    title: '안내 및 주요 소식',
    subtitle: '중요 안내, 신청 연락, 주요 혜택 소식을 수신자에게 전송해 드립니다.',
    buttonText: '신청 및 설정하기',
    badgeText: '공지',
    badgeColor: '#10b981',
    badgeTextColor: '#ffffff',
    containerWidth: 'wide',
    paddingY: 'normal',
    titleStyle: {
      color: '#0f172a',
      fontWeight: '900',
      fontSize: '24pt',
    },
    subtitleStyle: {
      color: '#64748b',
      fontWeight: '400',
      fontSize: '14pt',
    },
    buttonStyle: {
      size: 'lg',
      backgroundColor: '#000000',
      textColor: '#FEE500',
      borderRadius: '0.75rem',
      fontWeight: 'bold',
    },
  }

  const result = BlockInputConfigSchema.safeParse(defaultConfig)
  assert.equal(result.success, true, 'blk_talk_01 기본 설정이 BlockInputConfigSchema에 부합해야 함')
})

test('blk_talk_01 버튼 액션 8종(알림 신청 SHOW_MODAL, URL, 페이지 이동 등) 유효성 검증', () => {
  const validActions = [
    'NAVIGATE_PAGE',
    'OPEN_URL',
    'SCROLL_TO_BLOCK',
    'CALL_PHONE',
    'COPY_TO_CLIPBOARD',
    'DOWNLOAD_FILE',
    'SHOW_MODAL',
    'SHARE_PAGE',
  ] as const

  for (const action of validActions) {
    const config = {
      actionType: action,
      buttonText: '액션 테스트',
      thankYouMessage: action === 'SHOW_MODAL' ? '[알림 신청] 사전예약 알림이 등록되었습니다.' : undefined,
      modalIcon: action === 'SHOW_MODAL' ? 'bell' : undefined,
    }

    const result = BlockInputConfigSchema.safeParse(config)
    assert.equal(result.success, true, `액션 타입 ${action}이 BlockInputConfigSchema에서 통과해야 함`)
  }
})

test('blk_talk_01 버튼 크기 매핑(sm, md, lg, xl) 및 스타일 무결성 검증', () => {
  const sizes = ['sm', 'md', 'lg', 'xl'] as const

  for (const size of sizes) {
    const config = {
      buttonText: '버튼',
      buttonStyle: {
        size,
        backgroundColor: '#2563eb',
        textColor: '#ffffff',
      },
    }

    const result = BlockInputConfigSchema.safeParse(config)
    assert.equal(result.success, true, `버튼 크기 ${size}가 스키마에서 유효해야 함`)
  }
})

test('blk_talk_01 안내 항목 리스트(noticeFeatures) 커스터마이징 검증', () => {
  const customFeatures = [
    { icon: '🚀', text: '얼리버드 사전 신청 시 특별 할인 혜택' },
    { icon: '🎁', text: '오픈 즉시 웰컴 쿠폰팩 자동 발송' },
  ]
  const config = {
    title: '새로운 런칭 안내',
    badgeText: '공지',
    noticeFeatures: customFeatures,
  }

  const result = BlockInputConfigSchema.safeParse(config)
  assert.equal(result.success, true, 'noticeFeatures가 BlockInputConfigSchema에서 통과해야 함')
})

test('blk_talk_01 APPLY_NOTIFICATION (카카오 사전예약 / 오픈 알림) 액션 유효성 검증', () => {
  const config = {
    actionType: 'APPLY_NOTIFICATION',
    buttonText: '카톡 알림 신청하기',
    title: '사전예약 신청',
    subtitle: '오픈 즉시 카카오톡으로 안내해 드립니다.',
  }

  const result = BlockInputConfigSchema.safeParse(config)
  assert.equal(result.success, true, 'APPLY_NOTIFICATION 액션이 BlockInputConfigSchema에서 정상 통과해야 함')
})

