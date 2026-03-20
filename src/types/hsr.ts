export interface HsrAscensionMaterial {
  id: string
  name: string
  icon: string
  rarity: number
  count: number
}

export interface HsrCharacter {
  id: string
  name: string
  rarity: number
  element: HsrElement
  path: HsrPath
  description?: string
  skills?: HsrSkill[]
  eidolons?: HsrEidolon[]
  ascensionMaterials?: HsrAscensionMaterial[]
}

export type HsrElement =
  | 'Fire' | 'Ice' | 'Thunder' | 'Wind'
  | 'Physical' | 'Quantum' | 'Imaginary'

export type HsrPath =
  | 'Warrior' | 'Rogue' | 'Mage' | 'Shaman'
  | 'Warlock' | 'Knight' | 'Priest'
  | 'Memory' | 'Elation'

export interface HsrSkill {
  id: string
  name: string
  type: string
  description: string
  maxLevel?: number
  icon?: string
}

export interface HsrEidolon {
  id: string
  name: string
  rank: number
  description: string
  icon?: string
}

export interface HsrLightCone {
  id: string
  name: string
  rarity: number
  path: HsrPath
  description?: string
  passiveName?: string
  passiveDesc?: string
  baseHP?: number
  baseATK?: number
  baseDEF?: number
}

export interface HsrRelic {
  id: string
  name: string
  setPieces: number
  bonus2pc?: string
  bonus4pc?: string
  icon?: string
}

export const HSR_ELEMENTS: { id: HsrElement; label: string; color: string }[] = [
  { id: 'Fire', label: 'Feu', color: '#F4634E' },
  { id: 'Ice', label: 'Glace', color: '#47C7FD' },
  { id: 'Thunder', label: 'Foudre', color: '#C567E4' },
  { id: 'Wind', label: 'Vent', color: '#00E09E' },
  { id: 'Physical', label: 'Physique', color: '#C5C5C5' },
  { id: 'Quantum', label: 'Quantique', color: '#7B68EE' },
  { id: 'Imaginary', label: 'Imaginaire', color: '#F3D458' },
]

export const HSR_PATHS: { id: HsrPath; label: string }[] = [
  { id: 'Warrior', label: 'Destruction' },
  { id: 'Rogue', label: 'Chasse' },
  { id: 'Mage', label: 'Erudition' },
  { id: 'Shaman', label: 'Harmonie' },
  { id: 'Warlock', label: 'Neant' },
  { id: 'Knight', label: 'Preservation' },
  { id: 'Priest', label: 'Abondance' },
  { id: 'Memory', label: 'Souvenance' },
  { id: 'Elation', label: 'Allegresse' },
]
