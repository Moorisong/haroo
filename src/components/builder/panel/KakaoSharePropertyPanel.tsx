'use client'

import React, { useRef, useState } from 'react'
import { KAKAO_IMAGE_MAX_SIZE_MB, KAKAO_IMAGE_MAX_SIZE_BYTES, KAKAO_DEFAULT_THUMBNAILS } from '@/constants/kakaoShare'
import { Image as ImageIcon, Shuffle, Loader2 } from 'lucide-react'
import type { BlockInputConfig } from '@/types'

interface Props {
  config: BlockInputConfig
  handleChange: (field: string, value: any) => void
}

export default function KakaoSharePropertyPanel({ config, handleChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const kakaoImageUrl = (config as any).kakaoImageUrl || ''
  const shareTitle = (config as any).kakaoShareTitle || config.title || ''
  const shareDesc = (config as any).kakaoShareDescription || config.subtitle || ''

  const handleProcessFile = async (file: File) => {
    setErrorMsg(null)

    if (!file.type.startsWith('image/')) {
      setErrorMsg('이미지 파일(JPG, PNG, WebP 등)만 업로드할 수 있습니다.')
      return
    }

    if (file.size > KAKAO_IMAGE_MAX_SIZE_BYTES) {
      setErrorMsg(`이미지 용량은 최대 ${KAKAO_IMAGE_MAX_SIZE_MB}MB 이하만 업로드할 수 있습니다.`)
      return
    }

    // 카카오 SDK 초기화 확인
    // @ts-ignore
    if (typeof window === 'undefined' || !window.Kakao || !window.Kakao.isInitialized()) {
      setErrorMsg('카카오톡 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.')
      return
    }

    setIsUploading(true)

    try {
      // 카카오 공식 서버에 이미지 업로드하여 CDN URL 발급 (100일 보관, feed 공유에 최적화)
      // @ts-ignore
      const res = await window.Kakao.Share.uploadImage({
        file: [file],
      })

      const uploadedUrl = res?.infos?.original?.url
      if (uploadedUrl) {
        handleChange('kakaoImageUrl', uploadedUrl)
      } else {
        setErrorMsg('이미지 업로드에 실패했습니다. 다시 시도해 주세요.')
      }
    } catch (err: any) {
      console.error('[Kakao Upload Error]', err)
      setErrorMsg('카카오 이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
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
    <div className="flex flex-col gap-5 animate-in fade-in duration-200">
      {/* 썸네일 이미지 설정 섹션 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">카카오톡 피드 썸네일</label>
          <span className="text-[11px] text-slate-400 font-medium">최대 {KAKAO_IMAGE_MAX_SIZE_MB}MB</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/png,image/jpeg,image/webp,image/gif"
        />

        {kakaoImageUrl ? (
          <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={kakaoImageUrl}
              alt="카카오 공유 썸네일"
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs font-semibold text-white bg-slate-900/80 hover:bg-slate-900 rounded-lg shadow transition-colors"
              >
                변경
              </button>
              <button
                type="button"
                onClick={() => handleChange('kakaoImageUrl', '')}
                className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600/90 hover:bg-rose-600 rounded-lg shadow transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault()
              if (!isUploading) setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`w-full py-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer text-center px-4 transition-all ${
              isDragging
                ? 'border-sky-500 bg-sky-50/50'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50'
            } ${isUploading ? 'opacity-60 cursor-wait' : ''}`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
                <span className="text-xs font-semibold text-slate-700">
                  카카오 서버로 이미지 업로드 중...
                </span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  클릭하여 썸네일 등록 또는 드래그앤드롭
                </span>
                <span className="text-[11px] text-slate-400">
                  권장 비율 2:1 또는 1:1 (최대 {KAKAO_IMAGE_MAX_SIZE_MB}MB)
                </span>
              </>
            )}
          </div>
        )}

        {errorMsg && (
          <p className="text-[11px] font-semibold text-rose-500 animate-in fade-in duration-200">
            {errorMsg}
          </p>
        )}

        {/* 디폴트 랜덤 발송 안내 배너 */}
        {!kakaoImageUrl && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-1.5 text-slate-700">
            <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold">
              <Shuffle className="w-3.5 h-3.5 text-slate-500" />
              <span>디폴트 랜덤 썸네일 발송 안내</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              이미지를 등록하지 않으면 <span className="font-semibold text-slate-700">3가지 기본 카드(모던 초대장 / 친화 말풍선 / 미니멀 배너)</span> 중 1개가 무작위로 선택되어 전송됩니다.
            </p>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {KAKAO_DEFAULT_THUMBNAILS.map((item, idx) => (
                <div key={item.id} className="relative rounded-md overflow-hidden aspect-[16/9] border border-slate-200 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[9px] py-0.5 text-center font-semibold">
                    {idx === 0 ? 'A안' : idx === 1 ? 'B안' : 'C안'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 공유 문구 커스텀 */}
      <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-700">카카오톡 공유 문구 (선택)</label>
        
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-slate-500">공유 제목</span>
          <input
            type="text"
            value={(config as any).kakaoShareTitle || ''}
            onChange={(e) => handleChange('kakaoShareTitle', e.target.value)}
            placeholder={config.title || '비워둘 시 블록 제목 사용'}
            className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-slate-500">공유 상세 설명</span>
          <input
            type="text"
            value={(config as any).kakaoShareDescription || ''}
            onChange={(e) => handleChange('kakaoShareDescription', e.target.value)}
            placeholder={config.subtitle || '비워둘 시 블록 부제목 사용'}
            className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>
    </div>
  )
}
