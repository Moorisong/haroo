# 🚀 프로젝트 맞춤형 블록 확충 & 고도화 Sub-Agent 지침 (Project Block Enricher Agent Reference)

본 문서는 사용자가 특정 프로젝트나 서비스(예: *"미용실 예약 매장"*, *"피트니스 클럽"*, *"온라인 클래스"*, *"스터디카페"* 등)를 지정했을 때, 해당 서비스에만 종속되는 특수 블록이 아닌, **여러 서비스에서 재사용 가능한 범용적이고 최소 단위의 다목적 블록(Versatile & Minimal Blocks)**들을 도출하고, 100% 원자 컴포넌트 조립 방식으로 이를 생성·고도화하기 위한 AI 서브에이전트 전용 지침서입니다.

---

## 🎯 1. 실행 목적 및 핵심 메커니즘 (Agent Purpose & Core Goal)

* **실행 트리거**: 사용자가 *"O 프로젝트/서비스에 필요한 블록 구성을 준비하고 없으면 만들어 줘"* 라고 명령할 때 본 지침서를 로드하여 실행.
* **핵심 목적**:
  - 특정 시스템이나 산업군에 종속되는 일회성 특수 블록 생성을 지양하고, **여러 용도로 조립·활용될 수 있는 범용적인 다목적 블록(Versatile Blocks) 위주로 생태계를 확충**한다.
  - 다양한 서비스 유즈케이스를 이 범용 블록들의 조합만으로 100% 구현할 수 있도록 **블록 자산의 범용성과 재사용성을 극대화(Maximize Reusability)**한다.
* **수행 프로토콜 요약**:
  1. 지정된 서비스/프로젝트 구현에 필요한 전체 블록 청사진(List Up) 도출.
  2. 기존 마스터 45종 블록과의 매핑 분석 (재사용 가능 여부 판별).
  3. 부족하거나 신규가 필요한 블록은 100% 원자 컴포넌트(`src/components/atoms/*`) 조합으로 새로 구현.
  4. 필요 시 기존 원자 컴포넌트 확장 및 기존 블록 고도화/수정 진행.
  5. 빌더 시스템 연동, 본질적 유닛 테스트 실행, 3-Way 문서 동기화 완수.

---

## 📐 2. 프로젝트 통합 코드 & 블록 컨벤션 (All Core Specifications)

### 2.1 3-Way 동기화 및 핵심 코드 수칙 (`ConventionsCoreRules.md`)
1. **3-Way 동기화 필수**: 소스 코드 작성 + 본질적 테스트 작성/실행 + 기획 및 AI 지침 문서 최신화 완료 후 사용자 보고.
2. **파일 당 300줄 제한**: 모든 컴포넌트 및 테스트 코드는 단일 파일 300줄 초과 금지.
3. **코드 품질**: 미사용 변수 금지, 반복 리터럴 상수화, 런타임 타입 안전성(Zod) 및 100% 한국어 작성 수칙 준수.

### 2.2 Atomic 디자인 토큰 & 100% 조립 철칙 (`atomic-blocks-agent.md`, `block-creator-agent.md`)
1. **100% 원자 컴포넌트 조립 철칙**:
   * 블록 내부에서 커스텀 HTML 생태그(`<section>`, `<form>`, `<textarea>`, `<input>`, `<button>`, `<label>` 등) 직접 사용 **절대 금지**.
   * 반드시 `src/components/atoms/` 아래의 원자 컴포넌트(`AtomCard01`, `AtomText01`, `AtomBtn01`, `AtomInput01`, `AtomTextarea01`, `AtomBadge01`, `AtomDivider01`, `AtomIcon01`, `AtomAccordion01`, `AtomCounter01`, `AtomAvatar01`, `AtomRating01`, `AtomProgress01`, `AtomDropdown01`, `AtomSwitch01`, `AtomChip01`, `AtomTabs01`, `AtomTooltip01`, `AtomCheckbox01`, `AtomLabel01` 등)만을 조합(Composition)하여 구현.
   * 표현 요소가 부족할 경우 **`src/components/atoms/` 원자를 먼저 확장/생성한 뒤** 블록을 구현.
