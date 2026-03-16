import type { TeamComposition } from '@/types'
import { getHsrCharacterIcon } from '@/services/api/hsrApi'

function m(id: string, name: string, role: string) {
  return { id, name, role, imageUrl: getHsrCharacterIcon(id) }
}

export const HSR_TEAMS: TeamComposition[] = [
  {
    id: 'firefly-break',
    name: 'Firefly Super Break',
    description: 'Equipe Break avec Firefly et Ruan Mei. Degats de Rupture extremes contre tous les types d\'ennemis.',
    members: [
      m('1310', 'Firefly', 'DPS'),
      m('1303', 'Ruan Mei', 'Support'),
      m('1306', 'Sparkle', 'Support'),
      m('1217', 'Huohuo', 'Abondance'),
    ],
    tags: ['Meta', 'Break', 'Polyvalent'],
  },
  {
    id: 'acheron-dot',
    name: 'Acheron DoT',
    description: 'Acheron utilise les debuffs pour accumuler son Ultimate devastateur. Parfait en Neant.',
    members: [
      m('1308', 'Acheron', 'DPS'),
      m('1006', 'Argent Cavalier', 'Sub DPS'),
      m('1306', 'Sparkle', 'Support'),
      m('1208', 'Fu Xuan', 'Preservation'),
    ],
    tags: ['Meta', 'Neant', 'Boss'],
  },
  {
    id: 'seele-hunt',
    name: 'Seele Hunt',
    description: 'Seele en Chasse enchaine les kills avec son talent Extra Tour. Ideal en mono-cible.',
    members: [
      m('1102', 'Seele', 'DPS'),
      m('1101', 'Bronya', 'Support'),
      m('1208', 'Fu Xuan', 'Preservation'),
      m('1202', 'Tingyun', 'Support'),
    ],
    tags: ['Mono-cible', 'Chasse', 'Classic'],
  },
  {
    id: 'ratio-fuxuan',
    name: 'Dr. Ratio Follow-Up',
    description: 'Dr. Ratio avec des attaques supplementaires en boucle. Enorme DPS soutenu.',
    members: [
      m('1305', 'Dr. Ratio', 'DPS'),
      m('1303', 'Ruan Mei', 'Support'),
      m('1202', 'Tingyun', 'Support'),
      m('1203', 'Luocha', 'Abondance'),
    ],
    tags: ['Suivi', 'Mono-cible', 'Solide'],
  },
  {
    id: 'himeko-aoe',
    name: 'Himeko AoE',
    description: 'Himeko en Erudition pour nettoyer les vagues d\'ennemis. Bonne equipe de farm.',
    members: [
      m('1003', 'Himeko', 'DPS'),
      m('1009', 'Asta', 'Support'),
      m('1202', 'Tingyun', 'Support'),
      m('1105', 'Natasha', 'Abondance'),
    ],
    tags: ['AoE', 'F2P', 'Farm'],
  },
]
