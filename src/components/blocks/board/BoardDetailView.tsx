import React from 'react'
import { MessageSquare, ThumbsUp, Eye, ArrowLeft, Share2, AlertCircle } from 'lucide-react'
import AtomCard01 from '../../atoms/atom_card_01'
import AtomText01 from '../../atoms/atom_text_01'
import AtomBtn01 from '../../atoms/atom_btn_01'
import AtomBadge01 from '../../atoms/atom_badge_01'
import AtomAvatar01 from '../../atoms/atom_avatar_01'
import AtomIcon01 from '../../atoms/atom_icon_01'
import AtomImage01 from '../../atoms/atom_image_01'
import AtomTextarea01 from '../../atoms/atom_textarea_01'

interface Post {
  id: number
  title: string
  content: string
  author: { name: string; avatar: string }
  category: string
  thumbnail: string
  viewCount: number
  likeCount: number
  commentCount: number
  createdAt: string
  isNotice: boolean
}

interface Comment {
  id: number
  content: string
  author: { name: string; avatar: string }
  createdAt: string
  isMine: boolean
}

interface Props {
  post: Post
  comments: Comment[]
  onBack: () => void
}

export default function BoardDetailView({ post, comments, onBack }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <AtomBtn01 variant="ghost" onClick={onBack} className="mb-6 flex items-center gap-2 -ml-4 text-slate-500">
        <AtomIcon01 icon={ArrowLeft} size={16} />
        목록으로 돌아가기
      </AtomBtn01>

      <div className="mb-6">
        <AtomBadge01 variant="info" className="mb-4">{post.category}</AtomBadge01>
        <AtomText01 as="h1" className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          {post.title}
        </AtomText01>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <AtomAvatar01 src={post.author.avatar} alt={post.author.name} size="md" />
            <div>
              <AtomText01 as="span" className="font-medium text-slate-900 block">{post.author.name}</AtomText01>
              <AtomText01 as="span" className="text-sm text-slate-500 block">{post.createdAt}</AtomText01>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-1.5"><AtomIcon01 icon={Eye} size={16} /> {post.viewCount}</span>
            <span className="flex items-center gap-1.5 text-rose-500 font-medium"><AtomIcon01 icon={ThumbsUp} size={16} /> {post.likeCount}</span>
            <span className="flex items-center gap-1.5"><AtomIcon01 icon={MessageSquare} size={16} /> {post.commentCount}</span>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none mb-12">
        {post.thumbnail && (
          <div className="w-full aspect-video relative rounded-lg overflow-hidden mb-8">
            <AtomImage01 src={post.thumbnail} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <AtomText01 as="p" className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
          {post.content}
        </AtomText01>
      </div>

      <div className="flex items-center justify-center gap-4 mb-12 border-y border-slate-100 py-8">
        <AtomBtn01 variant="outline" size="lg" className="rounded-full w-24 h-24 flex flex-col items-center justify-center gap-2 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-colors">
          <AtomIcon01 icon={ThumbsUp} size={28} />
          <span className="font-bold">{post.likeCount}</span>
        </AtomBtn01>
        <div className="flex flex-col gap-2">
          <AtomBtn01 variant="ghost" className="text-slate-500 flex items-center gap-2">
            <AtomIcon01 icon={Share2} size={18} /> 공유하기
          </AtomBtn01>
          <AtomBtn01 variant="ghost" className="text-slate-500 flex items-center gap-2 hover:text-rose-600 hover:bg-rose-50">
            <AtomIcon01 icon={AlertCircle} size={18} /> 신고/차단
          </AtomBtn01>
        </div>
      </div>

      <div className="mt-8">
        <AtomText01 as="h3" className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          댓글 <span className="text-rose-500">{post.commentCount}</span>
        </AtomText01>

        <AtomCard01 className="mb-8 bg-slate-50 border border-slate-200 noPadding p-4">
          <AtomTextarea01 placeholder="댓글을 남겨보세요." className="bg-white mb-3" rows={3} />
          <div className="flex justify-end">
            <AtomBtn01 variant="default">등록</AtomBtn01>
          </div>
        </AtomCard01>

        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id} className="pb-4 border-b border-slate-100 last:border-0">
              <div className="flex items-start gap-3">
                <AtomAvatar01 src={comment.author.avatar} alt={comment.author.name} size="md" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <AtomText01 as="span" className="font-medium text-slate-900">{comment.author.name}</AtomText01>
                      {comment.isMine && (
                        <AtomBadge01 variant="info" className="text-[10px] px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-600 border border-sky-100 font-medium tracking-normal normal-case">
                          내 댓글
                        </AtomBadge01>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <span>{comment.createdAt}</span>
                      {comment.isMine ? (
                        <div className="flex gap-2">
                          <button className="hover:text-slate-700 hover:underline">수정</button>
                          <button className="hover:text-rose-500 hover:underline">삭제</button>
                        </div>
                      ) : (
                        <button className="hover:text-slate-700 flex items-center gap-1 hover:underline">
                          <AtomIcon01 icon={AlertCircle} size={12} /> 신고
                        </button>
                      )}
                    </div>
                  </div>
                  <AtomText01 as="p" className="text-slate-700 whitespace-pre-wrap">{comment.content}</AtomText01>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
