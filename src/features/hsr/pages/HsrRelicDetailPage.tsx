import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useApi } from '@/hooks/useApi'
import { fetchHsrRelicDetail } from '@/services/api/hsrApi'

export default function HsrRelicDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: relic, loading, error } = useApi(() => fetchHsrRelicDetail(id!), [id])

  if (loading) return <PageLayout><LoadingSpinner /></PageLayout>
  if (error || !relic) return <PageLayout><ErrorMessage message={error || 'Relique introuvable'} /></PageLayout>

  return (
    <PageLayout>
      <Link to="/hsr/reliques" className="inline-flex items-center gap-1 text-sm text-manga-gray hover:text-manga-ink mb-4">
        <ArrowLeft size={16} /> Retour aux reliques
      </Link>

      <div className="manga-card p-4 sm:p-6">
        <h1 className="font-heading font-black text-2xl mb-4">{relic.name}</h1>
        {relic.bonus2pc && (
          <div className="p-3 bg-manga-paper border-2 border-manga-ink mb-3">
            <h3 className="font-heading font-bold text-sm text-manga-red">Bonus 2 pieces</h3>
            <p className="text-sm mt-1">{relic.bonus2pc}</p>
          </div>
        )}
        {relic.bonus4pc && (
          <div className="p-3 bg-manga-paper border-2 border-manga-ink">
            <h3 className="font-heading font-bold text-sm text-manga-red">Bonus 4 pieces</h3>
            <p className="text-sm mt-1">{relic.bonus4pc}</p>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
