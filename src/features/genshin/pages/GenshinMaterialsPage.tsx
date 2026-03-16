import PageLayout from '@/components/layout/PageLayout'
import MangaCard from '@/components/ui/MangaCard'

const DAILY_DOMAINS = [
  {
    days: 'Lundi / Jeudi',
    talent: ['Liberte', 'Prosperite', 'Transience'],
    weapon: ['Decarabian', 'Guyun', 'Distant Sea'],
  },
  {
    days: 'Mardi / Vendredi',
    talent: ['Resistance', 'Diligence', 'Elegance'],
    weapon: ['Loup boreal', 'Brume', 'Narukami'],
  },
  {
    days: 'Mercredi / Samedi',
    talent: ['Ballade', 'Or', 'Lumiere'],
    weapon: ['Gladiateur', 'Aerosiderite', 'Masque'],
  },
  {
    days: 'Dimanche',
    talent: ['Tous les materiaux'],
    weapon: ['Tous les materiaux'],
  },
]

export default function GenshinMaterialsPage() {
  return (
    <PageLayout title="Materiaux" subtitle="Genshin Impact - Planning journalier des donjons">
      <div className="space-y-4">
        {DAILY_DOMAINS.map((day) => (
          <MangaCard key={day.days} className="p-4" hover={false}>
            <h3 className="font-heading font-bold text-lg mb-3">
              <span className="bg-manga-red text-white px-2 py-0.5 text-sm mr-2">{day.days}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-manga-gray mb-2">Talents</h4>
                <ul className="space-y-1">
                  {day.talent.map((t) => (
                    <li key={t} className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-manga-red flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs uppercase text-manga-gray mb-2">Armes</h4>
                <ul className="space-y-1">
                  {day.weapon.map((w) => (
                    <li key={w} className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-manga-ink flex-shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MangaCard>
        ))}
      </div>
    </PageLayout>
  )
}
