import type { HsrCharacter, HsrLightCone, HsrRelic, HsrPath, HsrElement, HsrAscensionMaterial } from '@/types/hsr'
import { cleanHsrDescription, cleanRelicName } from '@/utils/textCleaner'

const YATTA_BASE = 'https://sr.yatta.moe/api/v2/fr'
const STARRAIL_RES = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master'

// API uses codenames, StarRailRes uses display names for paths
const PATH_ICON_MAP: Record<string, string> = {
  Warrior: 'Destruction', Rogue: 'Hunt', Mage: 'Erudition',
  Shaman: 'Harmony', Warlock: 'Nihility', Knight: 'Preservation',
  Priest: 'Abundance', Memory: 'Remembrance', Elation: 'Elation',
}

async function fetchYatta<T>(path: string): Promise<T> {
  const res = await fetch(`${YATTA_BASE}${path}`)
  if (!res.ok) throw new Error(`Yatta API error: ${res.status}`)
  const json = await res.json()
  return json.data
}

// ============ MATERIALS CACHE ============

let hsrItemCache: Record<string, { name: string; icon: string; rank: number }> | null = null

async function fetchItemList(): Promise<Record<string, { name: string; icon: string; rank: number }>> {
  if (hsrItemCache) return hsrItemCache
  const data = await fetchYatta<{ items: Record<string, any> }>('/item')
  hsrItemCache = {}
  for (const [id, m] of Object.entries(data.items)) {
    hsrItemCache[id] = { name: m.name || '', icon: String(m.icon || id), rank: m.rank || 1 }
  }
  return hsrItemCache
}

async function resolveHsrAscensionMaterials(upgradeLevels: any[]): Promise<HsrAscensionMaterial[]> {
  const items = await fetchItemList()
  const totals: Record<string, number> = {}
  for (const level of upgradeLevels) {
    if (!level.costItems) continue
    for (const [id, count] of Object.entries(level.costItems)) {
      // Skip credits (id "2")
      if (id === '2') continue
      totals[id] = (totals[id] || 0) + (count as number)
    }
  }
  return Object.entries(totals).map(([id, count]) => {
    const item = items[id]
    return {
      id,
      name: item?.name || id,
      icon: item?.icon || id,
      rarity: item?.rank || 1,
      count,
    }
  }).sort((a, b) => b.rarity - a.rarity)
}

function normalizePathType(pathType: unknown): HsrPath {
  if (typeof pathType === 'object' && pathType !== null && 'name' in pathType) {
    return (pathType as { id: string; name: string }).id as HsrPath
  }
  return pathType as HsrPath
}

function normalizeElement(element: unknown): HsrElement {
  if (typeof element === 'object' && element !== null && 'id' in element) {
    return (element as { id: string }).id as HsrElement
  }
  return element as HsrElement
}

export async function fetchHsrCharacterList(): Promise<HsrCharacter[]> {
  const data = await fetchYatta<{ items: Record<string, any> }>('/avatar')
  return Object.entries(data.items).map(([id, char]) => ({
    id,
    name: char.name || '',
    rarity: char.rank || char.rarity || 4,
    element: normalizeElement(char.damageType || char.element || char.types?.combatType),
    path: normalizePathType(char.baseType || char.pathType || char.types?.pathType),
  }))
}

export async function fetchHsrCharacterDetail(id: string): Promise<HsrCharacter> {
  const data = await fetchYatta<any>(`/avatar/${id}`)

  // Extract skills from traces.mainSkills -> skillList
  const skills: HsrCharacter['skills'] = []
  const mainSkills = data.traces?.mainSkills
  if (mainSkills && typeof mainSkills === 'object') {
    for (const [, point] of Object.entries(mainSkills) as [string, any][]) {
      const skillList = point.skillList
      if (skillList && typeof skillList === 'object') {
        for (const [sid, s] of Object.entries(skillList) as [string, any][]) {
          skills.push({
            id: sid,
            name: s.name || '',
            type: s.type || s.tag || '',
            description: cleanHsrDescription(s.description || s.desc || ''),
            maxLevel: s.maxLevel,
            icon: point.icon,
          })
        }
      }
    }
  }

  // Extract eidolons
  const eidolons: HsrCharacter['eidolons'] = []
  if (data.eidolons && typeof data.eidolons === 'object') {
    for (const [eid, e] of Object.entries(data.eidolons) as [string, any][]) {
      eidolons.push({
        id: eid,
        name: e.name || '',
        rank: e.rank || 0,
        description: cleanHsrDescription(e.desc || e.description || ''),
        icon: e.icon,
      })
    }
  }

  // Ascension materials
  const ascensionMaterials = Array.isArray(data.upgrade)
    ? await resolveHsrAscensionMaterials(data.upgrade)
    : []

  return {
    id,
    name: data.name || '',
    rarity: data.rank || data.rarity || 4,
    element: normalizeElement(data.damageType || data.element || data.types?.combatType),
    path: normalizePathType(data.baseType || data.pathType || data.types?.pathType),
    description: cleanHsrDescription(data.desc || data.description || data.fetter?.description || ''),
    skills,
    eidolons,
    ascensionMaterials,
  }
}

