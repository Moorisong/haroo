import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용약관 — 하루(Haroo)',
  description: '하루(Haroo) 서비스 이용약관 전문입니다.',
}

const SECTIONS = [
  {
    num: '제1조',
    title: '목적',
    content: `본 약관은 하루(Haroo, 이하 "회사")가 운영하는 웹 기반 사이트 빌더 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.`,
  },
  {
    num: '제2조',
    title: '서비스 정체성 및 PWA 기술 고지',
    content: `① 본 서비스를 통해 제작되는 결과물은 Apple App Store 또는 Google Play Store에 등록되는 네이티브 앱(Native App)이 아닌, PWA(Progressive Web App) 모바일 웹앱 기술로 제작됩니다.\n② PWA란 웹 브라우저 기반으로 동작하며, 스마트폰 바탕화면에 앱 아이콘을 추가하고 푸시 알림 등 앱과 유사한 경험을 제공하는 최신 웹 기술입니다.\n③ 이용자는 서비스 신청 전 이러한 기술적 특성을 충분히 인지하고 동의한 것으로 간주합니다.`,
  },
  {
    num: '제3조',
    title: '이용 신청 및 계약 성립',
    content: `① 서비스 이용 계약은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 이용 신청을 완료한 후, 회사가 이를 승낙함으로써 성립합니다.\n② 회사는 다음 각 호에 해당하는 이용 신청에 대해 승낙을 거절하거나 취소할 수 있습니다.\n1. 타인의 명의를 도용한 경우\n2. 허위 정보를 기재한 경우\n3. 기타 회사가 정한 이용 기준에 위반되는 경우`,
  },
  {
    num: '제4조',
    title: '서비스의 제공 및 변경',
    content: `① 회사는 다음 서비스를 제공합니다.\n1. 웹 기반 블록 조립 캔버스(드래그 앤 드롭)\n2. AWS EC2 기반 사이트 자동 배포 및 호스팅\n3. PWA 모바일 웹앱 변환 제공\n4. 카카오 알림톡/LMS 연동 서비스\n5. 커스텀 도메인 및 SSL 자동 발급\n② 회사는 서비스 품질 향상을 위해 사전 고지 없이 서비스 내용을 변경할 수 있으며, 이 경우 이용자에게 불이익이 발생하는 변경 사항은 사전에 공지합니다.`,
  },
  {
    num: '제5조',
    title: '요금 및 결제',
    content: `① 서비스 이용 요금은 제작비(일시불)와 서버 구독료(월정액 또는 일시불 할인)로 구성됩니다.\n② 제작비는 선택한 티어에 따라 STARTER 99,000원, STANDARD 199,000원, PROFESSIONAL 299,000원이 부과됩니다.\n③ 구독료는 1개월 29,000원을 기준으로, 3개월(10% 할인), 6개월(20% 할인), 12개월(30% 할인) 일시불 옵션이 제공됩니다.\n④ 모든 결제는 포트원(PortOne) PG를 통해 안전하게 처리됩니다.`,
  },
  {
    num: '제6조',
    title: '환불 정책 (Math.ceil 정산 공식)',
    content: `① 이용자가 구독을 해지하는 경우, 다음 공식에 따라 환불금액이 산정됩니다.\n\n[환불 산정 공식]\nusedMonths = Math.ceil(경과일수 / 30)\nremainingMonths = 총 구독기간 - usedMonths\nbaseRefund = remainingMonths × (총결제액 / 총구독기간)\npenaltyFee = 총결제액 × 10%\nfinalRefund = Math.max(0, baseRefund - penaltyFee)\n\n② 환불은 포트원 부분 취소 API를 통해 자동으로 처리되며, 영업일 기준 3~5일 이내에 원결제 수단으로 반환됩니다.\n③ 제작비(일시불)는 사이트 배포 완료 후에는 환불이 불가합니다.\n④ 사이트 배포 전 취소의 경우 제작비 전액이 환불됩니다.`,
  },
  {
    num: '제7조',
    title: '이용자의 의무',
    content: `① 이용자는 다음 각 호의 행위를 하여서는 안 됩니다.\n1. 타인의 개인정보 무단 수집 및 이용\n2. 서비스를 통한 불법 콘텐츠 배포\n3. 회사의 사전 동의 없이 서비스를 상업적으로 재판매하는 행위\n4. 서비스의 안정적 운영을 방해하는 행위\n② 이용자는 서비스를 통해 수집한 고객 개인정보를 관련 법령에 따라 적법하게 관리할 책임이 있습니다.`,
  },
  {
    num: '제8조',
    title: '면책 조항',
    content: `① 회사는 천재지변, 불가항력 등 회사의 통제를 벗어난 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.\n② 회사는 이용자가 서비스를 통해 얻은 정보를 기반으로 한 투자 또는 사업적 결정에 대해 책임을 지지 않습니다.\n③ 회사의 고의 또는 중과실이 없는 경우, 서비스 이용과 관련하여 발생한 손해에 대한 배상 책임은 이용자가 지불한 1개월 서비스 요금을 초과하지 않습니다.\n\n부칙: 본 약관은 2024년 1월 1일부터 시행합니다.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-black">H</span>
          </div>
          <span className="text-slate-900 font-bold text-base">하루</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-8 pb-8 border-b border-slate-200">
          <div className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded mb-3">법적 고지</div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">서비스 이용약관</h1>
          <p className="text-sm text-slate-500 mt-2">시행일: 2024년 1월 1일 · 최종 수정: 2026년 8월 1일</p>
        </div>

        {/* 목차 */}
        <div className="mb-8 p-5 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="text-xs font-bold text-slate-700 mb-3">목차</div>
          <nav className="grid grid-cols-2 gap-1.5">
            {SECTIONS.map((s) => (
              <a key={s.num} href={`#${s.num}`} className="text-xs text-slate-600 hover:text-slate-900 hover:underline py-0.5">
                {s.num} {s.title}
              </a>
            ))}
          </nav>
        </div>

        {/* 본문 */}
        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.num} id={section.num} className="scroll-mt-20">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-bold text-sky-600">{section.num}</span>
                <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
              </div>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white border border-slate-100 rounded-xl p-4">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/privacy" className="text-sm text-sky-600 hover:text-sky-800 font-semibold">
            개인정보 처리방침 보기 →
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← 홈으로
          </Link>
        </div>
      </main>
    </div>
  )
}
