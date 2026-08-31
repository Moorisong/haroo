'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { TIER_PAGE_LIMITS } from '@/types'
import { ChevronDown, Plus, FileText, Home, Trash2 } from 'lucide-react'

export default function PageSwitcher() {
  const { pages, activePageId, setActivePage, addPage, removePage, siteTemplateSelected, userTier, isPageSwitcherHighlighted, highlightPageSwitcher } = useBuilderStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [showDimGuide, setShowDimGuide] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const activePage = pages.find((p) => p.id === activePageId) || pages[0]
  const isHighlighted = showDimGuide || isPageSwitcherHighlighted

  useEffect(() => {
    if (siteTemplateSelected) {
      const hasSeen = localStorage.getItem('haroo_page_switcher_guide_seen')
      if (!hasSeen) {
        setShowDimGuide(true)
      }
    }
  }, [siteTemplateSelected])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsAdding(false)
        if (isPageSwitcherHighlighted) {
          highlightPageSwitcher(false)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isPageSwitcherHighlighted, highlightPageSwitcher])

  const handleButtonClick = () => {
    if (showDimGuide) {
      setShowDimGuide(false)
      localStorage.setItem('haroo_page_switcher_guide_seen', 'true')
    }
    if (isPageSwitcherHighlighted) {
      highlightPageSwitcher(false)
    }
    setIsOpen(!isOpen)
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newSlug.trim()) {
      alert('화면 이름과 영문 주소를 모두 입력해 주세요.')
      return
    }
    const createdId = addPage(newTitle.trim(), newSlug.trim())
    if (!createdId) return
    setNewTitle('')
    setNewSlug('')
    setIsAdding(false)
    setIsOpen(false)
  }

  return (
    <>
      {/* 스포트라이트 배경 오버레이 (블러 제거) */}
      {isHighlighted && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            if (showDimGuide) {
              setShowDimGuide(false)
              localStorage.setItem('haroo_page_switcher_guide_seen', 'true')
            }
            if (isPageSwitcherHighlighted) {
              highlightPageSwitcher(false)
            }
            setIsOpen(true)
            setIsAdding(true)
          }}
        />
      )}

      <div
        ref={menuRef}
        className={`relative inline-block text-left ${
          isHighlighted
            ? 'z-50 ring-4 ring-indigo-500 ring-offset-2 rounded-xl bg-white dark:bg-gray-900 shadow-2xl animate-pulse'
            : ''
        }`}
      >
        {/* 온보딩/화면 추가 툴팁 */}
        {isHighlighted && (
          <div className="absolute top-11 left-0 z-50 w-64 p-3 bg-indigo-600 text-white rounded-xl shadow-xl text-xs">
            <div className="font-bold flex items-center gap-1.5 text-xs mb-1">
              <span>💡 화면 추가 안내</span>
            </div>
            <p className="text-[11px] text-indigo-100 leading-relaxed">
              이곳을 클릭하여 새로운 화면을 추가해 보세요.
            </p>
            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-indigo-600 rotate-45" />
          </div>
        )}

        {/* 현재 선택된 화면 버튼 */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
        >
          {activePage.isHome ? <Home className="w-3.5 h-3.5 text-blue-500" /> : <FileText className="w-3.5 h-3.5 text-emerald-500" />}
          <span>{activePage.title}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 z-50 p-2 animate-in fade-in duration-150">
            <div className="px-2 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              내 사이트 화면 목록 ({pages.length})
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1">
              {pages.map((page) => {
                const isActive = page.id === activePageId
                return (
                  <div
                    key={page.id}
                    className={`group flex items-center justify-between px-2.5 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold dark:bg-blue-950 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      setActivePage(page.id)
                      setIsOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {page.isHome ? <Home className="w-3.5 h-3.5 text-blue-500 shrink-0" /> : <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                      <span className="truncate">{page.title}</span>
                    </div>

                    {!page.isHome && pages.length > 1 && (
                      <button
                        type="button"
                        title="화면 삭제"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm(`'${page.title}' 화면을 삭제하시겠습니까?`)) {
                            removePage(page.id)
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
              {isAdding ? (
                <form onSubmit={handleAddSubmit} className="space-y-2 p-1">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-0.5">화면 이름</label>
                    <input
                      type="text"
                      autoFocus
                      placeholder="예: 회사 소개, 문의하기"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-0.5">영문 주소 (URL 경로)</label>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-gray-400 font-mono">/</span>
                      <input
                        type="text"
                        placeholder="예: about, contact"
                        value={newSlug}
                        onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="flex-1 px-2 py-1 text-xs font-mono border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 font-medium"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                    >
                      생성
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const limit = TIER_PAGE_LIMITS[userTier || 'STARTER'] || 3
                    if (pages.length >= limit) {
                      addPage('', '') // triggers toast via store
                      return
                    }
                    setIsAdding(true)
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 화면 만들기</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
