import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export default function MangaCard({ children, className, onClick, hover = true }: Props) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'bg-white border-3 border-manga-ink shadow-manga transition-all duration-200 text-left',
        hover && 'hover:shadow-manga-hover hover:-translate-x-0.5 hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Tag>
  )
}
