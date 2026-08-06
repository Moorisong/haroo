# 결제, 무인 환불 & Caddy Purge Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-backend-api.md`, `haroo-backend-infrastructure.md`)
- `POST /api/payments/subscribe-confirm`
- `POST /api/payments/verify` (포트원 REST API 이중 검증 & imp_uid 멱등성)
- `POST /api/subscriptions/cancel-refund` (Math.ceil 환불 연산 & Caddy Purge)
- `POST /api/payments/portone-webhook` (HMAC-SHA256 검증)

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
포트원 결제 이중 검증(멱등성), Math.ceil 환불 공식 연산 기반 부분 취소 및 해지 시 Caddy SSL 인증서 무인 즉시 폐기(Purge) 백엔드엔진을 구현한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/api/payments/verify/route.ts`
- `src/app/api/payments/subscribe-confirm/route.ts`
- `src/app/api/subscriptions/cancel-refund/route.ts`
- `src/app/api/payments/portone-webhook/route.ts`
- `src/lib/refundCalculator.ts`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `refundCalculator.ts`: Math.ceil(elapsedDays / 30) 사용월 계산 ➔ (남은개월 * 월단가) - 10% 위약금 차감 정산.
2. `cancel-refund/route.ts`: 환불액 산출 후 포트원 부분 취소 API 호출 ➔ EC2 컨테이너 STOP ➔ Caddy Admin API (`DELETE /config/apps/http/servers/srv0/routes/{route_id}`) 호출하여 좀비 라우팅 즉시 폐기.
3. `verify/route.ts`: 포트원 REST API로 `imp_uid` 조회, 금액 일치 검증 및 `PaymentHistory` DB 멱등성 저장.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 300줄 하드 한계 준수.
- **[HMAC 검증]**: 포트원 웹훅 수신 시 HMAC-SHA256 시그니처 위변조 필수 검증.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 12개월 구독 유저가 31일(2개월차 시작)째 해지 시 Math.ceil 연산으로 2개월 사용액 정산 + 10% 위약금 정상 차감 검증.
  2. 해지 성공 즉시 Caddy API 호출로 라우팅 룰 삭제 확인(좀비 라우팅 0%) 검증.
  3. 동일 `imp_uid`로 중복 `verify` 요청 들어왔을 때 DB 멱등성에 의해 추가 결제 승인 차단 검증.
