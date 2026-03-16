import { cn } from '@/utils/cn'

export interface FilterOption {
  id: string
  label: string
  color?: string
}

interface Props {
  label: string
  options: FilterOption[]
  selected: string | null
  onSelect: (id: string | null) => void
}

export default function FilterBar({ label, options, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-heading font-bold uppercase tracking-wider text-manga-gray">
        {label}:
      </span>
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-2.5 py-1 text-xs font-bold border-2 border-manga-ink transition-all',
          selected === null
            ? 'bg-manga-ink text-white'
            : 'bg-white text-manga-ink hover:bg-manga-paper'
        )}
      >
        Tous
      </button>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(selected === opt.id ? null : opt.id)}
          className={cn(
            'px-2.5 py-1 text-xs font-bold border-2 border-manga-ink transition-all',
            selected === opt.id
              ? 'bg-manga-red text-white'
              : 'bg-white text-manga-ink hover:bg-manga-paper'
          )}
          style={opt.color && selected === opt.id ? { backgroundColor: opt.color, borderColor: opt.color } : undefined}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
