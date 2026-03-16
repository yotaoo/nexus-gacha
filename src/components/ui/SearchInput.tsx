import { Search } from 'lucide-react'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchInput({ value, onChange, placeholder = 'Rechercher...' }: Props) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-manga-gray" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border-3 border-manga-ink bg-white font-body text-sm
                   focus:outline-none focus:shadow-manga transition-shadow placeholder:text-manga-gray/50"
      />
    </div>
  )
}
