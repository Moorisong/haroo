'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCurrentUser, type UserProfile } from '@/lib/auth'
import AdminAuthModal from '@/components/admin/AdminAuthModal'

const LEGAL_INFO = [
  { label: '상호명', value: '하루(Haroo)' },
  { label: '대표자', value: '홍길동' },
  { label: '사업자등록번호', value: '000-00-00000' },
  { label: '통신판매업신고', value: '제 2024-서울-00000호' },
  { label: '주소', value: '서울특별시 강남구 테헤란로 00길 00, 0층' },
  { label: '고객센터', value: 'support@haroo.site' },
]

const SERVICE_LINKS = [
  { label: '이용 방법', href: '#guide' },
  { label: '서비스 특징', href: '#why' },
  { label: '활용 사례', href: '#usecases' },
  { label: '가격 안내', href: '#pricing' },
]

const LEGAL_LINKS = [
  { label: '이용약관', href: '/terms' },
  { label: '개인정보 처리방침', href: '/privacy' },
]

/**
 * 법적 푸터 - PG 심사 통과를 위한 필수 사업자 정보 표시
 * 하단 [Admin] 클릭 시 어드민 인증 모달 연동
 */
export default function CompanyLegalFooter() {
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    getCurrentUser().then((u) => setUser(u))
  }, [])

  return (
    <>
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* 상단 */}
          <div className="flex flex-col sm:flex-row justify-between gap-8 pb-8 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-black">H</span>
                </div>
                <span className="text-slate-900 font-bold text-lg">하루</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                커플 추억·모임 초대장부터 매장 홍보까지, 필요한 블록만 톡톡 조립해서 5분 만에 우리만의 스마트폰 웹 & 앱을 완성해보세요.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">서비스</div>
                <div className="space-y-2">
                  {SERVICE_LINKS.map((link) => (
                    <a key={link.href} href={link.href} className="block text-sm text-slate-500 hover:text-slate-900 transition-colors">
                      {link.label}
                    </a>
                  ))}
                  <Link href={user ? '/dashboard' : '/login?next=/dashboard'} className="block text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    내 저장소
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">법적 고지</div>
                <div className="space-y-2">
                  {LEGAL_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-slate-500 hover:text-slate-900 transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 사업자 정보 */}
          <div className="py-6 border-b border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-500">
              {LEGAL_INFO.map((info) => (
                <span key={info.label}>
                  <strong className="text-slate-600">{info.label}</strong> : {info.value}
                </span>
              ))}
            </div>
          </div>

          {/* 하단 카피라이트 */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} 하루(Haroo). All rights reserved.
            </p>
            <button
              onClick={() => setAdminModalOpen(true)}
              className="text-xs text-slate-300 hover:text-slate-500 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      <AdminAuthModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </>
  )
}
