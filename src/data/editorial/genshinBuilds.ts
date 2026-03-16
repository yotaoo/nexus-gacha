import type { CharacterBuild } from '@/types'

export const GENSHIN_BUILDS: CharacterBuild[] = [
  // === SS Tier ===
  {
    characterId: '10000089',
    name: 'Furina',
    role: 'Support / Sub DPS',
    weapons: [
      { id: '11511', name: 'Splendeur des eaux tranquilles', rarity: 5, note: 'BiS - Synergie parfaite avec son kit' },
      { id: '11509', name: 'Clef des profondeurs insondees', rarity: 5 },
      { id: '11416', name: 'Faucheur Fleuve', rarity: 4, note: 'Meilleur choix 4*' },
    ],
    artifacts: [
      { sets: [{ name: 'Troupe Doree du Soir', pieces: 4 }], note: 'BiS universel' },
    ],
    mainStats: { sands: 'PV%', goblet: 'PV%', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['PV%', 'Taux CRIT', 'DGT CRIT', 'Recharge d\'energie'],
    tips: 'Furina a besoin de beaucoup de PV pour maximiser ses degats et son soin via le Dechainage. Visez 40 000+ PV.',
  },
  {
    characterId: '10000073',
    name: 'Nahida',
    role: 'Sub DPS / Support Dendro',
    weapons: [
      { id: '14511', name: 'Mille nuits flottantes', rarity: 5, note: 'BiS' },
      { id: '14504', name: 'Kagura de la verite sacree', rarity: 5 },
      { id: '14413', name: 'Errance etoilee', rarity: 4, note: 'Excellent choix F2P' },
    ],
    artifacts: [
      { sets: [{ name: 'Souvenirs de la foret profonde', pieces: 4 }], note: 'BiS pour DPS Dendro' },
      { sets: [{ name: 'Souvenirs de la foret profonde', pieces: 2 }, { name: 'Reve dore', pieces: 2 }] },
    ],
    mainStats: { sands: 'Maitrise elementaire', goblet: 'Bonus DGT Dendro', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'Maitrise elementaire', 'ATQ%'],
    tips: 'Nahida scale tres bien avec la Maitrise elementaire. Son E marque les ennemis pour des DGTs Dendro constants.',
  },
  {
    characterId: '10000047',
    name: 'Kazuha',
    role: 'Support / VV Shred',
    weapons: [
      { id: '11509', name: 'Lame Liberatrice', rarity: 5, note: 'BiS' },
      { id: '11503', name: 'Lame du pourfendeur de brume', rarity: 5 },
      { id: '11401', name: 'Epee de fer', rarity: 4, note: 'Solide option F2P' },
    ],
    artifacts: [
      { sets: [{ name: 'Reminiscence de Viridescence', pieces: 4 }], note: 'Obligatoire pour le debuff RES' },
    ],
    mainStats: { sands: 'Maitrise elementaire', goblet: 'Maitrise elementaire', circlet: 'Maitrise elementaire' },
    subStats: ['Maitrise elementaire', 'Recharge d\'energie', 'Taux CRIT', 'DGT CRIT'],
    tips: 'Full Maitrise elementaire pour maximiser le buff de DGT elementaire pour l\'equipe. Besoin de ~160% RE.',
  },
  {
    characterId: '10000032',
    name: 'Bennett',
    role: 'Support / Heal / Buff ATQ',
    weapons: [
      { id: '11502', name: 'Moisson de Jade', rarity: 5 },
      { id: '11413', name: 'Epee de Sapwood', rarity: 4 },
      { id: '11406', name: 'Lame de l\'Alley', rarity: 4 },
    ],
    artifacts: [
      { sets: [{ name: 'Embleme du Destin brise', pieces: 4 }], note: 'Pour maximiser le Dechainage' },
      { sets: [{ name: 'Ancien rituel royal', pieces: 4 }], note: 'Alternative heal + buff' },
    ],
    mainStats: { sands: 'Recharge d\'energie', goblet: 'PV%', circlet: 'Taux de guerison' },
    subStats: ['Recharge d\'energie', 'PV%', 'PV', 'Taux CRIT'],
    tips: 'Le buff ATQ de Bennett scale sur son ATQ de base (personnage + arme). Visez 200%+ RE pour son Q.',
  },
  {
    characterId: '10000023',
    name: 'Xiangling',
    role: 'Sub DPS Pyro',
    weapons: [
      { id: '13505', name: 'Baton de la Melee', rarity: 5, note: 'BiS' },
      { id: '13505', name: 'Attrape-poisson', rarity: 4, note: 'Excellent F2P' },
      { id: '13401', name: 'Dragon de l\'ancien pacte', rarity: 4 },
    ],
    artifacts: [
      { sets: [{ name: 'Embleme du Destin brise', pieces: 4 }], note: 'BiS - boost son Dechainage' },
    ],
    mainStats: { sands: 'Maitrise elementaire / ATQ%', goblet: 'Bonus DGT Pyro', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'Maitrise elementaire', 'Recharge d\'energie'],
    tips: 'Guoba et Pyronado snap-shot les buffs au moment de l\'activation. Activez Bennett Q avant Xiangling Q.',
  },
  // === S Tier ===
  {
    characterId: '10000052',
    name: 'Shogun Raiden',
    role: 'Main DPS / Support Electro',
    weapons: [
      { id: '13509', name: 'Transfixion du Naganadel', rarity: 5, note: 'BiS' },
      { id: '13505', name: 'Attrape-poisson', rarity: 4, note: 'F2P tres competitif' },
    ],
    artifacts: [
      { sets: [{ name: 'Embleme du Destin brise', pieces: 4 }], note: 'BiS absolu' },
    ],
    mainStats: { sands: 'ATQ% / Recharge d\'energie', goblet: 'Bonus DGT Electro / ATQ%', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'ATQ%', 'Recharge d\'energie'],
    tips: 'Raiden convertit la RE en bonus DGT Electro. Avec son arme signature, ATQ% sablier est meilleur.',
  },
  {
    characterId: '10000087',
    name: 'Neuvillette',
    role: 'Main DPS Hydro',
    weapons: [
      { id: '14514', name: 'Splendeur des Fontaines', rarity: 5, note: 'BiS' },
      { id: '14506', name: 'Serment du vent et de la pluie', rarity: 5 },
      { id: '14413', name: 'Errance etoilee', rarity: 4, note: 'Bon choix 4*' },
    ],
    artifacts: [
      { sets: [{ name: 'Echoes de la Marechaussee', pieces: 4 }], note: 'BiS' },
    ],
    mainStats: { sands: 'PV%', goblet: 'Bonus DGT Hydro', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'PV%', 'ATQ%'],
    tips: 'L\'attaque chargee de Neuvillette est son principal DPS. Restez immobile pendant le canal pour maximiser les degats.',
  },
  {
    characterId: '10000046',
    name: 'Hu Tao',
    role: 'Main DPS Pyro',
    weapons: [
      { id: '13501', name: 'Baton de Homa', rarity: 5, note: 'BiS' },
      { id: '13415', name: 'Dragon de l\'ancien pacte', rarity: 4 },
    ],
    artifacts: [
      { sets: [{ name: 'Souvenir de la foret desolee', pieces: 4 }], note: 'BiS Vaporisation' },
      { sets: [{ name: 'Sorciere des flammes ardentes', pieces: 4 }] },
    ],
    mainStats: { sands: 'PV% / Maitrise elementaire', goblet: 'Bonus DGT Pyro', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'PV%', 'Maitrise elementaire'],
    tips: 'Hu Tao est plus forte sous 50% PV. Ne pas la soigner a fond. Jump cancel ses attaques chargees.',
  },
  {
    characterId: '10000060',
    name: 'Yelan',
    role: 'Sub DPS Hydro',
    weapons: [
      { id: '15508', name: 'Serment des rochers aquiferes', rarity: 5, note: 'BiS' },
      { id: '15507', name: 'Aqua Simulacra', rarity: 5 },
      { id: '15411', name: 'Arc de Favonius', rarity: 4 },
    ],
    artifacts: [
      { sets: [{ name: 'Embleme du Destin brise', pieces: 4 }], note: 'BiS' },
    ],
    mainStats: { sands: 'PV%', goblet: 'Bonus DGT Hydro', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'PV%', 'Recharge d\'energie'],
    tips: 'Yelan scale sur les PV, pas l\'ATQ. Son Dechainage est similaire a Xingqiu mais avec plus de DGT.',
  },
  {
    characterId: '10000025',
    name: 'Xingqiu',
    role: 'Sub DPS Hydro',
    weapons: [
      { id: '11510', name: 'Briseur de ciel', rarity: 5 },
      { id: '11402', name: 'Epee de Sacrifices', rarity: 4, note: 'BiS 4* pour la RE' },
      { id: '11410', name: 'Epee de Favonius', rarity: 4 },
    ],
    artifacts: [
      { sets: [{ name: 'Embleme du Destin brise', pieces: 4 }], note: 'BiS' },
    ],
    mainStats: { sands: 'ATQ% / Recharge d\'energie', goblet: 'Bonus DGT Hydro', circlet: 'Taux CRIT / DGT CRIT' },
    subStats: ['Taux CRIT', 'DGT CRIT', 'ATQ%', 'Recharge d\'energie'],
    tips: 'Epee de Sacrifices permet de relancer son E pour plus de particules. Visez ~180% RE.',
  },
  {
    characterId: '10000030',
    name: 'Zhongli',
    role: 'Support / Shielder',
    weapons: [
      { id: '13504', name: 'Coupe-herbe du Jardinier', rarity: 5, note: 'BiS DPS hybride' },
      { id: '13507', name: 'Baton de Homa', rarity: 5 },
      { id: '13401', name: 'Dent de loup noir', rarity: 4, note: 'F2P shield' },
    ],
    artifacts: [
      { sets: [{ name: 'Tenacite du Millelith', pieces: 4 }], note: 'BiS support - buff ATQ equipe' },
    ],
    mainStats: { sands: 'PV%', goblet: 'PV%', circlet: 'PV%' },
    subStats: ['PV%', 'PV', 'Recharge d\'energie', 'Taux CRIT'],
    tips: 'Full PV pour un bouclier incassable. Son bouclier reduit toutes les RES ennemies de 20%.',
  },
]
