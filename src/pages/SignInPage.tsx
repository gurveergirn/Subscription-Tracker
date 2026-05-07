import { useEffect, useState, type FormEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Wallet, Loader2 } from "lucide-react"
import { friendlyAuthError, useAuth } from "../lib/auth"

type Mode = "signin" | "signup"

export default function SignInPage() {
  const { status, signInWithGoogle, signInWithEmail, signUpWithEmail } =
    useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "authed") navigate("/", { replace: true })
  }, [status, navigate])

  if (status === "authed") return <Navigate to="/" replace />

  async function handleGoogle() {
    setError("")
    setSubmitting(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      const msg = friendlyAuthError(err)
      if (msg) setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      if (mode === "signin") await signInWithEmail(email, password)
      else await signUpWithEmail(email, password)
    } catch (err) {
      const msg = friendlyAuthError(err)
      if (msg) setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen grid place-items-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="inline-grid place-items-center size-12 rounded-2xl bg-accent/15 text-accent mb-4">
            <Wallet className="size-6" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Track every subscription in one place.
          </p>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-6 space-y-4">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl border border-border-subtle bg-surface-2 px-4 py-2.5 text-sm font-medium hover:bg-surface-2/70 transition disabled:opacity-50"
          >
            <GoogleGlyph />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 text-xs text-text-muted">
            <div className="h-px flex-1 bg-border-subtle" />
            or
            <div className="h-px flex-1 bg-border-subtle" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <label className="block text-xs text-text-secondary mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-danger" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(124,92,255,0.35)] hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-secondary mt-6">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup")
                  setError("")
                }}
                className="text-accent hover:underline"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin")
                  setError("")
                }}
                className="text-accent hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  )
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 3.2 14.7 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12s4.3 9.7 9.7 9.7c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.2-.2-1.7H12z"
      />
    </svg>
  )
}
