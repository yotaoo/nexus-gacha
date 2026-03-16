import { useNavigate } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import FilterableGrid from '@/components/shared/FilterableGrid'
import MangaCard from '@/components/ui/MangaCard'
import RarityStars from '@/components/ui/RarityStars'
import { useCachedApi } from '@/hooks/useCachedApi'
import { fetchAllGenshinWeapons, getGenshinWeaponIcon } from '@/services/api/genshinApi'
import { GENSHIN_WEAPON_TYPES } from '@/types/genshin'
import type { GenshinWeapon } from '@/types/genshin'
import { cn } from '@/utils/cn'

export default function GenshinWeaponsPage() {
  const { data, loading, error, refresh } = useCachedApi('genshin-weapons', fetchAllGenshinWeapons, 3600000)
  const navigate = useNavigate()

  return (
    <PageLayout title="Armes" subtitle="Genshin Impact">
      <FilterableGrid<GenshinWeapon>
        items={data}
        loading={loading}
        error={error}
        onRetry={refresh}
        searchKey={(w) => w.name}
        getItemId={(w) => w.id}
        searchPlaceholder="Rechercher une arme..."
        filters={[
          {
            key: 'type',
            label: 'Type',
            options: GENSHIN_WEAPON_TYPES.map((w) => ({ id: w.id, label: w.label })),
            getItemValue: (w) => w.type,
          },
          {
            key: 'rarity',
            label: 'Rarete',
            options: [
              { id: '5', label: '5 ★' },
              { id: '4', label: '4 ★' },
              { id: '3', label: '3 ★' },
            ],
            getItemValue: (w) => String(w.rarity),
          },
        ]}
        renderCard={(weapon) => (
          <MangaCard onClick={() => navigate(`/genshin/armes/${weapon.id}`)} className="overflow-hidden h-full">
            <div className={cn('h-1.5', weapon.rarity === 5 ? 'rarity-5-bg' : weapon.rarity === 4 ? 'rarity-4-bg' : 'bg-blue-400')} />
            <div className="p-2 flex flex-col items-center">
              <img src={getGenshinWeaponIcon(weapon.icon)} alt={weapon.name} className="w-[72px] h-[72px] object-contain flex-shrink-0" loading="lazy" />
              <p className="font-heading font-bold text-[11px] mt-1.5 text-center leading-tight h-7 flex items-center overflow-hidden w-full justify-center">
                <span className="line-clamp-2">{weapon.name}</span>
              </p>
              <RarityStars rarity={weapon.rarity} />
            </div>
          </MangaCard>
        )}
      />
    </PageLayout>
  )
}
