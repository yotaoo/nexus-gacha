import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, LogOut, User, AlertTriangle, Mail } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

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

  function getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email': return 'Adresse email invalide.'
      case 'auth/user-disabled': return 'Ce compte a ete desactive.'
      case 'auth/user-not-found': return 'Aucun compte avec cet email.'
      case 'auth/wrong-password': return 'Mot de passe incorrect.'
      case 'auth/invalid-credential': return 'Email ou mot de passe incorrect.'
      case 'auth/email-already-in-use': return 'Un compte existe deja avec cet email.'
      case 'auth/weak-password': return 'Le mot de passe doit faire au moins 6 caracteres.'
      case 'auth/too-many-requests': return 'Trop de tentatives. Reessaye plus tard.'
      default: return 'Une erreur est survenue. Reessaye.'
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'register') {
        await signUpWithEmail(email, password, displayName)
      } else {
        await signInWithEmail(email, password)
      }
    } catch (err: any) {
      setError(getErrorMessage(err?.code || ''))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err: any) {
      setError(getErrorMessage(err?.code || ''))
    }
  }

  return (
    <PageLayout title={mode === 'login' ? 'Connexion' : 'Inscription'}>
      <div className="max-w-md mx-auto space-y-4">
        <div className="manga-card p-6">
          <h2 className="font-heading font-bold text-xl mb-1 text-center">
            {mode === 'login' ? 'Content de te revoir !' : 'Creer un compte'}
          </h2>
          <p className="text-sm text-manga-gray mb-5 text-center">
            {mode === 'login'
              ? 'Connecte-toi pour retrouver tes donnees.'
              : 'Inscris-toi pour sauvegarder tes builds et equipes.'}
          </p>

          {error && (
            <div className="bg-red-50 border-2 border-manga-red p-3 mb-4 text-sm text-manga-red font-heading">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-heading font-bold uppercase mb-1">Pseudo</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border-2 border-manga-ink font-heading text-sm focus:outline-none focus:shadow-manga transition-all"
                  placeholder="Ton pseudo..."
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-heading font-bold uppercase mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-manga-ink font-heading text-sm focus:outline-none focus:shadow-manga transition-all"
                placeholder="ton@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-bold uppercase mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border-2 border-manga-ink font-heading text-sm focus:outline-none focus:shadow-manga transition-all"
                placeholder="6 caracteres minimum"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-manga-red text-white font-heading font-bold text-sm uppercase py-3 px-4 border-2 border-manga-ink shadow-manga hover:shadow-manga-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Mail size={18} />
              {submitting
                ? 'Chargement...'
                : mode === 'login'
                  ? 'Se connecter'
                  : "S'inscrire"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-0.5 bg-manga-gray-light" />
            <span className="text-xs font-heading text-manga-gray uppercase">ou</span>
            <div className="flex-1 h-0.5 bg-manga-gray-light" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-manga-ink text-white font-heading font-bold text-sm uppercase py-3 px-4 border-2 border-manga-ink shadow-manga hover:shadow-manga-lg transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Continuer avec Google
          </button>
        </div>

        <p className="text-center text-sm text-manga-gray">
          {mode === 'login' ? (
            <>
              Pas encore de compte ?{' '}
              <button onClick={() => { setMode('register'); setError(null) }} className="font-heading font-bold text-manga-ink underline">
                S'inscrire
              </button>
            </>
          ) : (
            <>
              Deja un compte ?{' '}
              <button onClick={() => { setMode('login'); setError(null) }} className="font-heading font-bold text-manga-ink underline">
                Se connecter
              </button>
            </>
          )}
        </p>
      </div>
    </PageLayout>
  )
}
