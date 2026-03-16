import { Link } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import { GENSHIN_TIER_LIST } from '@/data/editorial/genshinTierList'
import type { TierEntry } from '@/types'
import { cn } from '@/utils/cn'

const TIERS = ['SS', 'S', 'A', 'B', 'C', 'D'] as const
const TIER_COLORS: Record<string, string> = {
  SS: 'bg-red-500 text-white',
  S: 'bg-orange-500 text-white',
  A: 'bg-amber-400 text-black',
  B: 'bg-green-500 text-white',
  C: 'bg-blue-500 text-white',
  D: 'bg-gray-500 text-white',
}

export default function GenshinTierListPage() {
  return (
    <PageLayout title="Tier List" subtitle="Genshin Impact - Classement editorial">
      <div className="space-y-3">
        {TIERS.map((tier) => {
          const chars = GENSHIN_TIER_LIST.filter((c) => c.tier === tier)
          if (chars.length === 0) return null
          return (
            <div key={tier} className="manga-card overflow-hidden" onClick={undefined}>
              <div className="flex">
                <div className={cn('flex items-center justify-center w-16 sm:w-20 font-heading font-black text-2xl border-r-3 border-manga-ink flex-shrink-0', TIER_COLORS[tier])}>
                  {tier}
                </div>
                <div className="flex flex-wrap gap-2 p-3 flex-1">
                  {chars.map((char) => (
                    <Link
                      key={char.id}
                      to={`/genshin/personnages/${char.id}`}
                      className="flex flex-col items-center w-14 sm:w-16 hover:opacity-80 transition-opacity"
                    >
                      <img src={char.imageUrl} alt={char.name} className="w-12 h-12 border-2 border-manga-ink rounded-sm" loading="lazy" />
                      <span className="text-[9px] font-heading font-bold text-center mt-0.5 leading-tight line-clamp-1">
                        {char.name}
                      </span>
                      {char.role && (
                        <span className="text-[8px] text-manga-gray">{char.role}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </PageLayout>
  )
}
