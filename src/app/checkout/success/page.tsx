import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '결제 완료 — 하루(Haroo)',
}

const DEPLOY_STEPS = [
  { step: 1, label: 'Docker 이미지 Pull', desc: '기본 이미지 다운로드', done: true },
  { step: 2, label: 'Container 실행', desc: 'EC2 포트 할당 및 컨테이너 기동', done: true },
  { step: 3, label: 'Health Check', desc: '서비스 정상 구동 확인', done: true },
  { step: 4, label: 'Caddy 라우팅 등록', desc: '서브도메인 → 컨테이너 라우팅 설정', done: true },
  { step: 5, label: 'SSL 인증서 발급', desc: 'Let\'s Encrypt 자동 발급 완료', done: true },
]

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 성공 아이콘 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">결제 완료!</h1>
          <p className="text-sm text-slate-500">5단계 무인 배포가 완료되었습니다.</p>
        </div>

        {/* 배포 단계 */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 mb-6">
          <h2 className="text-xs font-bold text-slate-700 mb-4 uppercase tracking-wider">배포 진행 내역</h2>
          <div className="space-y-3">
            {DEPLOY_STEPS.map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">{s.step}. {s.label}</div>
                  <div className="text-xs text-slate-500">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 사이트 URL */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6">
          <div className="text-xs font-bold text-emerald-700 mb-2">내 사이트 주소</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-sm text-emerald-800 font-semibold">mybrand.haroo.site</div>
            <Link
              href="https://mybrand.haroo.site"
              target="_blank"
              className="text-xs px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              열기
            </Link>
          </div>
        </div>

        {/* 이동 버튼 */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            마이페이지 이동
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/builder"
            className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            사이트 계속 수정하기
          </Link>
        </div>
      </div>
    </div>
  )
}
