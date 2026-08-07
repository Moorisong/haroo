import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' | 'info'
  className?: string
}

/**
 * 20종 원자 컴포넌트: atom_badge_01
 * 상태 표시 뱃지
 */
export default function AtomBadge01({ children, variant = 'default', className }: Props) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-transparent',
    success: 'bg-emerald-100 text-emerald-700 border-transparent',
    warning: 'bg-amber-100 text-amber-700 border-transparent',
    error: 'bg-red-100 text-red-700 border-transparent',
    outline: 'bg-transparent text-slate-700 border-slate-200',
    info: 'bg-sky-100 text-sky-700 border-transparent',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
