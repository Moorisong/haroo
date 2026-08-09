'use client'

/**
 * useActionHandler
 *
 * 블록 버튼의 모든 액션 타입을 처리하는 공통 훅.
 *
 * [핵심 분기 전략]
 * - isPreview: true  → 빌더 미리보기 모드 → Mock Toast 시뮬레이션
 * - isPreview: false → 실제 배포 사이트  → 실제 API / 링크 / 결제 실행
 *
 * 배포 시 목데이터는 0% 노출 - 모든 mock 로직은 isPreview 분기 안에만 존재.
 */

import { useCallback } from 'react'
import type { BlockInputConfig } from '@/types'

// ─── Toast 이벤트 발행 ────────────────────────────────────
export type ToastLevel = 'success' | 'info' | 'warning' | 'error'

export function emitToast(message: string, level: ToastLevel = 'info', durationMs = 3500) {
  const event = new CustomEvent('haroo:toast', {
    detail: { message, level, durationMs },
  })
  window.dispatchEvent(event)
}

// ─── 공통 액션 핸들러 훅 ──────────────────────────────────
interface UseActionHandlerOptions {
  /**
   * true  → 빌더 미리보기 (Mock Toast 시뮬레이션)
   * false → 실제 배포 사이트 (실 API/링크/결제 실행)
   */
  isPreview: boolean
  pages?: Array<{ id: string; title: string; slug: string }>
  onNavigatePage?: (slug: string) => void
}

