import { useState } from "react"
import { LogOut, Trash2, Check, Loader2 } from "lucide-react"
import clsx from "clsx"
import TopBar from "../components/layout/TopBar"
import ConfirmDialog from "../components/common/ConfirmDialog"
import { useAuth } from "../lib/auth"
import { useCurrency } from "../lib/currency"
import { auth, db } from "../lib/firebase"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from "firebase/firestore"
import { deleteUser } from "firebase/auth"
import type { Currency } from "../types"

const currencies: { value: Currency; label: string; description: string }[] = [
  { value: "USD", label: "USD", description: "US Dollar" },
  { value: "CAD", label: "CAD", description: "Canadian Dollar" },
  { value: "EUR", label: "EUR", description: "Euro" },
  { value: "GBP", label: "GBP", description: "British Pound" },
]

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const { currency, setCurrency } = useCurrency()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")

  async function handleDeleteAccount() {
    setConfirmDelete(false)
    setError("")
    setDeleting(true)
    try {
      if (!user || !auth.currentUser) throw new Error("Not signed in")
      const uid = user.uid
      // Delete subscriptions
      const subsSnap = await getDocs(collection(db, "users", uid, "subscriptions"))
      const subsBatch = writeBatch(db)
      subsSnap.docs.forEach((d) => subsBatch.delete(d.ref))
      await subsBatch.commit()
      // Delete snapshots
      const snapsSnap = await getDocs(collection(db, "users", uid, "snapshots"))
      const snapsBatch = writeBatch(db)
      snapsSnap.docs.forEach((d) => snapsBatch.delete(d.ref))
      await snapsBatch.commit()
      // Delete user doc
      await deleteDoc(doc(db, "users", uid))
      // Delete auth user
      await deleteUser(auth.currentUser)
    } catch (err) {
      const msg =
        err && typeof err === "object" && "code" in err
          ? String((err as { code: unknown }).code)
          : ""
      if (msg === "auth/requires-recent-login") {
        setError(
          "For security, sign out and sign in again, then try deleting your account.",
        )
      } else {
        setError("Couldn't delete account. Please try again.")
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <TopBar
        title="Settings"
        subtitle="Currency, account, and danger zone."
      />

      <div className="space-y-6 max-w-2xl">
        <section className="rounded-2xl border border-border-subtle bg-surface p-5">
          <h2 className="text-sm font-medium tracking-tight">Currency</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Display only — prices are stored in USD and converted at a fixed
            rate.
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {currencies.map((c) => {
              const active = currency === c.value
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCurrency(c.value)}
                  className={clsx(
                    "rounded-xl border px-3 py-3 text-left transition",
                    active
                      ? "border-accent bg-accent/10"
                      : "border-border-subtle bg-surface-2 hover:bg-surface-2/70",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{c.label}</span>
                    {active && <Check className="size-4 text-accent" />}
                  </div>
                  <div className="text-xs text-text-muted">{c.description}</div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-surface p-5">
          <h2 className="text-sm font-medium tracking-tight">Account</h2>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm truncate">
                {user?.displayName ?? user?.email ?? "Signed in"}
              </div>
              {user?.email && user?.displayName && (
                <div className="text-xs text-text-muted truncate">
                  {user.email}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border-subtle px-3 py-2 text-sm hover:bg-surface-2 transition"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-danger/30 bg-danger/5 p-5">
          <h2 className="text-sm font-medium tracking-tight text-danger">
            Danger zone
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Permanently delete your account and every subscription, snapshot,
            and setting attached to it.
          </p>
          {error && (
            <p className="mt-3 text-xs text-danger" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            disabled={deleting}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-danger/40 text-danger px-3 py-2 text-sm hover:bg-danger/10 transition disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            Delete account
          </button>
        </section>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete your account?"
        description="All of your subscriptions, snapshots, and settings will be permanently deleted. This can't be undone."
        confirmLabel="Delete account"
        tone="danger"
        onConfirm={handleDeleteAccount}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  )
}
