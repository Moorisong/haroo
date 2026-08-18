# 🧩 [하루 (haroo)] 휴먼 기획서: 프론트엔드 컴포넌트 & 디자인 시스템

본 문서는 **미키 사업_v3** 기획 원문에 명시된 Zustand 전역 상태, Custom Hooks, 20종 완제 프론트엔드 컴포넌트 스펙, 20종 원자 컴포넌트 및 Tailwind Plus 디자인 시스템 토큰을 명세한 기획 문서입니다.

---

## 🎨 1. 디자인 시스템 & UI UX 컨벤션 (Tailwind Plus Master Spec)

### 핵심 디자인 원칙 & 토큰

* **Pure Clean White (`#FFFFFF`)**: 순백색 백그라운드 기본 적용 (과도한 글래스모피즘 전면 배제).
* **Crisp 1px Line (`border-slate-200` / `border-slate-800`)**: 디바이스 및 구획 분리용 1px 단색 보더 라인.
* **Primary Accent Slate Black (`#0F172A`)**: 메인 텍스트 및 대표 버튼 전용 Slate Black.
* **Secondary Sky Cyan (`#0284C7`)**: 강조 뱃지 및 액티브 포커스 라인 전용 Sky Cyan.
* **Kakao Alert Yellow (`#FEE500`)**: 어드민 1초 카톡 대량 발송 버튼 전용 옐로우.
* **이미지 찌그러짐 0%**: `object-fit: cover`, `object-position: center`, `aspect-video` / `aspect-square` 적용. EXIF 회전 보정.

---

## 🛒 2. Zustand 전역 상태 & Custom Hooks 명세

1. **`stores/useBuilderStore.ts`**: `pages` (다중 페이지 구조), `activePageId` (현재 편집 중인 화면), `selectedBlocks`, `activeBlockId`, `globalFont`, `themeColor`, `isEditingMode`, `revisionDeltaAmount` 관리. 추가로 WYSIWYG 렌더링을 위한 `deviceViewport` ('mobile' | 'tablet' | 'desktop'), `isPreviewMode`, 및 0.01초 단방향 Zod 동기화 업데이트 메서드(`updateBlockInputData`)를 포함.
2. **`hooks/useDraftAutoSave.ts`**: 500ms debounce 연동 Supabase DB 자동 저장 처리 (`UserProjectDraft`). `localStorage` 사용 전면 금지.
3. **`hooks/useRevisionPriceCalculator.ts`**: 원본 config 대비 티어 차액 및 DB 수수료 실시간 연산.

---

## 📦 3. 20종 완제 프론트엔드 모듈 명세

