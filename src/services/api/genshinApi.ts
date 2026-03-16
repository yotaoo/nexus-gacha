import type { GenshinCharacter, GenshinWeapon, GenshinArtifact, GenshinElement, GenshinWeaponType } from '@/types/genshin'
import { cleanHsrDescription } from '@/utils/textCleaner'

const YATTA_BASE = 'https://gi.yatta.moe/api/v2/fr'
const YATTA_ASSETS = 'https://gi.yatta.moe/assets/UI'
const ENKA_ASSETS = 'https://enka.network/ui'

async function fetchYatta<T>(path: string): Promise<T> {
  const res = await fetch(`${YATTA_BASE}${path}`)
  if (!res.ok) throw new Error(`Yatta API error: ${res.status}`)
  const json = await res.json()
  return json.data
}

// Yatta internal element names for icon URLs
const ELEMENT_ICON_MAP: Record<string, string> = {
  'Pyro': 'Fire', 'Hydro': 'Water', 'Electro': 'Electric',
  'Cryo': 'Ice', 'Anemo': 'Wind', 'Geo': 'Rock', 'Dendro': 'Grass',
}

// Element mapping from Yatta internal names to our types
function mapElement(element: string): GenshinElement {
  const map: Record<string, GenshinElement> = {
    'Fire': 'Pyro', 'Water': 'Hydro', 'Electric': 'Electro',
    'Ice': 'Cryo', 'Wind': 'Anemo', 'Rock': 'Geo', 'Grass': 'Dendro',
    'Pyro': 'Pyro', 'Hydro': 'Hydro', 'Electro': 'Electro',
    'Cryo': 'Cryo', 'Anemo': 'Anemo', 'Geo': 'Geo', 'Dendro': 'Dendro',
  }
  return map[element] || 'Anemo'
}

function mapWeaponType(weaponType: string): GenshinWeaponType {
  const map: Record<string, GenshinWeaponType> = {
    'WEAPON_SWORD_ONE_HAND': 'Sword', 'WEAPON_CLAYMORE': 'Claymore',
    'WEAPON_POLE': 'Polearm', 'WEAPON_BOW': 'Bow', 'WEAPON_CATALYST': 'Catalyst',
  }
  return map[weaponType] || 'Sword'
}

// Clean Yatta descriptions (same color tags as HSR)
function cleanDescription(desc: string): string {
  return cleanHsrDescription(desc)
}

// ============ CHARACTERS ============

export async function fetchAllGenshinCharacters(): Promise<GenshinCharacter[]> {
  const data = await fetchYatta<{ items: Record<string, any> }>('/avatar')
  const seen = new Set<string>()
  return Object.entries(data.items)
    .filter(([, char]) => {
      // Deduplicate Traveler variants - keep first only
      const name = char.name || ''
      if (seen.has(name)) return false
      seen.add(name)
      return true
    })
    .map(([id, char]) => ({
      id,
      name: char.name || '',
      rarity: char.rank || 4,
      element: mapElement(char.element || ''),
      weaponType: mapWeaponType(char.weaponType || ''),
      region: char.region,
      icon: char.icon,
    }))
}

export async function fetchGenshinCharacter(id: string): Promise<GenshinCharacter> {
  const data = await fetchYatta<any>(`/avatar/${id}`)
  if (!data || !data.name) throw new Error('Personnage introuvable')

  const talents = data.talent ? Object.entries(data.talent).map(([, t]: [string, any]) => ({
    name: t.name || '',
    unlock: t.type || '',
    description: cleanDescription(t.desc || t.description || ''),
    type: t.type || '',
    icon: t.icon || undefined,
  })) : []

  const constellations = data.constellation ? Object.entries(data.constellation).map(([, c]: [string, any], i) => ({
    name: c.name || '',
    unlock: `C${i + 1}`,
    description: cleanDescription(c.desc || c.description || ''),
    level: i + 1,
    icon: c.icon || undefined,
  })) : []

  return {
    id,
    name: data.name,
    title: data.fetter?.title,
    description: data.fetter?.detail || '',
    rarity: data.rank || 4,
    element: mapElement(data.element || ''),
    weaponType: mapWeaponType(data.weaponType || ''),
    region: data.region,
    constellation: data.fetter?.constellation,
    birthday: data.birthday ? `${data.birthday[1]}/${data.birthday[0]}` : undefined,
    icon: data.icon,
    skillTalents: talents,
    constellations,
  }
}