export async function fetchHsrLightConeList(): Promise<HsrLightCone[]> {
  const data = await fetchYatta<{ items: Record<string, any> }>('/equipment')
  return Object.entries(data.items).map(([id, lc]) => ({
    id,
    name: lc.name || '',
    rarity: lc.rank || lc.rarity || 3,
    path: normalizePathType(lc.baseType || lc.pathType || lc.types?.pathType),
  }))
}

export async function fetchHsrLightConeDetail(id: string): Promise<HsrLightCone> {
  const data = await fetchYatta<any>(`/equipment/${id}`)

  // Calculate max level stats from upgrade data
  let baseHP = 0, baseATK = 0, baseDEF = 0
  const upgrades = data.upgrade || []
  if (upgrades.length > 0) {
    const last = upgrades[upgrades.length - 1]
    const base = last.skillBase || {}
    const add = last.skillAdd || {}
    const maxLvl = last.maxLevel || 80
    baseHP = Math.round((base.hPBase || 0) + (add.hPAdd || 0) * (maxLvl - 1))
    baseATK = Math.round((base.attackBase || 0) + (add.attackAdd || 0) * (maxLvl - 1))
    baseDEF = Math.round((base.defenceBase || 0) + (add.defenceAdd || 0) * (maxLvl - 1))
  }

  // Resolve passive description with params (replace #N[f1]% placeholders)
  let passiveDesc = data.skill?.description || data.skill?.desc || ''
  const params = data.skill?.params || {}
  for (const [key, values] of Object.entries(params)) {
    const arr = values as number[]
    if (arr && arr.length > 0) {
      // Use superimposition 1 (index 0)
      const val = arr[0]
      const formatted = val < 1 ? `${(val * 100).toFixed(0)}%` : val.toString()
      passiveDesc = passiveDesc.replace(new RegExp(`#${key}\\[\\w+\\]%?`, 'g'), formatted)
    }
  }

  return {
    id,
    name: data.name || '',
    rarity: data.rank || data.rarity || 3,
    path: normalizePathType(data.baseType || data.pathType || data.types?.pathType),
    description: cleanHsrDescription(data.description || data.desc || ''),
    passiveName: data.skill?.name || '',
    passiveDesc: cleanHsrDescription(passiveDesc),
    baseHP,
    baseATK,
    baseDEF,
  }
}

export async function fetchHsrRelicList(): Promise<HsrRelic[]> {
  const data = await fetchYatta<{ items: Record<string, any> }>('/relic')
  return Object.entries(data.items).map(([id, r]) => ({
    id,
    name: cleanRelicName(r.name || ''),
    setPieces: r.isPlanarSuit ? 2 : 4,
    bonus2pc: cleanHsrDescription(r.bonus2pc || r.setSkill?.[0]?.desc || ''),
    bonus4pc: r.isPlanarSuit ? undefined : cleanHsrDescription(r.bonus4pc || r.setSkill?.[1]?.desc || ''),
  }))
}

export async function fetchHsrRelicDetail(id: string): Promise<HsrRelic> {
  const data = await fetchYatta<any>(`/relic/${id}`)
  return {
    id,
    name: cleanRelicName(data.name || ''),
    setPieces: data.isPlanarSuit ? 2 : 4,
    bonus2pc: cleanHsrDescription(data.setSkill?.[0]?.desc || ''),
    bonus4pc: data.isPlanarSuit ? undefined : cleanHsrDescription(data.setSkill?.[1]?.desc || ''),
  }
}

// Image helpers - ALWAYS use StarRailRes, NOT yatta.moe assets
export function getHsrCharacterIcon(id: string): string {
  return `${STARRAIL_RES}/icon/character/${id}.png`
}

export function getHsrCharacterSplash(id: string): string {
  return `${STARRAIL_RES}/image/character_portrait/${id}.png`
}

export function getHsrLightConeIcon(id: string): string {
  return `${STARRAIL_RES}/icon/light_cone/${id}.png`
}

export function getHsrRelicIcon(id: string): string {
  // Use relic.id for icon path, NOT relic.icon field
  return `${STARRAIL_RES}/icon/relic/${id}.png`
}

export function getHsrPathIcon(path: string): string {
  const display = PATH_ICON_MAP[path] || path
  return `${STARRAIL_RES}/icon/path/${display}.png`
}

export function getHsrElementIcon(element: string): string {
  return `${STARRAIL_RES}/icon/element/${element}.png`
}

// Map Yatta skill icon names to StarRailRes format
// SkillIcon_1003_Normal -> 1003_basic_atk
function mapSkillIcon(yattaIcon: string): string {
  const match = yattaIcon.match(/SkillIcon_(\d+)_(.+)/)
  if (!match) return yattaIcon
  const [, charId, type] = match
  const typeMap: Record<string, string> = {
    Normal: 'basic_atk', BP: 'skill', Ultra: 'ultimate',
    Passive: 'talent', Maze: 'technique',
    Rank1: 'rank1', Rank2: 'rank2', Rank4: 'rank4', Rank6: 'rank6',
  }
  return `${charId}_${typeMap[type] || type.toLowerCase()}`
}

export function getHsrSkillIcon(icon: string): string {
  return `${STARRAIL_RES}/icon/skill/${mapSkillIcon(icon)}.png`
}

export function getHsrEidolonIcon(icon: string): string {
  return `${STARRAIL_RES}/icon/skill/${mapSkillIcon(icon)}.png`
}

export function getHsrItemIcon(icon: string): string {
  return `${STARRAIL_RES}/icon/item/${icon}.png`
}
