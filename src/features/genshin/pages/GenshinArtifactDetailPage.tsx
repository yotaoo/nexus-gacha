import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useApi } from '@/hooks/useApi'
import { fetchGenshinArtifact, getGenshinArtifactIcon } from '@/services/api/genshinApi'

const SLOT_LABELS: Record<string, string> = {
  EQUIP_BRACER: 'Fleur de la vie',
  EQUIP_NECKLACE: 'Plume de la mort',
  EQUIP_SHOES: 'Sablier du temps',
  EQUIP_RING: 'Coupe du monde',
  EQUIP_DRESS: 'Diademe de la raison',
}

export default function GenshinArtifactDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: artifact, loading, error } = useApi(() => fetchGenshinArtifact(id!), [id])

  if (loading) return <PageLayout><LoadingSpinner /></PageLayout>
  if (error || !artifact) return <PageLayout><ErrorMessage message={error || 'Artefact introuvable'} /></PageLayout>

  return (
    <PageLayout>
      <Link to="/genshin/artefacts" className="inline-flex items-center gap-1 text-sm text-manga-gray hover:text-manga-ink mb-4">
        <ArrowLeft size={16} /> Retour aux artefacts
      </Link>

      <div className="manga-card p-4 sm:p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          {artifact.icon && (
            <img
              src={getGenshinArtifactIcon(artifact.icon)}
              alt={artifact.name}
              className="w-20 h-20 object-contain flex-shrink-0"
            />
          )}
          <h1 className="font-heading font-black text-2xl">{artifact.name}</h1>
        </div>

        {artifact['2-piece_bonus'] && (
          <div className="p-3 bg-manga-paper border-2 border-manga-ink mb-3">
            <h3 className="font-heading font-bold text-sm text-manga-red">Bonus 2 pieces</h3>
            <p className="text-sm mt-1">{artifact['2-piece_bonus']}</p>
          </div>
        )}

        {artifact['4-piece_bonus'] && (
          <div className="p-3 bg-manga-paper border-2 border-manga-ink">
            <h3 className="font-heading font-bold text-sm text-manga-red">Bonus 4 pieces</h3>
            <p className="text-sm mt-1">{artifact['4-piece_bonus']}</p>
          </div>
        )}
      </div>

      {/* Individual pieces */}
      {artifact.pieces && artifact.pieces.length > 0 && (
        <div>
          <h2 className="font-heading font-bold text-lg mb-3">Pieces du set</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {artifact.pieces.map((piece) => (
              <div key={piece.slot} className="manga-card p-3" onClick={undefined}>
                <div className="flex items-start gap-3">
                  <img
                    src={getGenshinArtifactIcon(piece.icon)}
                    alt={piece.name}
                    className="w-12 h-12 object-contain flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-manga-gray uppercase font-heading">
                      {SLOT_LABELS[piece.slot] || piece.slot}
                    </span>
                    <h3 className="font-heading font-bold text-sm">{piece.name}</h3>
                    <p className="text-xs text-manga-gray mt-1 leading-relaxed">{piece.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  )
}
