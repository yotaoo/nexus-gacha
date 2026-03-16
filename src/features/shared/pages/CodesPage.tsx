import { useState } from 'react'
import { Copy, Check, Gift } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import MangaCard from '@/components/ui/MangaCard'
import { useGame } from '@/contexts/GameContext'
import { useCachedApi } from '@/hooks/useCachedApi'
import { fetchCodes } from '@/services/api/enneadApi'
import type { RedeemCode } from '@/types'

function CodeCard({ code }: { code: RedeemCode }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <MangaCard className="p-4" hover={false}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <code className="font-heading font-black text-lg tracking-wider">{code.code}</code>
          {code.rewards.length > 0 && (
            <p className="text-xs text-manga-gray mt-1 truncate">
              {code.rewards.join(', ')}
            </p>
          )}
        </div>
        <button
          onClick={copyCode}
          className="manga-btn manga-btn-primary flex-shrink-0"
        >
          <span className="inline-flex items-center gap-1.5">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copie !' : 'Copier'}
          </span>
        </button>
      </div>
    </MangaCard>
  )
}

export default function CodesPage() {
  const { currentGame, gameConfig } = useGame()
  const { data, loading, error, refresh } = useCachedApi(
    `codes-${currentGame}`,
    () => fetchCodes(currentGame),
    600000 // 10 min TTL
  )

  const activeCodes = data?.filter((c) => c.isActive) || []
  const expiredCodes = data?.filter((c) => !c.isActive) || []

  return (
    <PageLayout
      title="Codes"
      subtitle={`${gameConfig.name} - Codes de remboursement actifs`}
    >
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refresh} />
      ) : (
        <div className="space-y-6">
          {activeCodes.length > 0 ? (
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-sm uppercase flex items-center gap-2">
                <Gift size={16} className="text-manga-red" /> Codes actifs
              </h2>
              {activeCodes.map((code) => (
                <CodeCard key={code.code} code={code} />
              ))}
            </div>
          ) : (
            <MangaCard className="p-8 text-center" hover={false}>
              <Gift size={32} className="text-manga-gray mx-auto mb-3" />
              <p className="font-heading font-bold text-manga-gray">Aucun code actif pour le moment</p>
            </MangaCard>
          )}

          {expiredCodes.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer font-heading font-bold text-sm uppercase text-manga-gray hover:text-manga-ink">
                Codes expires ({expiredCodes.length})
              </summary>
              <div className="mt-3 space-y-2 opacity-50">
                {expiredCodes.map((code) => (
                  <div key={code.code} className="manga-card p-3">
                    <code className="font-heading font-bold text-sm line-through">{code.code}</code>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </PageLayout>
  )
}
