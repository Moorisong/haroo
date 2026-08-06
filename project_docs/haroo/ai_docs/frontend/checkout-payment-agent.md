# 결제 & 대기자 차단 Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-pages.md`, `haroo-frontend-components.md`)
- `/checkout` 및 `/checkout/success` 라우트, `TermsAgreementCheckbox`, `WaitlistPrePaymentModal`, `PaymentVerifyFallback` 연동 명세.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
포트원 결제 전 필수 약관 동의 검증, 어드민 선택지 2 발동 시 51번째 유저 차단 팝업 렌더링 및 결제 완료 후 이중 승인 조회를 완벽하게 구현한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/checkout/page.tsx`
- `src/app/checkout/success/page.tsx`
- `src/components/checkout/TermsAgreementCheckbox.tsx`
- `src/components/checkout/WaitlistModal.tsx`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `TermsAgreementCheckbox.tsx`: 필수 약관 동의 미체크 시 포트원 결제 팝업 호출 차단.
2. `WaitlistModal.tsx`: 서버가 Waitlist Mode 상태이거나 51번째 유저 진입 시 결제 버튼 클릭 순간 차단 팝업 표출 ➔ 휴대폰 번호 입력받아 `WaitlistSubscriber` DB 저장.
3. `/checkout/success`: 클라이언트 결제 완료 후 `POST /api/payments/verify` 직접 호출로 이중 검증.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 300줄 하드 한계 준수.
- **[약관 체크]**: 이용약관, 개인정보처리방침, 10% 위약금 환불규정 동의 필수.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 필수 약관 체크 해제 상태에서 결제 버튼 클릭 시 경고 메시지 디스플레이 검증.
  2. Waitlist Mode 활성화 시 결제 팝업 미호출 및 대기자 신청 모달 렌더링 검증.
  3. 결제 완료 후 `POST /api/payments/verify` 이중 조회 실패 시 오류 안내 페이지 이탈 검증.
