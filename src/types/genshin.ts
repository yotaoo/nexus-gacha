export interface GenshinCharacter {
  id: string
  name: string
  title?: string
  description?: string
  rarity: number
  element: GenshinElement
  weaponType: GenshinWeaponType
  region?: string
  constellation?: string
  birthday?: string
  icon?: string
  skillTalents?: GenshinTalent[]
  constellations?: GenshinConstellation[]
}

export type GenshinElement =
  | 'Pyro' | 'Hydro' | 'Electro' | 'Cryo'
  | 'Anemo' | 'Geo' | 'Dendro'

export type GenshinWeaponType =
  | 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst'

export interface GenshinTalent {
  name: string
  unlock: string
  description: string
  type?: string
  icon?: string
}

export interface GenshinConstellation {
  name: string
  unlock: string
  description: string
  level: number
  icon?: string
}

export interface GenshinWeapon {
  id: string
  name: string
  type: GenshinWeaponType
  rarity: number
  baseAttack: number
  subStat?: string
  passiveName?: string
  passiveDesc?: string
  location?: string
  icon?: string
}

export interface GenshinArtifact {
  id: string
  name: string
  max_rarity: number
  '2-piece_bonus'?: string
  '4-piece_bonus'?: string
  icon?: string
  pieces?: { slot: string; name: string; description: string; icon: string }[]
}

export const GENSHIN_ELEMENTS: { id: GenshinElement; label: string; color: string }[] = [
  { id: 'Pyro', label: 'Pyro', color: '#EF7938' },
  { id: 'Hydro', label: 'Hydro', color: '#4CC2F1' },
  { id: 'Electro', label: 'Electro', color: '#B07FD8' },
  { id: 'Cryo', label: 'Cryo', color: '#98D8E0' },
  { id: 'Anemo', label: 'Anemo', color: '#74C2A8' },
  { id: 'Geo', label: 'Geo', color: '#F0B232' },
  { id: 'Dendro', label: 'Dendro', color: '#A5C83B' },
]

export const GENSHIN_WEAPON_TYPES: { id: GenshinWeaponType; label: string }[] = [
  { id: 'Sword', label: 'Epee' },
  { id: 'Claymore', label: 'Espadon' },
  { id: 'Polearm', label: 'Lance' },
  { id: 'Bow', label: 'Arc' },
  { id: 'Catalyst', label: 'Catalyseur' },
]
