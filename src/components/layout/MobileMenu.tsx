import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavLink } from '@/types'
import { cn } from '@/utils/cn'

interface Props {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export default function MobileMenu({ open, onClose, links }: Props) {
  const location = useLocation()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-white border-l-3 border-manga-ink z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b-3 border-manga-ink">
              <span className="font-heading font-bold text-lg uppercase">Menu</span>
              <button onClick={onClose} className="p-1 hover:bg-manga-paper rounded">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={cn(
                      'block px-4 py-3 font-heading font-semibold text-sm uppercase tracking-wider border-2 border-manga-ink transition-all',
                      isActive
                        ? 'bg-manga-red text-white shadow-manga-sm'
                        : 'bg-white hover:bg-manga-ink hover:text-white shadow-manga-sm hover:shadow-manga'
                    )}
                    style={{ transform: 'skewX(-4deg)' }}
                  >
                    <span style={{ transform: 'skewX(4deg)', display: 'inline-block' }}>
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </div>
            <div className="p-4 border-t-3 border-manga-ink">
              <Link
                to="/joueur"
                onClick={onClose}
                className="block text-center manga-btn manga-btn-primary w-full"
              >
                <span>Rechercher un joueur</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
