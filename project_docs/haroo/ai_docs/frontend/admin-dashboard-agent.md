# 어드민 대시보드 Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-pages.md`, `haroo-frontend-components.md`, `haroo-backend-infrastructure.md`)
- `/admin` 어드민 라우트, `AdminAuthModal`, `AdminChoiceActionPanel`, `WaitlistKakaoBroadcastBtn`, AWS 정산 & Top 20 블록 차트 연동 명세.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
어드민 비밀번호 인증 모달, 회로차단 시 대표님 2대 조치 액션 패널, 1초 카톡 알림톡 대량 발송 버튼 및 AWS 인프라 정산 차트 UI를 구동한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/admin/page.tsx`
- `src/components/admin/AdminAuthModal.tsx`
- `src/components/admin/AdminChoiceActionPanel.tsx`
- `src/components/admin/WaitlistKakaoBroadcastBtn.tsx`
- `src/components/admin/AwsCostTracker.tsx`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `AdminAuthModal.tsx`: 푸터 [Admin] 클릭 시 키패드 팝업 ➔ `POST /api/admin/login` 호출.
2. `AdminChoiceActionPanel.tsx`: 회로차단 발동 시 선택지 1(한도 20대 확장) & 선택지 2(Waitlist Mode 토글) 버튼 랙 디스플레이.
3. `WaitlistKakaoBroadcastBtn.tsx`: Kakao Yellow(#FEE500) 버튼 디스플레이 ➔ 클릭 시 `POST /api/notifications/waitlist-broadcast` 호출.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 300줄 하드 한계 준수.
- **[보안 쿠키]**: 24시간 HTTP-Only 쿠키 검증 필터 연동.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 비밀번호 불일치 시 어드민 뷰 접근 차단 및 토스트 에러 표출 검증.
  2. 선택지 1 클릭 시 회로차단 해제 API 호출 및 카톡 대량 발송 모듈 연동 동작 검증.
  3. AWS EC2+S3+CloudFront 인프라 원가 차감 및 순수익 마진 계산서 출력 정상 여부 검증.
