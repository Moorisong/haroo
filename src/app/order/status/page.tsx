'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PackageSearch, ArrowRight, Home } from 'lucide-react'

function OrderStatusContent() {
  const searchParams = useSearchParams()
  const impUid = searchParams.get('imp_uid')
  const status = searchParams.get('status')
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <PackageSearch size={32} className="text-slate-600" />
        </div>
        
        <h1 className="text-2xl font-black text-slate-900 mb-2">결제 상태 확인</h1>
        <p className="text-sm text-slate-500 mb-6">
          {status === 'success' ? '결제가 성공적으로 처리되었습니다.' : '결제 내역을 확인 중입니다.'}
        </p>
        
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left mb-8">
          <div className="text-xs text-slate-500 mb-1">결제 고유 번호</div>
          <div className="font-mono text-sm text-slate-900 font-bold">{impUid || '없음'}</div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            대시보드로 이동
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Home size={15} />
            홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><PackageSearch size={32} className="text-slate-400 animate-pulse" /></div>}>
      <OrderStatusContent />
    </Suspense>
  )
}
