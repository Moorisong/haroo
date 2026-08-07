# 🧩 하루(Haroo) 신규 블록 생성 Sub-Agent 지침 (Block Creator Sub-Agent Reference)

본 문서는 사용자가 신규 블록 추가를 요청했을 때, 프로젝트의 모든 컨벤션과 규격을 100% 준수하여 에러 없는 블록을 자율적으로 조립, 연동, 검증하기 위해 실행하는 AI 서브에이전트 전용 개발 지침서입니다.

---

## 📋 1. 역할 및 서브에이전트 실행 목적 (Agent Identity & Trigger)

* **실행 트리거**: 사용자가 *"O, X 블록을 추가해 줘"* 혹은 *"신규 블록 Y를 만들어 줘"* 라고 명령할 때 본 지침서를 로드하여 실행.
* **주요 목표**:
  1. 100% 원자 컴포넌트(`src/components/atoms/*`) 조합만으로 구성된 완제 블록(`src/components/blocks/blk_*.tsx`) 생성.
  2. 필요 시 원자 컴포넌트 추가/수정 선행.
  3. `BlockRegistry` 및 `ALL_BLOCKS` 빌더 팔레트 목록에 연동.
  4. 기존 타 블록과의 100% 조립 호환성 및 독립 에러 방어를 실질적 단위 테스트 코드 실행으로 철저히 검증.

---

## 📐 2. 프로젝트 통합 코드 & 디자인 컨벤션 (All Core Specifications)

### 2.1 3-Way 동기화 및 핵심 코드 수칙 (`ConventionsCoreRules.md`)
1. **3-Way 동기화**: 코드 작성 + 본질적 테스트 작성/실행 + 문서(기획서/AI지침) 업데이트 3개 항목을 완벽 완수한 뒤 사용자에게 보고.
2. **파일 당 300줄 제한**: 모든 컴포넌트 및 테스트 코드 파일은 300줄을 절대 초과하지 않도록 모듈화.
3. **코드 품질**: 사용하지 않는 변수 제거, 반복 리터럴 상수화, 런타임 타입 안전성(Zod) 보장.
4. **한국어 응답 수칙**: 대답, 문서, 계획서, 완료 보고서 모두 100% 한국어로 작성.

### 2.2 Atomic 디자인 토큰 & 조립 수칙 (`atomic-blocks-agent.md`, `haroo-frontend-components.md`)
1. **100% 원자 컴포넌트 조립 철칙**:
   * 블록 파일 내에서 커스텀 HTML 생태그(`<section>`, `<form>`, `<textarea>`, `<input>`, `<button>`, `<label>` 등) 직접 사용 **절대 금지**.
   * 반드시 `src/components/atoms/` 아래의 원자 컴포넌트(`AtomCard01`, `AtomText01`, `AtomBtn01`, `AtomInput01`, `AtomTextarea01`, `AtomBadge01`, `AtomDivider01`, `AtomIcon01`, `AtomAccordion01`, `AtomCounter01`, `AtomAvatar01`, `AtomRating01`, `AtomProgress01`, `AtomDropdown01`, `AtomSwitch01`, `AtomChip01`, `AtomTabs01`, `AtomTooltip01`, `AtomCheckbox01`, `AtomLabel01` 등)만을 레고 조립(Composition)하여 구현.
   * 블록 제작 중 새로운 표현 요소나 속성이 필요할 경우, **`src/components/atoms/`에 원자 컴포넌트를 먼저 신규 생성하거나 기존 원자 컴포넌트를 확장한 뒤** 블록을 구현할 것.
2. **디자인 토큰 수칙**:
   * Pure Clean White (`#FFFFFF`) / Slate Black (`#0F172A`) / Sky Cyan (`#0284C7`) / 1px Line (`border-slate-200`).
   * 이미지: `AtomImage01` 사용 (EXIF 회전 보정, `object-fit: cover`, `aspect-video` / `aspect-square` 적용).

### 2.3 WYSIWYG & Zod 인풋 스펙 수칙 (`builder-wysiwyg-agent.md`, `types/index.ts`)
1. **Props 규격**:
   * 모든 블록 컴포넌트는 `interface Props { config: BlockInputConfig }` 규격을 엄격 준수.
   * `config`에서 `title`, `subtitle`, `buttonText`, `backgroundColor`, `textColor` 등 필요 옵션을 디폴트 값과 함께 안전하게 Destructuring하여 사용.
2. **Zod Validation 통과**:
   * `BlockInputConfigSchema` (`src/types/index.ts`) 규격에 부합하도록 데이터를 구성하여 Zustand `updateBlockInputData` 0.01초 단방향 동기화와 100% 호환되게 제작.
