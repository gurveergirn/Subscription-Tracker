import { Plus } from "lucide-react"
import TopBar from "../components/layout/TopBar"

export default function DashboardPage() {
  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Track every subscription in one place."
        rightSlot={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(124,92,255,0.35)] hover:opacity-90 transition"
          >
            <Plus className="size-4" />
            Add subscription
          </button>
        }
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: "Monthly", value: "$0.00" },
          { label: "Yearly", value: "$0.00" },
          { label: "Active", value: "0" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border-subtle bg-surface p-5"
          >
            <div className="text-xs text-text-muted uppercase tracking-wide">
              {s.label}
            </div>
            <div className="mt-1 text-3xl font-semibold tabular">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-border-subtle bg-surface p-10 text-center">
        <h2 className="text-lg font-medium">No subscriptions yet</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Add your first subscription to see totals, charts, and insights.
        </p>
      </section>
    </>
  )
}
