'use client'

import React, { useRef, useState } from 'react'

interface Props {
  fileUrl?: string
  fileName?: string
  fileSize?: string
  onChange: (fileData: { fileUrl: string; fileName: string; fileSize: string }) => void
  onClear: () => void
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export default function FileUploadField({ fileUrl, fileName, fileSize, onChange, onClear }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleProcessFile = (file: File) => {
    setErrorMsg(null)

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg('⚠️ 파일 용량은 최대 5MB 이하만 업로드할 수 있습니다.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      if (dataUrl) {
        onChange({
          fileUrl: dataUrl,
          fileName: file.name,
          fileSize: formatFileSize(file.size),
        })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleProcessFile(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleProcessFile(file)
  }

  return (
    <div className="flex flex-col gap-2 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">다운로드 파일 첨부</label>
        <span className="text-[11px] text-slate-400 font-medium">(최대 5MB)</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.hwp,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt,.png,.jpg,.jpeg"
      />

      {fileUrl ? (
        <div className="flex flex-col gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xl shrink-0">📄</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-800 truncate">
                  {fileName || '첨부된 파일'}
                </span>
                {fileSize && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    {fileSize}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-sky-600 hover:bg-white rounded border border-slate-200 bg-white/70 transition-colors"
              >
                변경
              </button>
              <button
                type="button"
                onClick={onClear}
                className="px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded border border-rose-200 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full py-5 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center px-4 transition-all ${
            isDragging
              ? 'border-sky-500 bg-sky-50/50'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <span className="text-2xl">📎</span>
          <span className="text-xs font-semibold text-slate-700">
            클릭하여 파일 첨부 또는 드래그앤드롭
          </span>
          <span className="text-[11px] text-slate-400">
            PDF, 문서(DOC, HWP), 스프레드시트, 이미지 등 (최대 5MB)
          </span>
        </div>
      )}

      {errorMsg && (
        <p className="text-[11px] font-semibold text-rose-500 animate-in fade-in duration-200">
          {errorMsg}
        </p>
      )}

      <p className="text-[11px] text-slate-500 leading-relaxed">
        💡 방문자가 버튼을 클릭하면 첨부된 파일이 브라우저에서 즉시 다운로드됩니다.
      </p>
    </div>
  )
}
