import type { GameConfig, GameId, NavLink } from '@/types'

export const GAME_REGISTRY: Record<GameId, GameConfig> = {
  genshin: {
    id: 'genshin',
    name: 'Genshin Impact',
    shortName: 'Genshin',
    slug: 'genshin',
    routes: {
      characters: '/genshin/personnages',
      characterDetail: '/genshin/personnages/:id',
      weapons: '/genshin/armes',
      weaponDetail: '/genshin/armes/:id',
      artifacts: '/genshin/artefacts',
      artifactDetail: '/genshin/artefacts/:id',
      tierList: '/genshin/tier-list',
      teams: '/genshin/equipes',
      materials: '/genshin/materiaux',
      codes: '/genshin/codes',
    },
  },
  hsr: {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    shortName: 'Star Rail',
    slug: 'hsr',
    routes: {
      characters: '/hsr/personnages',
      characterDetail: '/hsr/personnages/:id',
      weapons: '/hsr/cones-de-lumiere',
      weaponDetail: '/hsr/cones-de-lumiere/:id',
      artifacts: '/hsr/reliques',
      artifactDetail: '/hsr/reliques/:id',
      tierList: '/hsr/tier-list',
      teams: '/hsr/equipes',
      materials: '/hsr/materiaux',
      codes: '/hsr/codes',
    },
  },
}

export const GAMES = Object.values(GAME_REGISTRY)

export function getGameFromPath(pathname: string): GameId | null {
  if (pathname.startsWith('/genshin')) return 'genshin'
  if (pathname.startsWith('/hsr')) return 'hsr'
  return null
}

export function getNavLinks(gameId: GameId): NavLink[] {
  const r = GAME_REGISTRY[gameId].routes
  const isHsr = gameId === 'hsr'
  return [
    { label: 'Personnages', path: r.characters },
    { label: isHsr ? 'Cones' : 'Armes', path: r.weapons },
    { label: isHsr ? 'Reliques' : 'Artefacts', path: r.artifacts },
    { label: 'Tier List', path: r.tierList },
    { label: 'Equipes', path: r.teams },
    { label: 'Materiaux', path: r.materials },
    { label: 'Codes', path: r.codes },
  ]
}
