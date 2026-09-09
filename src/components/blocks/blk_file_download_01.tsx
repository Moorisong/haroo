import React from 'react'
import AtomText01 from '../atoms/atom_text_01'
import AtomCard01 from '../atoms/atom_card_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import { Download, FileIcon } from 'lucide-react'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config: BlockInputConfig
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void

  isPreview?: boolean
}

export default function BlkFileDownload01({ config, isPreview, onAction  }: Props) {
  const { 
    title = '자료실 / 다운로드', 
    subtitle = '필요한 문서를 다운로드 받으세요', 
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    containerWidth = 'medium',
    paddingY = 'normal',
    fileItems = [
      { id: '1', name: '이용가이드.pdf', size: '2.5MB' },
      { id: '2', name: '신청서_양식.docx', size: '1.1MB' }
    ]
  } = config

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.wrapperClass} ${layout.paddingXClass} ${layout.paddingClass}`}>
        <div className={`${layout.innerClass} max-w-3xl mx-auto flex flex-col gap-6`}>
          
          <div className="space-y-2">
            <AtomText01 variant="h3" className="text-xl sm:text-2xl font-bold tracking-tight">
              {title}
            </AtomText01>
            {subtitle && (
              <AtomText01 variant="p" className="text-sm sm:text-base opacity-80">
                {subtitle}
              </AtomText01>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {fileItems.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 sm:p-5 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    <FileIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <AtomText01 variant="h4" className="font-semibold text-sm sm:text-base text-slate-900 break-all line-clamp-1">
                      {file.name}
                    </AtomText01>
                    {file.size && (
                      <span className="text-xs text-slate-500 mt-0.5">{file.size}</span>
                    )}
                  </div>
                </div>
                
                <AtomBtn01 
                  variant="outline" 
                  size="sm" 
                  className="flex-shrink-0 ml-4 text-sky-600 border-sky-200 hover:bg-sky-50"
                  onClick={() => onAction?.(config, { action: 'DOWNLOAD_FILE', fileId: file.id })}
                >
                  <Download className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">다운로드</span>
                </AtomBtn01>
              </div>
            ))}
          </div>

        </div>
      </div>
    </BlockBackground>
  )
}
