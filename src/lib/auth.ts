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

  return { data, error }
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

  return null
}
