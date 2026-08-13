import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, getAuthenticatedUserId } from '@/lib/supabaseServer'

/**
 * GET /api/project/list
 * 유저의 실제 운영/배포 프로젝트 목록 조회
 */
export async function GET(req: NextRequest) {
  try {
    const res = new NextResponse()
    const userId = await getAuthenticatedUserId(req, res)
    const supabase = createSupabaseServerClient(req, res)

    let { data, error } = await supabase
      .from('UserProject')
      .select('*')
      .or(`userId.eq.${userId},user_id.eq.${userId}`)

    if (error || !data) {
      const res2 = await supabase.from('user_projects').select('*')
      data = res2.data
    }

    const projects = (data || []).map((row: Record<string, unknown>) => ({
      id: (row.id || row.project_id) as string,
      name: (row.name || row.project_name || '내 매장 웹앱') as string,
      subdomain: (row.subdomain || 'mybrand') as string,
      customDomain: (row.customDomain || row.custom_domain || null) as string | null,
      tier: (row.tier || 'STANDARD') as string,
      status: (row.status || 'RUNNING') as string,
      nextBilling: (row.nextBilling || row.next_billing_date || '2026-12-31') as string,
      subscriptionMonths: (row.subscriptionMonths || row.subscription_period_months || 12) as number,
      deployedAt: (row.deployedAt || row.created_at || new Date().toISOString()) as string,
      visits: (row.visits || 0) as number,
      inquiries: (row.inquiries || 0) as number,
    }))

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('[api/project/list] error:', error)
    return NextResponse.json({ projects: [] })
  }
}
