import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/domains/check?subdomain=mycafe
 * 서브도메인 중복 가입 체크
 * 실제 구현: Supabase UserProject select count
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const subdomain = searchParams.get('subdomain')

  if (!subdomain) {
    return NextResponse.json({ error: 'subdomain 파라미터 필요' }, { status: 400 })
  }

  // TODO: 실제 DB 확인
  // const { data } = await supabase.from('UserProject').select('id').eq('subdomain', subdomain).single()
  // if (data) return NextResponse.json({ available: false })

  // Mock
  const isAvailable = subdomain !== 'haroo' && subdomain !== 'admin'

  return NextResponse.json({ available: isAvailable })
}
