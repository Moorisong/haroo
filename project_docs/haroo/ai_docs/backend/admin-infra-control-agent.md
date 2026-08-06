# 어드민 인프라 제어 Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-backend-api.md`, `haroo-backend-infrastructure.md`)
- `POST /api/admin/login`
- `GET /api/admin/stats`
- `POST /api/admin/circuit-breaker/unlock`
- `POST /api/admin/waitlist-mode/toggle`
- 전체 컨테이너 Rolling Update 무전단 롤링 자동화 API

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
어드민 비밀번호 검증 및 보안 쿠키 발급, AWS 정산 지표 집계, 10대 회로차단 해제 및 무전단 롤링 업데이트 자동화 API를 구동한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/api/admin/login/route.ts`
- `src/app/api/admin/stats/route.ts`
- `src/app/api/admin/circuit-breaker/unlock/route.ts`
- `src/app/api/admin/waitlist-mode/toggle/route.ts`
- `src/app/api/admin/rolling-update/route.ts`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `stats/route.ts`: EC2($3.00/월), S3($0.023/GB), CloudFront($0.12/GB) 원가 차감 순수익 산출 및 Top 20 인기 블록 랭킹 데이터 집계.
2. `circuit-breaker/unlock/route.ts`: 대표님 승인 시 EC2 인스턴스 한도를 10대 ➔ 20대로 확장.
3. `rolling-update/route.ts`: SSH 접속 후 컨테이너별 순차 `docker pull` -> `docker stop` -> `docker run` -> 헬스체크 후 다음 진행 (Zero-Downtime).

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 300줄 하드 한계 준수.
- **[ADMIN_SECRET_KEY]**: 환경변수 비밀번호 일치 검증 필수.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 비밀번호 불일치 시 HTTP-Only 쿠키 미발급 및 401 Unauthorized 반환 검증.
  2. EC2 10대 한도 도달 시 `circuit-breaker` 작동 및 대표님 카톡 경보 발송 확인 검증.
  3. 무전단 롤링 업데이트 수행 중 individual 컨테이너 교체 시 서비스 중단 시간 0초 유지 검증.
