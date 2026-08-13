'use client'

import React, { useState, useEffect } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ArrowRight, Building2, ShoppingBag, Mail, Palette, Sparkles } from 'lucide-react'
import type { SiteTemplateCategory } from '@/types'

export default function SiteTemplateSelectionModal() {
  const { projectTypeSelected, siteTemplateSelected, confirmSiteTemplate, draftId } = useBuilderStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const params = new URLSearchParams(window.location.search)
  if (params.get('draft') || draftId || !projectTypeSelected || siteTemplateSelected) return null

  const templates: { id: SiteTemplateCategory; title: string; desc: string; icon: React.ElementType; iconColor: string }[] = [
    { id: 'COMPANY', title: '회사 / 브랜드 소개', desc: '우리 회사를 소개하는 깔끔한 메인 홈페이지', icon: Building2, iconColor: 'text-blue-500' },
    { id: 'COMMERCE', title: '매장 홍보 / 상품 판매', desc: '매장을 알리거나 상품을 판매하는 비즈니스 사이트', icon: ShoppingBag, iconColor: 'text-pink-500' },
    { id: 'EVENT', title: '모바일 이벤트 / 청첩장', desc: '행사 안내나 모바일 청첩장 등 단기 목적 페이지', icon: Mail, iconColor: 'text-rose-500' },
    { id: 'PORTFOLIO', title: '개인 프로필 / 포트폴리오', desc: '내 작업물과 이력을 보여주는 멋진 프로필', icon: Palette, iconColor: 'text-indigo-500' },
    { id: 'BLANK', title: '빈 화면에서 시작', desc: '내가 원하는 대로 자유롭게 화면 구성하기', icon: Sparkles, iconColor: 'text-amber-500' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-50 rounded-full blur-3xl pointer-events-none opacity-70" />
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
          어떤 사이트를 만드시나요?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-medium">
          목적에 맞는 기본 화면(페이지)들이 자동으로 준비됩니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {templates.map((tpl) => {
            const Icon = tpl.icon
            return (
              <button
                key={tpl.id}
                onClick={() => confirmSiteTemplate(tpl.id)}
                className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-slate-900 hover:bg-white hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${tpl.iconColor}`} />
                </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-slate-900 mb-0.5">{tpl.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-snug">{tpl.desc}</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight size={14} />
              </div>
            </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
