export type GameId = 'genshin' | 'hsr'

export interface GameConfig {
  id: GameId
  name: string
  shortName: string
  slug: string
  routes: {
    characters: string
    characterDetail: string
    weapons: string
    weaponDetail: string
    artifacts: string
    artifactDetail: string
    tierList: string
    teams: string
    materials: string
    codes: string
  }
}

export interface NavLink {
  label: string
  path: string
  icon?: string
}

export interface TierEntry {
  id: string
  name: string
  imageUrl: string
  tier: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D'
  role?: string
}

export interface TeamComposition {
  id: string
  name: string
  description: string
  members: TeamMember[]
  tags: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl: string
  alternatives?: { id: string; name: string; imageUrl: string }[]
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  game: GameId | 'all'
  imageUrl?: string
  url?: string
}

export interface RedeemCode {
  code: string
  rewards: string[]
  isActive: boolean
  source?: string
}

export interface CharacterBuild {
  characterId: string
  name: string
  role: string
  weapons: BuildItem[]
  artifacts: BuildArtifactSet[]
  mainStats: { sands: string; goblet: string; circlet: string }
  subStats: string[]
  tips?: string
}

export interface BuildItem {
  id: string
  name: string
  rarity: number
  note?: string
}

export interface BuildArtifactSet {
  sets: { name: string; pieces: number }[]
  note?: string
}

export interface HsrCharacterBuild {
  characterId: string
  name: string
  role: string
  lightCones: BuildItem[]
  relicSets: BuildArtifactSet[]
  mainStats: { body: string; feet: string; sphere: string; rope: string }
  subStats: string[]
  tips?: string
}