// ============ WEAPONS ============

export async function fetchAllGenshinWeapons(): Promise<GenshinWeapon[]> {
  const data = await fetchYatta<{ items: Record<string, any> }>('/weapon')
  return Object.entries(data.items)
    .filter(([, w]) => (w.rank || 1) >= 3) // Only 3* and above
    .map(([id, w]) => ({
      id,
      name: w.name || '',
      type: mapWeaponType(w.type || ''),
      rarity: w.rank || 3,
      baseAttack: 0, // Only available in detail
      icon: w.icon,
    }))
}

export async function fetchGenshinWeapon(id: string): Promise<GenshinWeapon> {
  const data = await fetchYatta<any>(`/weapon/${id}`)
  if (!data || !data.name) throw new Error('Arme introuvable')

  const affix = data.affix ? Object.values(data.affix)[0] as any : null

  return {
    id,
    name: data.name,
    type: mapWeaponType(data.type || ''),
    rarity: data.rank || 3,
    baseAttack: 0,
    subStat: data.specialProp || '',
    passiveName: affix?.name || '',
    passiveDesc: cleanDescription(affix?.upgrade?.['0'] || ''),
    icon: data.icon,
  }
}

// ============ ARTIFACTS ============

export async function fetchAllGenshinArtifacts(): Promise<GenshinArtifact[]> {
  const data = await fetchYatta<{ items: Record<string, any> }>('/reliquary')
  return Object.entries(data.items).map(([id, a]) => {
    const affixes = a.affixList ? Object.values(a.affixList) as string[] : []
    return {
      id,
      name: a.name || '',
      max_rarity: Math.max(...(a.levelList || [5])),
      '2-piece_bonus': cleanDescription(affixes[0] || ''),
      '4-piece_bonus': cleanDescription(affixes[1] || ''),
      icon: a.icon,
    }
  })
}

export async function fetchGenshinArtifact(id: string): Promise<GenshinArtifact> {
  const data = await fetchYatta<any>(`/reliquary/${id}`)
  if (!data || !data.name) throw new Error('Artefact introuvable')

  const affixes = data.affixList ? Object.values(data.affixList) as string[] : []

  return {
    id,
    name: data.name,
    max_rarity: Math.max(...(data.levelList || [5])),
    '2-piece_bonus': cleanDescription(affixes[0] || ''),
    '4-piece_bonus': cleanDescription(affixes[1] || ''),
    icon: data.icon,
    pieces: data.suit ? Object.entries(data.suit).map(([slot, p]: [string, any]) => ({
      slot,
      name: p.name || '',
      description: p.description || '',
      icon: p.icon,
    })) : [],
  }
}

// ============ IMAGE HELPERS ============

export function getGenshinCharacterIcon(id: string, icon?: string): string {
  if (icon) return `${YATTA_ASSETS}/${icon}.png`
  return `${YATTA_ASSETS}/UI_AvatarIcon_${id}.png`
}

export function getGenshinCharacterGacha(id: string, icon?: string): string {
  // Gacha splash: UI_Gacha_AvatarImg_{name}
  const name = icon?.replace('UI_AvatarIcon_', '') || id
  return `${YATTA_ASSETS}/UI_Gacha_AvatarImg_${name}.png`
}

export function getGenshinWeaponIcon(icon?: string): string {
  if (icon) return `${YATTA_ASSETS}/${icon}.png`
  return ''
}

export function getGenshinArtifactIcon(icon?: string): string {
  if (icon) return `${ENKA_ASSETS}/${icon}.png`
  return ''
}

export function getGenshinElementIcon(element: GenshinElement): string {
  const yattaName = ELEMENT_ICON_MAP[element] || element
  return `${YATTA_ASSETS}/UI_Buff_Element_${yattaName}.png`
}

export function getGenshinTalentIcon(icon?: string): string {
  if (icon) return `${YATTA_ASSETS}/${icon}.png`
  return ''
}

export function getGenshinConstellationIcon(icon?: string): string {
  if (icon) return `${YATTA_ASSETS}/${icon}.png`
  return ''
}
