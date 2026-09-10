export interface PricingPlan {
  id?: string
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  highlight?: boolean
  actionType?: string
  buttonLink?: string
  downloadFileUrl?: string
  downloadFileName?: string
  downloadFileSize?: string
  customTargetId?: string
  thankYouMessage?: string
  modalIcon?: string
}

export const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'STARTER',
    price: '무료',
    period: '',
    features: ['기본 블록 6종', '하루 서브도메인', '월 1,000 PV'],
    cta: '체험해보기',
    highlight: false,
  },
  {
    id: 'plan-2',
    name: 'STANDARD',
    price: '29,000원',
    period: '/ 월',
    features: ['표준 블록 12종', '카카오 알림톡 100건', '폼 데이터 수집', '갤러리 앨범'],
    cta: '지금 시작',
    highlight: true,
  },
  {
    id: 'plan-3',
    name: 'PROFESSIONAL',
    price: '59,000원',
    period: '/ 월',
    features: ['전체 블록 45종', '커스텀 도메인 연결', '전자결제 포트원', '통계 엔진'],
    cta: '프로 시작',
    highlight: false,
  },
]
