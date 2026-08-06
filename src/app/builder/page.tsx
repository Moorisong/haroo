'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Layout, Star, Map, Image, MessageSquare, Bell, CreditCard, BarChart2,
  Calendar, Users, Gift, BookOpen, Heart, Clock, Share2, FileText, Video,
  Plus, Eye, Save, ArrowRight, Layers,
} from 'lucide-react'
import type { BlockTier } from '@/types'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { useDraftAutoSave } from '@/hooks/useDraftAutoSave'
import TouchDndProvider from '@/components/builder/TouchDndProvider'
import BuilderCanvas from '@/components/builder/BuilderCanvas'
import RevisionMeter from '@/components/builder/RevisionMeter'

type FilterTab = 'ALL' | BlockTier

const ALL_BLOCKS = [
  { id: 'blk_hero_01', name: '히어로 배너', tier: 'STARTER' as BlockTier, icon: Layout, desc: '메인 타이틀 + 대표 사진' },
  { id: 'blk_txt_01', name: '자유 텍스트', tier: 'STARTER' as BlockTier, icon: FileText, desc: '폰트·색상 자유 편집' },
  { id: 'blk_share_01', name: '소셜 공유', tier: 'STARTER' as BlockTier, icon: Share2, desc: '카톡 초대장 1초 발송' },
  { id: 'blk_video_01', name: '비디오 플레이어', tier: 'STARTER' as BlockTier, icon: Video, desc: 'YouTube 영상 임베드' },
  { id: 'blk_dday_01', name: 'D-Day 카운트다운', tier: 'STARTER' as BlockTier, icon: Clock, desc: '행사/오픈 카운트다운' },
  { id: 'blk_pricing_01', name: '요금제 카드', tier: 'STARTER' as BlockTier, icon: CreditCard, desc: '수강료/패키지 가격표' },
  { id: 'blk_form_01', name: '문의·예약 폼', tier: 'STANDARD' as BlockTier, icon: FileText, desc: '예약/문의 DB 수집' },
  { id: 'blk_talk_01', name: '카카오 알림톡', tier: 'STANDARD' as BlockTier, icon: Bell, desc: '알림톡/LMS 자동 발송' },
  { id: 'blk_map_01', name: '오시는길 지도', tier: 'STANDARD' as BlockTier, icon: Map, desc: '카카오/구글 지도' },
  { id: 'blk_album_01', name: '갤러리 앨범', tier: 'STANDARD' as BlockTier, icon: Image, desc: 'EXIF 자동 보정 갤러리' },
  { id: 'blk_faq_01', name: 'FAQ 아코디언', tier: 'STANDARD' as BlockTier, icon: MessageSquare, desc: '자주 묻는 질문' },
  { id: 'blk_stamp_card_01', name: '스탬프 카드', tier: 'STANDARD' as BlockTier, icon: Star, desc: '10회 방문 쿠폰 적립' },
  { id: 'blk_curriculum_01', name: '강의 커리큘럼', tier: 'STANDARD' as BlockTier, icon: BookOpen, desc: '단원 목차 + 완료 표시' },
  { id: 'blk_like_01', name: '좋아요/스크랩', tier: 'STANDARD' as BlockTier, icon: Heart, desc: '하트 좋아요 토글' },
  { id: 'blk_auth_01', name: '소셜 로그인', tier: 'PROFESSIONAL' as BlockTier, icon: Users, desc: '카카오/구글 로그인' },
  { id: 'blk_pay_01', name: '전자결제', tier: 'PROFESSIONAL' as BlockTier, icon: CreditCard, desc: '포트원 PG 결제' },
  { id: 'blk_stats_01', name: '통계 엔진', tier: 'PROFESSIONAL' as BlockTier, icon: BarChart2, desc: '방문자 통계 감시' },
  { id: 'blk_coupon_01', name: '쿠폰 발급기', tier: 'PROFESSIONAL' as BlockTier, icon: Gift, desc: '시리얼 코드 발급' },
  { id: 'blk_consulting_slot_01', name: '컨설팅 예약', tier: 'PROFESSIONAL' as BlockTier, icon: Calendar, desc: '세션 예약 + 엑셀' },
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
  const [previewMode, setPreviewMode] = useState(false)
  const { canvasBlocks, addBlock, isDirty } = useBuilderStore()

  // 500ms debounce 자동 저장
  useDraftAutoSave()

  const filtered = activeTab === 'ALL' ? ALL_BLOCKS : ALL_BLOCKS.filter((b) => b.tier === activeTab)

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* 빌더 헤더 */}
      <header className="flex-shrink-0 h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-5 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 mr-2">
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">H</span>
            </div>
          </Link>
          <span className="hidden sm:block text-xs text-slate-400">|</span>
          <span className="hidden sm:block text-sm font-semibold text-slate-700">블록 조립 캔버스</span>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">
            {canvasBlocks.length}종 조립됨
          </span>
          {isDirty && <span className="w-2 h-2 rounded-full bg-amber-400" title="저장 대기 중" />}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              previewMode ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Eye size={13} />
            <span className="hidden sm:inline">미리보기</span>
          </button>
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
        <aside className="hidden md:flex w-64 sm:w-72 flex-shrink-0 border-r border-slate-200 bg-slate-50 flex-col overflow-hidden">
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
        <main className="flex-1 overflow-y-auto bg-slate-100 flex justify-center">
          <div className="w-full max-w-sm my-6 mx-4">
            {/* 모바일 프레임 */}
            <div className="rounded-3xl border-4 border-slate-900 bg-white overflow-hidden shadow-2xl">
              <div className="bg-slate-900 px-4 py-2 flex items-center justify-center">
                <div className="w-14 h-1 bg-slate-600 rounded-full" />
              </div>
              <div className="bg-slate-800 px-3 py-1.5 flex items-center gap-2">
                <div className="flex-1 bg-slate-700 rounded px-2 py-0.5 text-xs text-slate-400">mybrand.haroo.site</div>
              </div>
              <div className="min-h-96 bg-white">
                <TouchDndProvider>
                  <BuilderCanvas />
                </TouchDndProvider>
              </div>
              <div className="bg-slate-900 text-center py-2">
                <span className="text-[10px] text-slate-500">Powered by <span className="text-slate-300 font-semibold">Haroo</span></span>
              </div>
            </div>

            {/* 수정 비용 미터 */}
            <RevisionMeter />

            {/* 모바일용 블록 팔레트 */}
            <div className="mt-4 md:hidden">
              <div className="text-xs font-bold text-slate-700 mb-2 px-1">블록 추가하기</div>
              <div className="grid grid-cols-3 gap-2">
                {ALL_BLOCKS.slice(0, 9).map((block) => {
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
          </div>
        </main>
      </div>
    </div>
  )
}
