import { useEffect, useRef } from 'react'
import { useBuilderStore } from '@/stores/useBuilderStore'
import { AUTOSAVE_DEBOUNCE_MS } from '@/lib/constants'

/**
 * 빌더 드래프트 자동 저장 Hook
 * - 500ms debounce (AUTOSAVE_DEBOUNCE_MS)
 * - isDirty === true && versionClock 변경 시만 API 호출
 * - POST /api/drafts/save
 */
export function useDraftAutoSave() {
  const { canvasBlocks, pages, siteTemplate, draftName, draftId, versionClock, isDirty, markSaved } = useBuilderStore()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isDirty) return

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/drafts/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            draftId,
            name: draftName,
            selectedBlocks: {
              pages,
              template: siteTemplate,
              canvasBlocks,
            },
            versionClock,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          markSaved(data.draftId)
        }
      } catch (err) {
        // 자동 저장 실패 시 사용자에게 무음 처리 (네트워크 오류 등)
        console.warn('[useDraftAutoSave] 자동 저장 실패:', err)
      }
    }, AUTOSAVE_DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [versionClock, isDirty])
}
