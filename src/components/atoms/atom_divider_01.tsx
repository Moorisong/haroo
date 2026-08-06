import { cn } from '@/lib/utils'

interface Props {
  className?: string
  vertical?: boolean
}

/**
 * 20종 원자 컴포넌트: atom_divider_01
 * 선 긋기
 */
export default function AtomDivider01({ className, vertical = false }: Props) {
  return (
    <div
      className={cn(
        'bg-slate-100',
        vertical ? 'w-[1px] h-full' : 'h-[1px] w-full',
        className
      )}
    />
  )
}
