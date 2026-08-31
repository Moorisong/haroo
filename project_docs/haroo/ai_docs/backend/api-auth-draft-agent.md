# Auth, Draft & Domain API Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-backend-api.md`, `haroo-database.md`)
- `POST /api/auth/callback/[provider]`
- `POST /api/drafts/save` (500ms debounce 연동, 10개 한도, 동일 이름 중복시 (n) 순차 생성)
- `GET /api/drafts/list`
- `DELETE /api/drafts/[id]` (특정 드래프트 항목 삭제)
- `GET /api/domains/check?name=`
- `POST /api/domains/custom-connect` (CNAME 비동기 조회 & SSL 발급)


## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
소셜로그인 Callback, 500ms Debounce 기반 드래프트 JSONB 업서트, 서브도메인 중복 검사 및 Caddy Admin API 연동 커스텀 도메인 SSL 자동 발급 API를 구현한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/api/auth/callback/[provider]/route.ts`
- `src/app/api/drafts/save/route.ts`
- `src/app/api/drafts/list/route.ts`
- `src/app/api/domains/check/route.ts`
- `src/app/api/domains/custom-connect/route.ts`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `drafts/save/route.ts`: 유저당 최대 10개 드래프트 한도 검증 후 JSONB 업서트.
2. `domains/custom-connect/route.ts`: Node.js `dns.resolveCname`으로 target.haroo.site 검증 후, Caddy Admin API(`POST /config/apps/http/servers/srv0/routes`)에 JSON 라우트 주입하여 3초 무인 SSL 발급.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 라우트 파일당 300줄 하드 한계 준수.
- **[Version Clock]**: 드래프트 동시 편집 시 Version Clock 비교로 409 Conflict 처리.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 드래프트 10개 초과 업서트 시도 시 최우선 고구버전 자동 파기 또는 에러 반환 검증.
  2. DNS CNAME 미전파 도메인으로 `custom-connect` 호출 시 400 Bad Request 리턴 검증.
  3. 이미 등록된 서브도메인으로 `domains/check` 호출 시 409 Conflict 리턴 검증.
