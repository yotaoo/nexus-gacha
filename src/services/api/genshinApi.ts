import type { GenshinCharacter, GenshinWeapon, GenshinArtifact, GenshinElement, GenshinWeaponType, AscensionMaterial } from '@/types/genshin'
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

// ============ MATERIALS CACHE ============

let materialCache: Record<string, { name: string; icon: string; rank: number }> | null = null

async function fetchMaterialList(): Promise<Record<string, { name: string; icon: string; rank: number }>> {
  if (materialCache) return materialCache
  const data = await fetchYatta<{ items: Record<string, any> }>('/material')
  materialCache = {}
  for (const [id, m] of Object.entries(data.items)) {
    materialCache[id] = { name: m.name || '', icon: m.icon || '', rank: m.rank || 1 }
  }
  return materialCache
}

async function resolveAscensionMaterials(promote: any[]): Promise<AscensionMaterial[]> {
  const materials = await fetchMaterialList()
  const totals: Record<string, number> = {}
  for (const level of promote) {
    if (!level.costItems) continue
    for (const [id, count] of Object.entries(level.costItems)) {
      // Skip mora (id starts with 2)
      if (id === '202') continue
      totals[id] = (totals[id] || 0) + (count as number)
    }
  }
  // Group by base material (keep highest rarity variant only for gems)
  const result: AscensionMaterial[] = []
  const seen = new Set<string>()
  // Sort by rarity descending so we pick highest variant first
  const sorted = Object.entries(totals).sort((a, b) => {
    const matA = materials[a[0]]
    const matB = materials[b[0]]
    return (matB?.rank || 0) - (matA?.rank || 0)
  })
  for (const [id, count] of sorted) {
    const mat = materials[id]
    if (!mat) continue
    // Skip low-rank variants of gems (keep rank >= 2 variants)
    result.push({ id, name: mat.name, icon: mat.icon, rarity: mat.rank, count })
  }
  return result
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

  // Ascension materials
  const ascensionMaterials = data.upgrade?.promote
    ? await resolveAscensionMaterials(data.upgrade.promote)
    : []

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
    ascensionMaterials,
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

const PROP_LABELS: Record<string, string> = {
  FIGHT_PROP_CRITICAL: 'Taux CRIT',
  FIGHT_PROP_CRITICAL_HURT: 'DGT CRIT',
  FIGHT_PROP_ATTACK_PERCENT: 'ATQ%',
  FIGHT_PROP_HP_PERCENT: 'PV%',
  FIGHT_PROP_DEFENSE_PERCENT: 'DEF%',
  FIGHT_PROP_CHARGE_EFFICIENCY: 'Recharge d\'energie',
  FIGHT_PROP_ELEMENT_MASTERY: 'Maitrise elementaire',
  FIGHT_PROP_PHYSICAL_ADD_HURT: 'Bonus DGT Physique',
}

export async function fetchGenshinWeapon(id: string): Promise<GenshinWeapon> {
  const data = await fetchYatta<any>(`/weapon/${id}`)
  if (!data || !data.name) throw new Error('Arme introuvable')

  const affix = data.affix ? Object.values(data.affix)[0] as any : null
  const props = data.upgrade?.prop || []
  const promotes = data.upgrade?.promote || []

  // Calculate base ATK at max level
  let baseAttack = 0
  const atkProp = props.find((p: any) => p.propType === 'FIGHT_PROP_BASE_ATTACK')
  if (atkProp && promotes.length > 0) {
    const lastPromote = promotes[promotes.length - 1]
    const addProps = lastPromote.addProps || {}
    baseAttack = Math.round(atkProp.initValue + (addProps.FIGHT_PROP_BASE_ATTACK || 0))
  }

  // Format sub stat with French label and value
  let subStat = ''
  const subProp = props.find((p: any) => p.propType !== 'FIGHT_PROP_BASE_ATTACK')
  if (subProp) {
    const label = PROP_LABELS[subProp.propType] || subProp.propType
    const isPercent = subProp.propType !== 'FIGHT_PROP_ELEMENT_MASTERY'
    const value = isPercent ? `${(subProp.initValue * 100).toFixed(1)}%` : Math.round(subProp.initValue).toString()
    subStat = `${label} ${value}`
  }

  return {
    id,
    name: data.name,
    type: mapWeaponType(data.type || ''),
    rarity: data.rank || 3,
    baseAttack,
    subStat,
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
  if (icon) return `${YATTA_ASSETS}/reliquary/${icon}.png`
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

export function getGenshinMaterialIcon(icon: string): string {
  return `${YATTA_ASSETS}/${icon}.png`
}
