import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useGame } from '@/contexts/GameContext'
import { getNavLinks } from '@/utils/gameRegistry'
import { cn } from '@/utils/cn'
import GameSwitcher from './GameSwitcher'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()
  const { currentGame } = useGame()
  const location = useLocation()
  const navLinks = getNavLinks(currentGame)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b-3 border-manga-ink">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row: logo + game switcher + actions */}
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="bg-manga-red text-white font-heading font-black text-xl px-2 py-0.5 border-2 border-manga-ink shadow-manga-sm group-hover:shadow-manga transition-all">
                N
              </span>
              <span className="font-heading font-bold text-lg hidden sm:block">
                NEXUS
              </span>
            </Link>

            <GameSwitcher />

            <div className="flex items-center gap-2">
              <Link
                to="/joueur"
                className="p-2 hover:bg-manga-paper rounded transition-colors"
                title="Recherche joueur"
              >
                <Search size={20} />
              </Link>
              <Link
                to="/connexion"
                className="p-2 hover:bg-manga-paper rounded transition-colors"
                title={user ? 'Mon profil' : 'Connexion'}
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full border-2 border-manga-ink" />
                ) : (
                  <User size={20} />
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 hover:bg-manga-paper rounded transition-colors lg:hidden"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Nav links - desktop */}
          <div className="hidden lg:flex items-center gap-1 pb-2 -mt-1 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-3 py-1.5 font-heading font-semibold text-sm uppercase tracking-wide transition-all duration-150 whitespace-nowrap',
                    'border-2 border-transparent',
                    isActive
                      ? 'bg-manga-ink text-white border-manga-ink'
                      : 'hover:border-manga-ink hover:bg-manga-paper'
                  )}
                  style={{ transform: 'skewX(-6deg)' }}
                >
                  <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}