2. **디자인 토큰 수칙**:
   * Pure Clean White (`#FFFFFF`) / Slate Black (`#0F172A`) / Sky Cyan (`#0284C7`) / 1px Line (`border-slate-200`).
   * 이미지: `AtomImage01` 사용 (`object-fit: cover`, EXIF 회전 보정, `unoptimized` DataURL 지원).

### 2.3 WYSIWYG, Zod 인풋 스펙 & 액션 핸들러 수칙 (`builder-wysiwyg-agent.md`, `types/index.ts`, `useActionHandler.ts`)
1. 모든 블록은 `interface Props { config: BlockInputConfig; isPreview?: boolean; onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void }` 규격을 엄격 준수.
2. `BlockInputConfigSchema` (`src/types/index.ts`) 규격과 100% 호환되는 Zod 데이터 모델링.
3. 범용성 및 유연성이 확보된 톤앤매너 및 디폴트 옵션 구성.
4. 미리보기 시 시뮬레이션(Mock Toast)과 배포 시 실제 동작은 `useActionHandler` 공통 액션 엔진을 이용하며, 배포 사이트에 목데이터가 노출되지 않도록 전적으로 엔진에 위임.
### 2.4 범용 다목적 블록(Versatile Block) 구현을 위한 5대 절대 수칙 (Guardrails)
1. **데이터 스키마(Zod) 철저한 추상화**: 도메인 종속적 변수명 사용 엄격히 금지.
   * ❌ 지양: `trainerName`, `classTime`, `pricePerMonth`
   * ⭕ 지향: `title`, `subTitle`, `primaryValue`, `description`
2. **블록 명명 규칙(Naming Convention) 강제**: 파일명 및 컴포넌트 명칭에 `fitness`, `salon`, `cafe` 등 도메인 단어 포함 절대 금지. 오직 형태나 범용 기능(`hero`, `grid`, `list`, `card`, `calendar` 등)으로만 명명.
3. **순수 UI 컴포넌트(Dumb Block) & 액션 방출(Emit) 원칙**: 블록 내부에서 API(fetch 등) 직접 호출이나 특정 도메인 상태 관리 등 비즈니스 로직 처리 절대 금지. 오직 부모로부터 전달받은 `config`를 렌더링하고, 버튼/폼 클릭 시 `onAction?.(config, formData)` 이벤트만 방출(Emit)해야 함.
4. **컨테이너-슬롯(Slot) 조립 지향**: 복잡한 섹션 구성 시 거대한 단일 블록을 만들지 말고, 레이아웃(컨테이너) 블록 안에 텍스트 블록이나 이미지 블록을 중첩 배치할 수 있는 **컨테이너-슬롯 조립 방식**을 권장.
5. **이중 반응형 렌더링 (Double-Responsive) 필수**: 하드코딩된 width나 padding 사용을 엄격히 금지. 반드시 `src/lib/blockLayout.ts`의 `getBlockLayout` 및 `getResponsiveGridCols` 헬퍼를 사용하여 유저 설정(`config.containerWidth`, `config.paddingY`)에 맞게 반응형 클래스가 자동 적용되도록 구현해야 함.

---

## 🛠️ 3. Step-by-Step 프로젝트 분석 및 블록 구축 프로토콜

```mermaid
graph TD
    A[1. 유저 지정 프로젝트/서비스 분석] --> B[2. 서비스 필수 블록 청사진 List-Up]
    B --> C[3. 기존 블록 매핑 & 재사용성 판별]
    C -- 기존 블록으로 해결 가능 -- > D[기존 블록/원자 기능 고도화 & 수정]
    C -- 미존재/신규 필요 -- > E[4. 원자 100% 조합 기반 신규 블록 생성]
    D --> F[5. BuilderCanvas & page.tsx 등록 연동]
    E --> F
    F --> G[6. 본질적 자동화 유닛/통합 테스트 작성 & 실행]
    G -- 성공 -- > H[7. 3-Way 문서 동기화 & 최종 완료 보고]
```

