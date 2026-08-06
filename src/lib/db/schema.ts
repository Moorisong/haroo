import type { BlockTier } from '@/types'

// Supabase 테이블 스키마 타이핑
export interface Tables {
  // 프로젝트 (매장 사이트)
  UserProject: {
    Row: {
      id: string
      userId: string
      name: string
      subdomain: string
      customDomain: string | null
      tier: BlockTier
      status: 'PENDING' | 'BUILDING' | 'RUNNING' | 'FAILED' | 'STOPPED'
      nextBilling: string
      subscriptionMonths: number
      deployedAt: string | null
      createdAt: string
      updatedAt: string
    }
  }
  // 임시 저장 드래프트
  UserProjectDraft: {
    Row: {
      id: string
      userId: string
      name: string
      selectedBlocks: unknown // JSONB
      versionClock: number
      createdAt: string
      updatedAt: string
    }
  }
  // 문의/예약 제출 폼 (NoSQL 방식)
  FormSubmission: {
    Row: {
      id: string
      projectId: string
      blockId: string
      formData: unknown // JSONB (블록별 동적 스키마)
      createdAt: string
    }
  }
  // 결제 내역
  PaymentHistory: {
    Row: {
      id: string
      userId: string
      projectId: string
      impUid: string
      amount: number
      tier: BlockTier
      status: 'PAID' | 'REFUNDED' | 'PARTIAL_REFUNDED'
      paidAt: string
    }
  }
  // 대기자 명단
  Waitlist: {
    Row: {
      id: string
      phone: string // 단방향 해시 또는 양방향 암호화
      createdAt: string
    }
  }
}