3. **네이밍 및 톤앤매너 통일성**:
   * 파일명: `src/components/blocks/blk_[기능명]_01.tsx` (예: `blk_review_01.tsx`)
   * 블록 ID: `blk_[기능명]_01`
   * 디폴트 문구 및 옵션 구성: 기존 블록(`blk_hero_01`, `blk_form_01` 등)과의 디자인 톤앤매너 및 통일성 유지.

---

## 🛠️ 3. Step-by-Step 신규 블록 개발 프로토콜

```mermaid
graph TD
    A[1. 유저 블록 요구사항 분석] --> B[2. 원자 컴포넌트 충족 여부 검토]
    B -- 부족 시 --> C[원자 컴포넌트 신규/수정 생성]
    B -- 충족 시 --> D[3. blk_*.tsx 블록 구현 (원자 100% 조합)]
    C --> D
    D --> E[4. BuilderCanvas.tsx BlockRegistry 등록]
    E --> F[5. app/builder/page.tsx ALL_BLOCKS 팔레트 등록]
    F --> G[6. 본질적 자동화 테스트 코드 작성 & 실행]
    G -- 실패 시 --> D
    G -- 성공 시 --> H[7. 3-Way 문서 동기화 & 사용자 보고]
```

### 1단계: 원자 컴포넌트 검토 및 준비
* 요구받은 블록 디자인을 표현하기 위한 원자 컴포넌트가 `src/components/atoms/`에 모두 존재하는지 파악.
* 부족할 경우 `atom_[요소명]_01.tsx` 원자 컴포넌트를 새로 생성하거나, 기존 원자 컴포넌트의 Props/Variant를 확장한 후 블록 제작에 착수.

### 2단계: 신규 블록 파일 생성 (`src/components/blocks/blk_[기능명]_01.tsx`)
* 파일당 300줄 이내 작성.
* `export default function Blk[기능명]01({ config }: Props)` 형태로 작성.
* HTML 생태그 없이 100% 원자 컴포넌트로만 구조 완성.

### 3단계: 빌더 시스템 2곳 필수 등록
1. `src/components/builder/BuilderCanvas.tsx`:
   * `import Blk[기능명]01 from '@/components/blocks/blk_[기능명]_01'`
   * `BlockRegistry` 객체에 `blk_[기능명]_01: Blk[기능명]01` 추가 등록.
2. `src/app/builder/page.tsx`:
   * `ALL_BLOCKS` 배열에 `{ id: 'blk_[기능명]_01', name: '[한글 블록명]', tier: '[STARTER|STANDARD|PROFESSIONAL]', icon: [LucideIcon], desc: '[설명 문구]' }` 등록.

---

## 🧪 4. 검증 및 테스트 수칙 (본질적 테스트 엄수)

> [!IMPORTANT]
> 테스트 코드는 단지 빌드 통과용 '가라(Dummy) 테스트'를 작성해서는 안 됩니다.
> 타 블록과의 연속 조립 호환성, Zustand 스토어 데이터 갱신, Zod 유효성 검증, 독립 렌더링을 실제로 검증하는 **본질적 의미의 테스트 코드**를 작성하고 자동 실행해야 합니다.

### 필수 테스트 항목 (`src/__tests__/blk_[기능명]_01.test.ts`)
1. **타 블록과의 100% 조립 호환성 테스트**:
   * `canvasBlocks` 배열에 기존 블록(`blk_hero_01`, `blk_form_01` 등)과 신규 블록을 함께 배치하여 인스턴스 ID 및 렌더링 충돌 없이 조립되는지 검증.
2. **0.01초 Zod 인풋 데이터 갱신 테스트**:
   * `updateBlockInputData(instanceId, newConfig)` 호출 시 스토어 상태가 즉시 갱신되는지 검증.
3. **Zod 유효성 방어 및 예외 처리 테스트**:
   * 올바르지 않은 타입 데이터 주입 시 시스템 붕괴 없이 안전하게 처리되는지 검증.
4. **실행 및 결과 확인**:
   * `npx tsx src/__tests__/blk_[기능명]_01.test.ts` 및 `npx tsc --noEmit` 실행을 통해 통과 실증.

---

## 📄 5. 완료 체크리스트 (3-Way 동기화)

- [ ] `src/components/atoms/` 원자 컴포넌트 충족 확인 (필요시 추가/수정 완료)
- [ ] `src/components/blocks/blk_[기능명]_01.tsx` 100% 원자 조립 및 300줄 이내 작성 완료
- [ ] `src/components/builder/BuilderCanvas.tsx` 내 `BlockRegistry` 등록 완료
- [ ] `src/app/builder/page.tsx` 내 `ALL_BLOCKS` 팔레트 목록 등록 완료
- [ ] `src/__tests__/blk_[기능명]_01.test.ts` 작성 및 본질적 검증 실행 통과 완료
- [ ] 타입 검사 (`npx tsc --noEmit`) 에러 0건 확인
- [ ] 3-Way 문서 동기화 및 사용자 완료 보고
