import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { auth, db, googleProvider } from "./firebase"

type AuthStatus = "loading" | "authed" | "unauthed"

type AuthContextValue = {
  user: User | null
  status: AuthStatus
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function ensureUserDoc(user: User) {
  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      displayName: user.displayName,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthStatus>("loading")

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setStatus(u ? "authed" : "unauthed")
    })
  }, [])

  const value: AuthContextValue = {
    user,
    status,
    async signInWithGoogle() {
      const cred = await signInWithPopup(auth, googleProvider)
      await ensureUserDoc(cred.user)
    },
    async signInWithEmail(email, password) {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      await ensureUserDoc(cred.user)
    },
    async signUpWithEmail(email, password) {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await ensureUserDoc(cred.user)
    },
    async signOut() {
      await fbSignOut(auth)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}

export function friendlyAuthError(err: unknown): string {
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code: unknown }).code)
      : ""
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password."
    case "auth/email-already-in-use":
      return "An account with that email already exists."
    case "auth/weak-password":
      return "Password should be at least 6 characters."
    case "auth/invalid-email":
      return "That email address looks invalid."
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return ""
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again."
    default:
      return "Something went wrong. Please try again."
  }
}
