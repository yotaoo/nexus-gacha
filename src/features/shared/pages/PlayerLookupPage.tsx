import { useState } from 'react'
import { Search, User } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import MangaCard from '@/components/ui/MangaCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { fetchGenshinPlayer, type EnkaPlayerData } from '@/services/api/enkaApi'
import { fetchHsrPlayer, type MihomoPlayerData } from '@/services/api/mihomoApi'
import type { GameId } from '@/types'

export default function PlayerLookupPage() {
  const [uid, setUid] = useState('')
  const [game, setGame] = useState<GameId>('genshin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [genshinData, setGenshinData] = useState<EnkaPlayerData | null>(null)
  const [hsrData, setHsrData] = useState<MihomoPlayerData | null>(null)

  const handleSearch = async () => {
    if (!uid.trim() || uid.length < 9) {
      setError('Entrez un UID valide (9+ chiffres)')
      return
    }
    setLoading(true)
    setError(null)
    setGenshinData(null)
    setHsrData(null)

    try {
      if (game === 'genshin') {
        const data = await fetchGenshinPlayer(uid.trim())
        setGenshinData(data)
      } else {
        const data = await fetchHsrPlayer(uid.trim())
        setHsrData(data)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout title="Recherche Joueur" subtitle="Trouvez un profil par UID">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Game selector */}
        <div className="flex border-3 border-manga-ink overflow-hidden">
          {(['genshin', 'hsr'] as const).map((g) => (
            <button
              key={g}
              onClick={() => { setGame(g); setGenshinData(null); setHsrData(null); setError(null) }}
              className={`flex-1 px-4 py-2 font-heading font-bold text-sm uppercase ${
                game === g ? 'bg-manga-red text-white' : 'bg-white hover:bg-manga-paper'
              }`}
            >
              {g === 'genshin' ? 'Genshin' : 'Star Rail'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Entrez l'UID du joueur..."
            className="flex-1 px-4 py-3 border-3 border-manga-ink font-heading text-lg focus:outline-none focus:shadow-manga"
          />
          <button onClick={handleSearch} className="manga-btn manga-btn-primary" disabled={loading}>
            <span><Search size={18} /></span>
          </button>
        </div>

        {loading && <LoadingSpinner text="Recherche en cours..." />}
        {error && <ErrorMessage message={error} />}

        {/* Genshin result */}
        {genshinData && (
          <MangaCard className="p-6" hover={false}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-manga-paper border-3 border-manga-ink flex items-center justify-center">
                <User size={28} />
              </div>
              <div>
                <h2 className="font-heading font-black text-xl">{genshinData.nickname}</h2>
                <p className="text-xs text-manga-gray">UID: {genshinData.uid} | AR {genshinData.level}</p>
              </div>
            </div>
            {genshinData.signature && (
              <p className="text-sm text-manga-gray italic mb-3">"{genshinData.signature}"</p>
            )}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {genshinData.worldLevel && (
                <div className="bg-manga-paper p-2 border border-manga-gray-light">
                  <span className="font-bold">Monde:</span> {genshinData.worldLevel}
                </div>
              )}
              {genshinData.finishAchievementNum && (
                <div className="bg-manga-paper p-2 border border-manga-gray-light">
                  <span className="font-bold">Succes:</span> {genshinData.finishAchievementNum}
                </div>
              )}
              {genshinData.towerFloorIndex && (
                <div className="bg-manga-paper p-2 border border-manga-gray-light col-span-2">
                  <span className="font-bold">Spirale:</span> Etage {genshinData.towerFloorIndex}-{genshinData.towerLevelIndex}
                </div>
              )}
            </div>
          </MangaCard>
        )}

        {/* HSR result */}
        {hsrData && (
          <MangaCard className="p-6" hover={false}>
            <div className="flex items-center gap-4 mb-4">
              {hsrData.avatar?.icon ? (
                <img src={hsrData.avatar.icon} alt="" className="w-14 h-14 border-3 border-manga-ink rounded-sm" />
              ) : (
                <div className="w-14 h-14 bg-manga-paper border-3 border-manga-ink flex items-center justify-center">
                  <User size={28} />
                </div>
              )}
              <div>
                <h2 className="font-heading font-black text-xl">{hsrData.nickname}</h2>
                <p className="text-xs text-manga-gray">UID: {hsrData.uid} | Niveau {hsrData.level}</p>
              </div>
            </div>
            {hsrData.signature && (
              <p className="text-sm text-manga-gray italic mb-3">"{hsrData.signature}"</p>
            )}
            {hsrData.characters && hsrData.characters.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-sm uppercase mb-2">Personnages en vitrine</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {hsrData.characters.map((c) => (
                    <div key={c.id} className="flex flex-col items-center flex-shrink-0">
                      <img src={c.icon} alt={c.name} className="w-14 h-14 border-2 border-manga-ink rounded-sm" loading="lazy" />
                      <span className="text-[10px] font-heading font-bold mt-1">{c.name}</span>
                      <span className="text-[10px] text-manga-gray">Nv.{c.level} E{c.rank}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </MangaCard>
        )}
      </div>
    </PageLayout>
  )
}
