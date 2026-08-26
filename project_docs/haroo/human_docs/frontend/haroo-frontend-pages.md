# 📱 [하루 (haroo)] 휴먼 기획서: 프론트엔드 페이지 & 전체 UX 흐름

본 문서는 **미키 사업_v3** 기획 원문의 전체 1~9번 라우팅 페이지별 UI/UX 구성, 사용자 퍼널, PWA 고지, 결제 차단 및 어드민 조치 UX 흐름을 인간 기획자/개발자 관점에서 100% 명세한 기획 문서입니다.

---

## 🎯 1. 전체 라우팅 페이지 및 4단계 유저 퍼널 (User Funnel)

하루(haroo) 플랫폼은 **[결제 전 무료 체험 ➔ 결제 ➔ 무인 배포 ➔ 무제한 수정]** 4단계 퍼널로 구동됩니다.

```text
[1. 랜딩 페이지 (/)] ➔ [2. 소셜로그인 (/login)] ➔ [3. 블록 조립 캔버스 (/builder)]
                                                             │ (유저 조립 & 500ms Debounce 저장)
                                                             ▼
[5. 관제 배포 (/order/status)] ◄─ [4. 포트원 결제 (/checkout)] ◄─ [약관동의 / 차단 모달]
           │ (XTerm terminal 5단계 중계)
           ▼
[6. 마이페이지 (/dashboard)] ➔ [7. 어드민 관제 (/admin)]
[8. 약관 (/terms)] / [9. 개인정보 (/privacy)]
```

---

## 🖥️ 2. 페이지별 세부 UI/UX 구성 명세

