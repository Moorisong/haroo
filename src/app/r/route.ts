import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const to = searchParams.get('to')

  if (!to) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const decodedUrl = decodeURIComponent(to)
    
    // 단순 보안 검사: http/https 로 시작하는지
    if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 대상 URL로 302 리다이렉트 (임시 이동)
    return NextResponse.redirect(decodedUrl, 302)
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
