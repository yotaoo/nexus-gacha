import type { HsrCharacterBuild } from '@/types'

export const HSR_BUILDS: HsrCharacterBuild[] = [
  {
    characterId: '1309',
    name: 'Robin',
    role: 'Support Harmonie',
    lightCones: [
      { id: '23026', name: 'Retour de loin', rarity: 5, note: 'BiS' },
      { id: '21034', name: 'Hey, je suis la ici !', rarity: 4 },
      { id: '21019', name: 'Un soupir de bonheur', rarity: 4, note: 'Bon F2P' },
    ],
    relicSets: [
      { sets: [{ name: 'Musketeer of Wild Wheat', pieces: 4 }], note: 'BiS pour buff ATQ' },
      { sets: [{ name: 'Prisoner in Deep Confinement', pieces: 2 }, { name: 'Musketeer of Wild Wheat', pieces: 2 }] },
    ],
    mainStats: { body: 'ATQ%', feet: 'Vitesse', sphere: 'ATQ%', rope: 'Recharge d\'energie' },
    subStats: ['ATQ%', 'ATQ', 'Vitesse', 'Recharge d\'energie'],
    tips: 'Robin buff toute l\'equipe avec son Ultimate. Maximisez son ATQ pour maximiser le buff.',
  },
  {
    characterId: '1303',
    name: 'Ruan Mei',
    role: 'Support Harmonie',
    lightCones: [
      { id: '23019', name: 'Danse ! Danse ! Danse !', rarity: 5, note: 'BiS' },
      { id: '21019', name: 'Un soupir de bonheur', rarity: 4 },
    ],
    relicSets: [
      { sets: [{ name: 'Thief of Shooting Meteor', pieces: 4 }], note: 'Pour la RE' },
      { sets: [{ name: 'Messenger Traversing Hackerspace', pieces: 4 }], note: 'Alternative speed' },
    ],
    mainStats: { body: 'PV%/DEF%', feet: 'Vitesse', sphere: 'PV%', rope: 'Recharge d\'energie' },
    subStats: ['Vitesse', 'Recharge d\'energie', 'Effet de rupture', 'PV%'],
    tips: 'Ruan Mei augmente les DGT de rupture et la penetration RES de toute l\'equipe. Priorite a la RE pour son Ultimate.',
  },
  {
    characterId: '1302',
    name: 'Argenti',
    role: 'Main DPS Erudition',
    lightCones: [
      { id: '23020', name: 'Terre de genie', rarity: 5, note: 'BiS' },
      { id: '21020', name: 'Le jour ou le cosmos est tombe', rarity: 4 },
    ],
    relicSets: [
      { sets: [{ name: 'Champion of Streetwise Boxing', pieces: 4 }] },
    ],
    mainStats: { body: 'Taux CRIT/DGT CRIT', feet: 'Vitesse/ATQ%', sphere: 'Bonus DGT Physique', rope: 'ATQ%' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'ATQ%', 'Vitesse'],
    tips: 'Son Ultimate a 180 augmente enormement ses DGTs AoE. Necessaire de generer beaucoup d\'energie.',
  },
  {
    characterId: '1305',
    name: 'Dr. Ratio',
    role: 'Main DPS Chasse',
    lightCones: [
      { id: '23020', name: 'Bapteme de la nuit pure', rarity: 5, note: 'BiS' },
      { id: '21034', name: 'Worrisome, Blissful', rarity: 4 },
    ],
    relicSets: [
      { sets: [{ name: 'Pioneer Diver of Dead Waters', pieces: 4 }], note: 'BiS' },
    ],
    mainStats: { body: 'Taux CRIT/DGT CRIT', feet: 'Vitesse/ATQ%', sphere: 'Bonus DGT Imaginaire', rope: 'ATQ%' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'ATQ%', 'Vitesse'],
    tips: 'Dr. Ratio fait des follow-up attacks quand les ennemis ont 3+ debuffs. Combinez avec des debuffeurs.',
  },
  {
    characterId: '1112',
    name: 'Topaz & Pepito',
    role: 'Sub DPS Chasse',
    lightCones: [
      { id: '23016', name: 'Rever est comme reflechir', rarity: 5, note: 'BiS' },
      { id: '21027', name: 'Patience eternelle', rarity: 4 },
    ],
    relicSets: [
      { sets: [{ name: 'Firesmith of Lava-Forging', pieces: 4 }] },
    ],
    mainStats: { body: 'Taux CRIT/DGT CRIT', feet: 'Vitesse', sphere: 'Bonus DGT Feu', rope: 'ATQ%' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'ATQ%', 'Vitesse'],
    tips: 'Topaz booste les follow-up attacks de toute l\'equipe. Excellente synergie avec Dr. Ratio et Aventurine.',
  },
  {
    characterId: '1217',
    name: 'Huohuo',
    role: 'Support Abondance',
    lightCones: [
      { id: '23017', name: 'Nuit sur la voie lactee', rarity: 5, note: 'BiS' },
      { id: '21024', name: 'Liseuse posee', rarity: 4, note: 'Bon F2P' },
    ],
    relicSets: [
      { sets: [{ name: 'Passerby of Wandering Cloud', pieces: 4 }], note: 'BiS healer' },
    ],
    mainStats: { body: 'Taux de soins / PV%', feet: 'Vitesse', sphere: 'PV%', rope: 'Recharge d\'energie' },
    subStats: ['Vitesse', 'PV%', 'Recharge d\'energie', 'RES aux effets'],
    tips: 'Huohuo soigne et donne de la RE a toute l\'equipe avec son Ultimate. Cle des equipes de sustain.',
  },
  {
    characterId: '1304',
    name: 'Aventurine',
    role: 'Support Preservation',
    lightCones: [
      { id: '23023', name: 'Destine a danser', rarity: 5, note: 'BiS' },
      { id: '21022', name: 'Engrenages du destin', rarity: 4, note: 'Bon F2P' },
    ],
    relicSets: [
      { sets: [{ name: 'Knight of Purity Palace', pieces: 4 }], note: 'Pour le shield' },
    ],
    mainStats: { body: 'DEF%', feet: 'Vitesse/DEF%', sphere: 'DEF%', rope: 'DEF%' },
    subStats: ['DEF%', 'DEF', 'Vitesse', 'RES aux effets'],
    tips: 'Aventurine scale sur la DEF. Son shield se cumule et il fait des follow-up attacks. Tres versatile.',
  },
  {
    characterId: '1308',
    name: 'Acheron',
    role: 'Main DPS Neant',
    lightCones: [
      { id: '23024', name: 'Le long du chemin de depart', rarity: 5, note: 'BiS' },
      { id: '21034', name: 'Bonne nuit et dors bien', rarity: 4, note: 'Alternative solide' },
    ],
    relicSets: [
      { sets: [{ name: 'Pioneer Diver of Dead Waters', pieces: 4 }], note: 'BiS' },
    ],
    mainStats: { body: 'Taux CRIT/DGT CRIT', feet: 'Vitesse/ATQ%', sphere: 'Bonus DGT Foudre', rope: 'ATQ%' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'ATQ%', 'Vitesse'],
    tips: 'Acheron gagne des stacks quand les ennemis recoivent des debuffs. Combinez avec Kafka, Pela ou Jiaoqiu.',
  },
  {
    characterId: '1306',
    name: 'Sparkle',
    role: 'Support Harmonie',
    lightCones: [
      { id: '23003', name: 'Mais l\'aube est deja venue', rarity: 5, note: 'BiS' },
      { id: '21019', name: 'Un soupir de bonheur', rarity: 4 },
    ],
    relicSets: [
      { sets: [{ name: 'Messenger Traversing Hackerspace', pieces: 4 }], note: 'BiS speed' },
    ],
    mainStats: { body: 'PV%/DEF%', feet: 'Vitesse', sphere: 'PV%', rope: 'Recharge d\'energie' },
    subStats: ['Vitesse', 'Recharge d\'energie', 'PV%', 'DEF%'],
    tips: 'Sparkle avance le tour d\'un allie et booste ses DGT CRIT. Ideale pour les DPS mono-cible.',
  },
  {
    characterId: '1102',
    name: 'Seele',
    role: 'Main DPS Chasse',
    lightCones: [
      { id: '23001', name: 'Au milieu de la nuit', rarity: 5, note: 'BiS' },
      { id: '21010', name: 'Seule dans l\'univers', rarity: 4 },
    ],
    relicSets: [
      { sets: [{ name: 'Genius of Brilliant Stars', pieces: 4 }], note: 'BiS pour ignore DEF' },
    ],
    mainStats: { body: 'Taux CRIT/DGT CRIT', feet: 'ATQ%/Vitesse', sphere: 'Bonus DGT Quantique', rope: 'ATQ%' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'ATQ%', 'Vitesse'],
    tips: 'Seele gagne un tour additionnel apres avoir elimine un ennemi. Ciblez les ennemis faibles en premier.',
  },
]
