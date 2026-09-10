/**
 * 카카오톡 공유 썸네일 관련 상수 및 유틸리티
 */

// 고화질 공용 도메인에서 제공되는 3가지 테마별 디폴트 썸네일 카드 (안전한 HTTPS URL)
export const KAKAO_DEFAULT_THUMBNAILS = [
  {
    id: 'plan-a-modern-card',
    name: 'A안: 모던 브랜드 초대장',
    url: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&auto=format&fit=crop&q=80',
    description: '세련된 감성의 소식/초대장 카드',
  },
  {
    id: 'plan-b-talk-bubble',
    name: 'B안: 카카오톡 친화 말풍선',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: '주목도 높은 인터랙티브 그래픽 카드',
  },
  {
    id: 'plan-c-minimal-banner',
    name: 'C안: 미니멀 서비스 배너',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=80',
    description: '단정하고 모던한 그라데이션 카드',
  },
] as const

/**
 * 디폴트 썸네일 3종(A, B, C안) 중 무작위 1개 추출
 */
export function getRandomDefaultKakaoImage(): string {
  const randomIndex = Math.floor(Math.random() * KAKAO_DEFAULT_THUMBNAILS.length)
  return KAKAO_DEFAULT_THUMBNAILS[randomIndex].url
}

export const KAKAO_IMAGE_MAX_SIZE_MB = 3
export const KAKAO_IMAGE_MAX_SIZE_BYTES = KAKAO_IMAGE_MAX_SIZE_MB * 1024 * 1024
