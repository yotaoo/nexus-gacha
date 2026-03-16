import { cn } from '@/utils/cn'

interface Props {
  label: string
  color?: string
  size?: 'sm' | 'md'
}

export default function Badge({ label, color, size = 'sm' }: Props) {
  return (
    <span
      className={cn(
        'manga-badge',
        size === 'md' && 'px-3 py-1 text-sm'
      )}
      style={color ? { borderColor: color, color } : undefined}
    >
      {label}
    </span>
  )
}
