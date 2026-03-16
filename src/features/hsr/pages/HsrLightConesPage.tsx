import { useNavigate } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import FilterableGrid from '@/components/shared/FilterableGrid'
import MangaCard from '@/components/ui/MangaCard'
import RarityStars from '@/components/ui/RarityStars'
import { useCachedApi } from '@/hooks/useCachedApi'
import { fetchHsrLightConeList, getHsrLightConeIcon } from '@/services/api/hsrApi'
import { HSR_PATHS } from '@/types/hsr'
import type { HsrLightCone } from '@/types/hsr'
import { cn } from '@/utils/cn'

export default function HsrLightConesPage() {
  const { data, loading, error, refresh } = useCachedApi('hsr-lightcones', fetchHsrLightConeList, 3600000)
  const navigate = useNavigate()

  return (
    <PageLayout title="Cones de Lumiere" subtitle="Honkai: Star Rail">
      <FilterableGrid<HsrLightCone>
        items={data}
        loading={loading}
        error={error}
        onRetry={refresh}
        searchKey={(lc) => lc.name}
        getItemId={(lc) => lc.id}
        searchPlaceholder="Rechercher un cone de lumiere..."
        filters={[
          {
            key: 'path',
            label: 'Voie',
            options: HSR_PATHS.map((p) => ({ id: p.id, label: p.label })),
            getItemValue: (lc) => lc.path,
          },
          {
            key: 'rarity',
            label: 'Rarete',
            options: [
              { id: '5', label: '5 ★' },
              { id: '4', label: '4 ★' },
              { id: '3', label: '3 ★' },
            ],
            getItemValue: (lc) => String(lc.rarity),
          },
        ]}
        renderCard={(lc) => (
          <MangaCard onClick={() => navigate(`/hsr/cones-de-lumiere/${lc.id}`)} className="overflow-hidden h-full">
            <div className={cn('h-1.5', lc.rarity === 5 ? 'rarity-5-bg' : lc.rarity === 4 ? 'rarity-4-bg' : 'bg-blue-400')} />
            <div className="p-2 flex flex-col items-center">
              <img src={getHsrLightConeIcon(lc.id)} alt={lc.name} className="w-[72px] h-[72px] object-contain flex-shrink-0" loading="lazy" />
              <p className="font-heading font-bold text-[11px] mt-1.5 text-center leading-tight h-7 flex items-center overflow-hidden w-full justify-center">
                <span className="line-clamp-2">{lc.name}</span>
              </p>
              <RarityStars rarity={lc.rarity} />
            </div>
          </MangaCard>
        )}
      />
    </PageLayout>
  )
}
