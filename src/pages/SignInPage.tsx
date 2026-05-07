import { Wallet } from "lucide-react"

export default function SignInPage() {
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border-subtle bg-surface p-8 text-center">
        <span className="inline-grid place-items-center size-10 rounded-xl bg-accent/15 text-accent mb-4">
          <Wallet className="size-5" />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">
          Subscription Tracker
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Sign-in will be added in step 3.
        </p>
      </div>
    </main>
  )
}
