import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swords, Sparkles, Users, Trophy, BookOpen, Gift } from 'lucide-react'
import MangaCard from '@/components/ui/MangaCard'

const GAMES = [
  {
    id: 'genshin',
    name: 'Genshin Impact',
    desc: 'Monde ouvert, reactions elementaires, Abysse Spirale',
    link: '/genshin/personnages',
  },
  {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    desc: 'RPG au tour par tour, Chaos Memorial, Fiction Simulee',
    link: '/hsr/personnages',
  },
]

const QUICK_LINKS = [
  { icon: Swords, label: 'Personnages', genshin: '/genshin/personnages', hsr: '/hsr/personnages' },
  { icon: Trophy, label: 'Tier List', genshin: '/genshin/tier-list', hsr: '/hsr/tier-list' },
  { icon: Users, label: 'Equipes', genshin: '/genshin/equipes', hsr: '/hsr/equipes' },
  { icon: BookOpen, label: 'Materiaux', genshin: '/genshin/materiaux', hsr: '/hsr/materiaux' },
  { icon: Gift, label: 'Codes', genshin: '/genshin/codes', hsr: '/hsr/codes' },
  { icon: Sparkles, label: 'Recherche Joueur', link: '/joueur' },
]

export default function HomePage() {
  return (
    <div className="min-h-[80vh]">
      {/* Hero */}
      <section className="relative halftone-bg speed-lines overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading font-black text-5xl sm:text-7xl uppercase tracking-tight mb-4">
              <span className="bg-manga-red text-white px-4 py-2 inline-block" style={{ transform: 'skewX(-6deg)', display: 'inline-block' }}>
                <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>NEXUS</span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-manga-gray max-w-xl mx-auto font-body">
              Ton guide ultime pour les jeux gacha. Personnages, builds, teams, et strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Game Selection */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link to={game.link}>
                <MangaCard className="p-6 sm:p-8 group">
                  <div className="h-2 w-16 mb-4 bg-manga-red" />
                  <h2 className="font-heading font-black text-xl sm:text-2xl uppercase mb-2 group-hover:text-manga-red transition-colors">
                    {game.name}
                  </h2>
                  <p className="text-sm text-manga-gray">{game.desc}</p>
                </MangaCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-heading font-black text-xl uppercase mb-6 flex items-center gap-2">
          <span className="bg-manga-ink text-white px-2 py-0.5 text-sm">Acces rapide</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map((ql) => {
            const Icon = ql.icon
            return (
              <div key={ql.label} className="space-y-1">
                {'link' in ql && ql.link ? (
                  <Link to={ql.link}>
                    <MangaCard className="p-4 flex flex-col items-center gap-2">
                      <Icon size={24} className="text-manga-red" />
                      <span className="font-heading font-bold text-xs uppercase">{ql.label}</span>
                    </MangaCard>
                  </Link>
                ) : (
                  <div className="space-y-1">
                    <Link to={ql.genshin!}>
                      <MangaCard className="p-3 flex items-center gap-2">
                        <Icon size={18} className="text-manga-red flex-shrink-0" />
                        <div>
                          <span className="font-heading font-bold text-[10px] uppercase block">{ql.label}</span>
                          <span className="text-[9px] text-manga-gray">Genshin</span>
                        </div>
                      </MangaCard>
                    </Link>
                    <Link to={ql.hsr!}>
                      <MangaCard className="p-3 flex items-center gap-2">
                        <Icon size={18} className="text-manga-red flex-shrink-0" />
                        <div>
                          <span className="font-heading font-bold text-[10px] uppercase block">{ql.label}</span>
                          <span className="text-[9px] text-manga-gray">Star Rail</span>
                        </div>
                      </MangaCard>
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
