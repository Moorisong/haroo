// ============================================================
// Haroo 전역 TypeScript 타입 정의
// ============================================================
import { z } from 'zod'

// 블록 티어
export type BlockTier = 'STARTER' | 'STANDARD' | 'PROFESSIONAL'

// 블록 컨테이너 폭 옵션
export const CONTAINER_WIDTHS = ['full', 'wide', 'medium', 'narrow'] as const
export type ContainerWidth = typeof CONTAINER_WIDTHS[number]

// 블록 상하 여백 옵션
export const PADDING_Y_OPTIONS = ['compact', 'normal', 'spacious', 'extraSpacious'] as const
export type PaddingYOption = typeof PADDING_Y_OPTIONS[number]

// 블록 인풋 Zod 스키마
export const BlockInputConfigSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  formFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.enum(['text', 'textarea', 'checkbox']),
    required: z.boolean()
  })).optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  // 이중 반응형: 블록 컨테이너 폭 & 상하 여백
  containerWidth: z.enum(CONTAINER_WIDTHS).optional(),
  paddingY: z.enum(PADDING_Y_OPTIONS).optional(),
  customWidthPx: z.number().optional(),
  customPaddingYPx: z.number().optional(),
  // 스냅 그리드 캔버스 절대 위치 좌표
  posX: z.number().optional(),
  posY: z.number().optional(),
  // 블록의 실제 렌더링 높이 (스마트 가이드 계산용)
  blockHeight: z.number().optional(),
}).catchall(z.any())

export type BlockInputConfig = z.infer<typeof BlockInputConfigSchema>

// 캔버스 블록 인스턴스 (instanceId로 구분)
export interface CanvasBlock {
  instanceId: string
  blockId: string
  name: string
  tier: BlockTier
  icon?: React.ElementType
  inputConfig?: BlockInputConfig
}

// 뷰포트 기기 타입
export type DeviceViewport = 'mobile' | 'tablet' | 'desktop'

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
