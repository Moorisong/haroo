import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: Docker 무중단 롤링 업데이트 쉘 스크립트 실행 트리거
  return NextResponse.json({ success: true, message: '롤링 업데이트 시작' })
}