### 1단계: 유저 프로젝트 분석 및 범용 블록 청사진(List-Up) 도출
* 사용자가 요청한 대상 서비스(예: *"피트니스 클럽 웹사이트"*)를 파악.
* 해당 웹사이트의 요구사항을 **특정 도메인에 종속되지 않는 범용적인 다목적 블록들의 조합**으로 분해하여 리스트업:
  * ❌ 지양 (도메인 종속적): `피트니스 전용 스케줄러 블록`, `헬스장 강사진 소개 블록`
  * ⭕ 지향 (범용적/다목적): `범용 캘린더/타임슬롯 블록`, `범용 프로필 카드 그리드 블록`, `다목적 가격표 블록`, `범용 갤러리 블록`

### 2단계: 기존 블록 매핑 및 범용 신규 블록 판별
* **경로 A (기존 블록 수정/고도화)**: 기존 범용 블록(`blk_consulting_slot_01`, `blk_pricing_01` 등)의 Props/Variant(예: 테마 색상, 라벨 텍스트 변경 기능 등)를 보완하여 해결 가능한 경우, 우선적으로 기존 블록을 고도화하여 재사용성을 극대화.
* **경로 B (신규 블록 생성)**: 기존 자산으로 구성 불가능한 경우 신규 블록을 생성하되, 특정 서비스에 국한되지 않도록 **가장 추상화된 형태의 최소 기능 범용 블록(`blk_[범용기능명]_01.tsx`)**으로 기획하고 `src/components/atoms/` 조합으로 구현.

### 3단계: 빌더 시스템 2곳 연동
1. `src/components/builder/BuilderCanvas.tsx` 내 `BlockRegistry`에 블록 컴포넌트 매핑 등록.
2. `src/app/builder/page.tsx` 내 `ALL_BLOCKS` 팔레트 배열에 필수 메타데이터(`id`, `name`, `tier`, `icon`, `desc`)를 포함하여 완벽하게 등록.

---

## 🧪 4. 검증 및 테스트 수칙 (본질적 테스트 엄수)

> [!IMPORTANT]
> 단위 테스트는 단지 빌드 통과용 '가라(Dummy) 테스트'를 작성해서는 안 됩니다.
> 해당 프로젝트에 도출된 블록들이 연속 캔버스 상에서 충돌 없이 결합되는지, 0.01초 Zod 인풋 데이터 갱신이 안전하게 동작하는지 **실질적 테스트 코드**를 작성하고 실행해야 합니다.

### 필수 테스트 항목 (`src/__tests__/project-[서비스명].test.ts`)
1. **프로젝트 블록 세트 연속 캔버스 조립 테스트**:
   * `canvasBlocks` 배열에 도출된 블록 리스트 전체를 연속 배치했을 때 React Key 충돌, 인스턴스 ID 꼬임, 렌더링 에러가 0%임을 증명.
2. **0.01초 Zod 인풋 데이터 갱신 및 유효성 방어 테스트**:
   * 인풋 수정 시 Store 상태가 0.01초 내 갱신되고 타입 안전성이 유지되는지 검증.
3. **실행 명령**:
   * `npx tsx src/__tests__/project-[서비스명].test.ts` 및 `npx tsc --noEmit` 실행을 통해 100% 통과 실증.

---

## 📄 5. 완료 체크리스트 (3-Way 동기화)

- [ ] 지정 프로젝트 서비스의 필수 블록 청사진(List-Up) 도출 완료
- [ ] 기존 블록/원자 수정·고도화 및 신규 블록(100% 원자 조합) 제작 완료
- [ ] `BuilderCanvas.tsx` 및 `page.tsx` 연동 등록 완료
- [ ] `src/__tests__/project-[서비스명].test.ts` 작성 및 본질적 유닛 테스트 100% 통과
- [ ] TypeScript 컴파일 (`npx tsc --noEmit`) 에러 0건 확인
- [ ] 3-Way 기획/AI 문서 최신화 및 완료 보고