1. **`CompanyLegalFooter.tsx`**: 랜딩/푸터 최하단 상호명, 대표자명, 사업자번호, 통신판매신고번호, 주소 디스플레이 (PG 결제 심사 100% 승인 지원).
2. **`PwaInstallGuideModal.tsx`**: 하루 메인 및 유저 매장 2가지 대상 iOS Safari / Android Chrome 3초 아이콘 추가 팝업.
3. **`TermsPage.tsx`**: Pure White 1px border 목차, PWA 고지, Math.ceil 환불 공식 연동 페이지.
4. **`PrivacyPage.tsx`**: 90일 TTL 파기, 제3자 위탁 수칙 연동 페이지.
5. **`RealisticCostComparisonTable.tsx`**: 외주 300~500만 원 vs 하루 99,000원 비교표 컴포넌트.
6. **`MandatoryPwaTransparencyNotice.tsx`**: 'PWA 모바일 웹앱 기술로 제작됩니다' sky-600 알약 뱃지 컴포넌트.
7. **`TouchDndProvider.tsx`**: PC PointerSensor(0ms) + 모바일 TouchSensor(150ms long-press, 5px tolerance) 듀얼 센서 모듈.
8. **`FormSubmissionViewer.tsx`**: blk_form_01 및 blk_consulting_slot_01 접수 데이터 SheetJS 엑셀/CSV 1초 다운로드.
9. **`CustomDomainDrawer.tsx`**: CNAME 안내, 5초 DNS Polling 로딩 모듈 및 가비아/후이즈 CNAME 팁 표출.
10. **`TermsAgreementCheckbox.tsx`**: /checkout 결제 창 필수 약관 동의 미체크 시 결제 차단.
11. **`WaitlistModal.tsx`**: 51번째 유저 결제 차단 및 2차 오픈 알림 휴대폰 번호 수집 모달.
12. **`AdminChoiceActionPanel.tsx`**: 어드민 선택지 1 & 2 전용 버튼 랙.
13. **`WaitlistKakaoBroadcastBtn.tsx`**: n차 서버 증설 승인 시 대기 유저 전원 카톡 알림톡 1초 대량 발송 모듈.
14. **`NotificationQuotaPanel.tsx`**: blk_talk_01 알림톡 월 100건 무료 쿼터 차감 및 LMS/SMS 우회 스위치.
15. **`GuestbookFeed.tsx`**: blk_guestbook_01 축하 피드 실시간 렌더링 및 삭제.
16. **`KakaoSdkLoader.tsx`**: Kakao JS SDK 비동기 로더.
17. **`OpenGraphMetaEditor.tsx`**: 카톡 공유 썸네일/초대 문구 OG 메타태그 실시간 편집기.
18. **`DigitalStampModal.tsx`**: blk_stamp_card_01 10회 도장 찍기 & 쿠폰 팝업.
19. **`CouponIssuerDrawer.tsx`**: blk_coupon_01 시리얼 난수 번호 발급 모듈.
20. **`AdminAuthModal.tsx`**: 푸터 [Admin] 클릭 시 비밀번호 인증 팝업.
21. **`BuilderCanvas.tsx`**: WYSIWYG 실물 렌더링 및 `1px indigo-500` 포커스 스타일 적용 캔버스.
22. **`ViewportSwitcher.tsx`**: 확정된 프로젝트 모드(`WEB` vs `PWA`)를 상단에 표출. `WEB` 모드일 때 `데스크톱 (편집 메인)`, `태블릿 (미리보기)`, `모바일 (미리보기)` 라벨 스위처를 제공하며, 유저가 직관적으로 동작을 검증할 수 있는 **강조 애니메이션 버튼('사이트 동작 테스트 하기' / '다시 화면 편집하기')** 제공.
23. **`ProjectTypeSelectionModal.tsx`**: 빌더 신규 진입 시 반응형 웹 vs PWA 모바일 앱 선택 카드를 띄워 제작 목적을 확정하는 1단계 모달 컴포넌트.
24. **`SiteTemplateSelectionModal.tsx`**: 1단계 선택 후 "어떤 사이트를 만드시나요?" 등 스타트 템플릿/목적을 선택하고 어드민 데이터로 저장하는 2단계 모달 컴포넌트.
25. **`SidePropertyPanel.tsx`**: 우측 슬라이드 오픈 듀얼 인풋 에디팅 사이드 컨트롤러 (폰트/색상/영상URL/폼수집항목 실시간 제어).
    * **블록별 맞춤 속성 필터링 (`BLOCK_CAPABILITIES`)**: 자유 텍스트(`blk_txt_01`)는 버튼/이미지 업로드가 노출되지 않고, 동영상 블록(`blk_video_01`)은 비디오 URL만 노출되는 등 블록의 실제 기능 및 필요 속성만 스마트 렌더링.
    * **버튼 스마트 액션 패널 (Progressive Disclosure)**:
      * `actionType` 드롭다운 (11가지 다중 옵션 지원: 화면이동, 외부링크, 전화걸기, 폼제출, PG결제, 모달팝업, 스크롤, 파일다운로드, 주소복사, 커스텀인터랙션 등).
      * 선택된 `actionType`에 따라 하위 세부 입력창이 단계적으로 노출됨 (예: 폼 제출 선택 시 카톡 알림 체크박스 노출).
      * **고급 설정**: `CUSTOM_INTERACTION` 선택 시 캔버스 타겟 블록 지정 및 `customCode` (JS) 에디터 제공.
    * **패널 세부 서브 모듈**: `PanelContentTab`, `PanelStyleTab`, `PanelActionTab`, `TextPropertyPanel`, `ButtonPropertyPanel`, `BackgroundPropertyPanel` (배경 유형 [단색 색상 vs 배경 사진] 토클 탭, 로컬 사진 파일 업로드 지원, 배경 사진 드래그 조율 가이드 표출 및 히어로/블록 가로폭 옵션 제거), `PanelRepeaterField`.
26. **`FloatingQuickToolbar.tsx`**: 선택된 블록 상단에 표시되는 퀵 설정 바 (위로 이동, 아래로 이동, 복제, 삭제).
27. **`UnsavedLeaveWarningModal.tsx`**: 미저장 변경사항 존재 시 페이지 이탈 방지 경고 모달.
28. **`SmartGuide.tsx` & `SnapGridCanvas.tsx`**: 캔버스 내 스마트 스냅 가이드라인 및 그리드 시스템 모듈.
29. **`BlockResizeHandles.tsx`**: 블록 드래그/리사이즈 조작 핸들러 모듈.
30. **`PageSwitcher.tsx` & `ProjectSwitcher.tsx`**: 다중 페이지 및 멀티 프로젝트 전환 컨트롤러.

---

## 🧱 4. 1계층 20종 원자 컴포넌트 (Atomic Components)

* `atom_text_01` ~ `atom_spinner_01` 총 20종 원자 컴포넌트 (자유 텍스트, 단일 이미지, 범용 버튼, 폼 입력 필드, 장문 필드, 뱃지, 구분선, 아이콘, 카운터, 아바타, 카드 프레임, 체크박스, 별점, 프로그레스바, 드롭다운, 스위치, 칩, 탭메뉴, 툴팁, 스피너).
* **원자 재사용 수칙**: 마스터 45종 블록은 커스텀 HTML 태그를 사용하지 않고 20종 원자 컴포넌트를 100% 레고 조립(Composition)하여 제작.
