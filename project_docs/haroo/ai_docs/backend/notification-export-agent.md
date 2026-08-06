# 알림톡 & 데이터 엑셀 내보내기 Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-backend-api.md`, `haroo-database.md`)
- `POST /api/notifications/talk-send` (카톡 실패 시 LMS 우회)
- `POST /api/notifications/waitlist-broadcast` (n차 대기자 대량 알림톡)
- `GET /api/form-submissions/export?projectId=&format=csv` (SheetJS 변환)

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
카카오 알림톡 우선 발송 ➔ 수신 실패 시 LMS/SMS 자동 우회 대체 발송 엔진과 SheetJS 기반 폼 수집 데이터 1초 CSV/Excel 다운로드 API를 구현한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/api/notifications/talk-send/route.ts`
- `src/app/api/notifications/waitlist-broadcast/route.ts`
- `src/app/api/form-submissions/export/route.ts`
- `src/lib/kakaoTalkClient.ts`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `talk-send/route.ts`: 카카오 알림톡 API 호출 실패/거절 수신 시 즉시 LMS/SMS 우회 발송 모듈 연동 및 `NotificationLog` DB 기록.
2. `export/route.ts`: `FormSubmission` JSONB 데이터를 SheetJS(`xlsx`) 모듈로 버퍼 변환 후 `Content-Type: text/csv` 바이너리 스트림 리턴.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 300줄 하드 한계 준수.
- **[Zero-DDL]**: SheetJS 추출 시 JSONB key-value를 동적 컬럼 헤더로 자동 변환.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 카톡 알림톡 서버 에러 발생 시 LMS 우회 모듈이 100ms 이내 바톤 터치 발송 검증.
  2. 1,000건의 동적 JSONB 폼 수집 데이터 SheetJS 변환 시 1초 이내 CSV 스트림 응답 검증.
  3. `WaitlistSubscriber` 대기자 DB 전원 무인 대량 알림톡 발송 완료 검증.
