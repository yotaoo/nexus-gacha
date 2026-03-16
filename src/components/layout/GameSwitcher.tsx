import { useNavigate, useLocation } from 'react-router-dom'
import { useGame } from '@/contexts/GameContext'
import { GAMES } from '@/utils/gameRegistry'
import { cn } from '@/utils/cn'

export default function GameSwitcher() {
  const { currentGame, setCurrentGame } = useGame()
  const navigate = useNavigate()
  const location = useLocation()

  function switchTo(gameId: typeof currentGame) {
    if (gameId === currentGame) return
    setCurrentGame(gameId)
    // Navigate to the same type of page in the other game
    const currentPath = location.pathname
    const otherSlug = gameId === 'genshin' ? '/genshin' : '/hsr'
    const currentSuffix = currentPath.replace(/^\/(genshin|hsr)/, '')
    navigate(otherSlug + (currentSuffix || '/personnages'))
  }

  return (
    <div className="flex border-3 border-manga-ink overflow-hidden">
      {GAMES.map((game) => (
        <button
          key={game.id}
          onClick={() => switchTo(game.id)}
          className={cn(
            'px-4 py-2 font-heading font-bold text-sm uppercase tracking-wider transition-all duration-150',
            currentGame === game.id
              ? 'bg-manga-red text-white'
              : 'bg-white text-manga-ink hover:bg-manga-ink hover:text-white'
          )}
        >
          {game.shortName}
        </button>
      ))}
    </div>
  )
}
