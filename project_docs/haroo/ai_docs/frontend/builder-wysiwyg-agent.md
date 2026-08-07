# WYSIWYG Live Builder & Dual Editing Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-frontend-wysiwyg-builder.md`, `haroo-frontend-components.md`)
- 45종 마스터 블록 캔버스 내 실물 렌더링, `deviceViewport` 스위처, 인라인 에디팅 및 `SidePropertyPanel` 듀얼 에디팅, Zod 기반 0.01초 단방향 동기화.

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
기존의 추상적 이름표 방식을 폐기하고, **WYSIWYG 실시간 라이브 조립 캔버스** 환경을 구축합니다. `BuilderCanvas`는 블록을 실제 UI로 렌더링하고, 유저는 캔버스 내 인라인 편집 및 `SidePropertyPanel`을 통한 듀얼 에디팅 방식으로 인풋 데이터를 직접 수정할 수 있도록 개발합니다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/components/builder/BuilderCanvas.tsx`
- `src/components/builder/ViewportSwitcher.tsx`
- `src/components/builder/SidePropertyPanel.tsx`
- `src/components/builder/FloatingQuickToolbar.tsx`
- `src/stores/useBuilderStore.ts`
- `src/types/index.ts` (BlockInputConfigSchema 정의)

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. **스토어 & 타입 확장**: `useBuilderStore`에 `deviceViewport` ('mobile'|'tablet'|'desktop'), `isPreviewMode` 상태를 추가하고, 0.01초 단방향 갱신을 위한 `updateBlockInputData(id, data)` 메서드를 구현합니다. Zod 기반 `BlockInputConfigSchema`로 데이터 유효성을 1차 방어합니다.
2. **ViewportSwitcher 컴포넌트**: 데스크톱, 태블릿, 모바일 프레임 전환 및 편집/미리보기 모드 토글 탭을 구성합니다.
3. **BuilderCanvas 실물 렌더링**: 각 `activeBlockId`에 해당하는 블록 컴포넌트를 직접 렌더링합니다. 선택 시 `1px indigo-500` outline과 `FloatingQuickToolbar`를 표시합니다.
4. **SidePropertyPanel 컴포넌트**: 선택된 블록 타입에 따라 폰트/색상, 비디오 URL, 폼 필드 설정 등을 변경할 수 있는 동적 폼을 구성하고 `updateBlockInputData`를 호출합니다.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 각 패널 및 캔버스 컴포넌트는 단일 파일 300줄을 초과하지 않도록 컴포넌트 단위를 세분화합니다.
- **[0.01초 동기화 반응]**: 에디팅 액션이 발생하면 Zustand `updateBlockInputData`를 즉각 호출하여 리렌더링 병목 없이 캔버스에 즉시 반영되어야 합니다.
- **[에러 바운더리 보호]**: `BlockErrorBoundary`를 유지하여 개별 블록 내부 렌더링 오류가 캔버스 전체 파괴로 이어지지 않도록 합니다.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. `ViewportSwitcher`에서 'mobile' 클릭 시 캔버스 width가 375px로 정확히 전환되는지 검증.
  2. `updateBlockInputData` 호출 시 Zod schema 검증 통과 및 store 상태 즉각 업데이트 검증.
  3. `isPreviewMode` 활성화 시 `FloatingQuickToolbar` 및 `1px indigo-500` 포커스 라인이 완벽히 숨겨지는지 검증.
