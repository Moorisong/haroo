import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // TODO: 정원제 모드 토글 (DB 플래그 업데이트)
  const { active } = await req.json()
  return NextResponse.json({ success: true, waitlistModeActive: active })
}
