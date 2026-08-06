import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: 서킷 브레이커 해제 (Redis 또는 DB 플래그 업데이트)
  return NextResponse.json({ success: true, circuitBreakerActive: false })
}
