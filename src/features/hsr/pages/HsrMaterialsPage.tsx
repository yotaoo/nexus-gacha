import PageLayout from '@/components/layout/PageLayout'
import MangaCard from '@/components/ui/MangaCard'

const CALYX_SCHEDULE = [
  {
    days: 'Lundi / Jeudi',
    traces: ['Destruction', 'Harmonie', 'Preservation'],
  },
  {
    days: 'Mardi / Vendredi',
    traces: ['Chasse', 'Neant', 'Abondance'],
  },
  {
    days: 'Mercredi / Samedi',
    traces: ['Erudition', 'Souvenance'],
  },
  {
    days: 'Dimanche',
    traces: ['Tous les materiaux'],
  },
]

export default function HsrMaterialsPage() {
  return (
    <PageLayout title="Materiaux" subtitle="Honkai: Star Rail - Planning journalier des Calyx">
      <div className="space-y-4">
        {CALYX_SCHEDULE.map((day) => (
          <MangaCard key={day.days} className="p-4" hover={false}>
            <h3 className="font-heading font-bold text-lg mb-3">
              <span className="bg-manga-red text-white px-2 py-0.5 text-sm mr-2">{day.days}</span>
            </h3>
            <div>
              <h4 className="font-heading font-bold text-xs uppercase text-manga-gray mb-2">Traces (par Voie)</h4>
              <ul className="space-y-1">
                {day.traces.map((t) => (
                  <li key={t} className="text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-manga-red flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </MangaCard>
        ))}
      </div>
    </PageLayout>
  )
}
