'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Layout, Star, Map, Image, MessageSquare, Bell, CreditCard, BarChart2,
  Calendar, Users, Gift, BookOpen, Heart, Clock, Share2, FileText, Video,
  ArrowRight, Grid, CheckSquare, LayoutGrid
} from 'lucide-react'
import type { BlockTier } from '@/types'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { useDraftAutoSave } from '@/hooks/useDraftAutoSave'
import TouchDndProvider from '@/components/builder/TouchDndProvider'
import SnapGridCanvas from '@/components/builder/SnapGridCanvas'
import RevisionMeter from '@/components/builder/RevisionMeter'
import ViewportSwitcher from '@/components/builder/ViewportSwitcher'
import SidePropertyPanel from '@/components/builder/SidePropertyPanel'
import ProjectTypeSelectionModal from '@/components/builder/ProjectTypeSelectionModal'
import SiteTemplateSelectionModal from '@/components/builder/SiteTemplateSelectionModal'
import PageSwitcher from '@/components/builder/PageSwitcher'
import ActionToast from '@/components/builder/ActionToast'
import MobileBlockerScreen from '@/components/builder/MobileBlockerScreen'

type FilterTab = 'ALL' | BlockTier

const ALL_BLOCKS = [
  { id: 'blk_hero_01', name: '히어로 섹션', tier: 'STARTER' as BlockTier, icon: Layout, desc: '메인 비주얼 + 대형 타이틀 + CTA' },
  { id: 'blk_txt_01', name: '자유 텍스트', tier: 'STARTER' as BlockTier, icon: FileText, desc: '서식·스타일 자유 작성 구역' },
  { id: 'blk_share_01', name: '링크/소셜 공유', tier: 'STARTER' as BlockTier, icon: Share2, desc: '카카오·URL·소셜 채널 공유' },
  { id: 'blk_video_01', name: '동영상 임베드', tier: 'STARTER' as BlockTier, icon: Video, desc: 'YouTube·외부 비디오 스트리밍' },
  { id: 'blk_dday_01', name: '카운트다운 타이머', tier: 'STARTER' as BlockTier, icon: Clock, desc: '목표 일시까지 실시간 타이머' },
  { id: 'blk_pricing_01', name: '가격표/플랜 카드', tier: 'STARTER' as BlockTier, icon: CreditCard, desc: '비교 플랜 및 가격 정보 카드' },
  { id: 'blk_form_01', name: '입력 폼 / 데이터 수집', tier: 'STANDARD' as BlockTier, icon: FileText, desc: '이름·연락처·옵션 수집 폼' },
  { id: 'blk_talk_01', name: '자동 알림 안내', tier: 'STANDARD' as BlockTier, icon: Bell, desc: '메시지 템플릿 및 자동 알림' },
  { id: 'blk_map_01', name: '지도/위치 안내', tier: 'STANDARD' as BlockTier, icon: Map, desc: '주소 검색 및 대화형 지도' },
  { id: 'blk_album_01', name: '이미지 갤러리', tier: 'STANDARD' as BlockTier, icon: Image, desc: '그리드 앨범 + 라이트박스' },
  { id: 'blk_faq_01', name: '아코디언 리스트', tier: 'STANDARD' as BlockTier, icon: MessageSquare, desc: '질문/답변 및 접이식 목록' },
  { id: 'blk_stamp_card_01', name: '스탬프/리워드 카운터', tier: 'STANDARD' as BlockTier, icon: Star, desc: '출석·방문·미션 완료 도장' },
  { id: 'blk_curriculum_01', name: '단계별 프로세스 리스트', tier: 'STANDARD' as BlockTier, icon: BookOpen, desc: '순서 있는 단원/단계별 목록' },
  { id: 'blk_like_01', name: '반응 토글 (좋아요·북마크)', tier: 'STANDARD' as BlockTier, icon: Heart, desc: '하트·북마크 반응 참여 토글' },
  { id: 'blk_auth_01', name: '간편 로그인/인증', tier: 'PROFESSIONAL' as BlockTier, icon: Users, desc: '카카오·구글 소셜 계정 인증' },
  { id: 'blk_pay_01', name: '온라인 PG 결제', tier: 'PROFESSIONAL' as BlockTier, icon: CreditCard, desc: '주문 결제 수단 및 상품 결제' },
  { id: 'blk_stats_01', name: '대시보드 / 통계 지표', tier: 'PROFESSIONAL' as BlockTier, icon: BarChart2, desc: '실시간 수치 지표 및 차트' },
  { id: 'blk_coupon_01', name: '쿠폰/코드 발급', tier: 'PROFESSIONAL' as BlockTier, icon: Gift, desc: '시리얼 난수 쿠폰 코드 생성' },
  { id: 'blk_consulting_slot_01', name: '타임 슬롯/일정 예약', tier: 'PROFESSIONAL' as BlockTier, icon: Calendar, desc: '날짜 및 시간대별 세션 예약' },
  { id: 'blk_profile_grid_01', name: '프로필 카드 그리드', tier: 'STARTER' as BlockTier, icon: Users, desc: '다목적 인물/전문가 소개 그리드' },
  { id: 'blk_feature_grid_01', name: '특징/아이콘 그리드', tier: 'STARTER' as BlockTier, icon: CheckSquare, desc: '핵심 장점 및 아이콘 설명 그리드' },
  { id: 'blk_content_card_grid_01', name: '콘텐츠 카드 그리드', tier: 'STANDARD' as BlockTier, icon: LayoutGrid, desc: '썸네일 및텍스트 뱃지 카드 리스트' },
  { id: 'blk_board_list_01', name: '게시판 (통합)', tier: 'STANDARD' as BlockTier, icon: MessageSquare, desc: '게시물 목록 및 리스트 뷰' },
]

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: '전체', value: 'ALL' },
  { label: 'STARTER', value: 'STARTER' },
  { label: 'STANDARD', value: 'STANDARD' },
  { label: 'PRO', value: 'PROFESSIONAL' },
]

