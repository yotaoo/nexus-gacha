import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function RarityStars({ rarity }: { rarity: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rarity }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={cn(
            'fill-current',
            rarity === 5 ? 'text-amber-500' : 'text-purple-500'
          )}
        />
      ))}
    </div>
  )
}
