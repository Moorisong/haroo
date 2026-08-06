import { cn } from '@/lib/utils'

interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  children: React.ReactNode
  className?: string
}

/**
 * 20종 원자 컴포넌트: atom_text_01
 * 다목적 텍스트 (as 렌더링 지원)
 */
export default function AtomText01({ as: Component = 'p', children, className }: Props) {
  return (
    <Component className={cn('text-slate-900', className)}>
      {children}
    </Component>
  )
}
