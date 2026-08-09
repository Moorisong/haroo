'use client'

import React from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import type { SiteTemplateCategory } from '@/types'
import { Building2, PartyPopper, UserCheck, ShoppingBag, LayoutTemplate } from 'lucide-react'

interface TemplateOption {
  id: SiteTemplateCategory
  title: string
  description: string
  icon: React.ElementType
  badge?: string
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'COMPANY',
    title: '회사 / 브랜드 소개',
    description: '기업 정보, 주요 서비스, 팀원 및 오시는 길을 한눈에 전달합니다.',
    icon: Building2,
    badge: '가장 인기',
  },
  {
    id: 'EVENT',
    title: '모바일 이벤트 / 청첩장',
    description: 'D-day 카운트다운, 갤러리, 방명록으로 특별한 소식을 전하세요.',
    icon: PartyPopper,
  },
  {
    id: 'PORTFOLIO',
    title: '개인 포트폴리오',
    description: '나만의 이력, 작품, 프로젝트 경력을 깔끔하게 선보입니다.',
    icon: UserCheck,
  },
  {
    id: 'COMMERCE',
    title: '쇼핑몰 / 서비스 신청',
    description: '상품 라인업, 서비스 신청 폼, 바로 결제 버튼을 조립합니다.',
    icon: ShoppingBag,
  },
  {
    id: 'BLANK',
    title: '자유 구성 (빈 화면 시작)',
    description: '어떠한 가이드 없이 원하는 블록을 자유롭게 배치합니다.',
    icon: LayoutTemplate,
  },
]

export default function SiteTemplateSelectionModal() {
  const { projectTypeSelected, siteTemplateSelected, confirmSiteTemplate } = useBuilderStore()

  // 1단계(프로젝트 모드: 웹/PWA)가 선택되었고, 아직 2단계(템플릿)가 안 선택되었을 때 팝업
  if (!projectTypeSelected || siteTemplateSelected) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 md:p-8 shadow-2xl border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 rounded-full mb-2">
            2단계: 목적 선택
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">어떤 사이트를 만들고 싶으신가요?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            원하시는 목적을 고르시면 꼭 필요한 화면 구성을 준비해 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {TEMPLATE_OPTIONS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => confirmSiteTemplate(item.id)}
                className="group relative flex flex-col items-start p-4 text-left border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 dark:border-gray-800 dark:hover:border-blue-500 dark:hover:bg-blue-950/30 transition-all"
              >
                {item.badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900 dark:text-blue-300 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{item.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
