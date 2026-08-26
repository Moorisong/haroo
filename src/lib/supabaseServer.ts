import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Next.js API Routes 및 Server Side에서 사용할 Supabase Server Client 생성 함수
 */
export function createSupabaseServerClient(req: NextRequest, res?: NextResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll()
      },
      setAll(cookiesToSet) {
        if (res) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        }
      },
    },
  })
}

/**
 * 현재 세션의 인증 유저 ID를 추출하는 헬퍼 함수
 * 세션이 없을 경우 쿠키 기반 anonymous_user_id 획득/생성
 */
export async function getAuthenticatedUserId(req: NextRequest, res?: NextResponse): Promise<string> {
  const supabase = createSupabaseServerClient(req, res)
  try {
    // Supabase 접속 타임아웃 1.5초 설정 (네트워크 미연동 또는 DNS 실패 시 65초 대기 방지)
    const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
      setTimeout(() => resolve({ data: { user: null } }), 1500)
    )
    const authPromise = supabase.auth.getUser()
    const { data: { user } } = await Promise.race([authPromise, timeoutPromise])

    if (user?.id) {
      return user.id
    }
  } catch (err) {
    // Auth getUser 실패시 익명 사용자 처리
  }

  let anonId = req.cookies.get('anonymous_user_id')?.value
  if (!anonId) {
    anonId = `anon_user_default`
    if (res) {
      res.cookies.set('anonymous_user_id', anonId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1년
        httpOnly: false,
        sameSite: 'lax',
      })
    }
  }
  return anonId
}

/**
 * res 객체에 설정된 모든 쿠키를 targetResponse로 전동 복사하는 헬퍼
 */
export function copyCookies(fromRes: NextResponse, toRes: NextResponse) {
  fromRes.cookies.getAll().forEach((c) => {
    toRes.cookies.set(c.name, c.value, c)
  })
  return toRes
}
