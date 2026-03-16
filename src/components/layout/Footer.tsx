import { Link } from 'react-router-dom'
import { Heart, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-manga-ink text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="bg-manga-red text-white font-heading font-black text-2xl px-3 py-1 inline-block mb-3">
              NEXUS
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Guide multi-jeux gacha. Toutes les infos sur vos personnages preferes, builds, teams et strategies.
            </p>
          </div>

          {/* Genshin */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-3 text-manga-red">
              Genshin Impact
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li><Link to="/genshin/personnages" className="hover:text-white transition-colors">Personnages</Link></li>
              <li><Link to="/genshin/armes" className="hover:text-white transition-colors">Armes</Link></li>
              <li><Link to="/genshin/tier-list" className="hover:text-white transition-colors">Tier List</Link></li>
              <li><Link to="/genshin/equipes" className="hover:text-white transition-colors">Equipes</Link></li>
              <li><Link to="/genshin/codes" className="hover:text-white transition-colors">Codes</Link></li>
            </ul>
          </div>

          {/* HSR */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-3 text-manga-red">
              Honkai: Star Rail
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li><Link to="/hsr/personnages" className="hover:text-white transition-colors">Personnages</Link></li>
              <li><Link to="/hsr/cones-de-lumiere" className="hover:text-white transition-colors">Cones de lumiere</Link></li>
              <li><Link to="/hsr/tier-list" className="hover:text-white transition-colors">Tier List</Link></li>
              <li><Link to="/hsr/equipes" className="hover:text-white transition-colors">Equipes</Link></li>
              <li><Link to="/hsr/codes" className="hover:text-white transition-colors">Codes</Link></li>
            </ul>
          </div>

          {/* Legal + Support */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-3 text-manga-red">
              Informations
            </h3>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li><Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions legales</Link></li>
              <li><Link to="/credits" className="hover:text-white transition-colors">Credits</Link></li>
              <li>
                <a
                  href="https://ko-fi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Soutenir sur Ko-fi <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Nexus. Projet non-affilie a HoYoverse.
          </p>
          <p className="inline-flex items-center gap-1">
            Fait avec <Heart size={12} className="text-manga-red" /> par Hugo
          </p>
        </div>
      </div>
    </footer>
  )
}
