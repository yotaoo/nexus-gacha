import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>
  signOut: () => Promise<void>
  isFirebaseConfigured: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    let unsubscribe: (() => void) | undefined

    async function initAuth() {
      try {
        const { getAuth, onAuthStateChanged } = await import('firebase/auth')
        const { initializeApp } = await import('firebase/app')

        const app = initializeApp({
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
        })

        const auth = getAuth(app)
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser({
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
            })
          } else {
            setUser(null)
          }
          setLoading(false)
        })
      } catch {
        setLoading(false)
      }
    }

    initAuth()
    return () => unsubscribe?.()
  }, [])

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) return
    const { getAuth, signInWithPopup, GoogleAuthProvider } = await import('firebase/auth')
    const auth = getAuth()
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!isFirebaseConfigured) return
    const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    if (!isFirebaseConfigured) return
    const { getAuth, createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
    const auth = getAuth()
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName })
    setUser({
      uid: cred.user.uid,
      displayName,
      email: cred.user.email,
      photoURL: null,
    })
  }

  const signOut = async () => {
    if (!isFirebaseConfigured) return
    const { getAuth } = await import('firebase/auth')
    await getAuth().signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
