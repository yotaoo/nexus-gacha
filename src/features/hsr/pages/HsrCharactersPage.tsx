import { useNavigate } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import FilterableGrid from '@/components/shared/FilterableGrid'
import MangaCard from '@/components/ui/MangaCard'
import RarityStars from '@/components/ui/RarityStars'
import { useCachedApi } from '@/hooks/useCachedApi'
import { fetchHsrCharacterList, getHsrCharacterIcon, getHsrElementIcon } from '@/services/api/hsrApi'
import { HSR_ELEMENTS, HSR_PATHS } from '@/types/hsr'
import type { HsrCharacter } from '@/types/hsr'
import { cn } from '@/utils/cn'

export default function HsrCharactersPage() {
  const { data, loading, error, refresh } = useCachedApi('hsr-characters', fetchHsrCharacterList, 3600000)
  const navigate = useNavigate()

  return (
    <PageLayout title="Personnages" subtitle="Honkai: Star Rail">
      <FilterableGrid<HsrCharacter>
        items={data}
        loading={loading}
        error={error}
        onRetry={refresh}
        searchKey={(c) => c.name}
        getItemId={(c) => c.id}
        searchPlaceholder="Rechercher un personnage..."
        filters={[
          {
            key: 'element',
            label: 'Element',
            options: HSR_ELEMENTS.map((e) => ({ id: e.id, label: e.label, color: e.color })),
            getItemValue: (c) => c.element,
          },
          {
            key: 'rarity',
            label: 'Rarete',
            options: [
              { id: '5', label: '5 ★' },
              { id: '4', label: '4 ★' },
            ],
            getItemValue: (c) => String(c.rarity),
          },
          {
            key: 'path',
            label: 'Voie',
            options: HSR_PATHS.map((p) => ({ id: p.id, label: p.label })),
            getItemValue: (c) => c.path,
          },
        ]}
        renderCard={(char) => (
          <MangaCard onClick={() => navigate(`/hsr/personnages/${char.id}`)} className="overflow-hidden h-full">
            <div className={cn('h-1.5', char.rarity === 5 ? 'rarity-5-bg' : 'rarity-4-bg')} />
            <div className="p-2 flex flex-col items-center">
              <div className="relative w-[72px] h-[72px] flex-shrink-0">
                <img
                  src={getHsrCharacterIcon(char.id)}
                  alt={char.name}
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
                <img
                  src={getHsrElementIcon(char.element)}
                  alt={char.element}
                  className="absolute top-0 right-0 w-5 h-5 drop-shadow-md"
                />
              </div>
              <p className="font-heading font-bold text-[11px] mt-1.5 text-center leading-tight h-7 flex items-center overflow-hidden w-full justify-center">
                <span className="line-clamp-2">{char.name}</span>
              </p>
              <RarityStars rarity={char.rarity} />
            </div>
          </MangaCard>
        )}
      />
    </PageLayout>
  )
}
