import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomInput01 from '../atoms/atom_input_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomTextarea01 from '../atoms/atom_textarea_01'
import AtomCheckbox01 from '../atoms/atom_checkbox_01'
import AtomLabel01 from '../atoms/atom_label_01'
import AtomCard01 from '../atoms/atom_card_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'

interface Props {
  config: BlockInputConfig
}

export default function BlkForm01({ config }: Props) {
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
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <AtomCard01 noPadding className="w-full border-none rounded-none" style={{ backgroundColor, color: textColor }}>
      <div className={`${layout.wrapperClass} px-6 ${layout.paddingClass}`}>
        <div className={`${layout.innerClass}`}>
        <div className="text-center mb-8">
          <AtomText01 variant="h2" className="mb-2 font-bold">{title}</AtomText01>
          <AtomText01 variant="p" className="opacity-80">{subtitle}</AtomText01>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {formFields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <AtomLabel01>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </AtomLabel01>
              {field.type === 'textarea' ? (
                <AtomTextarea01
                  placeholder={`${field.label}을(를) 입력해주세요`}
                  required={field.required}
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
                />
              )}
            </div>
          ))}
          
          <div className="pt-4">
            <AtomBtn01 className="w-full" size="lg">{buttonText}</AtomBtn01>
          </div>
        </form>
      </div>
      </div>
    </AtomCard01>
  )
}
