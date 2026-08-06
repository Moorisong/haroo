# 🔌 [하루 (haroo)] 휴먼 기획서: REST API 19개 엔드포인트 명세

본 문서는 **미키 사업_v3** 백엔드 기획의 19개 REST API 엔드포인트 세부 명세(요청, 응답, HTTP 상태 코드 및 동작 로직)를 100% 누락 없이 완전하게 기록한 명세서입니다.

---

## 📡 19개 REST API 엔드포인트 세부 명세 목록

### 1. `POST /api/domains/custom-connect`
* **설명**: 유저 커스텀 도메인 CNAME DNS 비동기 조회 ➔ Caddy API 연동 무인 SSL 자동 발급.
* **응답**: `200 OK` (연동 완료) / `400 Bad Request` (CNAME 미전파).

### 2. `GET /api/form-submissions/export?projectId=&format=csv`
* **설명**: 문의/예약 폼 수집 데이터 SheetJS 엑셀/CSV 1초 변환 다운로드.
* **응답**: `200 OK` (Binary File Stream).

### 3. `POST /api/notifications/talk-send`
* **설명**: 카톡 알림톡 우선 발송 ➔ 수신 실패 시 LMS/SMS 자동 우회 대체 발송.
* **응답**: `200 OK` (`{ status: "SUCCESS", channel: "TALK" | "SMS" }`).

### 4. `POST /api/notifications/waitlist-broadcast`
* **설명**: n차 서버 증설 시 WaitlistSubscriber DB 유저 전원에게 알림톡/LMS 1초 무인 대량 발송.
* **응답**: `200 OK` (`{ sentCount: number }`).

### 5. `POST /api/upload/presigned-url`
* **설명**: AWS S3 10MB 이미지 Direct Upload Presigned URL 생성 (EXIF 회전 보정 처리 대상).
* **응답**: `200 OK` (`{ presignedUrl: string, fileKey: string }`).

### 6. `POST /api/auth/callback/[provider]`
* **설명**: Supabase OAuth 토큰 교환 및 User DB 업서트.
* **응답**: `200 OK` (`{ userId: string, email: string }`).

### 7. `POST /api/drafts/save`
* **설명**: 500ms debounce JSONB 업서트 (`UserProjectDraft` 테이블, 유저당 10개 한도).
* **응답**: `200 OK` (`{ draftId: string, updatedAt: string }`).

### 8. `GET /api/drafts/list`
* **설명**: 로그인 유저 드래프트 목록 (최대 10개) 반환.
* **응답**: `200 OK` (`{ drafts: Draft[] }`).

### 9. `GET /api/domains/check?name=`
* **설명**: 서브도메인 정규식 및 중복 검사.
* **응답**: `200 OK` (사용 가능) / `409 Conflict` (중복 도메인).

### 10. `POST /api/payments/subscribe-confirm`
* **설명**: 포트원 승인 검증 ➔ EC2 런칭 & Docker 부팅 트리거.
* **응답**: `200 OK` (`{ projectId: string, deploymentUrl: string }`).

### 11. `POST /api/payments/verify`
* **설명**: 결제 승인 클라이언트 이중 검증 API (포트원 REST API 직접 조회 ➔ EC2 부팅 ➔ 멱등성 imp_uid UNIQUE 처리).
* **응답**: `200 OK` (`{ verified: true }`).

### 12. `POST /api/subscriptions/cancel-refund`
* **설명**: Math.ceil 사용월 정산 + 10% 위약금 차감 정산, 포트원 1초 부분 취소 & Caddy Domain Purge.
* **응답**: `200 OK` (`{ refundAmount: number, cancelledAt: string }`).

### 13. `POST /api/project/re-deploy`
* **설명**: 수정 재배포 (단순 UI: Hot-Reload / DB 변동: BlockConfig & JSONB 스키마 갱신).
* **응답**: `200 OK` (`{ reDeployed: true }`).

### 14. `GET /api/build-logs/stream?id=`
* **설명**: SSE 스트림 5단계 샌드박스 stdout 실시간 중계.
* **응답**: `200 OK` (`text/event-stream`).

### 15. `POST /api/payments/portone-webhook`
* **설명**: HMAC-SHA256 헤더 검증 포트원 웹훅 수신.
* **응답**: `200 OK` (`{ received: true }`).

### 16. `POST /api/admin/login`
* **설명**: 어드민 비밀번호 검증 후 24시간 HTTP-Only 보안 쿠키 발급.
* **응답**: `200 OK` (`{ authenticated: true }`).

### 17. `GET /api/admin/stats`
* **설명**: AWS 인프라 손익, 4단계 이탈률, Top 1~20 인기 블록, EC2 포트 통합 집계 반환.
* **응답**: `200 OK` (`{ stats: AdminStats }`).

### 18. `POST /api/admin/circuit-breaker/unlock`
* **설명**: 대표님이 EC2 인스턴스 한도(10대 ➔ 20대) 승인 시 회로차단 해제.
* **응답**: `200 OK` (`{ unlocked: true }`).

### 19. `POST /api/admin/waitlist-mode/toggle`
* **설명**: 선택지 2 클릭 시 결제 전 Waitlist 모달 활성화/비활성화 스위치.
* **응답**: `200 OK` (`{ waitlistMode: boolean }`).
