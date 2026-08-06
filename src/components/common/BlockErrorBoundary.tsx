'use client'

import React, { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  blockName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * 개별 블록 에러를 격리하는 Error Boundary
 * 한 블록의 오류가 다른 블록 렌더링에 전혀 영향을 주지 않도록 차단
 */
export default class BlockErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[BlockErrorBoundary] 블록 오류 격리:`, error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center gap-2 p-3 rounded-xl border border-red-100 bg-red-50">
          <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
          <div className="text-xs text-red-600">
            <span className="font-semibold">{this.props.blockName ?? '블록'}</span> 로드 실패
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
