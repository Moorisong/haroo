import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types/index.ts'

/**
 * 링크/소셜 공유 블록 (blk_share_01) 단위 테스트
 * - 상단 공유하기 푸른 뱃지 제거 및 텍스트 스타일 편집(titleStyle, subtitleStyle) 유효성 검증
 * - 제목/부제목 및 색상/크기/두께/폰트 스키마 검증
 * - 기본값 fallback 및 채널 액션 타입 스키마 무결성 검증
 */
test('blk_share_01 (링크/소셜 공유 블록) 고도화 검증 테스트', async (t) => {
  /**
   * [시나리오 1]: 제목(title) 및 부제목(subtitle)과 타이포그래피 스타일(titleStyle, subtitleStyle) 스키마 유효성
   * - 커스텀 글자 색상, 폰트 종류, 굵기, 크기가 BlockInputConfigSchema를 통과해야 함
   */
  await t.test('1. 제목 및 부제목 텍스트 스타일(글자색, 폰트, 두께, 크기) 설정 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '새로운 공유 타이틀',
      subtitle: '새로운 서브타이틀 내용입니다.',
      titleStyle: {
        color: '#1e293b',
        fontFamily: 'Pretendard, sans-serif',
        fontWeight: '900',
        fontSize: '24pt',
      },
      subtitleStyle: {
        color: '#64748b',
        fontFamily: '"Noto Sans KR", sans-serif',
        fontWeight: '400',
        fontSize: '14pt',
      },
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.title, '새로운 공유 타이틀')
      assert.strictEqual(parsed.data.titleStyle?.color, '#1e293b')
      assert.strictEqual(parsed.data.titleStyle?.fontWeight, '900')
      assert.strictEqual(parsed.data.subtitleStyle?.color, '#64748b')
    }
  })

  /**
   * [시나리오 2]: 상단 푸른 뱃지 제거 확인 및 기본값 안전성
   * - badgeText가 없거나 전달되지 않아도 기본 공유 블록 설정이 유효하게 파싱되어야 함
   */
  await t.test('2. 뱃지 없이 기본 제목/부제목만 포함된 설정도 안전하게 통과해야 한다.', () => {
    const config = {
      title: '이 페이지를 공유해 보세요',
      subtitle: '친구에게 소식을 알려보세요!',
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.title, '이 페이지를 공유해 보세요')
    }
  })

  /**
   * [시나리오 3]: 공유 액션 폴백 타입(COPY_TO_CLIPBOARD, OPEN_KAKAO, OPEN_URL) 호환성
   * - 소셜 공유 블록에 전달 가능한 actionType 스키마 호환성 검증
   */
  await t.test('3. 소셜 공유 액션 타입이 설정되어도 스키마 유효성을 통과해야 한다.', () => {
    const configs = [
      { title: '공유 1', actionType: 'COPY_TO_CLIPBOARD' as const },
      { title: '공유 2', actionType: 'SHARE_PAGE' as const },
      { title: '공유 3', actionType: 'OPEN_URL' as const },
    ]
    configs.forEach((cfg) => {
      const parsed = BlockInputConfigSchema.safeParse(cfg)
      assert.strictEqual(parsed.success, true)
    })
  })

  /**
   * [시나리오 4]: 배경 사진 모드 및 이미지 위치(imagePosition X/Y) 스키마 유효성
   * - 링크/소셜 공유 블록 등 일반 블록에서도 배경 사진 모드와 X, Y 좌표가 정확하게 반영되는지 검증
   */
  await t.test('4. 배경 사진 모드 및 이미지 위치(imagePosition x, y %) 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '배경 사진 공유 블록',
      backgroundStyle: {
        bgType: 'image' as const,
        backgroundImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df',
        opacity: 0.9,
        imagePosition: {
          x: 30,
          y: 70,
        },
      },
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.backgroundStyle?.bgType, 'image')
      assert.strictEqual(parsed.data.backgroundStyle?.imagePosition?.x, 30)
      assert.strictEqual(parsed.data.backgroundStyle?.imagePosition?.y, 70)
    }
  })

  /**
   * [시나리오 5]: 카카오톡 공유 커스텀 썸네일(kakaoImageUrl) 및 문구 스키마 유효성
   * - kakaoImageUrl, kakaoShareTitle, kakaoShareDescription이 BlockInputConfigSchema를 통과해야 함
   */
  await t.test('5. 카카오톡 공유 커스텀 썸네일 이미지(kakaoImageUrl) 및 공유 문구 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '공유 블록 메인 타이틀',
      kakaoImageUrl: 'https://images.unsplash.com/photo-custom-image',
      kakaoShareTitle: '카톡 피드 전용 제목',
      kakaoShareDescription: '카톡 피드 전용 상세 설명글입니다.',
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual((parsed.data as any).kakaoImageUrl, 'https://images.unsplash.com/photo-custom-image')
      assert.strictEqual((parsed.data as any).kakaoShareTitle, '카톡 피드 전용 제목')
      assert.strictEqual((parsed.data as any).kakaoShareDescription, '카톡 피드 전용 상세 설명글입니다.')
    }
  })
})

