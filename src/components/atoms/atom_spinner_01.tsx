import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  size?: number
  className?: string
}

/**
 * 20종 원자 컴포넌트: atom_spinner_01
 * 로딩 스피너
 */
export default function AtomSpinner01({ size = 20, className }: Props) {
  return (
    <Loader2 size={size} className={cn('animate-spin text-slate-400', className)} />
  )
}
