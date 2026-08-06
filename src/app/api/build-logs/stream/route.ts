import { NextRequest } from 'next/server'

// Vercel Serverless Function Edge Runtime (SSE 지원 목적)
export const runtime = 'edge'

const BUILD_STEPS = [
  '🚀 배포를 시작합니다...',
  '📦 [1/5] Docker 이미지 Pull 중...',
  '✅ [1/5] 이미지 Pull 완료',
  '🐳 [2/5] 컨테이너 실행 중...',
  '✅ [2/5] 컨테이너 기동 완료 (포트: 3001)',
  '🔍 [3/5] Health Check 중...',
  '✅ [3/5] HTTP 200 OK 확인',
  '🌐 [4/5] Caddy 라우팅 등록 중...',
  '✅ [4/5] 서브도메인 라우팅 완료',
  '🔒 [5/5] SSL 인증서 발급 중...',
  '✅ [5/5] Let\'s Encrypt SSL 발급 완료',
  '🎉 배포 완료!',
]

/**
 * GET /api/build-logs/stream
 * Server-Sent Events (SSE)를 이용한 실시간 배포 로그 스트리밍
 * 실제 구현: Docker / Caddy 프로비저닝 로직과 연동
 */
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()
  const customReadable = new ReadableStream({
    async start(controller) {
      for (const step of BUILD_STEPS) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ log: step })}\n\n`))
        // 로그 사이에 인위적인 딜레이 추가 (Mock)
        await new Promise((resolve) => setTimeout(resolve, 800))
      }
      controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`))
      controller.close()
    },
  })

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
