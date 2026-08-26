'use client'

import { useEffect } from 'react'
import { consumeAuthRedirectTarget } from '@/lib/authRedirectHelper'

export default function PendingAuthRedirectHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const pendingDraft = sessionStorage.getItem('pending_builder_draft')
    const redirectTarget = consumeAuthRedirectTarget()
    
    if (pendingDraft || redirectTarget === '/builder') {
      window.location.href = '/builder'
    }
  }, [])

  return null
}
