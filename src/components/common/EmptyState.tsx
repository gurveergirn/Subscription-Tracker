import { Plus, Sparkles } from "lucide-react"

type Props = {
  onAdd: () => void
}

export default function EmptyState({ onAdd }: Props) {
  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-10 sm:p-14 text-center overflow-hidden relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-30"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(124,92,255,0.45) 0%, transparent 60%)",
        }}
      />

      <div className="relative inline-grid place-items-center size-20 rounded-3xl bg-accent/15 border border-accent/30 text-accent">
        <Sparkles className="size-9" />
      </div>

      <h2 className="mt-8 text-2xl font-semibold tracking-tight">
        Add your first subscription
      </h2>
      <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto">
        Pick from popular services like Netflix, Spotify, or iCloud — or add a
        custom one. Totals, charts, and smart insights show up here as you go.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(124,92,255,0.35)] hover:opacity-90 transition"
      >
        <Plus className="size-4" />
        Add subscription
      </button>
    </section>
  )
}
