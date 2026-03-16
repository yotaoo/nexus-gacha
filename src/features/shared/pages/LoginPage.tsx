import { useNavigate } from 'react-router-dom'
import { LogIn, LogOut, User, AlertTriangle } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { user, loading, signIn, signOut, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <PageLayout title="Connexion">
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-3 border-manga-ink border-t-transparent rounded-full animate-spin" />
        </div>
      </PageLayout>
    )
  }

  if (!isFirebaseConfigured) {
    return (
      <PageLayout title="Connexion">
        <div className="manga-card p-6 max-w-md mx-auto text-center">
          <AlertTriangle size={40} className="mx-auto mb-3 text-manga-red" />
          <h2 className="font-heading font-bold text-lg mb-2">Firebase non configure</h2>
          <p className="text-sm text-manga-gray">
            L'authentification n'est pas disponible pour le moment.
          </p>
        </div>
      </PageLayout>
    )
  }

  if (user) {
    return (
      <PageLayout title="Mon profil">
        <div className="max-w-md mx-auto space-y-4">
          <div className="manga-card p-6 text-center">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Avatar'}
                className="w-20 h-20 rounded-full border-3 border-manga-ink mx-auto mb-3"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-3 border-manga-ink mx-auto mb-3 bg-manga-paper flex items-center justify-center">
                <User size={32} className="text-manga-gray" />
              </div>
            )}
            <h2 className="font-heading font-bold text-xl">{user.displayName || 'Joueur'}</h2>
            <p className="text-sm text-manga-gray">{user.email}</p>
          </div>

          <button
            onClick={async () => {
              await signOut()
              navigate('/')
            }}
            className="manga-card w-full p-3 flex items-center justify-center gap-2 font-heading font-bold text-sm uppercase hover:shadow-manga transition-all text-manga-red"
          >
            <LogOut size={16} />
            Se deconnecter
          </button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Connexion">
      <div className="max-w-md mx-auto">
        <div className="manga-card p-6 text-center">
          <User size={48} className="mx-auto mb-4 text-manga-gray" />
          <h2 className="font-heading font-bold text-xl mb-2">Bienvenue sur Nexus</h2>
          <p className="text-sm text-manga-gray mb-6">
            Connecte-toi pour sauvegarder tes builds et tes equipes preferees.
          </p>
          <button
            onClick={signIn}
            className="w-full bg-manga-ink text-white font-heading font-bold text-sm uppercase py-3 px-4 border-2 border-manga-ink shadow-manga hover:shadow-manga-lg transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Se connecter avec Google
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
