import { supabase, isSupabaseConfigured } from './supabaseClient'

export interface UserProfile {
  id: string
  email: string
  name: string
  avatarUrl?: string
  provider?: string
}

const DEMO_USER_KEY = 'haroo_demo_user'

/**
 * 소셜 OAuth 로그인 (카카오, 구글)
 */
export async function signInWithProvider(provider: 'kakao' | 'google') {
  if (!isSupabaseConfigured) {
    // Supabase 설정 전 데모 로그인 처리
    const demoUser: UserProfile = {
      id: `demo_${Date.now()}`,
      email: `user_${provider}@haroo.site`,
      name: `${provider === 'kakao' ? '카카오' : '구글'} 연동 사용자`,
      provider,
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser))
    }
    return { data: { user: demoUser }, error: null, isDemo: true }
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback/${provider}`,
    },
  })

  return { data, error, isDemo: false }
}

/**
 * 이메일/비밀번호 회원가입
 */
export async function signUpWithEmail(email: string, pass: string, name?: string) {
  if (!isSupabaseConfigured) {
    const demoUser: UserProfile = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      provider: 'email',
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser))
    }
    return { data: { user: demoUser }, error: null, isDemo: true }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      data: { name: name || email.split('@')[0] },
    },
  })

  return { data, error, isDemo: false }
}

/**
 * 이메일/비밀번호 로그인
 */
export async function signInWithEmail(email: string, pass: string) {
  if (!isSupabaseConfigured) {
    const demoUser: UserProfile = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      provider: 'email',
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser))
    }
    return { data: { user: demoUser }, error: null, isDemo: true }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  })

  return { data, error, isDemo: false }
}

/**
 * 데모 계정 즉시 로그인 (테스트용)
 */
export function signInAsDemoUser(email = 'test@haroo.site', name = '테스트 사용자') {
  const demoUser: UserProfile = {
    id: 'demo_user_1001',
    email,
    name,
    provider: 'demo',
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser))
  }
  return demoUser
}

/**
 * 로그아웃
 */
export async function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DEMO_USER_KEY)
  }
  if (isSupabaseConfigured) {
    await supabase.auth.signOut()
  }
}

/**
 * 현재 로그인 유저 정보 조회
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  if (typeof window !== 'undefined') {
    const demoStr = localStorage.getItem(DEMO_USER_KEY)
    if (demoStr) {
      try {
        return JSON.parse(demoStr) as UserProfile
      } catch {
        localStorage.removeItem(DEMO_USER_KEY)
      }
    }
  }

  if (isSupabaseConfigured) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || user.email?.split('@')[0] || '사용자',
        avatarUrl: user.user_metadata?.avatar_url,
        provider: user.app_metadata?.provider || 'email',
      }
    }
  }

  return null
}
