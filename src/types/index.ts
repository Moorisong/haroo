// ============================================================
// Haroo 전역 TypeScript 타입 정의
// ============================================================

// 블록 티어
export type BlockTier = 'STARTER' | 'STANDARD' | 'PROFESSIONAL'

// 캔버스 블록 인스턴스 (instanceId로 구분)
export interface CanvasBlock {
  instanceId: string
  blockId: string
  name: string
  tier: BlockTier
  icon?: React.ElementType
}

// 드래프트 (임시 저장)
export interface Draft {
  id: string
  name: string
  selectedBlocks: CanvasBlock[]
  versionClock: number
  updatedAt: string
}

// 유저 프로젝트
export interface UserProject {
  id: string
  name: string
  subdomain: string
  customDomain: string | null
  tier: BlockTier
  status: 'PENDING' | 'BUILDING' | 'RUNNING' | 'FAILED' | 'STOPPED'
  nextBilling: string
  subscriptionMonths: number
  deployedAt: string
  visits: number
  inquiries: number
}

// DNS Polling 상태
export type DnsPollStatus = 'idle' | 'checking' | 'success' | 'failed'

// 어드민 통계
export interface AdminStats {
  revenue: number
  pgFee: number
  ec2Cost: number
  s3Cost: number
  cfCost: number
  netProfit: number
  ec2Count: number
  activeUsers: number
  totalUsers: number
  waitlistCount: number
  circuitBreakerActive: boolean
  waitlistModeActive: boolean
}

// 알림 로그
export interface NotificationLog {
  id: string
  userId: string
  channel: 'KAKAO_TALK' | 'LMS' | 'SMS'
  status: 'SUCCESS' | 'FAILED'
  sentAt: string
}

// 결제 내역
export interface PaymentHistory {
  id: string
  userId: string
  impUid: string
  amount: number
  tier: BlockTier
  subscriptionMonths: number
  status: 'PAID' | 'REFUNDED' | 'PARTIAL_REFUNDED'
  paidAt: string
}

// 대기자
export interface WaitlistSubscriber {
  id: string
  phone: string
  createdAt: string
}

// SSE 빌드 단계
export type BuildStep =
  | 'INIT'
  | 'DOCKER_PULL'
  | 'DOCKER_RUN'
  | 'HEALTH_CHECK'
  | 'CADDY_ROUTE'
  | 'COMPLETE'
  | 'FAILED'

// 결제 약관 동의 상태
export interface AgreementState {
  terms: boolean
  privacy: boolean
  refund: boolean
}