### 1. 메인 랜딩 페이지 (`/`)
* **HeaderNav & Footer**: 로고, 이용 방법(#guide), 서비스 특징(#why), 활용 사례(#usecases), 가격 안내(#pricing), 내 저장소 버튼, 세련된 뱃지 스타일 로그인 버튼, [5분 만에 만들기] CTA, 푸터 최하단 copyright 옆 [Admin] 텍스트 링크, [이용약관], [개인정보 처리방침] 링크 및 `CompanyLegalFooter` (상호명, 대표자, 사업자번호, 통신판매신고, 주소 명시로 PG 결제 심사 100% 통과).
* **HeroSection**: '원하는 블록 톡톡 꽂으면 나만의 스마트폰 웹 & 앱 5분 완성' 메인 타이틀 + CTA 버튼 + 하단 `MandatoryPwaTransparencyNotice` (PWA 기술 1줄 요약 고지 뱃지) & `BlockAssemblyAnimation` 통합 디스플레이.
* **PwaInstallGuideModal**: 이원화 PWA 3초 바탕화면 설치 안내 모달.
  * **대상 A (사장님)**: haroo.site 자체를 스마트폰 바탕화면에 설치하여 1초 만에 마이페이지/캔버스 진입 유도.
  * **대상 B (매장 고객)**: mybrand.haroo.site 매장 사이트를 스마트폰 바탕화면에 설치하여 1초 만에 예약 진입 유도 (iOS Safari 공유 버튼 & Android Chrome 1초 추가 팝업).
* **RealisticCostComparisonTable**: 외주 300~500만 원 vs 하루 99,000원 비교표 및 PWA 통합 혜택 단가 비교표.
* **PricingGrid**: 직관적 3대 제작비(STARTER/STANDARD/PROFESSIONAL) 플랜 카드 & 구독료 안내 & 수정 비용 정책 명세.

### 2. 소셜 로그인 페이지 (`/login`)
* **SocialLoginCard**: 카카오 1초 간편 로그인 및 구글 로그인 버튼. Supabase OAuth 연동. 일반 로그인 시 메인 페이지(`/`)로 이동하며, '내 저장소' 클릭 로그인 시에만 마이페이지(`/dashboard`)로 핀포인트 이동.

### 3. 블록 조립 캔버스 모드 (`/builder`)
* **프로젝트 생성 및 모드 확정 (`ProjectTypeSelectionModal` & `SiteTemplateSelectionModal`)**:
  * 빌더 최초 진입 시 **[🌐 반응형 웹] vs [📱 PWA 모바일 웹앱]** 선택 모달을 띄워 유저의 제작 목적을 최초 1회 명확히 확정.
  * **2단계 스타트 템플릿 선택 모달 (`SiteTemplateSelectionModal`)**:
    * 1단계 선택 후 유저에게 "어떤 사이트를 만드시나요?"(회사/브랜드 소개, 모바일 이벤트/청첩장, 포트폴리오, 자유 구성 등) 2단계 질문을 노출.
    * 유저가 선택한 템플릿 정보는 드래프트 DB 및 어드민 관제 통계 데이터로 자동 기록됨.
  * **다중 페이지(Multi-Page) 및 비전문가 쉬운 라우팅 UX**:
    * 전문 용어(Route, Slug) 대신 **'새 화면', '화면 이동'** 등 직관적 한국어 표기 사용.
    * 빌더 상단 **`[ 🏠 메인 화면 ▾ ]` 스위처**를 통해 '새 화면 추가' 및 화면 자유 이동 지원.
    * 버튼/링크 블록 속성 편집 시 **'이 버튼을 누르면 어디로 가나요?'**에서 생성된 내 사이트 다른 화면 목록을 클릭 한 번으로 선택 연동.
  * **[📱 PWA 모바일 웹앱] 확정 시**: 상단 뷰포트 스위처를 전면 제거하고 오직 모바일 디바이스 프레임(상단 상태바 & 하단 홈 바) 캔버스로 고정되어 모바일 앱 구축에 몰입.
  * **[🌐 반응형 웹] 확정 시**: 데스크톱(1200px, 메인 편집) 스위처와 태블릿(768px, 미리보기), 모바일(375px, 미리보기) 스위처를 제공하며, 태블릿/모바일 선택 시 반응형 결과 확인 전용 안내 뱃지 및 툴팁을 제공하여 데스크톱 캔버스 중심의 편집 UX 안내.
* **FreeCustomizationRule**: 결제 전 유저 조립 및 500ms debounce DB 무료 저장 (`UserProjectDraft`).
* **CrossPlatformDndProtocol**: `PointerSensor`(PC 0ms) + `TouchSensor`(모바일 150ms long-press, 5px tolerance) 이원화 듀얼 센서 적용.
* **수정 미터기 UX**: 실시간 수정 가격 연산 뱃지 (`[수정 추가 비용: 0원]`, `[티어 차액: +100,000원]`, `[DB 수수료: +10,000원]`).

### 4. 포트원 결제 주문 페이지 (`/checkout` & `/checkout/success`)
* **TermsAgreementCheckbox**: 결제 버튼 상단 필수 약관 동의 체크박스 강제 연동 ([이용약관], [개인정보 처리방침] 링크).
* **WaitlistPrePaymentModal**: 대표님이 어드민에서 선택지 2(Waitlist Mode) 클릭 시, 51번째 유저 결제 진입 전 차단 팝업 디스플레이.
* **PaymentVerifyFallback**: 결제 완료 후 `POST /api/payments/verify` 직접 승인 조회 이중 안전장치.

### 5. 5단계 무인 샌드박스 배포 관제 페이지 (`/order/status`)
* **SandboxTerminal**: XTerm.js 터미널을 통해 SSE(`/api/build-logs/stream`) 5단계 검증 stdout 실시간 중계.

### 6. 유저 프로젝트 마이페이지 (`/dashboard`)
* **CustomDomainDrawer**: 커스텀 도메인 CNAME 안내 (target.haroo.site) + 5초 DNS Polling 로딩 모듈 및 '가비아/후이즈 CNAME 전파 중입니다' 팁 디스플레이.

### 7. 어드민 통계 관제 페이지 (`/admin`)
* **AdminAuthModal**: 메인 푸터 [Admin] 클릭 시 비밀번호 검증 팝업.
* **AdminChoiceActionPanel**: 회로차단 시 대표님 2대 조치 (선택지 1: 한도 20대 확장 + n차 카톡 대량발송 / 선택지 2: Waitlist 모드 켜기).
* **AWS 정산 & 4단계 퍼널 & Top 20 인기 블록**: 손익 계산 및 랭킹 차트 표출.

### 8. 서비스 이용약관 (`/terms`) & 9. 개인정보 처리방침 (`/privacy`)
* **Pure White 1px border 미니멀 목차**: /terms (제1~8조, Math.ceil 환불 연산 공식 포함) & /privacy (제1~5조, 90일 TTL 파기, 제3자 위탁 수칙 포함).
