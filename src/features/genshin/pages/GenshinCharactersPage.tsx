import { useNavigate } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import FilterableGrid from '@/components/shared/FilterableGrid'
import MangaCard from '@/components/ui/MangaCard'
import RarityStars from '@/components/ui/RarityStars'
import { useCachedApi } from '@/hooks/useCachedApi'
import { fetchAllGenshinCharacters, getGenshinCharacterIcon, getGenshinElementIcon } from '@/services/api/genshinApi'
import { GENSHIN_ELEMENTS, GENSHIN_WEAPON_TYPES } from '@/types/genshin'
import type { GenshinCharacter } from '@/types/genshin'
import { cn } from '@/utils/cn'

export default function GenshinCharactersPage() {
  const { data, loading, error, refresh } = useCachedApi(
    'genshin-characters',
    fetchAllGenshinCharacters,
    3600000
  )
  const navigate = useNavigate()

  return (
    <PageLayout title="Personnages" subtitle="Genshin Impact">
      <FilterableGrid<GenshinCharacter>
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
            options: GENSHIN_ELEMENTS.map((e) => ({ id: e.id, label: e.label, color: e.color })),
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
            key: 'weapon',
            label: 'Arme',
            options: GENSHIN_WEAPON_TYPES.map((w) => ({ id: w.id, label: w.label })),
            getItemValue: (c) => c.weaponType,
          },
        ]}
        renderCard={(char) => (
          <MangaCard
            onClick={() => navigate(`/genshin/personnages/${char.id}`)}
            className="overflow-hidden"
          >
            <div className={cn('h-1.5', char.rarity === 5 ? 'rarity-5-bg' : 'rarity-4-bg')} />
            <div className="p-2 flex flex-col items-center">
              <div className="relative w-[72px] h-[72px] flex-shrink-0">
                <img
                  src={getGenshinCharacterIcon(char.id, char.icon)}
                  alt={char.name}
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
                <img
                  src={getGenshinElementIcon(char.element)}
                  alt={char.element}
                  className="absolute top-0 right-0 w-5 h-5 drop-shadow-md"
                />
              </div>
              <p className="font-heading font-bold text-[11px] mt-1.5 text-center leading-tight h-7 flex items-center overflow-hidden">
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
