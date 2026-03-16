import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { type GameId, type GameConfig } from '@/types'
import { GAME_REGISTRY, getGameFromPath } from '@/utils/gameRegistry'

interface GameContextType {
  currentGame: GameId
  gameConfig: GameConfig
  setCurrentGame: (game: GameId) => void
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [currentGame, setCurrentGame] = useState<GameId>('genshin')

  useEffect(() => {
    const gameFromPath = getGameFromPath(location.pathname)
    if (gameFromPath && gameFromPath !== currentGame) {
      setCurrentGame(gameFromPath)
    }
  }, [location.pathname, currentGame])

  const gameConfig = GAME_REGISTRY[currentGame]

  return (
    <GameContext.Provider value={{ currentGame, gameConfig, setCurrentGame }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
