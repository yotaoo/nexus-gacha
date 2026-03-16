import { useNavigate } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import FilterableGrid from '@/components/shared/FilterableGrid'
import MangaCard from '@/components/ui/MangaCard'
import { useCachedApi } from '@/hooks/useCachedApi'
import { fetchAllGenshinArtifacts, getGenshinArtifactIcon } from '@/services/api/genshinApi'
import type { GenshinArtifact } from '@/types/genshin'

export default function GenshinArtifactsPage() {
  const { data, loading, error, refresh } = useCachedApi('genshin-artifacts', fetchAllGenshinArtifacts, 3600000)
  const navigate = useNavigate()

  return (
    <PageLayout title="Artefacts" subtitle="Genshin Impact">
      <FilterableGrid<GenshinArtifact>
        items={data}
        loading={loading}
        error={error}
        onRetry={refresh}
        searchKey={(a) => a.name}
        getItemId={(a) => a.id}
        searchPlaceholder="Rechercher un set d'artefacts..."
        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        filters={[]}
        renderCard={(artifact) => (
          <MangaCard onClick={() => navigate(`/genshin/artefacts/${artifact.id}`)} className="p-4 h-full">
            <div className="flex gap-3">
              {artifact.icon && (
                <img
                  src={getGenshinArtifactIcon(artifact.icon)}
                  alt={artifact.name}
                  className="w-14 h-14 object-contain flex-shrink-0"
                  loading="lazy"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-sm mb-2">{artifact.name}</h3>
                {artifact['2-piece_bonus'] && (
                  <p className="text-xs text-manga-gray mb-1 line-clamp-2">
                    <span className="font-bold text-manga-ink">2 pieces:</span> {artifact['2-piece_bonus']}
                  </p>
                )}
                {artifact['4-piece_bonus'] && (
                  <p className="text-xs text-manga-gray line-clamp-2">
                    <span className="font-bold text-manga-ink">4 pieces:</span> {artifact['4-piece_bonus']}
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
