'use client'

import React from 'react'
import type { SmartGuide } from '@/lib/snapGrid'
import { CANVAS_WIDTH } from '@/lib/snapGrid'

interface SmartGuideLayerProps {
  guides: SmartGuide[]
  canvasHeight: number
}

/**
 * 스마트 가이드 레이어 - 드래그/리사이즈 중 정렬 가이드라인을 화면에 렌더링
 */
export default function SmartGuideLayer({ guides, canvasHeight }: SmartGuideLayerProps) {
  if (guides.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {guides.map((guide, i) => {
        if (guide.type === 'horizontal') {
          return (
            <div
              key={`h-${i}-${guide.position}`}
              className="absolute left-0 right-0 h-px bg-indigo-500"
              style={{ top: guide.position }}
            />
          )
        }
        return (
          <div
            key={`v-${i}-${guide.position}`}
            className="absolute top-0 w-px bg-indigo-500"
            style={{ left: guide.position, height: canvasHeight }}
          />
        )
      })}
    </div>
  )
}
