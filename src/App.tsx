import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from '@/contexts/GameContext'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

// Lazy load all pages
const HomePage = lazy(() => import('@/features/shared/pages/HomePage'))
const NewsPage = lazy(() => import('@/features/shared/pages/NewsPage'))
const CodesPage = lazy(() => import('@/features/shared/pages/CodesPage'))
const PlayerLookupPage = lazy(() => import('@/features/shared/pages/PlayerLookupPage'))

// Genshin
const GenshinCharactersPage = lazy(() => import('@/features/genshin/pages/GenshinCharactersPage'))
const GenshinCharacterDetailPage = lazy(() => import('@/features/genshin/pages/GenshinCharacterDetailPage'))
const GenshinWeaponsPage = lazy(() => import('@/features/genshin/pages/GenshinWeaponsPage'))
const GenshinWeaponDetailPage = lazy(() => import('@/features/genshin/pages/GenshinWeaponDetailPage'))
const GenshinArtifactsPage = lazy(() => import('@/features/genshin/pages/GenshinArtifactsPage'))
const GenshinArtifactDetailPage = lazy(() => import('@/features/genshin/pages/GenshinArtifactDetailPage'))
const GenshinTierListPage = lazy(() => import('@/features/genshin/pages/GenshinTierListPage'))
const GenshinTeamsPage = lazy(() => import('@/features/genshin/pages/GenshinTeamsPage'))
const GenshinMaterialsPage = lazy(() => import('@/features/genshin/pages/GenshinMaterialsPage'))

// HSR
const HsrCharactersPage = lazy(() => import('@/features/hsr/pages/HsrCharactersPage'))
const HsrCharacterDetailPage = lazy(() => import('@/features/hsr/pages/HsrCharacterDetailPage'))
const HsrLightConesPage = lazy(() => import('@/features/hsr/pages/HsrLightConesPage'))
const HsrLightConeDetailPage = lazy(() => import('@/features/hsr/pages/HsrLightConeDetailPage'))
const HsrRelicsPage = lazy(() => import('@/features/hsr/pages/HsrRelicsPage'))
const HsrRelicDetailPage = lazy(() => import('@/features/hsr/pages/HsrRelicDetailPage'))
const HsrTierListPage = lazy(() => import('@/features/hsr/pages/HsrTierListPage'))
const HsrTeamsPage = lazy(() => import('@/features/hsr/pages/HsrTeamsPage'))
const HsrMaterialsPage = lazy(() => import('@/features/hsr/pages/HsrMaterialsPage'))

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/actualites" element={<NewsPage />} />
        <Route path="/joueur" element={<PlayerLookupPage />} />

        {/* Genshin */}
        <Route path="/genshin" element={<Navigate to="/genshin/personnages" replace />} />
        <Route path="/genshin/personnages" element={<GenshinCharactersPage />} />
        <Route path="/genshin/personnages/:id" element={<GenshinCharacterDetailPage />} />
        <Route path="/genshin/armes" element={<GenshinWeaponsPage />} />
        <Route path="/genshin/armes/:id" element={<GenshinWeaponDetailPage />} />
        <Route path="/genshin/artefacts" element={<GenshinArtifactsPage />} />
        <Route path="/genshin/artefacts/:id" element={<GenshinArtifactDetailPage />} />
        <Route path="/genshin/tier-list" element={<GenshinTierListPage />} />
        <Route path="/genshin/equipes" element={<GenshinTeamsPage />} />
        <Route path="/genshin/materiaux" element={<GenshinMaterialsPage />} />
        <Route path="/genshin/codes" element={<CodesPage />} />

        {/* HSR */}
        <Route path="/hsr" element={<Navigate to="/hsr/personnages" replace />} />
        <Route path="/hsr/personnages" element={<HsrCharactersPage />} />
        <Route path="/hsr/personnages/:id" element={<HsrCharacterDetailPage />} />
        <Route path="/hsr/cones-de-lumiere" element={<HsrLightConesPage />} />
        <Route path="/hsr/cones-de-lumiere/:id" element={<HsrLightConeDetailPage />} />
        <Route path="/hsr/reliques" element={<HsrRelicsPage />} />
        <Route path="/hsr/reliques/:id" element={<HsrRelicDetailPage />} />
        <Route path="/hsr/tier-list" element={<HsrTierListPage />} />
        <Route path="/hsr/equipes" element={<HsrTeamsPage />} />
        <Route path="/hsr/materiaux" element={<HsrMaterialsPage />} />
        <Route path="/hsr/codes" element={<CodesPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <GameProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </GameProvider>
  )
}
