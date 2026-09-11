import Link from 'next/link'

interface BrandLogoProps {
  href?: string
  className?: string
  compact?: boolean
}

export default function BrandLogo({ href = '/', className = '', compact = false }: BrandLogoProps) {
  const content = (
    <span className={`brand-lockup ${compact ? 'brand-lockup-compact' : ''} ${className}`}>
      <span className="brand-mark" aria-hidden="true">ㅎ</span>
      {!compact && <span className="brand-name">하루</span>}
    </span>
  )

  return href ? <Link href={href} aria-label="하루 홈으로 이동">{content}</Link> : content
}
