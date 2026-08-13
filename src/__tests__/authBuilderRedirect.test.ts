import {
  setAuthRedirectTarget,
  consumeAuthRedirectTarget,
  AUTH_REDIRECT_KEY,
} from '../lib/authRedirectHelper'

export function runAuthRedirectTests() {
  console.log('--- 🧪 비로그인 저장 -> 로그인 후 /builder 1회성 리다이렉트 검증 시작 ---')

  // Mock window & localStorage & document.cookie in node test env if needed
  if (typeof window === 'undefined') {
    const store: Record<string, string> = {}
    ;(global as any).window = {}
    ;(global as any).localStorage = {
      getItem: (k: string) => store[k] || null,
      setItem: (k: string, v: string) => { store[k] = v },
      removeItem: (k: string) => { delete store[k] },
    }
    ;(global as any).document = {
      cookie: '',
    }
  }

  // 1. 초기 상태: 타겟이 지정되지 않은 일반 로그인 상황 검증
  const initialTarget = consumeAuthRedirectTarget()
  if (initialTarget === null) {
    console.log('✅ [PASS] 1. 타겟 미지정 일반 로그인 시 consumeAuthRedirectTarget() === null (대시보드/메인 유지)')
  } else {
    throw new Error('❌ [FAIL] 1. 일반 로그인 리다이렉트 예외 발생')
  }

  // 2. 비로그인 상태에서 저장 클릭 시 타겟('/builder') 설정 검증
  setAuthRedirectTarget('/builder')
  const storageVal = localStorage.getItem(AUTH_REDIRECT_KEY)
  if (storageVal === '/builder') {
    console.log('✅ [PASS] 2. 비로그인 저장 클릭 시 setAuthRedirectTarget("/builder") 설정 성공')
  } else {
    throw new Error('❌ [FAIL] 2. 타겟 경로 설정 실패')
  }

  // 3. 로그인 완료 시 1회성 타겟 소비 및 리다이렉트 경로 반환 검증
  const consumedTarget = consumeAuthRedirectTarget()
  if (consumedTarget === '/builder') {
    console.log('✅ [PASS] 3. 로그인 완료 시 consumeAuthRedirectTarget() === "/builder" 정상 반환')
  } else {
    throw new Error('❌ [FAIL] 3. 타겟 경로 소비 실패')
  }

  // 4. 소비 후 즉시 제거(재방문 시 튕김 방지) 검증
  const reConsumedTarget = consumeAuthRedirectTarget()
  if (reConsumedTarget === null && localStorage.getItem(AUTH_REDIRECT_KEY) === null) {
    console.log('✅ [PASS] 4. 타겟 소비 후 자동 삭제되어 재방문 시 무한 튕김 없음 검증 성공')
  } else {
    throw new Error('❌ [FAIL] 4. 타겟 재이용 방지 검증 실패')
  }

  console.log('✨ [ALL PASS] 비로그인 저장 -> 로그인 후 /builder 1회성 리다이렉트 검증 완벽 통과!\n')
}

// 스크립트 직접 실행 시 테스트 구동
if (require.main === module) {
  runAuthRedirectTests()
}