export function useActionHandler({ isPreview, onNavigatePage }: UseActionHandlerOptions) {
  const handleAction = useCallback(
    (config: BlockInputConfig, formData?: Record<string, string>) => {
      const actionType = config.actionType
      if (!actionType) {
        if (isPreview) {
          emitToast('⚠️ 이 버튼의 동작(화면 이동, URL 연결 등)이 설정되지 않았습니다. 우측 속성창에서 동작을 선택해 주세요.', 'warning')
        }
        return
      }

      // 1. NAVIGATE_PAGE
      if (actionType === 'NAVIGATE_PAGE') {
        const slug = config.buttonLink
        if (!slug) {
          emitToast('⚠️ 이동할 화면이 선택되지 않았습니다. 우측 속성창에서 화면을 선택해 주세요.', 'warning')
          return
        }
        if (isPreview) {
          if (onNavigatePage) {
            onNavigatePage(slug)
          } else {
            emitToast(`📄 [테스트] "${slug}" 화면으로 이동합니다.`, 'info')
          }
        } else {
          window.location.href = slug
        }
        return
      }

      // 2. OPEN_URL
      if (actionType === 'OPEN_URL') {
        const url = config.buttonLink
        if (!url) { emitToast('⚠️ 연결할 URL이 설정되지 않았습니다.', 'warning'); return }
        if (isPreview) emitToast(`🔗 [테스트] 새 창으로 "${url}" 이 열립니다.`, 'info')
        else window.open(url, '_blank', 'noopener,noreferrer')
        return
      }

      // 3. CALL_PHONE
      if (actionType === 'CALL_PHONE') {
        const phone = config.buttonLink
        if (!phone) { emitToast('⚠️ 전화번호가 설정되지 않았습니다.', 'warning'); return }
        if (isPreview) emitToast(`📞 [테스트] "${phone}" 으로 전화 연결됩니다.`, 'info')
        else window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`
        return
      }

      // 4. OPEN_KAKAO
      if (actionType === 'OPEN_KAKAO') {
        const kakaoUrl = config.buttonLink
        if (!kakaoUrl) { emitToast('⚠️ 카카오 링크가 설정되지 않았습니다.', 'warning'); return }
        if (isPreview) emitToast('💬 [테스트] 카카오 오픈채팅으로 연결됩니다.', 'info')
        else window.open(kakaoUrl, '_blank', 'noopener,noreferrer')
        return
      }

      // 5. SUBMIT_FORM
      if (actionType === 'SUBMIT_FORM') {
        if (isPreview) {
          const mockName = formData?.name || formData?.['이름'] || '홍길동'
          const mockPhone = formData?.phone || formData?.['연락처'] || '010-1234-5678'
          emitToast(`📩 [테스트] "${mockName} / ${mockPhone}" 신청 알림이 카카오톡으로 발송됩니다.`, 'success', 4000)
          if (config.thankYouMessage) {
            setTimeout(() => emitToast(`🎉 ${config.thankYouMessage}`, 'success', 3000), 800)
          }
        } else {
          fetch('/api/notifications/talk-send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData, notifyKakao: config.notifyKakao !== false, thankYouMessage: config.thankYouMessage }),
          }).then(() => {
            if (config.thankYouMessage) emitToast(`🎉 ${config.thankYouMessage}`, 'success', 3000)
          }).catch(() => emitToast('⚠️ 제출 중 오류가 발생했습니다.', 'error'))
        }
        return
      }

      // 6. PG_CHECKOUT
      if (actionType === 'PG_CHECKOUT') {
        const amount = config.paymentAmount
        if (!amount) { emitToast('⚠️ 결제 금액이 설정되지 않았습니다.', 'warning'); return }
        if (isPreview) {
          emitToast(`💳 [테스트] ${amount.toLocaleString()}원 결제가 완료된 것처럼 시뮬레이션합니다.`, 'success', 4000)
          if (config.paymentSuccessUrl && onNavigatePage) {
            setTimeout(() => onNavigatePage(config.paymentSuccessUrl!), 1200)
          }
        } else {
          const IMP = (window as any).IMP
          if (!IMP) { emitToast('⚠️ 결제 모듈 로딩 중입니다. 잠시 후 다시 시도해 주세요.', 'warning'); return }
          IMP.request_pay({
            pg: 'kakaopay', pay_method: 'card',
            merchant_uid: `haroo_${Date.now()}`,
            name: config.buttonText || '상품 결제', amount,
          }, (rsp: any) => {
            if (rsp.success) {
              fetch('/api/payments/verify', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imp_uid: rsp.imp_uid, merchant_uid: rsp.merchant_uid }),
              }).then(() => { if (config.paymentSuccessUrl) window.location.href = config.paymentSuccessUrl })
            } else {
              emitToast(`⚠️ 결제가 취소되었습니다: ${rsp.error_msg}`, 'error')
            }
          })
        }
        return
      }

      // 7. SHOW_MODAL
      if (actionType === 'SHOW_MODAL') {
        if (isPreview) emitToast('🔔 [테스트] 안내 모달이 표시됩니다.', 'info')
        else window.dispatchEvent(new CustomEvent('haroo:show-modal', { detail: { message: config.thankYouMessage || '안내 메시지입니다.' } }))
        return
      }

      // 8. SCROLL_TO_BLOCK
      if (actionType === 'SCROLL_TO_BLOCK') {
        const targetId = config.customTargetId
        if (!targetId) { emitToast('⚠️ 스크롤 대상이 설정되지 않았습니다.', 'warning'); return }
        if (isPreview) emitToast(`⬇️ [테스트] "${targetId}" 영역으로 스크롤합니다.`, 'info')
        const el = document.getElementById(`block-${targetId}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }

      // 9. DOWNLOAD_FILE
      if (actionType === 'DOWNLOAD_FILE') {
        const fileUrl = config.downloadFileUrl || config.buttonLink
        if (!fileUrl) { emitToast('⚠️ 다운로드 파일이 설정되지 않았습니다.', 'warning'); return }
        if (isPreview) emitToast('💾 [테스트] 파일 다운로드가 시작됩니다.', 'info')
        else { const a = document.createElement('a'); a.href = fileUrl; a.download = ''; a.click() }
        return
      }

      // 10. COPY_TO_CLIPBOARD
      if (actionType === 'COPY_TO_CLIPBOARD') {
        const text = config.copyTextPayload || config.buttonLink || ''
        if (!text) { emitToast('⚠️ 복사할 내용이 설정되지 않았습니다.', 'warning'); return }
        navigator.clipboard.writeText(text).then(() => {
          emitToast(isPreview ? `📋 [테스트] 클립보드에 복사되었습니다.` : '📋 클립보드에 복사되었습니다.', 'success')
        }).catch(() => emitToast('⚠️ 복사에 실패했습니다.', 'error'))
        return
      }

      // 11. CUSTOM_INTERACTION
      if (actionType === 'CUSTOM_INTERACTION') {
        const targetId = config.customTargetId
        const effect = config.customEffect
        const customCode = config.customCode
        const target = targetId ? document.getElementById(`block-${targetId}`) : null

        if (target && effect) {
          switch (effect) {
            case 'COLOR_PRIMARY':
              target.style.backgroundColor = '#6366f1'
              if (isPreview) emitToast('🎨 [테스트] 브랜드 색상이 적용되었습니다.', 'info')
              break
            case 'COLOR_DANGER':
              target.style.backgroundColor = '#ef4444'
              if (isPreview) emitToast('🔴 [테스트] 붉은색(경고) 효과가 적용되었습니다.', 'info')
              break
            case 'TOGGLE_VISIBILITY':
              target.style.display = target.style.display === 'none' ? '' : 'none'
              if (isPreview) emitToast('👁️ [테스트] 표시/숨기기 토글되었습니다.', 'info')
              break
            case 'FADE_IN':
              target.style.transition = 'opacity 0.8s ease'
              target.style.opacity = '0'
              requestAnimationFrame(() => { target.style.opacity = '1' })
              if (isPreview) emitToast('✨ [테스트] Fade In 효과가 적용되었습니다.', 'info')
              break
            case 'SHAKE': {
              const styleEl = document.createElement('style')
              styleEl.textContent = `@keyframes haroo-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`
              document.head.appendChild(styleEl)
              target.style.animation = 'none'
              requestAnimationFrame(() => { target.style.animation = 'haroo-shake 0.5s ease' })
              if (isPreview) emitToast('👋 [테스트] 흔들림 효과가 적용되었습니다.', 'info')
              break
            }
          }
        }

        if (customCode) {
          try {
            const fn = new Function('target', customCode)
            fn(target)
          } catch (err) {
            emitToast(`⚠️ 커스텀 코드 오류: ${(err as Error).message}`, 'error')
          }
        }
        return
      }
    },
    [isPreview, onNavigatePage]
  )

  return { handleAction }
}
