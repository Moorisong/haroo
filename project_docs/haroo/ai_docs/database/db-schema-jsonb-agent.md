# DB 스키마 & DDL-Free JSONB Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-database.md`)
- Supabase/PostgreSQL 7대 메인 테이블 (`User`, `BlockCatalog`, `UserProjectDraft`, `UserProject`, `NotificationLog`, `PaymentHistory`, `WaitlistSubscriber`) 및 `FormSubmission` Zero-DDL JSONB 스키마 명세.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
PostgreSQL 7대 메인 테이블 ORM/SQL 스키마를 정의하고 multi-tenant 환경에서 DDL 변동 없는 `FormSubmission` JSONB 유효성 파이프라인을 구축한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/lib/db/schema.ts` (Prisma / Drizzle / Supabase Client)
- `src/lib/db/jsonbSanitizer.ts`
- `src/lib/db/models/FormSubmission.ts`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `schema.ts`: 7대 메인 테이블 SQL DDL 및 TypeScript Interface 타입 정의. `PaymentHistory` `imp_uid` UNIQUE 멱등성 인덱스 적용.
2. `FormSubmission.ts`: 폼 수집 필드 변경 시 `ALTER TABLE` 실행 없이 `submitted_data` JSONB 내에 Key-Value 업서트. Zod blockConfigSchema 기반 런타임 유효성 검증만 수행.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 스키마 정의 및 모델별 파일 300줄 초과 시 모듈 분리.
- **[Zero-DDL]**: 폼 필드 추가/수정 시 `ALTER TABLE` SQL 호출 금지.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. `PaymentHistory` 동일 `imp_uid` 2회 업서트 시도 시 DB UNIQUE 제약조건으로 멱등성 보장 검증.
  2. 동적 폼 필드가 10개로 확장되어도 DDL ALTER 실행 없이 JSONB 파이프라인 정상 저장 검증.
  3. `UserProjectDraft` 삭제 시 CASCADE 설정에 의해 관련 자원 동시 정리 검증.
