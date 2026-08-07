# 조립 캔버스 & 듀얼 DND Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-pages.md`, `haroo-frontend-components.md`, `haroo-frontend-wysiwyg-builder.md`)
- `/builder` 캔버스 모드 라우트, 500ms debounce DB 무료 저장, 듀얼 센서 DND 파이프라인, 수정 미터기 UX 연동 및 WYSIWYG 실시간 라이브 캔버스 연동 명세.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
dnd-kit 기반의 PC PointerSensor(0ms) + 모바일 TouchSensor(150ms long-press, 5px tolerance) 듀얼 센서 DND 파이프라인을 구축하고 결제 전 무료 조립 및 실시간 수정 추가 비용 연산 UX를 제공한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/builder/page.tsx`
- `src/components/builder/TouchDndProvider.tsx`
- `src/components/builder/BuilderCanvas.tsx`
- `src/components/builder/RevisionMeter.tsx`
- `src/stores/useBuilderStore.ts`
- `src/hooks/useDraftAutoSave.ts`
- `src/hooks/useRevisionPriceCalculator.ts`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `TouchDndProvider.tsx`: `PointerSensor`와 `TouchSensor`를 이원화 구성하여 모바일 스크롤과 블록 DND 드래그 충돌 원천 차단.
2. `BuilderCanvas.tsx`: DND 기능과 결합하여, 드래그 드롭 후 **WYSIWYG 실시간 라이브 조립 캔버스** 환경이 파괴되지 않도록 블록 렌더링 유지.
3. `useDraftAutoSave.ts`: `selectedBlocks` 변경 및 **0.01초 단방향 동기화 인풋 데이터 변경** 시 500ms debounce 후 `POST /api/drafts/save` 호출 (localStorage 전면 금지).
4. `useRevisionPriceCalculator.ts`: 원본 draft 대비 수정 케이스 A~D(단순 UI 0원 / 동티어 0원 / 티어 차액 +100,000원 / DB 수수료 +10,000원) 연산.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 단일 파일 300줄 초과 시 블록 컨트롤러와 메인 캔버스 뷰 분리.
- **[UUID 고정]**: identical 블록 추가 시 `uuidv4()` 기반 `instanceId`를 스토어 단일 키로 고정.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. 모바일 터치 드래그 시 150ms long-press 미도달 시 일반 탭/스크롤 동작 검증.
  2. 블록 조립 후 500ms 이내 재편집 시 타이머 리셋 및 DB 업서트 1회 발생(Debounce) 검증.
  3. Starter ➔ Standard 기능 추가 시 `useRevisionPriceCalculator`가 티어 차액 +100,000원 정확 연산 검증.
  4. 탭 닫힘 순간 `beforeunload` + `navigator.sendBeacon()` 수신 데이터 파기 없이 안전 수신 검증.
