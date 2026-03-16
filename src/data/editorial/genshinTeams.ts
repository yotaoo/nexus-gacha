import type { TeamComposition } from '@/types'
import { getGenshinCharacterIcon } from '@/services/api/genshinApi'

function m(id: string, icon: string, name: string, role: string) {
  return { id, name, role, imageUrl: getGenshinCharacterIcon(id, icon) }
}

export const GENSHIN_TEAMS: TeamComposition[] = [
  {
    id: 'national',
    name: 'National Team',
    description: 'La composition la plus polyvalente. Enorme potentiel de reactions elementaires en chaine avec Vaporisation et Surcharge.',
    members: [
      m('10000023', 'UI_AvatarIcon_Xiangling', 'Xiangling', 'Sub DPS'),
      m('10000032', 'UI_AvatarIcon_Bennett', 'Bennett', 'Support'),
      m('10000025', 'UI_AvatarIcon_Xingqiu', 'Xingqiu', 'Sub DPS'),
      m('10000052', 'UI_AvatarIcon_Shougun', 'Shogun Raiden', 'Main DPS'),
    ],
    tags: ['Polyvalent', 'Abysse', 'F2P Friendly'],
  },
  {
    id: 'hutao-vape',
    name: 'Hu Tao Vaporize',
    description: 'Hu Tao avec Vaporisation. Degats mono-cible enormes, ideal pour les boss.',
    members: [
      m('10000046', 'UI_AvatarIcon_Hutao', 'Hu Tao', 'Main DPS'),
      m('10000025', 'UI_AvatarIcon_Xingqiu', 'Xingqiu', 'Sub DPS'),
      m('10000060', 'UI_AvatarIcon_Yelan', 'Yelan', 'Sub DPS'),
      m('10000030', 'UI_AvatarIcon_Zhongli', 'Zhongli', 'Support'),
    ],
    tags: ['Mono-cible', 'Boss', 'Premium'],
  },
  {
    id: 'freeze-ayaka',
    name: 'Freeze Ayaka',
    description: 'Equipe de Gel avec Ayaka. Controle les ennemis et inflige des degats Cryo massifs en AoE.',
    members: [
      m('10000002', 'UI_AvatarIcon_Ayaka', 'Kamisato Ayaka', 'Main DPS'),
      m('10000054', 'UI_AvatarIcon_Kokomi', 'Kokomi', 'Support'),
      m('10000047', 'UI_AvatarIcon_Kazuha', 'Kazuha', 'Support'),
      m('10000037', 'UI_AvatarIcon_Ganyu', 'Ganyu', 'Sub DPS'),
    ],
    tags: ['AoE', 'Controle', 'Abysse'],
  },
  {
    id: 'hyperbloom',
    name: 'Hyperbloom Nahida',
    description: 'Equipe Dendro exploitant les reactions de Floraison pour des degats constants en AoE.',
    members: [
      m('10000073', 'UI_AvatarIcon_Nahida', 'Nahida', 'Sub DPS'),
      m('10000025', 'UI_AvatarIcon_Xingqiu', 'Xingqiu', 'Sub DPS'),
      m('10000052', 'UI_AvatarIcon_Shougun', 'Shogun Raiden', 'Trigger'),
      m('10000047', 'UI_AvatarIcon_Kazuha', 'Kazuha', 'Support'),
    ],
    tags: ['AoE', 'Dendro', 'Meta'],
  },
  {
    id: 'furina-neuv',
    name: 'Furina Neuvillette',
    description: 'Combo devastateur Furina + Neuvillette. Degats Hydro massifs avec le Fanfare de Furina.',
    members: [
      m('10000087', 'UI_AvatarIcon_Neuvillette', 'Neuvillette', 'Main DPS'),
      m('10000089', 'UI_AvatarIcon_Furina', 'Furina', 'Support'),
      m('10000047', 'UI_AvatarIcon_Kazuha', 'Kazuha', 'Support'),
      m('10000030', 'UI_AvatarIcon_Zhongli', 'Zhongli', 'Support'),
    ],
    tags: ['Meta', 'AoE', 'Premium'],
  },
  {
    id: 'mono-geo',
    name: 'Mono Geo',
    description: 'Equipe full Geo avec resonance elementaire pour des boucliers solides et des degats constants.',
    members: [
      m('10000057', 'UI_AvatarIcon_Itto', 'Itto', 'Main DPS'),
      m('10000030', 'UI_AvatarIcon_Zhongli', 'Zhongli', 'Support'),
      m('10000055', 'UI_AvatarIcon_Gorou', 'Gorou', 'Support'),
      m('10000038', 'UI_AvatarIcon_Albedo', 'Albedo', 'Sub DPS'),
    ],
    tags: ['Survie', 'Geo', 'Confort'],
  },
]
