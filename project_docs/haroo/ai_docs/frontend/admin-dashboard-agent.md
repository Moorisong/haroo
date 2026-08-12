# 어드민 대시보드 Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-pages.md`, `haroo-frontend-components.md`, `haroo-backend-infrastructure.md`)
- `/admin` 메인 대시보드 및 카테고리별 서브 라우트 (`/admin/projects`, `/admin/financials`, `/admin/submissions`, `/admin/infra`) 연동 명세.
- `AdminNav`, `AdminProjectStats`, `AdminFinancialDetailed`, `AdminSubmissionStats`, `AdminInfraDetailed` 및 `AdminAuthModal`, `AdminChoiceActionPanel`, `WaitlistKakaoBroadcastBtn` 연동.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
어드민 인증 모달, 카테고리/페이지별 1클릭 네비게이션, 실제 DB 스키마(`UserProject`, `PaymentHistory`, `FormSubmission`, `Waitlist`) 기반 수집 데이터 통계 시각화 및 긴급 제어 액션 패널을 구동한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/admin/page.tsx` (어드민 종합 개요)
- `src/app/admin/projects/page.tsx` (매장 & 프로젝트 통계 라우트)
- `src/app/admin/financials/page.tsx` (매출 & 재무 통계 라우트)
- `src/app/admin/submissions/page.tsx` (고객 폼 제출 분석 라우트)
- `src/app/admin/infra/page.tsx` (인프라 & 대기자 통계 라우트)
- `src/components/admin/AdminNav.tsx` (어드민 탭 네비게이션)
- `src/components/admin/AdminProjectStats.tsx` (매장 상태, 티어, 업종 통계)
- `src/components/admin/AdminFinancialDetailed.tsx` (매출, PG 수수료, Net Profit)
- `src/components/admin/AdminSubmissionStats.tsx` (NoSQL 폼 제출 랭킹 분석)
- `src/components/admin/AdminInfraDetailed.tsx` (AWS 리소스 비용 & 대기자 알림톡)
- `src/components/admin/AdminAuthModal.tsx`
- `src/components/admin/AdminChoiceActionPanel.tsx`
- `src/components/admin/WaitlistKakaoBroadcastBtn.tsx`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `AdminNav.tsx`: 모바일/태블릿/데스크탑 반응형 5대 카테고리 탭 1클릭 이동 네비게이션.
2. `AdminProjectStats.tsx`: UserProject DB 상태(RUNNING, BUILDING, STOPPED, FAILED) 및 티어, 커스텀 도메인 비율 시각화.
3. `AdminFinancialDetailed.tsx`: PaymentHistory DB 기반 매출/환불, PG 수수료, AWS 원가 차감 순이익 및 객단가(ARPU) 시각화.
4. `AdminSubmissionStats.tsx`: FormSubmission DB 기반 매장/블록별 제출 랭킹 및 실시간 수집 폼 데이터 리포트.
5. `AdminInfraDetailed.tsx`: AWS 인프라 리소스 세부 원가 breakdown 및 Waitlist DB 기반 대기자 알림톡 발송 모니터링.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 단일 파일 300줄 하드 한계 엄격 준수.
- **[반응형 디자인]**: sm(모바일), md(태블릿), lg/xl(데스크탑) 완벽 대응 grid 및 flex 레이아웃.
- **[보안 쿠키]**: 24시간 HTTP-Only 쿠키 검증 필터 연동.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 시나리오]**:
  1. 어드민 상단 `AdminNav` 탭 클릭 시 카테고리별 페이지(`/admin`, `/admin/projects`, `/admin/financials`, `/admin/submissions`, `/admin/infra`) smooth 이동 검증.
  2. 모바일/태블릿/데스크탑 해상도 변경 시 통계 카드 및 차트 레이아웃 깨짐 없는 반응형 렌더링 검증.
  3. DB 스키마 5종(UserProject, UserProjectDraft, FormSubmission, PaymentHistory, Waitlist) 연동 통계 정상 출력 검증.
