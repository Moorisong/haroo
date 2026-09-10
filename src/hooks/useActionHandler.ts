'use client'

/**
 * useActionHandler
 *
 * 블록 버튼의 모든 액션 타입을 처리하는 공통 훅.
 */

import { useCallback } from 'react'
import type { BlockInputConfig } from '@/types'
import { getRandomDefaultKakaoImage } from '@/constants/kakaoShare'

// ─── Toast 이벤트 발행 ────────────────────────────────────
export type ToastLevel = 'success' | 'info' | 'warning' | 'error'

export function emitToast(message: string, level: ToastLevel = 'info', durationMs = 3500) {
  if (typeof window === 'undefined') return
  const event = new CustomEvent('haroo:toast', {
    detail: { message, level, durationMs },
  })
  window.dispatchEvent(event)
}

// ─── 공통 액션 핸들러 훅 ──────────────────────────────────
interface UseActionHandlerOptions {
  isPreview: boolean // (이제 분기 없이 무조건 실제 동작 실행)
  pages?: Array<{ id: string; title: string; slug: string }>
  onNavigatePage?: (slug: string) => void
}

export function useActionHandler({ isPreview, onNavigatePage }: UseActionHandlerOptions) {
  const handleAction = useCallback(
    (config: BlockInputConfig, _formData?: Record<string, string>) => {
      const actionType = config.actionType
      if (!actionType) {
        if (isPreview) {
          emitToast('⚠️ 이 버튼의 동작(화면 이동, URL 연결 등)이 설정되지 않았습니다. 우측 속성창에서 동작을 선택해 주세요.', 'warning')
        }
        return
      }

      // 1. NAVIGATE_PAGE (내 사이트 다른 화면으로 이동)
      if (actionType === 'NAVIGATE_PAGE') {
        const slug = config.buttonLink
        if (!slug) {
          if (isPreview) emitToast('⚠️ 이동할 화면이 선택되지 않았습니다. 우측 속성창에서 화면을 선택해 주세요.', 'warning')
          return
        }
        if (onNavigatePage) {
          onNavigatePage(slug)
        }
        return
      }

      // 2. OPEN_URL (외부 링크 열기)
      if (actionType === 'OPEN_URL') {
        let url = config.buttonLink?.trim()
        if (!url) {
          if (isPreview) emitToast('⚠️ 연결할 URL이 설정되지 않았습니다.', 'warning')
          return
        }
        if (!/^https?:\/\//i.test(url) && !url.startsWith('//')) {
          url = `https://${url}`
        }
        window.open(url, '_blank', 'noopener,noreferrer')
        return
      }
      
      // 3. SCROLL_TO_BLOCK (특정 영역으로 스크롤)
      if (actionType === 'SCROLL_TO_BLOCK') {
        const targetId = config.customTargetId
        if (!targetId) { 
          if (isPreview) emitToast('⚠️ 스크롤 이동 대상이 설정되지 않았습니다.', 'warning')
          return 
        }
        const el = document.getElementById(`block-${targetId}`) || document.getElementById(`snap-block-${targetId}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      // 4. CALL_PHONE (전화 걸기)
      if (actionType === 'CALL_PHONE') {
        const phone = config.buttonLink?.trim()
        if (!phone) {
          if (isPreview) emitToast('⚠️ 전화번호가 설정되지 않았습니다.', 'warning')
          return
        }

        const cleanPhone = phone.replace(/[^0-9+]/g, '')
        const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if (isMobile) {
          window.location.href = `tel:${cleanPhone}`
        } else {
          // PC 환경: 전화번호 클립보드 복사 + 안내 알림
          navigator.clipboard.writeText(phone).then(() => {
            emitToast(`📞 전화번호(${phone})가 복사되었습니다. 모바일 기기에서 연결해 주세요!`, 'success')
          }).catch(() => {
            window.location.href = `tel:${cleanPhone}`
          })
        }
        return
      }

      // 5. OPEN_KAKAO (카카오톡 오픈채팅/상담 연결)
      if (actionType === 'OPEN_KAKAO') {
        let kakaoUrl = config.buttonLink?.trim()
        if (!kakaoUrl) {
          if (isPreview) emitToast('⚠️ 카카오 링크가 설정되지 않았습니다.', 'warning')
          return
        }
        if (!/^https?:\/\//i.test(kakaoUrl) && !kakaoUrl.startsWith('//')) {
          kakaoUrl = `https://${kakaoUrl}`
        }
        window.open(kakaoUrl, '_blank', 'noopener,noreferrer')
        return
      }
      
      // 6. COPY_TO_CLIPBOARD (주소/계좌번호 복사하기)
      if (actionType === 'COPY_TO_CLIPBOARD') {
        const text = config.copyTextPayload || config.buttonLink || ''
        if (!text) { 
          if (isPreview) emitToast('⚠️ 복사할 내용이 설정되지 않았습니다.', 'warning')
          return 
        }
        navigator.clipboard.writeText(text).then(() => {
          emitToast('📋 클립보드에 복사되었습니다.', 'success')
        }).catch(() => emitToast('⚠️ 복사에 실패했습니다.', 'error'))
        return
      }

      // 7. DOWNLOAD_FILE (파일 다운로드)
      if (actionType === 'DOWNLOAD_FILE') {
        const fileUrl = config.downloadFileUrl || config.buttonLink
        if (!fileUrl) { 
          if (isPreview) emitToast('⚠️ 다운로드 파일이 설정되지 않았습니다.', 'warning')
          return 
        }
        const a = document.createElement('a')
        a.href = fileUrl
        a.download = config.downloadFileName || ''
        a.target = '_blank'
        a.click()
        return
      }

      // 8. SHOW_MODAL (팝업 모달 띄우기)
      if (actionType === 'SHOW_MODAL') {
        window.dispatchEvent(
          new CustomEvent('haroo:show-modal', {
            detail: {
              message: config.thankYouMessage || '',
              icon: config.modalIcon || 'none',
            },
          })
        )
        return
      }
      
      // 9. SHARE_PAGE (이 페이지 공유하기 - PWA/모바일 최적화)
      if (actionType === 'SHARE_PAGE') {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            url: window.location.href,
          }).catch(() => {
            // 유저가 취소한 경우 예외 처리
          });
        } else {
          // 공유 API 미지원 환경 (PC 브라우저 등) => 클립보드 복사 폴백
          navigator.clipboard.writeText(window.location.href).then(() => {
            emitToast('🔗 현재 페이지 주소가 복사되었습니다.', 'success')
          }).catch(() => emitToast('⚠️ 공유하기 기능을 사용할 수 없습니다.', 'error'))
        }
        return
      }

      // 10. SHARE_KAKAO (카카오톡 공유 - sendDefault 방식)
      if (actionType === 'SHARE_KAKAO') {
        const urlToShare = config.buttonLink || window.location.href
        
        const checkKakaoAndShare = async () => {
          let attempts = 0
          // ts-ignore 로 전역 Kakao 객체 접근 (또는 declare global 사용)
          // @ts-ignore
          while ((!window.Kakao || !window.Kakao.isInitialized()) && attempts < 10) {
            await new Promise((resolve) => setTimeout(resolve, 150))
            attempts++
          }

          // @ts-ignore
          if (!window.Kakao || !window.Kakao.isInitialized()) {
            emitToast('⚠️ 카카오 공유 기능을 불러올 수 없어 주소를 복사합니다.', 'warning')
            navigator.clipboard.writeText(urlToShare).then(() => {
              emitToast('🔗 링크가 클립보드에 복사되었습니다.', 'success')
            }).catch(() => emitToast('⚠️ 공유하기 기능을 사용할 수 없습니다.', 'error'))
            return
          }

          // 플랫폼 도메인 기반 리다이렉터 URL 생성
          // 카카오 디벨로퍼스에 등록된 도메인(현재 origin) + /r?to={urlToShare}
          const redirectUrl = `${window.location.origin}/r?to=${encodeURIComponent(urlToShare)}`

          const anyConfig = config as any
          const shareTitle = anyConfig.kakaoShareTitle || config.title || document.title || '새로운 소식이 도착했습니다!'
          const shareDesc = anyConfig.kakaoShareDescription || config.subtitle || ''
          
          // 유저가 업로드/지정한 이미지가 있으면 우선 사용, 없으면 A/B/C안 중 랜덤 추출
          const resolvedImageUrl = anyConfig.kakaoImageUrl || anyConfig.imageUrl || getRandomDefaultKakaoImage()


          const kakaoPayload = {
            objectType: 'feed',
            content: {
              title: shareTitle,
              description: shareDesc,
              imageUrl: resolvedImageUrl,
              link: {
                mobileWebUrl: redirectUrl,
                webUrl: redirectUrl,
              },
            },
            buttons: [
              {
                title: '자세히 보기',
                link: {
                  mobileWebUrl: redirectUrl,
                  webUrl: redirectUrl,
                },
              },
            ],
          }

          // @ts-ignore
          window.Kakao.Share.sendDefault(kakaoPayload)
        }

        checkKakaoAndShare()
        return
      }
    },
    [isPreview, onNavigatePage]
  )

  return { handleAction }
}
