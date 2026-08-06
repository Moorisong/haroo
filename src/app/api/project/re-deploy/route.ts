import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json()
    
    // TODO: 기존 컨테이너 중지 -> 새 이미지 Pull -> 컨테이너 재시작 (무중단 롤링)
    console.log(`[Re-Deploy] Project ${projectId} 재배포 시작`)
    
    return NextResponse.json({ success: true, message: '재배포가 시작되었습니다.' })
  } catch (error) {
    console.error('[api/project/re-deploy]', error)
    return NextResponse.json({ error: '재배포 실패' }, { status: 500 })
  }
}
