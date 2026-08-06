# 20종 원자 & 마스터 45종 블록 Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-components.md`, `haroo-database.md`)
- 1계층 20종 원자 컴포넌트(`atom_text_01` ~ `atom_spinner_01`) 및 마스터 45종 블록(`blk_nav_01` ~ `blk_weather_01`) 레고 조립 아키텍처 및 12대 가드 규격 명세.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
20종 원자 컴포넌트를 100% 재사용하여 마스터 45종 블록을 조립(Composition)하고, EXIF 회전 보정 및 object-fit: cover, Isolated Error Boundary 등의 가드를 적용한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/components/atoms/` (`atom_text_01.tsx` ~ `atom_spinner_01.tsx` 20개)
- `src/components/blocks/` (`blk_nav_01.tsx` ~ `blk_weather_01.tsx` 45개)
- `src/components/common/BlockErrorBoundary.tsx`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. 20종 원자 컴포넌트 작성: `atom_card_01`(1px border-slate-200), `atom_image_01`(EXIF 회전 보정 및 cover), `atom_btn_01` 등.
2. 45종 마스터 블록 작성: 커스텀 HTML 태그 사용을 전면 배제하고 원자 컴포넌트 조합으로만 UI 구성.
3. `BlockErrorBoundary.tsx`: 개별 블록 래핑 ➔ 독립 에러 차단.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 블록 1개당 300줄 절대 초과 금지.
- **[원자 100% 재사용]**: 마스터 블록 내 직접 HTML 태그 작성 금지, 20종 원자 조립 철칙.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 외부 SDK(Kakao SDK) 미로드 시 `BlockErrorBoundary`가 타 블록 렌더링에 영단 0% 영향 주지 않고 격리 검증.
  2. 세로로 찍힌 스마트폰 이미지 업로드 시 `atom_image_01` EXIF 자동 90도/270도 정방향 회전 렌더링 검증.
  3. identical 블록 2개 연속 추가 시 React Key 충돌 및 상태 꼬임 0% 검증.
