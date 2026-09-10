import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types/index.ts'

/**
 * 동영상 임베드 블록 (blk_video_01) 단위 테스트
 * - 제목/부제목 및 타이포그래피 스타일(titleStyle, subtitleStyle) 스키마 검증
 * - videoUrl 필드 스키마 유효성 및 빈 값 허용 검증
 * - 가로폭(containerWidth) 및 상하 여백(paddingY) 레이아웃 스키마 검증
 */
test('blk_video_01 (동영상 임베드 블록) 고도화 검증 테스트', async (t) => {
  /**
   * [시나리오 1]: 제목(title) 및 부제목(subtitle)과 타이포그래피 스타일(titleStyle, subtitleStyle) 스키마 유효성
   * - 커스텀 글자 색상, 폰트 종류, 굵기, 크기가 BlockInputConfigSchema를 통과해야 함
   */
  await t.test('1. 동영상 블록의 제목/부제목 텍스트 및 스타일(titleStyle, subtitleStyle) 스키마 유효성을 통과해야 한다.', () => {
    const config = {
      title: '새로운 영상 소개',
      subtitle: '아래 영상에서 자세한 정보를 확인하세요.',
      titleStyle: {
        color: '#0f172a',
        fontFamily: 'Pretendard, sans-serif',
        fontWeight: '900',
        fontSize: '28pt',
      },
      subtitleStyle: {
        color: '#64748b',
        fontFamily: '"Noto Sans KR", sans-serif',
        fontWeight: '400',
        fontSize: '15pt',
      },
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.title, '새로운 영상 소개')
      assert.strictEqual(parsed.data.titleStyle?.color, '#0f172a')
      assert.strictEqual(parsed.data.titleStyle?.fontWeight, '900')
      assert.strictEqual(parsed.data.subtitleStyle?.color, '#64748b')
    }
  })

  /**
   * [시나리오 2]: videoUrl 입력값 유효성 및 유튜브 링크 설정
   */
  await t.test('2. videoUrl 필드에 유튜브 URL 또는 빈 문자열이 안전하게 포함되어야 한다.', () => {
    const configs = [
      { title: '유튜브 일반 링크', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: '유튜브 단축 링크', videoUrl: 'https://youtu.be/dQw4w9WgXcQ' },
      { title: '영상 미등록 상태' },
    ]

    configs.forEach((cfg) => {
      const parsed = BlockInputConfigSchema.safeParse(cfg)
      assert.strictEqual(parsed.success, true)
      if (parsed.success && cfg.videoUrl) {
        assert.strictEqual(parsed.data.videoUrl, cfg.videoUrl)
      }
    })
  })

  /**
   * [시나리오 3]: 배경 스타일(backgroundStyle) 및 레이아웃 옵션 호환성
   */
  await t.test('3. 배경 색상/사진 및 컨테이너 폭 옵션이 유효해야 한다.', () => {
    const config = {
      title: '배경 설정된 영상 블록',
      containerWidth: 'wide' as const,
      paddingY: 'normal' as const,
      backgroundStyle: {
        bgType: 'color' as const,
        backgroundColor: '#f8fafc',
      },
    }

    const parsed = BlockInputConfigSchema.safeParse(config)
    assert.strictEqual(parsed.success, true)
    if (parsed.success) {
      assert.strictEqual(parsed.data.containerWidth, 'wide')
      assert.strictEqual(parsed.data.backgroundStyle?.backgroundColor, '#f8fafc')
    }
  })
})
