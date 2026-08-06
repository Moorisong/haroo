import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보 처리방침 — 하루(Haroo)',
  description: '하루(Haroo) 개인정보 처리방침 전문입니다.',
}

const SECTIONS = [
  {
    num: '제1조',
    title: '수집하는 개인정보 항목 및 수집 방법',
    content: `① 회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.\n\n[필수 수집 항목]\n- 소셜 로그인(카카오/구글): 이메일 주소, 프로필 이름, 소셜 고유 식별자(UUID)\n- 결제 시: 결제 수단 정보(포트원 PG에서 직접 처리, 회사에 저장 안 됨)\n- 서비스 이용 중: 매장명, 연락처, 서브도메인, 블록 설정 JSON\n\n[선택 수집 항목]\n- 카카오 알림톡 수신 시: 수신자 휴대전화 번호\n- 커스텀 도메인 연결 시: 도메인 주소\n\n② 개인정보는 소셜 로그인 및 서비스 이용 과정에서 이용자의 동의 하에 자동으로 수집됩니다.`,
  },
  {
    num: '제2조',
    title: '개인정보의 수집 및 이용 목적',
    content: `회사는 수집한 개인정보를 다음 목적을 위해 활용합니다.\n\n① 서비스 제공 및 계약 이행: 사이트 빌더 서비스 제공, AWS EC2 배포 및 호스팅, 커스텀 도메인 SSL 발급\n② 결제 및 환불 처리: 포트원 PG 연동 결제, Math.ceil 정산 기반 자동 환불\n③ 고객 지원: 서비스 오류 처리, 공지사항 전달\n④ 서비스 개선: 방문자 통계, 인기 블록 분석 (비식별화 처리 후 활용)`,
  },
  {
    num: '제3조',
    title: '개인정보의 보유 및 이용 기간 (90일 TTL 자동 파기)',
    content: `① 회사는 이용자가 서비스를 이용하는 동안 개인정보를 보유합니다.\n\n② 서비스 해지 또는 회원 탈퇴 시 즉시 파기하되, 다음 항목은 별도 보관합니다.\n- 결제/환불 내역: 전자상거래법에 따라 5년 보존\n- 서비스 이용 기록, 접속 로그: 통신비밀보호법에 따라 3개월 보존\n\n③ 결제 전 무료 조립 단계의 임시 저장 데이터(UserProjectDraft)는 마지막 수정일로부터 90일 경과 시 AWS S3 Lifecycle 정책 및 DB TTL에 의해 자동 파기됩니다.\n\n④ 탈퇴 유저의 통계 로그는 비식별화(이름·이메일 NULL 처리) 후 통계 목적으로만 보존됩니다.`,
  },
  {
    num: '제4조',
    title: '개인정보의 제3자 위탁 수칙',
    content: `회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁합니다.\n\n| 수탁업체 | 위탁 업무 | 보유 기간 |\n|---|---|---|\n| Amazon Web Services(AWS) | EC2 서버 호스팅, S3 이미지 저장 | 서비스 이용 기간 |\n| PortOne(포트원) | PG 결제 처리 | 결제 완료 시 즉시 파기 |\n| Kakao | 카카오 알림톡/소셜 로그인 | 발송 완료 시 즉시 파기 |\n| Google | Google 소셜 로그인 | 인증 완료 시 즉시 파기 |\n| Supabase | 사용자 인증 및 DB 관리 | 서비스 이용 기간 |\n\n위탁 업체는 위탁 업무 수행 목적 외 개인정보를 처리하지 않습니다.`,
  },
  {
    num: '제5조',
    title: '이용자의 권리 및 행사 방법',
    content: `① 이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.\n1. 개인정보 조회 및 수정 요청\n2. 개인정보 삭제(회원 탈퇴) 요청\n3. 개인정보 처리 정지 요청\n4. 개인정보 이동 요청(데이터 내려받기)\n\n② 위 권리 행사는 서비스 내 마이페이지 또는 고객센터 이메일(support@haroo.site)을 통해 요청하실 수 있으며, 회사는 요청 접수 후 10 영업일 이내에 처리합니다.\n\n③ 만 14세 미만 아동의 개인정보 처리는 법정 대리인의 동의를 요합니다.\n\n개인정보 보호 책임자: 홍길동 (support@haroo.site)\n\n부칙: 본 방침은 2024년 1월 1일부터 시행합니다.`,
  },
]

export default function PrivacyPage() {
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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">개인정보 처리방침</h1>
          <p className="text-sm text-slate-500 mt-2">시행일: 2024년 1월 1일 · 최종 수정: 2026년 8월 1일</p>
        </div>

        {/* 목차 */}
        <div className="mb-8 p-5 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="text-xs font-bold text-slate-700 mb-3">목차</div>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {SECTIONS.map((s) => (
              <a key={s.num} href={`#${s.num}`} className="text-xs text-slate-600 hover:text-slate-900 hover:underline py-0.5">
                {s.num} {s.title}
              </a>
            ))}
          </nav>
        </div>

        {/* 90일 TTL 핵심 안내 뱃지 */}
        <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-sky-200 bg-sky-50">
          <span className="text-sky-600 text-base flex-shrink-0">ℹ</span>
          <p className="text-xs text-sky-800 leading-relaxed">
            결제 전 무료 조립 데이터(임시 저장 드래프트 및 임시 이미지)는 마지막 수정일로부터
            <strong> 90일 후 자동 파기</strong>됩니다. 데이터 유실을 원치 않으시면 기간 내 결제를 완료해주세요.
          </p>
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
          <Link href="/terms" className="text-sm text-sky-600 hover:text-sky-800 font-semibold">
            이용약관 보기 →
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← 홈으로
          </Link>
        </div>
      </main>
    </div>
  )
}
