# 🗄️ [하루 (haroo)] 휴먼 기획서: 데이터베이스 스키마 & Zero-DDL 명세

본 문서는 **미키 사업_v3** 데이터베이스 기획의 7대 메인 테이블 스키마 및 JSONB 폼 수집 데이터 고정 스키마(Zero-DDL 마이그레이션 규칙)를 명세한 기획 문서입니다.

---

## 📋 1. Supabase/PostgreSQL 7대 메인 테이블 스키마

### 1. `User` (유저 기본 DB - UNIQUE userId)
* `id`: VARCHAR(50) PK (Supabase Auth 36자리 UNIQUE UUID)
* `email`: VARCHAR(255) UNIQUE NOT NULL
* `provider`: ENUM('KAKAO', 'GOOGLE') NOT NULL
* `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

### 2. `BlockCatalog` (45종 마스터 블록 DB)
* `id`: VARCHAR(50) PK
* `name`: VARCHAR(100) NOT NULL
* `category`: ENUM('LAYOUT', 'FEATURE', 'INTEGRATION') NOT NULL
* `tier`: ENUM('STARTER', 'STANDARD', 'PROFESSIONAL') NOT NULL
* `input_schema`: JSONB NOT NULL, `output_schema`: JSONB NOT NULL
* `price_amount`: INT NOT NULL

### 3. `UserProjectDraft` (임시 저장 Max 10 DB - TTL 90일 & CASCADE)
* `draft_id`: VARCHAR(50) PK
* `user_id`: VARCHAR(50) FK REFERENCES User(id) ON DELETE CASCADE
* `draft_name`: VARCHAR(100) DEFAULT '나만의 앱' NOT NULL
* `global_font_family`: VARCHAR(50) DEFAULT 'Pretendard' NOT NULL
* `block_config_json`: JSONB NOT NULL
* `created_at`, `updated_at`: TIMESTAMP NOT NULL
* INDEX `idx_user_draft(user_id, updated_at DESC)`

### 4. `UserProject` (마스터 프로젝트 DB - 커스텀 도메인 포함)
* `project_id`: VARCHAR(50) PK
* `user_id`: VARCHAR(50) FK REFERENCES User(id) ON DELETE CASCADE
* `subdomain`: VARCHAR(100) UNIQUE NOT NULL, `custom_domain`: VARCHAR(255) UNIQUE NULL
* `ssl_status`: ENUM('PENDING', 'ACTIVE', 'FAILED') DEFAULT 'PENDING' NOT NULL
* `aws_ec2_instance_id`: VARCHAR(100) NOT NULL, `ec2_port`: INT NOT NULL (3001~3005)
* `subscription_period_months`: INT NOT NULL, `next_billing_date`: TIMESTAMP NOT NULL
* `deployment_url`: VARCHAR(255) NOT NULL, `imp_uid`: VARCHAR(100) NOT NULL
* `ec2_status`: ENUM('RUNNING', 'STOPPED', 'TERMINATED') DEFAULT 'RUNNING' NOT NULL

### 5. `NotificationLog` (카톡 알림톡/LMS 우회 발송 DB)
* `id`: VARCHAR(50) PK, `project_id`: VARCHAR(50) NOT NULL
* `recipient_phone`: VARCHAR(20) NOT NULL
* `talk_status`: ENUM('SUCCESS', 'FAILED', 'REJECTED') NOT NULL
* `failover_sms_status`: ENUM('NONE', 'SENT_LMS', 'FAILED') DEFAULT 'NONE' NOT NULL
* `sent_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

### 6. `PaymentHistory` (결제/환불 내역 DB - UNIQUE imp_uid 멱등성 보장 5년 법적 보존)
* `payment_id`: VARCHAR(50) PK, `imp_uid`: VARCHAR(100) UNIQUE NOT NULL (멱등성 보장)
* `project_id`: VARCHAR(50) NOT NULL, `amount`: INT NOT NULL
* `payment_type`: ENUM('INITIAL', 'RECURRING', 'REFUND') NOT NULL
* `status`: ENUM('SUCCESS', 'FAILED', 'CANCELLED') NOT NULL
* `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

### 7. `WaitlistSubscriber` (대기자 명단 DB)
* `id`: VARCHAR(50) PK, `phone_number`: VARCHAR(20) NOT NULL
* `notified_status`: ENUM('PENDING', 'SENT_TALK', 'SENT_LMS') DEFAULT 'PENDING' NOT NULL
* `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

---

## ⚡ 2. JSONB 폼 수집 데이터 고정 스키마 (Zero-DDL 마이그레이션 규칙)

* **방침**: 수백 명 유저의 멀티테넌트 환경에서 폼 필드 추가/수정 시 `ALTER TABLE` (DDL) 실행을 금지하여 DB Lock 및 컬럼 수 제한 충돌을 100% 방지.
* **`FormSubmission` 테이블**:
  * `submission_id`: UUID PK
  * `tenant_id`: UUID
  * `block_id`: VARCHAR(50)
  * `submitted_data`: JSONB NOT NULL
  * `created_at`: TIMESTAMPTZ DEFAULT NOW()
* **동적 폼 처리**: 유저가 수집 필드를 변경해도 DDL 변동 없이 `submitted_data` JSONB 내부 Key-Value로 저장 및 Zod 런타임 검증만 재수행하여 DDL 충돌율 0% 보장.
