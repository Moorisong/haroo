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
* **HeaderNav & Footer**: 로고, 45종 블록 소개, 가격 안내, 내 저장소 버튼, [5분 만에 만들기] CTA, 푸터 최하단 copyright 옆 [Admin] 텍스트 링크, [이용약관], [개인정보 처리방침] 링크 및 `CompanyLegalFooter` (상호명, 대표자, 사업자번호, 통신판매신고, 주소 명시로 PG 결제 심사 100% 통과).
* **HeroSection**: '일반 웹사이트부터 앱처럼 묵직하게 구동되는 모바일 웹앱(PWA)까지 5분 만에 완성!' 메인 타이틀 + '스마트폰 바탕화면에 내 매장 바로가기 앱 아이콘이 쏙 생기고, 카톡 알림까지 연동됩니다' 서브 카피.
* **PwaInstallGuideModal**: 이원화 PWA 3초 바탕화면 설치 안내 모달.
  * **대상 A (사장님)**: haroo.site 자체를 스마트폰 바탕화면에 설치하여 1초 만에 마이페이지/캔버스 진입 유도.
  * **대상 B (매장 고객)**: mybrand.haroo.site 매장 사이트를 스마트폰 바탕화면에 설치하여 1초 만에 예약 진입 유도 (iOS Safari 공유 버튼 & Android Chrome 1초 추가 팝업).
* **RealisticCostComparisonTable**: 외주 300~500만 원 vs 하루 99,000원 비교표 및 PWA 통합 혜택 단가 비교표.
* **MandatoryPwaTransparencyNotice**: '하루(Haroo) 서비스로 제작되는 결과물은 네이티브 앱이 아닌 최신 PWA 모바일 웹앱 기술로 제작됩니다' 투명 고지 뱃지.
* **BlockShowcase & PricingGrid**: 45종 마스터 블록 카테고리별 데모 & 제작비/구독료 카드 디스플레이.

### 2. 소셜 로그인 페이지 (`/login`)
* **SocialLoginCard**: 카카오 1초 간편 로그인 및 구글 로그인 버튼. Supabase OAuth 연동.

### 3. 블록 조립 캔버스 모드 (`/builder`)
* **프로젝트 생성 및 모드 확정 (`ProjectTypeSelectionModal`)**:
  * 빌더 최초 진입 시 **[🌐 반응형 웹] vs [📱 PWA 모바일 앱]** 선택 모달을 띄워 유저의 제작 목적을 최초 1회 명확히 확정.
  * **[📱 PWA 모바일 앱] 확정 시**: 상단 뷰포트 스위처를 전면 제거하고 오직 모바일 디바이스 프레임(상단 상태바 & 하단 홈 바) 캔버스로 고정되어 모바일 앱 구축에 몰입.
  * **[🌐 반응형 웹] 확정 시**: 데스크톱(1200px), 태블릿(768px), 모바일(375px) 뷰포트 전환 스위처가 활성화된 반응형 캔버스 제공.
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
