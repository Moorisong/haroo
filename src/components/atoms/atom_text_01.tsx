import { cn } from '@/lib/utils'

type TagVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface Props extends React.HTMLAttributes<HTMLElement> {
  /** 렌더링할 HTML 태그 (기본: 'p') */
  as?: TagVariant
  /** as의 별칭 — 블록 컴포넌트에서 variant로 호출 허용 */
  variant?: TagVariant
  children: React.ReactNode
  className?: string
}

/**
 * 20종 원자 컴포넌트: atom_text_01
 * 다목적 텍스트 (as / variant 렌더링 지원)
 */
export default function AtomText01({ as, variant, children, className, ...rest }: Props) {
  const Component = as ?? variant ?? 'p'
  return (
    <Component className={cn('text-slate-900', className)} {...rest}>
      {children}
    </Component>
  )
}
