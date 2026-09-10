'use client'

import React from 'react'
import type { BlockInputConfig } from '@/types'

interface Props {
  config: BlockInputConfig & Record<string, any>
  handleChange: (fieldOrData: string | Record<string, any>, value?: any) => void
}

export default function FormPropertyPanel({ config, handleChange }: Props) {
  const formFields = config.formFields || [
    { id: 'name', label: '이름', type: 'text', required: true, maxLength: 20 },
    { id: 'phone', label: '연락처', type: 'text', required: true, maxLength: 15 },
    { id: 'message', label: '문의내용', type: 'textarea', required: false }
  ]

  const updateField = (index: number, key: string, value: any) => {
    const newFields = [...formFields]
    newFields[index] = { ...newFields[index], [key]: value }
    handleChange('formFields', newFields)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700">입력 항목 설정</label>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          💡 방문자가 입력할 각 항목의 제목(Label)과 글자수 제한을 설정할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {formFields.map((field, idx) => (
          <div key={field.id} className="p-3 bg-slate-50 border border-slate-200 rounded-md flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-700">
                항목명 <span className="text-slate-400 font-normal">({field.id === 'name' ? '이름' : field.id === 'phone' ? '연락처' : '문의내용'})</span>
              </label>
              <input
                type="text"
                value={field.label || ''}
                onChange={(e) => updateField(idx, 'label', e.target.value)}
                className="w-full text-xs border border-slate-300 rounded p-2 focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-700">최대 글자수 (제한)</label>
              <input
                type="number"
                value={field.maxLength || ''}
                onChange={(e) => updateField(idx, 'maxLength', parseInt(e.target.value, 10) || undefined)}
                className="w-full text-xs border border-slate-300 rounded p-2 focus:border-sky-500 focus:outline-none"
                placeholder="제한 없음 (비워두기)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
