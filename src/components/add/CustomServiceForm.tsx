import { useState, type FormEvent } from "react"
import { ArrowLeft, Loader2, Plus } from "lucide-react"
import {
  CATEGORIES,
  type BillingCycle,
  type Category,
  type SubscriptionInput,
} from "../../types"

type Props = {
  onBack: () => void
  onAdd: (input: SubscriptionInput) => Promise<void> | void
}

const cycles: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "weekly", label: "Weekly" },
  { value: "quarterly", label: "Quarterly" },
]

function defaultRenewal(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 1)
  return d.toISOString().slice(0, 10)
}

export default function CustomServiceForm({ onBack, onAdd }: Props) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState<Category>("Entertainment")
  const [cost, setCost] = useState("")
  const [cycle, setCycle] = useState<BillingCycle>("monthly")
  const [renewal, setRenewal] = useState(defaultRenewal)
  const [logoUrl, setLogoUrl] = useState("")
  const [brandColor, setBrandColor] = useState("#7C5CFF")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onAdd({
        serviceId: null,
        name: name.trim(),
        logoUrl: logoUrl.trim(),
        brandColor,
        category,
        tierName: "Custom",
        cost: parseFloat(cost) || 0,
        billingCycle: cycle,
        renewalDate: new Date(renewal),
        status: "active",
        trialEndsAt: null,
        notes: "",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 max-w-xl mx-auto space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to services
      </button>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">
          Service name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Local gym membership"
          className="w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
        />
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">Cost</label>
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
          />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-1.5">
            Billing cycle
          </label>
          <select
            value={cycle}
            onChange={(e) => setCycle(e.target.value as BillingCycle)}
            className="w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
          >
            {cycles.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-text-secondary mb-1.5">
          Renewal date
        </label>
        <input
          required
          type="date"
          value={renewal}
          onChange={(e) => setRenewal(e.target.value)}
          className="w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
        />
      </div>

      <details className="rounded-xl border border-border-subtle bg-surface-2/40">
        <summary className="cursor-pointer select-none px-3 py-2.5 text-sm text-text-secondary">
          Optional: logo URL and brand color
        </summary>
        <div className="px-3 pb-3 space-y-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Logo URL
            </label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full rounded-xl border border-border-subtle bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              Brand color
            </label>
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="h-9 w-16 rounded-lg bg-transparent border border-border-subtle"
            />
          </div>
        </div>
      </details>

      <button
        type="submit"
        disabled={submitting || !name.trim()}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(124,92,255,0.35)] hover:opacity-90 transition disabled:opacity-50"
      >
        {submitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        Add subscription
      </button>
    </form>
  )
}
