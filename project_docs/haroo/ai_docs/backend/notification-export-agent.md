# 알림톡 & 데이터 엑셀 내보내기 Agent Reference

## 📝 1. 연동 기획 명세

| API | 설명 |
|-----|------|
| `POST /api/notifications/talk-send` | 알림톡 단건 발송 (카톡 실패 시 LMS 우회) |
| `POST /api/notifications/waitlist-broadcast` | 방문자 알림 신청 저장 + 즉시 접수 확인 알림톡 |
| `GET /api/notifications/waitlist-list?projectId=` | 신청자 목록 조회 (대시보드용, 인증 필요) |
| `POST /api/notifications/waitlist-send` | 미발송 신청자 전체 오픈 알림 일괄 발송 |
| `GET /api/form-submissions/export?projectId=&format=csv` | SheetJS 변환 CSV 다운로드 |

## 🤖 2. AI 개발 지침 및 설계 구조

### 목적
카카오 알림톡 우선 발송 → 수신 실패 시 LMS/SMS 자동 우회 대체 발송 엔진과
Supabase waitlist_signups 테이블 기반 신청자 관리 및 일괄 오픈 알림 발송 구현.

### 파일 구조
- src/lib/kakaoTalkClient.ts: 알리고(Aligo) REST API 클라이언트 (dry-run 지원)
- src/lib/db/models/WaitlistSignup.ts: waitlist_signups Supabase 모델
- src/app/api/notifications/waitlist-broadcast/route.ts: 방문자 신청 저장 + 접수 확인
- src/app/api/notifications/waitlist-list/route.ts: 신청자 목록 조회
- src/app/api/notifications/waitlist-send/route.ts: 오픈 알림 일괄 발송
- src/components/checkout/WaitlistModal.tsx: 방문자 신청 모달 (projectId 연동)
- src/components/dashboard/WaitlistTable.tsx: 신청자 목록 테이블 컴포넌트
- src/app/dashboard/notifications/page.tsx: 알림 신청 관리 대시보드

### DB 스키마 (Supabase)
마이그레이션 파일: supabase/migrations/20260911_waitlist_signups.sql
테이블명: waitlist_signups
컬럼: id, project_id, phone_masked, phone_raw, status(PENDING|NOTIFIED), notified_at, created_at

### 환경변수 (실발송 시 필수)
- ALIGO_API_KEY / ALIGO_USER_ID / ALIGO_SENDER
- ALIGO_KAKAO_SENDER_KEY / ALIGO_KAKAO_TEMPLATE_CODE
- SUPABASE_SERVICE_ROLE_KEY (RLS 우회용)
- 미설정 시 자동으로 dry-run 모드 동작

### 처리 흐름
1. 방문자: APPLY_NOTIFICATION 버튼 → haroo:open-waitlist 이벤트(projectId 포함) → WaitlistModal → POST /api/notifications/waitlist-broadcast
2. DB 저장: WaitlistSignupModel.insert() → phone_masked + phone_raw Supabase 저장
3. 즉시 접수 확인: KakaoTalkClient.sendAlimtalk() → 알리고 REST API → 실패 시 LMS fallback
4. 대시보드 관리: /dashboard/notifications → 신청자 목록 + 오픈 알림 발송 버튼
5. 일괄 발송: POST /api/notifications/waitlist-send → KakaoTalkClient.broadcast() → 500건 자동 배치 → markNotified()

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- [300줄 분리 규칙]: WaitlistTable 컴포넌트를 페이지와 분리하여 준수.
- [Zero-DDL]: SheetJS JSONB key-value 동적 컬럼 헤더 자동 변환.
- [Graceful Degradation]: Supabase/Aligo 미설정 시 dry-run 처리.

## 🧪 4. 필수 테스트 케이스 (src/__tests__/waitlistSignup.test.ts)
1. 전화번호 마스킹: 010-1234-5678 → 010-****-5678
2. 하이픈 없는 11자리 처리
3. 8자리 미만 마스킹 불가 표시
4. 국제번호(+82) 처리
5. APPLY_NOTIFICATION 액션 타입 유효성 검증
6. waitlist_signups 행 구조 유효성 검증
7. markNotified 빈 배열 처리 안전성
8. 일괄 발송 배치 크기 계산 (500건 기준)
