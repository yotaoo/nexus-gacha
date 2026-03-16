import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Sword, Shield } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import Tabs from '@/components/ui/Tabs'
import RarityStars from '@/components/ui/RarityStars'
import Badge from '@/components/ui/Badge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useApi } from '@/hooks/useApi'
import {
  fetchHsrCharacterDetail, getHsrCharacterSplash, getHsrCharacterIcon,
  getHsrElementIcon, getHsrPathIcon, getHsrSkillIcon, getHsrEidolonIcon,
} from '@/services/api/hsrApi'
import { HSR_ELEMENTS, HSR_PATHS } from '@/types/hsr'
import { HSR_TEAMS } from '@/data/editorial/hsrTeams'
import { HSR_BUILDS } from '@/data/editorial/hsrBuilds'

export default function HsrCharacterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: char, loading, error } = useApi(() => fetchHsrCharacterDetail(id!), [id])

  if (loading) return <PageLayout><LoadingSpinner /></PageLayout>
  if (error || !char) return <PageLayout><ErrorMessage message={error || 'Personnage introuvable'} /></PageLayout>

  const elementInfo = HSR_ELEMENTS.find((e) => e.id === char.element)
  const pathInfo = HSR_PATHS.find((p) => p.id === char.path)
  const charTeams = HSR_TEAMS.filter((t) => t.members.some((m) => m.id === char.id))
  const build = HSR_BUILDS.find((b) => b.characterId === char.id)

  return (
    <PageLayout>
      <Link to="/hsr/personnages" className="inline-flex items-center gap-1 text-sm text-manga-gray hover:text-manga-ink mb-4">
        <ArrowLeft size={16} /> Retour aux personnages
      </Link>

      <div className="manga-card p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <img
              src={getHsrCharacterSplash(char.id)}
              alt={char.name}
              className="w-full sm:w-48 md:w-56 h-auto object-cover border-3 border-manga-ink"
              onError={(e) => { (e.target as HTMLImageElement).src = getHsrCharacterIcon(char.id) }}
            />
          </div>
          <div className="flex-1">
            <h1 className="font-heading font-black text-2xl sm:text-3xl mb-2">{char.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 border-2 rounded-sm" style={{ borderColor: elementInfo?.color }}>
                <img src={getHsrElementIcon(char.element)} alt={elementInfo?.label || char.element} className="w-5 h-5" />
                <span className="font-heading font-bold text-xs" style={{ color: elementInfo?.color }}>
                  {elementInfo?.label || char.element}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 border-2 border-manga-ink rounded-sm">
                <img src={getHsrPathIcon(char.path)} alt={pathInfo?.label || char.path} className="w-5 h-5" />
                <span className="font-heading font-bold text-xs">{pathInfo?.label || char.path}</span>
              </div>
              <RarityStars rarity={char.rarity} />
            </div>
            {char.description && (
              <p className="text-sm leading-relaxed text-manga-gray">{char.description}</p>
            )}
          </div>
        </div>
      </div>

      <Tabs
        tabs={[
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
                    <h3 className="font-heading font-bold text-sm uppercase">Cones de lumiere</h3>
                  </div>
                  <div className="space-y-2">
                    {build.lightCones.map((lc, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-manga-paper border border-manga-gray-light">
                        <span className="font-heading font-bold text-xs text-manga-red w-5 flex-shrink-0">#{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-sm">{lc.name}</span>
                            <span className="text-[10px] text-manga-gray">{lc.rarity}★</span>
                          </div>
                          {lc.note && <p className="text-[11px] text-manga-gray">{lc.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="manga-card p-4" onClick={undefined}>
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="text-manga-red" />
                    <h3 className="font-heading font-bold text-sm uppercase">Sets de reliques</h3>
                  </div>
                  <div className="space-y-2">
                    {build.relicSets.map((r, i) => (
                      <div key={i} className="p-2 bg-manga-paper border border-manga-gray-light">
                        <div className="flex flex-wrap gap-1">
                          {r.sets.map((s, j) => (
                            <span key={j} className="font-heading font-bold text-sm">
                              {s.pieces}x {s.name}{j < r.sets.length - 1 ? ' + ' : ''}
                            </span>
                          ))}
                        </div>
                        {r.note && <p className="text-[11px] text-manga-gray mt-1">{r.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="manga-card p-4" onClick={undefined}>
                  <h3 className="font-heading font-bold text-sm uppercase mb-3">Stats principales</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="text-center p-2 bg-manga-paper border border-manga-gray-light">
                      <span className="text-[10px] text-manga-gray uppercase block">Corps</span>
                      <span className="font-heading font-bold text-xs">{build.mainStats.body}</span>
                    </div>
                    <div className="text-center p-2 bg-manga-paper border border-manga-gray-light">
                      <span className="text-[10px] text-manga-gray uppercase block">Pieds</span>
                      <span className="font-heading font-bold text-xs">{build.mainStats.feet}</span>
                    </div>
                    <div className="text-center p-2 bg-manga-paper border border-manga-gray-light">
                      <span className="text-[10px] text-manga-gray uppercase block">Sphere</span>
                      <span className="font-heading font-bold text-xs">{build.mainStats.sphere}</span>
                    </div>
                    <div className="text-center p-2 bg-manga-paper border border-manga-gray-light">
                      <span className="text-[10px] text-manga-gray uppercase block">Corde</span>
                      <span className="font-heading font-bold text-xs">{build.mainStats.rope}</span>
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
          {
            id: 'skills',
            label: 'Competences',
            content: (
              <div className="space-y-4">
                {char.skills && char.skills.length > 0 ? (
                  char.skills.map((skill) => (
                    <div key={skill.id} className="manga-card p-4" onClick={undefined}>
                      <div className="flex items-start gap-3">
                        {skill.icon ? (
                          <img
                            src={getHsrSkillIcon(skill.icon)}
                            alt={skill.name}
                            className="w-10 h-10 flex-shrink-0 rounded-sm bg-manga-paper border border-manga-gray-light p-0.5"
                          />
                        ) : (
                          <span className="bg-manga-red text-white font-heading font-bold text-xs px-2 py-1 flex-shrink-0">
                            {skill.type || 'Skill'}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-heading font-bold text-sm">{skill.name}</h3>
                            {skill.type && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-manga-paper border border-manga-gray-light font-heading uppercase">
                                {skill.type}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-manga-gray leading-relaxed">{skill.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-manga-gray text-sm">Competences non disponibles.</p>
                )}
              </div>
            ),
          },
          {
            id: 'eidolons',
            label: 'Eidolons',
            content: (
              <div className="space-y-3">
                {char.eidolons && char.eidolons.length > 0 ? (
                  char.eidolons.map((e) => (
                    <div key={e.id} className="manga-card p-4" onClick={undefined}>
                      <div className="flex items-start gap-3">
                        {e.icon ? (
                          <img
                            src={getHsrEidolonIcon(e.icon)}
                            alt={e.name}
                            className="w-10 h-10 flex-shrink-0 rounded-sm bg-manga-ink p-0.5"
                          />
                        ) : (
                          <span className="bg-manga-ink text-white font-heading font-bold text-xs px-2 py-1 flex-shrink-0">
                            E{e.rank}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-heading font-bold text-xs text-manga-red">E{e.rank}</span>
                            <h3 className="font-heading font-bold text-sm">{e.name}</h3>
                          </div>
                          <p className="text-xs text-manga-gray leading-relaxed">{e.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-manga-gray text-sm">Eidolons non disponibles.</p>
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
