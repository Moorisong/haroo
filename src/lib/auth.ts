import { supabase } from './supabaseClient'

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
  await supabase.auth.signOut()
}

/**
 * 현재 로그인 유저 정보 조회
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || '사용자',
        avatarUrl: user.user_metadata?.avatar_url,
        provider: user.app_metadata?.provider || 'social',
      }
    }

    // 서버 세션 확인 (클라이언트 쿠키 기반 유저 확인)
    const res = await fetch('/api/drafts/list')
    if (res.ok) {
      const data = await res.json()
      if (data.userId && !data.userId.startsWith('anon_')) {
        return {
          id: data.userId,
          email: '',
          name: '사용자',
        }
      }
    }
  } catch (err) {
    // ignore
  }

  return null
}
