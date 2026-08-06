import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/payments/subscribe-confirm
 * 구독 결제 확정 + EC2 자동 배포 트리거
 * 실제 구현: DB 저장 → awsProvisioner.provision() → SSE 배포 진행
 */
export async function POST(req: NextRequest) {
  try {
    const { draftId, tier, subdomain, subscriptionMonths, impUid } = await req.json()

    if (!draftId || !tier || !subdomain || !subscriptionMonths || !impUid) {
      return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 })
    }

    // TODO: 실제 구현
    // 1. DB에 UserProject 생성 (status: PENDING)
    // 2. awsProvisioner.provision(subdomain, tier) 호출
    // 3. SSE 스트림으로 배포 진행 상황 전달

    const projectId = `proj_${Date.now()}`

    return NextResponse.json({
      projectId,
      subdomain,
      deployUrl: `https://${subdomain}.haroo.site`,
      status: 'BUILDING',
    })
  } catch (error) {
    console.error('[api/payments/subscribe-confirm]', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
