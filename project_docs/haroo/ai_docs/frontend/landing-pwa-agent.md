# 랜딩 & PWA Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-pages.md`, `haroo-frontend-components.md`)
- 랜딩 페이지 (`/`), 이용약관 (`/terms`), 개인정보 처리방침 (`/privacy`) 라우트 구현 명세.
- `HeroSection`, `HeaderNav`, `Footer`, `CompanyLegalFooter`, `PwaInstallGuideModal`, `RealisticCostComparisonTable`, `MandatoryPwaTransparencyNotice`, `BlockShowcase`, `PricingGrid` 컴포넌트 스펙.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
랜딩 페이지에서 웹사이트 및 PWA 통합 혜택을 디스플레이하고 PWA 투명 고지 뱃지 렌더링 및 이원화 PWA 3초 설치 안내 모달, 하단 법적 푸터를 완벽하게 구현한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/privacy/page.tsx`
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/PwaInstallGuideModal.tsx`
- `src/components/landing/RealisticCostComparisonTable.tsx`
- `src/components/landing/MandatoryPwaTransparencyNotice.tsx`
- `src/components/common/CompanyLegalFooter.tsx`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `CompanyLegalFooter.tsx`: 상호명, 대표자, 사업자번호, 통신판매신고, 주소를 렌더링하여 PG 심사 통과 지원.
2. `MandatoryPwaTransparencyNotice.tsx`: Pure White 백그라운드 위 1px border-slate-200, sky-600 PWA 고지 알약 뱃지 디스플레이.
3. `PwaInstallGuideModal.tsx`: 대상 A(하루 플랫폼 자체) & 대상 B(사장님 매장) 이원화 모달 구현 (iOS Safari 공유 & Android Chrome 추가 팝업).
4. `/terms` 및 `/privacy`: Pure White 1px border 미니멀 목차, Math.ceil 환불 연산 공식 및 90일 TTL 파기, 제3자 위탁 수칙 렌더링.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 단일 파일 300줄 초과 절대 금지.
- **[디자인 토큰]**: `#FFFFFF`, `border-slate-200 1px`, `#0F172A`, `#0284C7` 토큰 고정.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. `CompanyLegalFooter` 필수 법적 항목(대표자, 사업자번호 등) 정상 디스플레이 검증.
  2. `PwaInstallGuideModal` iOS Safari vs Android Chrome 렌더링 분기 검증.
  3. `/terms` 및 `/privacy` 라우팅 접근 및 1px border 미니멀 목차 클릭 시 scroll-into-view 검증.
  4. 모바일 375px 해상도에서 `RealisticCostComparisonTable` 반응형 레이아웃 깨짐 부재 검증.
