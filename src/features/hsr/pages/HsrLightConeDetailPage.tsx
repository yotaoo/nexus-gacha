import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import RarityStars from '@/components/ui/RarityStars'
import Badge from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useApi } from '@/hooks/useApi'
import { fetchHsrLightConeDetail, getHsrLightConeIcon } from '@/services/api/hsrApi'
import { HSR_PATHS } from '@/types/hsr'

export default function HsrLightConeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: lc, loading, error } = useApi(() => fetchHsrLightConeDetail(id!), [id])

  if (loading) return <PageLayout><LoadingSpinner /></PageLayout>
  if (error || !lc) return <PageLayout><ErrorMessage message={error || 'Cone introuvable'} /></PageLayout>

  const pathInfo = HSR_PATHS.find((p) => p.id === lc.path)

  return (
    <PageLayout>
      <Link to="/hsr/cones-de-lumiere" className="inline-flex items-center gap-1 text-sm text-manga-gray hover:text-manga-ink mb-4">
        <ArrowLeft size={16} /> Retour aux cones
      </Link>

      <div className="manga-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <img src={getHsrLightConeIcon(lc.id)} alt={lc.name} className="w-32 h-32 object-contain mx-auto sm:mx-0" />
          <div className="flex-1">
            <h1 className="font-heading font-black text-2xl mb-2">{lc.name}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge label={pathInfo?.label || lc.path} size="md" />
              <RarityStars rarity={lc.rarity} />
            </div>
            {lc.description && (
              <p className="text-sm text-manga-gray mb-4">{lc.description}</p>
            )}
            {lc.passiveName && (
              <div className="p-3 bg-manga-paper border-2 border-manga-ink">
                <h3 className="font-heading font-bold text-sm">{lc.passiveName}</h3>
                {lc.passiveDesc && (
                  <p className="text-xs text-manga-gray mt-1 leading-relaxed">{lc.passiveDesc}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
