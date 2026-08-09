'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ChevronDown, Plus, FileText, Home, Trash2 } from 'lucide-react'

export default function PageSwitcher() {
  const { pages, activePageId, setActivePage, addPage, removePage, siteTemplateSelected } = useBuilderStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [showDimGuide, setShowDimGuide] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const activePage = pages.find((p) => p.id === activePageId) || pages[0]

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
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleButtonClick = () => {
    if (showDimGuide) {
      setShowDimGuide(false)
      localStorage.setItem('haroo_page_switcher_guide_seen', 'true')
    }
    setIsOpen(!isOpen)
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    addPage(newTitle.trim())
    setNewTitle('')
    setIsAdding(false)
    setIsOpen(false)
  }

  return (
    <>
      {/* 화면 전체 딤(Dimmed) 배경 및 스포트라이트 안내 */}
      {showDimGuide && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] animate-in fade-in duration-300"
          onClick={() => {
            setShowDimGuide(false)
            localStorage.setItem('haroo_page_switcher_guide_seen', 'true')
          }}
        />
      )}

      <div
        ref={menuRef}
        className={`relative inline-block text-left ${
          showDimGuide
            ? 'z-50 ring-4 ring-blue-500/80 ring-offset-2 rounded-xl bg-white dark:bg-gray-900 shadow-2xl animate-pulse'
            : ''
        }`}
      >
        {/* 온보딩 툴팁 */}
        {showDimGuide && (
          <div className="absolute top-11 left-0 z-50 w-64 p-3 bg-blue-600 text-white rounded-xl shadow-2xl text-xs animate-bounce">
            <div className="font-bold flex items-center gap-1.5 text-sm mb-1">
              <span>👉</span> 화면 추가 & 이동은 여기서!
            </div>
            <p className="text-[11px] text-blue-100 leading-relaxed">
              클릭하시면 <strong className="underline decoration-blue-300">소개, 오시는길 등 새로운 화면</strong>을 만들고 오갈 수 있어요!
            </p>
            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-blue-600 rotate-45" />
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
                <form onSubmit={handleAddSubmit} className="flex gap-1.5 p-1">
                  <input
                    type="text"
                    autoFocus
                    placeholder="예: 회사 소개, 문의하기"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 text-xs bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 shrink-0"
                  >
                    추가
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
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
