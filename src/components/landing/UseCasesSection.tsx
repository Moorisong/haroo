import { Heart, Users, User, Store, Calendar, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const USE_CASES = [
  {
    icon: Heart,
    title: '커플 & 웨딩 모바일 청첩장',
    badge: '데이트 & 결혼',
    desc: '첫 만남 이야기부터 갤러리, 계좌번호, 방명록까지 예쁘게 담아보세요.',
    color: 'bg-rose-50 text-rose-600 border-rose-200',
    hoverBorder: 'hover:border-rose-400',
  },
  {
    icon: Users,
    title: '동호회 & 소모임 회원 명부',
    badge: '모임 & 취미',
    desc: '모임 일정, 회비 안내, 회원 소통 공간을 5분 만에 개설하세요.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
  },
  {
    icon: User,
    title: '개인 포트폴리오 & 이력서',
    badge: '프리랜서 & 프로필',
    desc: '인스타 바이오 링크용 프로필, 작품 갤러리, 상담 폼을 한곳에 구축하세요.',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    hoverBorder: 'hover:border-indigo-400',
  },
  {
    icon: Store,
    title: '매장 홍보 & 카톡 예약',
    badge: '소상공인 & 1인 기업',
    desc: '매장 메뉴판, 오시는 길, 카카오 알림톡 자동 예약을 연결하세요.',
    color: 'bg-sky-50 text-sky-600 border-sky-200',
    hoverBorder: 'hover:border-sky-400',
  },
  {
    icon: Calendar,
    title: '가족 행사 & 칠순·돌잔치',
    badge: '가족 & 추억',
    desc: '칠순 잔치·돌잔치 모바일 초청장과 사진 앨범을 스마트폰으로 전하세요.',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    hoverBorder: 'hover:border-amber-400',
  },
]

/**
 * 일반인 타겟 다양한 사용처 안내 섹션
 */
export default function UseCasesSection() {
  return (
    <section id="usecases" className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold rounded-full mb-2.5 whitespace-nowrap">
            다양한 활용 사례
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 break-keep leading-snug">
            누구나 만드는 나만의 스마트폰 웹 & 앱
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto break-keep">
            목적에 맞는 템플릿으로 자유롭게 시작해보세요.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {USE_CASES.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`p-5 rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-md ${item.hoverBorder} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.color}`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                  <span>미리 조립해보기</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            지금 무료로 내 템플릿 조립하기
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
