export const AUTH_REDIRECT_KEY = 'auth_redirect_next'

/**
 * 비로그인 상태에서 저장 클릭 시 로그인 후 돌아올 타겟 경로(/builder) 설정
 */
export function setAuthRedirectTarget(target: string) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(AUTH_REDIRECT_KEY, target)
    document.cookie = `${AUTH_REDIRECT_KEY}=${encodeURIComponent(target)}; path=/; max-age=600`
  } catch (e) {
    console.error('[setAuthRedirectTarget Error]', e)
  }
}

/**
 * 로그인 완료 후 1회성 타겟 경로 감지 및 즉시 소비(삭제)
 */
export function consumeAuthRedirectTarget(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const fromStorage = localStorage.getItem(AUTH_REDIRECT_KEY)
    let fromCookie: string | null = null
    if (typeof document !== 'undefined' && document.cookie) {
      const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_REDIRECT_KEY}=([^;]*)`))
      if (match) {
        fromCookie = decodeURIComponent(match[1])
      }
    }

    const target = fromStorage || fromCookie || null

    if (target) {
      localStorage.removeItem(AUTH_REDIRECT_KEY)
      if (typeof document !== 'undefined') {
        document.cookie = `${AUTH_REDIRECT_KEY}=; path=/; max-age=0`
      }
    }
    return target
  } catch (e) {
    console.error('[consumeAuthRedirectTarget Error]', e)
    return null
  }
}
