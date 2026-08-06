# Docker 프로비저닝 & Presigned URL Agent Reference

## 📝 1. 연동 기획 명세 (`haroo-backend-api.md`, `haroo-backend-infrastructure.md`)
- `POST /api/upload/presigned-url` (AWS S3 EXIF 회전 보정 업로드)
- `POST /api/project/re-deploy`
- `GET /api/build-logs/stream?id=` (SSE 5단계 샌드박스 stdout)

## 🤖 2. AI 개발 지침 및 설계 구조
### 🎯 목적
AWS S3 Direct Upload Presigned URL 발행, EXIF 자동 회전 보정 연동, Docker 컨테이너 무인 프로비저닝 및 SSE 빌드 로그 스트리밍을 구동한다.

### 📦 패키지 및 타깃 클래스 경로 구조
- `src/app/api/upload/presigned-url/route.ts`
- `src/app/api/project/re-deploy/route.ts`
- `src/app/api/build-logs/stream/route.ts`
- `src/lib/awsProvisioner.ts`
- `src/lib/imageCompressor.ts`

### 🛠️ 개발 단계 (Step-by-Step 상세 로직)
1. `imageCompressor.ts`: 스마트폰 세로 사진 업로드 시 Orientation(1~8) 메타데이터를 정방향 회전 보정.
2. `awsProvisioner.ts`: AWS EC2 SSH 연결 ➔ `docker run -d --name haroo-app-{projectId} --memory=350m --cpus=0.35 -p {allocatedPort}:3000` 명령어 실행.
3. `stream/route.ts`: SSE 헤더 설정 후 5단계 검증 진행 로그를 `res.write`로 클라이언트 XTerm에 스트리밍.

## 🚨 3. 철벽 코드 컨벤션 및 제약 조건
- **[300줄 분리 규칙]**: 300줄 하드 한계 준수.
- **[포트 할당]**: EC2 포트(3001~3005) 아토믹 할당 및 30초 내 healthcheck 통과 필수.

## 🧪 4. 필수 테스트 케이스 및 검증 시나리오
- **[자가 진단 테스트 발굴]**:
  1. Presigned URL 생성 시 S3 표준 3대 디렉토리 구조(`projects/{projectId}/hero/` 등) 규칙 준수 검증.
  2. Docker 부팅 중 healthcheck 30초 초과 실패 시 가용 포트로 무인 Failover 재시도 검증.
  3. SSE 빌드 로그 스트림 클라이언트 수신 시 stdout 메시지 실시간 전달 검증.
