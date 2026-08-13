import React from 'react'
import { ArrowLeft, Upload } from 'lucide-react'
import AtomText01 from '../../atoms/atom_text_01'
import AtomBtn01 from '../../atoms/atom_btn_01'
import AtomIcon01 from '../../atoms/atom_icon_01'
import AtomDivider01 from '../../atoms/atom_divider_01'
import AtomInput01 from '../../atoms/atom_input_01'
import AtomTextarea01 from '../../atoms/atom_textarea_01'

interface Props {
  onBack: () => void
  onSubmit: () => void
}

export default function BoardWriteView({ onBack, onSubmit }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <AtomBtn01 variant="ghost" onClick={onBack} className="mb-6 flex items-center gap-2 -ml-4 text-slate-500">
        <AtomIcon01 icon={ArrowLeft} size={16} />
        목록으로 돌아가기
      </AtomBtn01>

      <AtomText01 as="h1" className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
        게시물 작성
      </AtomText01>

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900">제목 <span className="text-rose-500">*</span></label>
          <AtomInput01 placeholder="제목을 입력해주세요" className="text-lg py-6" required />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900">카테고리</label>
          <select className="w-full md:w-64 flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            <option value="notice">공지사항</option>
            <option value="guide">가이드</option>
            <option value="event">이벤트</option>
            <option value="general">일반</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900 flex justify-between">
            내용 <span className="text-rose-500">*</span>
          </label>
          <AtomTextarea01 placeholder="내용을 자세히 작성해주세요." className="min-h-[300px]" required />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900 flex items-center justify-between">
            <span>이미지 첨부</span>
            <span className="text-slate-400 font-normal text-xs">최대 3장, 10MB 이하</span>
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 bg-slate-50 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AtomIcon01 icon={Upload} size={28} className="text-slate-400" />
            </div>
            <AtomText01 as="p" className="font-semibold text-slate-700 mb-1">
              클릭하여 파일 선택 또는 드래그 앤 드롭
            </AtomText01>
            <AtomText01 as="p" className="text-sm text-slate-500">
              JPG, PNG, GIF, WebP (최대 10MB)
            </AtomText01>
          </div>
        </div>

        <AtomDivider01 className="my-8" />

        <div className="flex flex-col-reverse md:flex-row justify-between gap-4 md:items-center">
          <p className="text-xs text-slate-500">
            * 게시물 등록 시 운영정책에 위배되는 내용은 통보 없이 삭제될 수 있습니다.
          </p>
          <div className="flex gap-3">
            <AtomBtn01 type="button" variant="outline" size="lg" onClick={onBack}>
              취소
            </AtomBtn01>
            <AtomBtn01 type="submit" variant="default" size="lg">
              등록하기
            </AtomBtn01>
          </div>
        </div>
      </form>
    </div>
  )
}
