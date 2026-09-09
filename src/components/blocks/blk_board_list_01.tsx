import React, { useState } from 'react'
import { MessageSquare, ThumbsUp, Eye, FileText, Image as ImageIcon } from 'lucide-react'
import AtomCard01 from '../atoms/atom_card_01'
import AtomText01 from '../atoms/atom_text_01'
import AtomBtn01 from '../atoms/atom_btn_01'
import AtomBadge01 from '../atoms/atom_badge_01'
import AtomAvatar01 from '../atoms/atom_avatar_01'
import AtomIcon01 from '../atoms/atom_icon_01'
import AtomImage01 from '../atoms/atom_image_01'
import BoardDetailView from './board/BoardDetailView'
import BoardWriteView from './board/BoardWriteView'
import { getBlockLayout } from '@/lib/blockLayout'
import type { BlockInputConfig, ContainerWidth, PaddingYOption } from '@/types'
import BlockBackground from "@/components/common/BlockBackground"

interface Props {
  config?: BlockInputConfig
  isPreview?: boolean
  onAction?: (config: BlockInputConfig, formData?: Record<string, string>) => void

}

const MOCK_POSTS = [
  {
    id: 1,
    title: '새로운 서비스 업데이트 안내 (v2.0)',
    content: '안녕하세요. 서비스가 대폭 업데이트 되었습니다. 새로운 기능들을 만나보세요. 사용자 편의성을 위해 디자인을 개선하고 버그를 수정했습니다.',
    author: { name: '관리자', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop' },
    category: '공지사항',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
    viewCount: 1250,
    likeCount: 45,
    commentCount: 2,
    createdAt: '2026-08-12',
    isNotice: true,
  },
  {
    id: 2,
    title: '사용자 가이드 및 자주 묻는 질문',
    content: '서비스 이용에 도움이 되는 가이드입니다.',
    author: { name: '고객지원', avatar: '' },
    category: '가이드',
    thumbnail: '',
    viewCount: 842,
    likeCount: 12,
    commentCount: 4,
    createdAt: '2026-08-11',
    isNotice: false,
  },
  {
    id: 3,
    title: '이번 달 우수 회원 선정 안내',
    content: '우수 회원으로 선정되신 분들 축하드립니다.',
    author: { name: '커뮤니티 매니저', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' },
    category: '이벤트',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop',
    viewCount: 520,
    likeCount: 38,
    commentCount: 8,
    createdAt: '2026-08-10',
    isNotice: false,
  },
]

const MOCK_COMMENTS = [
  { id: 1, content: '좋은 업데이트네요! 기대됩니다.', author: { name: '김태완', avatar: '' }, createdAt: '2026-08-12 14:30', isMine: false },
  { id: 2, content: '수고 많으셨습니다.', author: { name: '홍길동', avatar: '' }, createdAt: '2026-08-12 15:45', isMine: true },
]

export default function BlkBoardList01({ config, isPreview  }: Props) {
  const [view, setView] = useState<'list' | 'detail' | 'write'>('list')
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const safeConfig = config ?? {}
  const {
    title = '게시판',
    subtitle = '다양한 소식과 정보를 확인하세요.',
    buttonText = '글쓰기',
    boardViewType = 'table',
    containerWidth = 'wide',
    paddingY = 'normal',
    backgroundColor = '#ffffff',
  } = safeConfig as BlockInputConfig

  const layout = getBlockLayout(containerWidth as ContainerWidth, paddingY as PaddingYOption)
  const isTable = boardViewType === 'table'
  const isGallery = boardViewType === 'gallery'
  const isList = boardViewType === 'list'

  const handlePostClick = (id: number) => {
    setSelectedPostId(id)
    setView('detail')
  }

  const renderTableView = () => (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-12 gap-4 py-3 border-b-2 border-slate-800 text-slate-500 font-medium text-sm">
          <div className="col-span-1 text-center">번호</div>
          <div className="col-span-6">제목</div>
          <div className="col-span-2 text-center">작성자</div>
          <div className="col-span-1 text-center">작성일</div>
          <div className="col-span-1 text-center">조회수</div>
          <div className="col-span-1 text-center">좋아요</div>
        </div>
        {MOCK_POSTS.map((post) => (
          <div 
            key={post.id} 
            className="grid grid-cols-12 gap-4 py-4 border-b border-slate-200 items-center hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="col-span-1 text-center flex justify-center">
              {post.isNotice ? (
                <AtomBadge01 variant="info" className="text-xs">공지</AtomBadge01>
              ) : (
                <AtomText01 as="span" className="text-slate-500 text-sm">{post.id}</AtomText01>
              )}
            </div>
            <div className="col-span-6 flex items-center gap-2">
              <AtomText01 as="span" className="text-slate-900 font-medium hover:underline truncate">
                {post.title}
              </AtomText01>
              {post.commentCount > 0 && (
                <span className="text-cyan-600 text-xs font-bold">[{post.commentCount}]</span>
              )}
            </div>
            <div className="col-span-2 flex items-center justify-center gap-2">
              {post.author.avatar ? (
                <AtomAvatar01 src={post.author.avatar} alt={post.author.name} size="sm" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-200" />
              )}
              <AtomText01 as="span" className="text-slate-700 text-sm truncate">{post.author.name}</AtomText01>
            </div>
            <div className="col-span-1 text-center text-slate-500 text-sm">{post.createdAt.slice(5)}</div>
            <div className="col-span-1 text-center text-slate-500 text-sm">{post.viewCount}</div>
            <div className="col-span-1 text-center text-slate-500 text-sm">{post.likeCount}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderGalleryView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {MOCK_POSTS.map((post) => (
        <AtomCard01 
          key={post.id} 
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col noPadding"
          onClick={() => handlePostClick(post.id)}
        >
          {post.thumbnail ? (
            <div className="w-full aspect-video relative">
              <AtomImage01 src={post.thumbnail} alt={post.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full aspect-video bg-slate-100 flex items-center justify-center">
              <AtomIcon01 icon={ImageIcon} size={48} className="text-slate-300" />
            </div>
          )}
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <AtomBadge01 variant={post.isNotice ? 'info' : 'default'} className="text-xs">{post.category}</AtomBadge01>
              <AtomText01 as="span" className="text-slate-500 text-xs">{post.createdAt}</AtomText01>
            </div>
            <AtomText01 as="h3" className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</AtomText01>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-2">
                <AtomAvatar01 src={post.author.avatar} alt={post.author.name} size="sm" />
                <AtomText01 as="span" className="text-slate-700 text-sm truncate max-w-[80px]">{post.author.name}</AtomText01>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <div className="flex items-center gap-1"><AtomIcon01 icon={Eye} size={14} />{post.viewCount}</div>
                <div className="flex items-center gap-1"><AtomIcon01 icon={ThumbsUp} size={14} />{post.likeCount}</div>
              </div>
            </div>
          </div>
        </AtomCard01>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="flex flex-col gap-4">
      {MOCK_POSTS.map((post) => (
        <AtomCard01 
          key={post.id} 
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handlePostClick(post.id)}
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-grow flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {post.isNotice && <AtomBadge01 variant="info" className="text-xs">공지</AtomBadge01>}
                <AtomBadge01 variant="default" className="text-xs">{post.category}</AtomBadge01>
              </div>
              <AtomText01 as="h3" className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {post.title}
                {post.commentCount > 0 && (
                  <span className="text-cyan-600 text-sm font-bold flex items-center gap-1">
                    <AtomIcon01 icon={MessageSquare} size={14} /> {post.commentCount}
                  </span>
                )}
              </AtomText01>
              <AtomText01 as="p" className="text-slate-500 text-sm line-clamp-1">{post.content}</AtomText01>
              <div className="flex items-center gap-4 text-slate-500 text-sm mt-1">
                <span className="flex items-center gap-1"><AtomAvatar01 src={post.author.avatar} alt={post.author.name} size="sm" /> {post.author.name}</span>
                <span>{post.createdAt}</span>
                <span className="flex items-center gap-1"><AtomIcon01 icon={Eye} size={14} /> {post.viewCount}</span>
              </div>
            </div>
            {post.thumbnail && (
              <div className="w-full md:w-32 aspect-video md:aspect-square relative rounded-md overflow-hidden flex-shrink-0">
                <AtomImage01 src={post.thumbnail} alt={post.title} fill className="object-cover" />
              </div>
            )}
          </div>
        </AtomCard01>
      ))}
    </div>
  )

  const currentPost = MOCK_POSTS.find((p) => p.id === selectedPostId) || MOCK_POSTS[0]

  return (
    <BlockBackground config={config} isPreview={isPreview}>
      <div className={`${layout.paddingClass} ${layout.wrapperClass}`}>
      <div className={`mx-auto ${layout.innerClass} ${layout.paddingXClass}`}>
        {view === 'list' && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <AtomText01 as="h2" className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{title}</AtomText01>
                {subtitle && <AtomText01 as="p" className="text-slate-500">{subtitle}</AtomText01>}
              </div>
              {buttonText && (
                <AtomBtn01 onClick={() => setView('write')} variant="default" className="flex items-center gap-2 shrink-0">
                  <AtomIcon01 icon={FileText} size={16} />
                  {buttonText}
                </AtomBtn01>
              )}
            </div>

            {isPreview && (
              <div className="flex gap-2 mb-4">
                <AtomBadge01 variant={isTable ? 'info' : 'outline'} className="cursor-default">테이블</AtomBadge01>
                <AtomBadge01 variant={isGallery ? 'info' : 'outline'} className="cursor-default">갤러리</AtomBadge01>
                <AtomBadge01 variant={isList ? 'info' : 'outline'} className="cursor-default">리스트</AtomBadge01>
              </div>
            )}

            {isTable && renderTableView()}
            {isGallery && renderGalleryView()}
            {isList && renderListView()}

            <div className="flex justify-center mt-8 gap-1">
              <AtomBtn01 variant="outline" size="sm" className="w-8 h-8 p-0 rounded-md">1</AtomBtn01>
              <AtomBtn01 variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-md">2</AtomBtn01>
              <AtomBtn01 variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-md">3</AtomBtn01>
            </div>
          </>
        )}

        {view === 'detail' && (
          <BoardDetailView post={currentPost} comments={MOCK_COMMENTS} onBack={() => setView('list')} />
        )}
        {view === 'write' && (
          <BoardWriteView onBack={() => setView('list')} onSubmit={() => setView('list')} />
        )}
      </div>
    </div>
    </BlockBackground>
  )
}
