import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  noPadding?: boolean
}

/**
 * 20종 원자 컴포넌트: atom_card_01
 * 1px border-slate-200 규격의 기본 카드 래퍼
 */
export default function AtomCard01({ children, className, noPadding = false }: Props) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200 overflow-hidden',
        !noPadding && 'p-5',
        className
      )}
    >
      {children}
    </div>
  )
}
