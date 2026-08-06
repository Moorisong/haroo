import { Button as ShadcnButton, type buttonVariants } from '@/components/ui/button'
import { type VariantProps } from 'class-variance-authority'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

/**
 * 20종 원자 컴포넌트: atom_btn_01
 * 기본 버튼 (shadcn button 래핑)
 */
export default function AtomBtn01({ children, variant, size, className, ...props }: Props) {
  return (
    <ShadcnButton variant={variant} size={size} className={className} {...props}>
      {children}
    </ShadcnButton>
  )
}
