# 샌드박스 관제 & 마이페이지 Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-pages.md`, `haroo-frontend-components.md`)
- `/order/status` 5단계 무인 샌드박스 배포 관제 및 `/dashboard` 마이페이지 커스텀 도메인 CNAME 연동 명세.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
XTerm.js 기반 실시간 배포 stdout 터미널과 마이페이지 내 CNAME 안내 및 5초 DNS Polling 로딩 모듈을 완벽하게 구현한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/order/status/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/dashboard/SandboxTerminal.tsx`
- `src/components/dashboard/CustomDomainDrawer.tsx`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `SandboxTerminal.tsx`: XTerm.js 캔버스 렌더링 및 `GET /api/build-logs/stream` SSE 스트림과 연결하여 5단계 stdout 출력 중계.
2. `CustomDomainDrawer.tsx`: 유저 소유 도메인 입력 폼, `target.haroo.site` CNAME 1줄 안내 및 `POST /api/domains/custom-connect` 호출 ➔ 5초 간격 DNS Polling 실행.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 300줄 하드 한계 준수.
- **[XTerm 정리]**: 언마운트 시 XTerm 인스턴스 및 SSE 커넥션 파기 처리.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. SSE 연결 끊김 발생 시 XTerm 터미널 자동 재연결 시도 시나리오 검증.
  2. CustomDomain 5초 Polling 중 CNAME 전파 성공 시 TLS/SSL ACTIVE 상태 변환 및 팁 닫힘 검증.
  3. CNAME 미전파 상태에서 400 Bad Request 수신 시 가비아/후이즈 안내 팁 정상 표출 검증.
