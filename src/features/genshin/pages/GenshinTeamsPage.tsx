import { Link } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import MangaCard from '@/components/ui/MangaCard'
import { GENSHIN_TEAMS } from '@/data/editorial/genshinTeams'

export default function GenshinTeamsPage() {
  return (
    <PageLayout title="Equipes" subtitle="Genshin Impact - Compositions recommandees">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GENSHIN_TEAMS.map((team) => (
          <MangaCard key={team.id} className="p-4" hover={false}>
            <h3 className="font-heading font-bold text-lg mb-1">{team.name}</h3>
            <p className="text-xs text-manga-gray mb-4">{team.description}</p>
            <div className="flex gap-4 mb-3">
              {team.members.map((m) => (
                <Link
                  key={m.id}
                  to={`/genshin/personnages/${m.id}`}
                  className="flex flex-col items-center group"
                >
                  <img
                    src={m.imageUrl}
                    alt={m.name}
                    className="w-14 h-14 border-2 border-manga-ink rounded-sm group-hover:border-manga-red transition-colors"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-heading font-bold mt-1 group-hover:text-manga-red transition-colors">{m.name}</span>
                  <span className="text-[10px] text-manga-gray">{m.role}</span>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {team.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 bg-manga-paper border border-manga-gray-light font-heading font-bold uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </MangaCard>
        ))}
      </div>
    </PageLayout>
  )
}
