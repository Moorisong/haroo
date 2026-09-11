'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { ChevronDown, Plus, Folder, Lock } from 'lucide-react'
import { getCurrentUser, type UserProfile } from '@/lib/auth'

interface SavedDraft {
  id: string
  name: string
  blocksCount?: number
}

interface ProjectSwitcherProps {
  savedDraftList: SavedDraft[]
  onSelectProject: (id: string) => void
}

export default function ProjectSwitcher({ savedDraftList, onSelectProject }: ProjectSwitcherProps) {
  const router = useRouter()
  const { draftId, draftName } = useBuilderStore()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      getCurrentUser().then(setUser)
    }
  }, [isOpen])

  const currentProject = savedDraftList.find((d) => d.id === draftId)
  const displayName = currentProject ? currentProject.name : draftName.trim() || '프로젝트 선택'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {/* 현재 선택된 프로젝트 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700 max-w-[160px] sm:max-w-[200px]"
        title="프로젝트 목록 보기"
      >
        <Folder className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span className="truncate">{displayName}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 z-50 p-2 animate-in fade-in duration-150">
          {!user ? (
            <div className="p-3 text-center space-y-2">
              <div className="w-8 h-8 bg-amber-50 dark:bg-amber-950 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Lock size={15} />
              </div>
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                로그인이 필요합니다
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 break-keep">
                저장된 프로젝트 목록을 보시려면 먼저 로그인해 주세요.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  router.push('/login?next=/builder')
                }}
                className="w-full mt-2 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
              >
                로그인하러 가기
              </button>
            </div>
          ) : (
            <>
              <div className="px-2 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                내 프로젝트 목록 ({savedDraftList.length})
              </div>

              <div className="max-h-56 overflow-y-auto space-y-1">
                {savedDraftList.map((draft) => {
                  const isActive = draft.id === draftId
                  return (
                    <div
                      key={draft.id}
                      className={`group flex items-center justify-between px-2.5 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-gray-100 text-gray-900 font-bold dark:bg-gray-800 dark:text-gray-100'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => {
                        onSelectProject(draft.id)
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Folder className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-500' : 'text-gray-400'}`} />
                        <span className="truncate">{draft.name}</span>
                      </div>
                    </div>
                  )
                })}

                {savedDraftList.length === 0 && (
                  <div className="px-2.5 py-3 text-xs text-gray-400 text-center">
                    저장된 프로젝트가 없습니다.
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectProject('new')
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                  <span>새 프로젝트 만들기</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
