import { useNavigate } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import FilterableGrid from '@/components/shared/FilterableGrid'
import MangaCard from '@/components/ui/MangaCard'
import { useCachedApi } from '@/hooks/useCachedApi'
import { fetchHsrRelicList, getHsrRelicIcon } from '@/services/api/hsrApi'
import type { HsrRelic } from '@/types/hsr'

export default function HsrRelicsPage() {
  const { data, loading, error, refresh } = useCachedApi('hsr-relics', fetchHsrRelicList, 3600000)
  const navigate = useNavigate()

  return (
    <PageLayout title="Reliques" subtitle="Honkai: Star Rail">
      <FilterableGrid<HsrRelic>
        items={data}
        loading={loading}
        error={error}
        onRetry={refresh}
        searchKey={(r) => r.name}
        getItemId={(r) => r.id}
        searchPlaceholder="Rechercher un set de reliques..."
        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        filters={[
          {
            key: 'type',
            label: 'Type',
            options: [
              { id: '4', label: 'Relique (4pc)' },
              { id: '2', label: 'Ornement (2pc)' },
            ],
            getItemValue: (r) => String(r.setPieces),
          },
        ]}
        renderCard={(relic) => (
          <MangaCard onClick={() => navigate(`/hsr/reliques/${relic.id}`)} className="p-4 h-full">
            <div className="flex gap-3">
              <img
                src={getHsrRelicIcon(relic.id)}
                alt={relic.name}
                className="w-14 h-14 object-contain flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-sm mb-2">{relic.name}</h3>
                {relic.bonus2pc && (
                  <p className="text-xs text-manga-gray mb-1 line-clamp-2">
                    <span className="font-bold text-manga-ink">2 pieces:</span> {relic.bonus2pc}
                  </p>
                )}
                {relic.bonus4pc && (
                  <p className="text-xs text-manga-gray line-clamp-2">
                    <span className="font-bold text-manga-ink">4 pieces:</span> {relic.bonus4pc}
                  </p>
                )}
              </div>
            </div>
          </MangaCard>
        )}
      />
    </PageLayout>
  )
}
