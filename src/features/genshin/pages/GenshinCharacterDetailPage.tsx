import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Sword, Shield, Package } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import Tabs from '@/components/ui/Tabs'
import RarityStars from '@/components/ui/RarityStars'
import Badge from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useApi } from '@/hooks/useApi'
import {
  fetchGenshinCharacter, getGenshinCharacterGacha, getGenshinCharacterIcon,
  getGenshinElementIcon, getGenshinTalentIcon, getGenshinConstellationIcon,
  getGenshinWeaponIcon, getGenshinArtifactIcon, getGenshinMaterialIcon,
} from '@/services/api/genshinApi'
import { GENSHIN_ELEMENTS } from '@/types/genshin'
import { GENSHIN_TEAMS } from '@/data/editorial/genshinTeams'
import { GENSHIN_BUILDS } from '@/data/editorial/genshinBuilds'

export default function GenshinCharacterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: char, loading, error } = useApi(
    () => fetchGenshinCharacter(id!),
    [id]
  )

  if (loading) return <PageLayout><LoadingSpinner /></PageLayout>
  if (error || !char) return <PageLayout><ErrorMessage message={error || 'Personnage introuvable'} /></PageLayout>

  const elementInfo = GENSHIN_ELEMENTS.find((e) => e.id === char.element)
  const charTeams = GENSHIN_TEAMS.filter((t) => t.members.some((m) => m.id === char.id))
  const build = GENSHIN_BUILDS.find((b) => b.characterId === char.id)

  return (
    <PageLayout>
      <Link to="/genshin/personnages" className="inline-flex items-center gap-1 text-sm text-manga-gray hover:text-manga-ink mb-4">
        <ArrowLeft size={16} /> Retour aux personnages
      </Link>

      {/* Header */}
      <div className="manga-card p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <img
              src={getGenshinCharacterGacha(char.id, char.icon)}
              alt={char.name}
              className="w-full sm:w-48 md:w-56 h-auto object-cover border-3 border-manga-ink"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getGenshinCharacterIcon(char.id, char.icon)
              }}
            />
          </div>
          <div className="flex-1">
            <h1 className="font-heading font-black text-2xl sm:text-3xl mb-2">{char.name}</h1>
            {char.title && <p className="text-manga-gray text-sm mb-3 italic">{char.title}</p>}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 border-2 rounded-sm" style={{ borderColor: elementInfo?.color }}>
                <img src={getGenshinElementIcon(char.element)} alt={char.element} className="w-5 h-5" />
                <span className="font-heading font-bold text-xs" style={{ color: elementInfo?.color }}>{char.element}</span>
              </div>
              <Badge label={char.weaponType} size="md" />
              <RarityStars rarity={char.rarity} />
            </div>
            {char.description && (
              <p className="text-sm leading-relaxed text-manga-gray">{char.description}</p>
            )}
            {char.region && (
              <p className="text-xs text-manga-gray mt-2">Region: {char.region}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          // Build tab (first if available)
          ...(build ? [{
            id: 'build',
            label: 'Build',
            content: (
              <div className="space-y-4">
                <div className="manga-card p-4" onClick={undefined}>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={16} className="text-manga-red" />
                    <h3 className="font-heading font-bold text-sm uppercase">Role recommande</h3>
                  </div>
                  <p className="text-sm text-manga-gray">{build.role}</p>
                </div>

                <div className="manga-card p-4" onClick={undefined}>
                  <div className="flex items-center gap-2 mb-3">
                    <Sword size={16} className="text-manga-red" />
                    <h3 className="font-heading font-bold text-sm uppercase">Armes recommandees</h3>
                  </div>
                  <div className="space-y-2">
                    {build.weapons.map((w, i) => (
                      <Link key={i} to={`/genshin/armes/${w.id}`} className="flex items-center gap-3 p-2 bg-manga-paper border border-manga-gray-light hover:shadow-manga transition-all">
                        <span className="font-heading font-bold text-xs text-manga-red w-5 flex-shrink-0">#{i + 1}</span>
                        {w.icon && (
                          <img
                            src={getGenshinWeaponIcon(w.icon)}
                            alt={w.name}
                            className="w-10 h-10 flex-shrink-0 rounded-sm bg-manga-ink p-0.5"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-sm">{w.name}</span>
                            <span className="text-[10px] text-manga-gray">{w.rarity}★</span>
                          </div>
                          {w.note && <p className="text-[11px] text-manga-gray">{w.note}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="manga-card p-4" onClick={undefined}>
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="text-manga-red" />
                    <h3 className="font-heading font-bold text-sm uppercase">Sets d'artefacts</h3>
                  </div>
                  <div className="space-y-2">
                    {build.artifacts.map((a, i) => (
                      <div key={i} className="p-2 bg-manga-paper border border-manga-gray-light">
                        <div className="flex flex-wrap items-center gap-2">
                          {a.sets.map((s, j) => (
                            <span key={j} className="flex items-center gap-1.5">
                              {s.icon && (
                                <Link to={s.id ? `/genshin/artefacts/${s.id}` : '#'}>
                                  <img src={getGenshinArtifactIcon(s.icon)} alt={s.name} className="w-8 h-8 flex-shrink-0" />
                                </Link>
                              )}
                              <Link to={s.id ? `/genshin/artefacts/${s.id}` : '#'} className="font-heading font-bold text-sm hover:text-manga-red transition-colors">
                                {s.pieces}x {s.name}
                              </Link>
                              {j < a.sets.length - 1 && <span className="text-manga-gray">+</span>}
                            </span>
                          ))}
                        </div>
                        {a.note && <p className="text-[11px] text-manga-gray mt-1">{a.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="manga-card p-4" onClick={undefined}>
                  <h3 className="font-heading font-bold text-sm uppercase mb-3">Stats principales</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-manga-paper border border-manga-gray-light">
                      <span className="text-[10px] text-manga-gray uppercase block">Sablier</span>
                      <span className="font-heading font-bold text-xs">{build.mainStats.sands}</span>
                    </div>
                    <div className="text-center p-2 bg-manga-paper border border-manga-gray-light">
                      <span className="text-[10px] text-manga-gray uppercase block">Coupe</span>
                      <span className="font-heading font-bold text-xs">{build.mainStats.goblet}</span>
                    </div>
                    <div className="text-center p-2 bg-manga-paper border border-manga-gray-light">
                      <span className="text-[10px] text-manga-gray uppercase block">Diademe</span>
                      <span className="font-heading font-bold text-xs">{build.mainStats.circlet}</span>
                    </div>
                  </div>
                </div>

                <div className="manga-card p-4" onClick={undefined}>
                  <h3 className="font-heading font-bold text-sm uppercase mb-2">Sous-stats prioritaires</h3>
                  <div className="flex flex-wrap gap-1">
                    {build.subStats.map((stat, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-manga-paper border border-manga-gray-light font-heading font-bold">
                        {i + 1}. {stat}
                      </span>
                    ))}
                  </div>
                </div>

                {build.tips && (
                  <div className="manga-card p-4 border-l-4 border-l-manga-red" onClick={undefined}>
                    <h3 className="font-heading font-bold text-sm uppercase mb-1">Conseil</h3>
                    <p className="text-sm text-manga-gray leading-relaxed">{build.tips}</p>
                  </div>
                )}
              </div>
            ),
          }] : []),
          // Materials tab
          ...(char.ascensionMaterials && char.ascensionMaterials.length > 0 ? [{
            id: 'materials',
            label: 'Materiaux',
            content: (
              <div className="space-y-4">
                <div className="manga-card p-4" onClick={undefined}>
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={16} className="text-manga-red" />
                    <h3 className="font-heading font-bold text-sm uppercase">Materiaux d'elevation</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {char.ascensionMaterials.map((mat) => (
                      <div key={mat.id} className="flex items-center gap-2 p-2 bg-manga-paper border border-manga-gray-light">
                        <img
                          src={getGenshinMaterialIcon(mat.icon)}
                          alt={mat.name}
                          className="w-10 h-10 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-heading font-bold text-xs leading-tight truncate">{mat.name}</p>
                          <p className="text-[10px] text-manga-gray">x{mat.count}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          }] : []),
          {
            id: 'talents',
            label: 'Talents',
            content: (
              <div className="space-y-4">
                {char.skillTalents && char.skillTalents.length > 0 ? (
                  char.skillTalents.map((talent, i) => (
                    <div key={i} className="manga-card p-4" onClick={undefined}>
                      <div className="flex items-start gap-3">
                        {talent.icon ? (
                          <img
                            src={getGenshinTalentIcon(talent.icon)}
                            alt={talent.name}
                            className="w-10 h-10 flex-shrink-0 rounded-sm bg-manga-ink p-0.5"
                          />
                        ) : (
                          <span className="bg-manga-red text-white font-heading font-bold text-xs px-2 py-1 flex-shrink-0">
                            {talent.unlock || talent.type || `#${i + 1}`}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-heading font-bold text-sm">{talent.name}</h3>
                            {talent.type && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-manga-paper border border-manga-gray-light font-heading uppercase">
                                {talent.type}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-manga-gray leading-relaxed">{talent.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-manga-gray text-sm">Talents non disponibles.</p>
                )}
              </div>
            ),
          },
          {
            id: 'constellations',
            label: 'Constellations',
            content: (
              <div className="space-y-3">
                {char.constellations && char.constellations.length > 0 ? (
                  char.constellations.map((c, i) => (
                    <div key={i} className="manga-card p-4" onClick={undefined}>
                      <div className="flex items-start gap-3">
                        {c.icon ? (
                          <img
                            src={getGenshinConstellationIcon(c.icon)}
                            alt={c.name}
                            className="w-10 h-10 flex-shrink-0 rounded-sm bg-manga-ink p-0.5"
                          />
                        ) : (
                          <span className="bg-manga-ink text-white font-heading font-bold text-xs px-2 py-1 flex-shrink-0">
                            C{c.level || i + 1}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-heading font-bold text-xs text-manga-red">C{c.level || i + 1}</span>
                            <h3 className="font-heading font-bold text-sm">{c.name}</h3>
                          </div>
                          <p className="text-xs text-manga-gray leading-relaxed">{c.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-manga-gray text-sm">Constellations non disponibles.</p>
                )}
              </div>
            ),
          },
          {
            id: 'teams',
            label: 'Equipes',
            content: (
              <div className="space-y-4">
                {charTeams.length > 0 ? (
                  charTeams.map((team) => (
                    <div key={team.id} className="manga-card p-4" onClick={undefined}>
                      <h3 className="font-heading font-bold mb-1">{team.name}</h3>
                      <p className="text-xs text-manga-gray mb-3">{team.description}</p>
                      <div className="flex gap-3 overflow-x-auto">
                        {team.members.map((m) => (
                          <div key={m.id} className="flex flex-col items-center flex-shrink-0">
                            <img src={m.imageUrl} alt={m.name} className="w-12 h-12 border-2 border-manga-ink rounded-sm" loading="lazy" />
                            <span className="text-[10px] font-heading font-bold mt-1">{m.name}</span>
                            <span className="text-[10px] text-manga-gray">{m.role}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1 mt-2">
                        {team.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-manga-paper border border-manga-gray-light font-heading">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-manga-gray text-sm">Aucune equipe recommandee pour ce personnage pour le moment.</p>
                )}
              </div>
            ),
          },
        ]}
      />
    </PageLayout>
  )
}
