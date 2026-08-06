# 🏗️ [하루 (haroo)] 휴먼 기획서: 인프라, 비즈니스 요금 & 아키텍처

본 문서는 **미키 사업_v3** 백엔드 인프라, 요금 정산, 환불 수학 공식, 회로차단기, Docker/S3/Caddy 아키텍처 및 무단 롤링 업데이트 규격을 명세한 기획 문서입니다.

---

## 💰 1. 비즈니스 요금, 이벤트 패스 & 무인 환불 공식

### 블록 티어별 제작비 단가표 ( 일시불 )
* **STARTER 티어 (99,000원)**: Starter 15종 블록, 무제한 무료 수정, haroo.site 기본 서브도메인.
* **STANDARD 티어 (199,000원)**: Starter + Standard 25종 블록 (예약/문의 폼, 카톡/LMS), 커스텀 도메인 무상 매핑.
* **PROFESSIONAL 티어 (299,000원)**: 전체 45종 블록 (소셜로그인, PG결제, 통계), 커스텀 도메인 & 무제한 SSL 자동 발급.

### 구독료 & 이벤트 패스
* **구독료**: 1개월(29,000원/월), 3개월(10% 할인, 78,000원), 6개월(20% 할인, 138,000원), 12개월(30% 할인, 240,000원).
* **이벤트 패스**: 1개월 패스 (30,000원 일시불 / EC2 원가 4,080원 / 마진 86.4%), 3개월 패스 (50,000원 일시불 / EC2 원가 12,240원 / 마진 75.5%).

### 100% 무인 환불 수학 공식 코드
```javascript
function calculateRefundAmount(totalPaidAmount, totalMonths, elapsedDays) {
  const usedMonths = Math.ceil(elapsedDays / 30);
  if (usedMonths >= totalMonths) return 0;
  const monthlyRate = totalPaidAmount / totalMonths;
  const remainingMonths = totalMonths - usedMonths;
  const baseRefund = remainingMonths * monthlyRate;
  const penaltyFee = totalPaidAmount * 0.10; // 10% 위약금
  const finalRefund = Math.max(0, baseRefund - penaltyFee);
  return Math.floor(finalRefund);
}
```

---

## 🚨 2. 회로차단기 (Circuit Breaker) & 대표님 2대 조치 메커니즘

* **슬롯 구조**: EC2 1대(t4g.small, vCPU 2/RAM 2GB)당 Docker 컨테이너 5개 수용 (Port 3001~3005).
* **회로차단 오픈 (10대, 50명 수용 도달 시)**: 신규 EC2 부팅 일시정지 ➔ 대표님 카톡 비상 알림 1초 발송.
* **선택지 1 [EC2 한도 20대 확장 & 대기자 알림톡 무인 대량 발송]**: 어드민 1초 클릭 ➔ 인스턴스 한도 20대 확장 ➔ `WaitlistSubscriber` DB 대기 유저 전원에게 알림톡 대량 무인 발송하여 결제 전환 유도.
* **선택지 2 [Waitlist Mode 켜기]**: 결제 페이지(/checkout)에 51번째 유저 차단 팝업 렌더링 ➔ 유저 과금 없이 안전 차단 & DB 수집.

---

## ☁️ 3. AWS 인프라 & Caddy SSL Purge 규격

### AWS S3 3대 표준 디렉토리 구조 (`haroo-app-storage-production`)
1. `/temp/drafts/{draftId}/`: 결제 전 임시 사진 (90일 TTL 파기).
2. `/projects/{projectId}/`: 배포 완료 마스터 사진 (`logo`, `hero`, `gallery`, `menu`, `modal`, `og`).
3. `/admin/branding/`: 서비스 마스터 비주얼 및 45종 데모 이미지.

### Docker 80MB 경량화 빌드 & 자원 격리
* `Dockerfile`: Next.js Standalone 80MB Alpine 멀티 스테이지 빌드.
* `docker run`: `--memory=350m --cpus=0.35 -p {allocatedPort}:3000 --restart unless-stopped`.

### Caddy API 도메인 라우팅 & SSL Purge 프로토콜
* 유저 중도 해지/환불 시 Caddy Admin API (`DELETE /config/apps/http/servers/srv0/routes/{route_id}`) 즉시 호출.
* 도메인 라우팅 룰 및 SSL 인증서 무인 파기 ➔ 좀비 도메인 트래픽 누적 0%.

### 무전단 롤링 업데이트 (Rolling Update)
* 어드민 [전체 컨테이너 Rolling Update 트리거] 버튼 ➔ SSH 접속 후 순차적 `docker pull` ➔ `docker stop` ➔ `docker run` ➔ Healthcheck 후 다음 교체 진행 (무중단 롤링).
