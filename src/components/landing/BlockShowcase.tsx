'use client'

import { useState } from 'react'
import {
  Layout, Star, Zap, Map, Image, MessageSquare, Bell, CreditCard, BarChart2,
  Calendar, Users, Gift, BookOpen, Heart, Clock, Megaphone, Share2,
  FileText, Video, Layers, ChevronRight,
} from 'lucide-react'
import type { BlockTier } from '@/types'

type FilterTab = 'ALL' | BlockTier

const BLOCKS = [
  { id: 'blk_hero_01', name: '히어로 비주얼 배너', tier: 'STARTER' as BlockTier, icon: Layout, desc: '메인 타이틀 + 대표 사진 + CTA 버튼' },
  { id: 'blk_form_01', name: '고객 문의·예약 폼', tier: 'STANDARD' as BlockTier, icon: FileText, desc: '예약/문의 DB 수집 + 엑셀 다운로드' },
  { id: 'blk_talk_01', name: '카카오 알림톡', tier: 'STANDARD' as BlockTier, icon: Bell, desc: '1:1 상담 + 알림톡/LMS 자동 발송' },
  { id: 'blk_map_01', name: '카카오 지도 오시는길', tier: 'STANDARD' as BlockTier, icon: Map, desc: '오프라인 위치 + 내비 연동' },
  { id: 'blk_album_01', name: '이미지 갤러리 앨범', tier: 'STANDARD' as BlockTier, icon: Image, desc: '시술/웨딩 갤러리 EXIF 자동 보정' },
  { id: 'blk_pay_01', name: '전자결제 / QR 결제', tier: 'PROFESSIONAL' as BlockTier, icon: CreditCard, desc: '포트원 카드/카카오페이/QR 결제' },
  { id: 'blk_auth_01', name: '회원가입 / 마이페이지', tier: 'PROFESSIONAL' as BlockTier, icon: Users, desc: 'Supabase Auth 카카오/구글 소셜로그인' },
  { id: 'blk_stats_01', name: '맞춤형 통계 엔진', tier: 'PROFESSIONAL' as BlockTier, icon: BarChart2, desc: '방문자수/신청건수 실시간 감시' },
  { id: 'blk_share_01', name: '소셜 공유하기', tier: 'STARTER' as BlockTier, icon: Share2, desc: '카톡 초대장 1초 발송 + URL 복사' },
  { id: 'blk_faq_01', name: 'FAQ 아코디언', tier: 'STANDARD' as BlockTier, icon: MessageSquare, desc: '매장 안내 및 자주 묻는 질문' },
  { id: 'blk_video_01', name: '비디오 플레이어', tier: 'STARTER' as BlockTier, icon: Video, desc: 'YouTube/직접 업로드 영상 재생' },
  { id: 'blk_dday_01', name: 'D-Day 카운트다운', tier: 'STARTER' as BlockTier, icon: Clock, desc: '예식/행사/오픈 카운트다운' },
  { id: 'blk_stamp_card_01', name: '디지털 스탬프 카드', tier: 'STANDARD' as BlockTier, icon: Star, desc: '10회 방문 시 무료 쿠폰 적립' },
  { id: 'blk_coupon_01', name: '쿠폰 발급기', tier: 'PROFESSIONAL' as BlockTier, icon: Gift, desc: '할인 쿠폰 + 시리얼 코드 발급' },
  { id: 'blk_curriculum_01', name: '강의 커리큘럼', tier: 'STANDARD' as BlockTier, icon: BookOpen, desc: '수강생 단원 목차 + 완료 표시' },
  { id: 'blk_board_01', name: '커뮤니티 게시판', tier: 'STANDARD' as BlockTier, icon: Layers, desc: '글 작성/조회/수정/삭제' },
  { id: 'blk_push_01', name: '웹 푸시 알림', tier: 'PROFESSIONAL' as BlockTier, icon: Bell, desc: 'PWA 스마트폰 웹 푸시 수신' },
  { id: 'blk_pricing_01', name: '요금제 비교 카드', tier: 'STARTER' as BlockTier, icon: CreditCard, desc: '수강료/패키지 가격표' },
  { id: 'blk_like_01', name: '좋아요 / 스크랩', tier: 'STANDARD' as BlockTier, icon: Heart, desc: '하트 좋아요 + 마이페이지 스크랩' },
  { id: 'blk_menu_catalog_01', name: '메뉴판/가격 카탈로그', tier: 'STARTER' as BlockTier, icon: Megaphone, desc: '메뉴 썸네일 + 가격 카탈로그' },
  { id: 'blk_consulting_slot_01', name: '1:1 컨설팅 예약', tier: 'PROFESSIONAL' as BlockTier, icon: Calendar, desc: '30분/1시간 세션 예약 + 엑셀' },
  { id: 'blk_guestbook_01', name: '방명록', tier: 'STANDARD' as BlockTier, icon: MessageSquare, desc: '청첩장 하객 축하 메시지' },
]

const TIER_CONFIG: Record<BlockTier, { label: string; color: string }> = {
  STARTER: { label: 'STARTER', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  STANDARD: { label: 'STANDARD', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  PROFESSIONAL: { label: 'PRO', color: 'bg-slate-900 text-white border-slate-900' },
}

const TABS: { label: string; value: FilterTab }[] = [
  { label: '전체 45종', value: 'ALL' },
  { label: 'STARTER', value: 'STARTER' },
  { label: 'STANDARD', value: 'STANDARD' },
  { label: 'PROFESSIONAL', value: 'PROFESSIONAL' },
]

export default function BlockShowcase() {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL')
  const filtered = activeTab === 'ALL' ? BLOCKS : BLOCKS.filter((b) => b.tier === activeTab)

  return (
    <section id="blocks" className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold rounded-full mb-4">
            45종 마스터 블록
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 text-balance">
            원하는 블록을 골라
            <br />
            레고처럼 조립하세요
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            소상공인부터 강사, MVP 창업가까지 필요한 모든 기능이 블록으로 준비되어 있습니다.
          </p>
        </div>

        {/* 탭 필터 */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 p-1 bg-slate-100 rounded-xl">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab.value
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 블록 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((block) => {
            const Icon = block.icon
            const tier = TIER_CONFIG[block.tier]
            return (
              <div
                key={block.id}
                className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                    <Icon size={16} className="text-slate-700" />
                  </div>
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded border ${tier.color}`}>
                    {tier.label}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-900 leading-snug mb-1">{block.name}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{block.desc}</div>
              </div>
            )
          })}
        </div>

        {/* 더 보기 */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 mb-4">
            현재 표시된 {filtered.length}종 외 총 45종 블록이 제공됩니다
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            전체 블록 조립 캔버스 체험하기
            <ChevronRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
