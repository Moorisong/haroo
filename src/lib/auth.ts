import { supabase } from './supabaseClient'

// 인증 유저 캐시 (5분 TTL) - 매번 Supabase 네트워크 호출 방지
let _cachedUser: { user: import('./auth').UserProfile | null; expiresAt: number } | null = null
const USER_CACHE_TTL_MS = 5 * 60 * 1000

export interface UserProfile {
  id: string
  email: string
  name: string
  avatarUrl?: string
  provider?: string
}

/**
 * 소셜 OAuth 로그인 (카카오, 구글)
 */
export async function signInWithProvider(provider: 'kakao' | 'google', redirectToParam?: string) {
  try {
    const callbackUrl = new URL(`${window.location.origin}/api/auth/callback/${provider}`)
    if (redirectToParam) {
      callbackUrl.searchParams.set('next', redirectToParam)
    }

    const options: { redirectTo: string; scopes?: string } = {
      redirectTo: callbackUrl.toString(),
    }

    if (provider === 'kakao') {
      options.scopes = 'profile_nickname profile_image'
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options,
    })

    if (error) {
      console.error('[OAuth error]', error)
      alert(`로그인 서비스 연결 실패: ${error.message}\n(.env.local 의 Supabase URL 및 API Key 설정을 확인해 주세요.)`)
    }

    return { data, error }
  } catch (err: any) {
    console.error('[OAuth Exception]', err)
    alert(`Supabase 프로젝트 서버 도메인에 연결할 수 없습니다 (NXDOMAIN).\n.env.local 파일의 NEXT_PUBLIC_SUPABASE_URL 도메인을 확인해 주세요.`)
    return { data: null, error: err }
  }
}

/**
 * 로그아웃
 */
export async function signOut() {
  clearUserCache()
  await supabase.auth.signOut()
}

/**
 * 현재 로그인 유저 정보 조회 (5분 캐시로 불필요한 네트워크 호출 방지)
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  // 캐시 유효한 경우 바로 반환
  if (_cachedUser && Date.now() < _cachedUser.expiresAt) {
    return _cachedUser.user
  }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const profile: UserProfile = {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || '사용자',
        avatarUrl: user.user_metadata?.avatar_url,
        provider: user.app_metadata?.provider || 'social',
      }
      _cachedUser = { user: profile, expiresAt: Date.now() + USER_CACHE_TTL_MS }
      return profile
    }

    // 클라이언트 세션에 없는 경우: 서버 쿠키 기반 userId만 확인 (lightweight)
    const res = await fetch('/api/auth/me', { credentials: 'include' }).catch(() => null)
    if (res?.ok) {
      const data = await res.json().catch(() => ({}))
      if (data.userId && !data.userId.startsWith('anon_')) {
        const profile: UserProfile = { id: data.userId, email: '', name: '사용자' }
        _cachedUser = { user: profile, expiresAt: Date.now() + USER_CACHE_TTL_MS }
        return profile
      }
    }
  } catch (err) {
    // ignore
  }

  _cachedUser = { user: null, expiresAt: Date.now() + 30_000 } // null도 30초 캐시
  return null
}

/**
 * 캐시 무효화 (로그아웃 시 호출)
 */
export function clearUserCache() {
  _cachedUser = null
}
