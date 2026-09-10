import React, { useState } from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomInput01 from '../atoms/atom_input_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomTextarea01 from '../atoms/atom_textarea_01'
import AtomCheckbox01 from '../atoms/atom_checkbox_01'
import AtomLabel01 from '../atoms/atom_label_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import { useElementSelector } from '@/contexts/BlockContext'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void

}

export default function BlkForm01({ config, isPreview, onAction  }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const selectElement = useElementSelector()
  const { 
    title = '문의하기', 
    subtitle = '궁금한 점을 남겨주시면 빠르게 답변해 드립니다.', 
    buttonText = '제출하기',
    formFields = [
      { id: 'name', label: '이름', type: 'text', required: true },
      { id: 'phone', label: '연락처', type: 'text', required: true },
      { id: 'message', label: '문의내용', type: 'textarea', required: false }
    ],
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'wide',
    paddingY = 'normal',
    buttonStyle,
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
        <div className="text-center mb-8">
          <AtomText01 
            variant="h2" 
            className="mb-2 font-bold cursor-pointer hover:opacity-80 transition-opacity"
            data-element-key="title"
            onClick={(e: React.MouseEvent) => selectElement('title', e)}
          >{title}</AtomText01>
          <AtomText01 
            variant="p" 
            className="opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
            data-element-key="subtitle"
            onClick={(e: React.MouseEvent) => selectElement('subtitle', e)}
          >{subtitle}</AtomText01>
        </div>

        <form 
          className="space-y-4 cursor-pointer border border-transparent hover:border-slate-300 p-2 rounded-md transition-colors" 
          data-element-key="formFields"
          onClick={(e) => selectElement('formFields', e)}
          onSubmit={(e) => {
            e.preventDefault()
            onAction?.(config, formData)
          }}
        >
          {formFields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <AtomLabel01>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </AtomLabel01>
              {field.type === 'textarea' ? (
                <AtomTextarea01
                  placeholder={`${field.label}을(를) 입력해주세요`}
                  required={field.required}
                  maxLength={field.maxLength}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
                  }
                />
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-2">
                  <AtomCheckbox01 required={field.required} />
                  <AtomText01 variant="span" className="text-sm opacity-80">
                    {field.label}에 동의합니다.
                  </AtomText01>
                </div>
              ) : (
                <AtomInput01 
                  type={field.type} 
                  placeholder={`${field.label}을(를) 입력해주세요`}
                  required={field.required}
                  maxLength={field.maxLength}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
                  }
                />
              )}
            </div>
          ))}
          
          <div className="pt-4">
            <AtomBtn01 
              className={[
                'w-full h-auto font-semibold transition-all',
                buttonStyle?.size === 'sm' ? 'px-4 py-2' :
                buttonStyle?.size === 'md' ? 'px-6 py-3' :
                buttonStyle?.size === 'xl' ? 'px-10 py-5' :
                'px-8 py-4'
              ].join(' ')}
              style={{
                backgroundColor: buttonStyle?.backgroundColor || '#0f172a',
                color: buttonStyle?.textColor || '#ffffff',
                borderRadius: buttonStyle?.borderRadius || '0.75rem',
                fontWeight: buttonStyle?.fontWeight || 'bold',
                fontSize: buttonStyle?.size === 'sm' ? '0.8125rem' :
                          buttonStyle?.size === 'md' ? '0.9375rem' :
                          buttonStyle?.size === 'xl' ? '1.25rem' : '1.0625rem',
                border: 'none',
              }}
              data-element-key="button"
              onClick={(e: React.MouseEvent) => {
                selectElement('button', e)
              }}
            >
              {buttonText}
            </AtomBtn01>
          </div>
        </form>
      </div>
      </div>
    </BlockBackground>
  )
}
