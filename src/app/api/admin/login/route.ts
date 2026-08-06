import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/admin/login
 * 어드민 로그인 (비밀번호 인증)
 * 실제 구현: 환경 변수 ADMIN_PASSWORD 비교 후 JWT 또는 HttpOnly Cookie 발급
 */
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    // Mock: 비밀번호는 'haroo123!' (실제로는 process.env.ADMIN_PASSWORD)
    if (password === 'haroo123!') {
      const response = NextResponse.json({ success: true })
      // TODO: HttpOnly 쿠키 설정
      response.cookies.set('admin_token', 'mock_token', { httpOnly: true, secure: true })
      return response
    }

    return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 })
  } catch (error) {
    console.error('[api/admin/login]', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
