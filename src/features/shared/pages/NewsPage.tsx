import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import MangaCard from '@/components/ui/MangaCard'
import Badge from '@/components/ui/Badge'
import { NEWS } from '@/data/editorial/news'
import type { GameId } from '@/types'
import { cn } from '@/utils/cn'

export default function NewsPage() {
  const [filter, setFilter] = useState<GameId | 'all'>('all')

  const filtered = filter === 'all'
    ? NEWS
    : NEWS.filter((n) => n.game === filter || n.game === 'all')

  return (
    <PageLayout title="Actualites" subtitle="Les dernieres news des jeux gacha">
      <div className="flex gap-2 mb-6">
        {(['all', 'genshin', 'hsr'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 font-heading font-bold text-xs uppercase border-2 border-manga-ink transition-all',
              filter === f ? 'bg-manga-red text-white' : 'bg-white hover:bg-manga-paper'
            )}
          >
            {f === 'all' ? 'Tout' : f === 'genshin' ? 'Genshin' : 'Star Rail'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <MangaCard key={item.id} className="p-4 sm:p-6" hover={false}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    label={item.game === 'all' ? 'Nexus' : item.game === 'genshin' ? 'Genshin' : 'HSR'}
                  />
                  <span className="text-xs text-manga-gray">{item.date}</span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-manga-gray leading-relaxed">{item.summary}</p>
              </div>
            </div>
          </MangaCard>
        ))}
      </div>
    </PageLayout>
  )
}
