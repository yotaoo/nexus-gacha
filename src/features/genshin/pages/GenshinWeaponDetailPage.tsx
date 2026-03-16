import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import RarityStars from '@/components/ui/RarityStars'
import Badge from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useApi } from '@/hooks/useApi'
import { fetchGenshinWeapon, getGenshinWeaponIcon } from '@/services/api/genshinApi'

export default function GenshinWeaponDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: weapon, loading, error } = useApi(() => fetchGenshinWeapon(id!), [id])

  if (loading) return <PageLayout><LoadingSpinner /></PageLayout>
  if (error || !weapon) return <PageLayout><ErrorMessage message={error || 'Arme introuvable'} /></PageLayout>

  return (
    <PageLayout>
      <Link to="/genshin/armes" className="inline-flex items-center gap-1 text-sm text-manga-gray hover:text-manga-ink mb-4">
        <ArrowLeft size={16} /> Retour aux armes
      </Link>

      <div className="manga-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <img src={getGenshinWeaponIcon(weapon.icon)} alt={weapon.name} className="w-32 h-32 object-contain mx-auto sm:mx-0" />
          <div className="flex-1">
            <h1 className="font-heading font-black text-2xl mb-2">{weapon.name}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge label={weapon.type} size="md" />
              <RarityStars rarity={weapon.rarity} />
            </div>
            {weapon.baseAttack && (
              <p className="text-sm mb-2"><span className="font-bold">ATQ de base:</span> {weapon.baseAttack}</p>
            )}
            {weapon.subStat && (
              <p className="text-sm mb-2"><span className="font-bold">Stat secondaire:</span> {weapon.subStat}</p>
            )}
            {weapon.passiveName && (
              <div className="mt-4 p-3 bg-manga-paper border-2 border-manga-ink">
                <h3 className="font-heading font-bold text-sm">{weapon.passiveName}</h3>
                {weapon.passiveDesc && (
                  <p className="text-xs text-manga-gray mt-1 leading-relaxed">{weapon.passiveDesc}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
