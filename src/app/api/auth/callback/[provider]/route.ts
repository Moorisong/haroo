import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(
  req: NextRequest,
  { params }: { params: { provider: string } }
) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')
  const { provider } = params

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (code && supabaseUrl && supabaseAnonKey) {
    const response = NextResponse.redirect(new URL('/dashboard', req.url))
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return response
    }
    console.error(`[OAuth Callback Error - ${provider}]`, error)
  }

  // 코드 없거나 Supabase 미설정 시에도 대시보드로 이동
  return NextResponse.redirect(new URL('/dashboard', req.url))
}