const TIER_BADGE: Record<string, string> = {
  STARTER: 'bg-slate-100 text-slate-600 border-slate-200',
  STANDARD: 'bg-sky-50 text-sky-600 border-sky-200',
  PROFESSIONAL: 'bg-slate-900 text-white border-slate-900',
}

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL')

  const { canvasBlocks, addBlock, isDirty, deviceViewport, projectType, isPreviewMode: storeIsPreview, setDeviceViewport } = useBuilderStore()
  const isReadOnlyPreview = (projectType === 'WEB' && deviceViewport !== 'desktop') || storeIsPreview

  // 실제 모바일 디바이스 감지
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobileDevice(mobile)
      if (mobile && deviceViewport === 'desktop') {
        setDeviceViewport('mobile')
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [deviceViewport, setDeviceViewport])

  if (isMounted && isMobileDevice) {
    return <MobileBlockerScreen />
  }

  const filtered = activeTab === 'ALL' ? ALL_BLOCKS : ALL_BLOCKS.filter((b) => b.tier === activeTab)

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden relative">
      {/* 진입 시 프로젝트 타입 선택 모달 */}
      <ProjectTypeSelectionModal />
      {/* 2단계: 프로젝트 목적/템플릿 선택 모달 */}
      <SiteTemplateSelectionModal />

      {/* 빌더 헤더 */}
      <header className="flex-shrink-0 h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-5 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 mr-2">
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">H</span>
            </div>
          </Link>
          <span className="hidden sm:block text-xs text-slate-400">|</span>
          {/* 상단 다중 페이지 스위처 (비전문가 친화적) */}
          <PageSwitcher />
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">
            {canvasBlocks.length}종 조립됨
          </span>
          {isDirty && <span className="w-2 h-2 rounded-full bg-amber-400" title="저장 대기 중" />}
        </div>
        <div className="flex items-center gap-2">
          {/* ViewportSwitcher 내부에서 미리보기를 토글하므로 헤더의 미리보기 버튼 제거 혹은 유지. 여기선 제거합니다. */}
          <Link
            href="/checkout"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            결제하기
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽: 블록 팔레트 */}
        <aside className="hidden md:flex w-64 sm:w-72 flex-shrink-0 border-r border-slate-200 bg-slate-50 flex-col overflow-hidden relative">
          {isReadOnlyPreview && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10" />
          )}
          <div className="flex-shrink-0 p-3 border-b border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2">블록 추가</div>
            <div className="grid grid-cols-4 gap-1">
              {FILTER_TABS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setActiveTab(t.value)}
                  className={`px-1 py-1 text-[10px] font-semibold rounded transition-colors ${
                    activeTab === t.value ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {filtered.map((block) => {
              const Icon = block.icon
              return (
                <button
                  key={block.id}
                  onClick={() => addBlock(block)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-100">
                    <Icon size={14} className="text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate">{block.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{block.desc}</div>
                  </div>
                  <span className={`px-1 py-0.5 text-[9px] font-bold rounded border flex-shrink-0 ${TIER_BADGE[block.tier]}`}>
                    {block.tier === 'PROFESSIONAL' ? 'PRO' : block.tier}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* 중앙: 캔버스 */}
        {/* 중앙: 캔버스 영역 */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-100 relative">
          <ViewportSwitcher />
          
          <SnapGridCanvas />

          {/* 모바일용 블록 팔레트 (작은 화면에서 미리보기 아닐 때만) */}
          {!isReadOnlyPreview && (
            <div className="mt-4 md:hidden px-4 pb-4 relative">
              <div className="text-xs font-bold text-slate-700 mb-2 px-1">블록 추가하기</div>
              <div className="grid grid-cols-3 gap-2">
                {ALL_BLOCKS.map((block) => {
                  const Icon = block.icon
                  return (
                    <button
                      key={block.id}
                      onClick={() => addBlock(block)}
                      className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all"
                    >
                      <Icon size={16} className="text-slate-600" />
                      <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">{block.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </main>

        {/* 우측: 속성 패널 (데스크톱/큰 화면에서만 노출) */}
        <div className="hidden lg:block h-full">
          <SidePropertyPanel />
        </div>
      </div>

      {/* 액션 Toast 알림 - 미리보기/실제 공통 */}
      <ActionToast />
    </div>
  )
}
