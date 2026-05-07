import { useState } from "react"
import { AlertTriangle, ChevronRight, Loader2, Plus } from "lucide-react"
import clsx from "clsx"
import BrandLogo from "../common/BrandLogo"
import { clearbitLogoUrl } from "../../data/services"
import { cycleSuffix } from "../../lib/money"
import { useMoney } from "../../lib/currency"
import type { Service, ServiceTier, SubscriptionInput } from "../../types"

type Props = {
  service: Service
  expanded: boolean
  isDuplicate: boolean
  onToggle: () => void
  onAdd: (input: SubscriptionInput) => Promise<void> | void
}

function defaultRenewalDate(cycle: ServiceTier["cycle"]): string {
  const d = new Date()
  if (cycle === "yearly") d.setFullYear(d.getFullYear() + 1)
  else if (cycle === "weekly") d.setDate(d.getDate() + 7)
  else if (cycle === "quarterly") d.setMonth(d.getMonth() + 3)
  else d.setMonth(d.getMonth() + 1)
  return d.toISOString().slice(0, 10)
}

function defaultTrialEndDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().slice(0, 10)
}

export default function ServiceCard({
  service,
  expanded,
  isDuplicate,
  onToggle,
  onAdd,
}: Props) {
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null)
  const [renewal, setRenewal] = useState(() => defaultRenewalDate("monthly"))
  const [isTrial, setIsTrial] = useState(false)
  const [trialEnd, setTrialEnd] = useState(defaultTrialEndDate)
  const [submitting, setSubmitting] = useState(false)
  const { format } = useMoney()

  function pickTier(tier: ServiceTier) {
    setSelectedTier(tier)
    setRenewal(defaultRenewalDate(tier.cycle))
  }

  async function handleAdd() {
    if (!selectedTier) return
    setSubmitting(true)
    try {
      await onAdd({
        serviceId: service.id,
        name: service.name,
        logoUrl: clearbitLogoUrl(service.domain),
        brandColor: service.brandColor,
        category: service.category,
        tierName: selectedTier.name,
        cost: selectedTier.price,
        billingCycle: selectedTier.cycle,
        renewalDate: new Date(renewal),
        status: isTrial ? "trial" : "active",
        trialEndsAt: isTrial ? new Date(trialEnd) : null,
        notes: "",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={clsx(
        "relative rounded-2xl border bg-surface overflow-hidden transition-all",
        expanded
          ? "border-transparent ring-1 ring-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          : "border-border-subtle hover:bg-surface-2/60",
      )}
      style={
        expanded
          ? { boxShadow: `0 8px 40px ${service.brandColor}33` }
          : undefined
      }
    >
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-x-0 top-0 h-px",
          expanded ? "opacity-100" : "opacity-0",
        )}
        style={{ background: service.brandColor }}
      />

      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <BrandLogo
          name={service.name}
          url={clearbitLogoUrl(service.domain)}
          brandColor={service.brandColor}
          size={40}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{service.name}</span>
            {isDuplicate && (
              <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 text-warning text-[10px] px-1.5 py-0.5">
                <AlertTriangle className="size-3" />
                Already added
              </span>
            )}
          </div>
          <div className="text-xs text-text-muted truncate">
            {service.category}
          </div>
        </div>
        <ChevronRight
          className={clsx(
            "size-4 text-text-muted transition-transform",
            expanded && "rotate-90",
          )}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-border-subtle/60 pt-3">
          <div className="text-xs uppercase tracking-wide text-text-muted">
            Pick a tier
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.tiers.map((tier) => {
              const isSelected = selectedTier?.name === tier.name
              return (
                <li key={tier.name}>
                  <button
                    type="button"
                    onClick={() => pickTier(tier)}
                    className={clsx(
                      "w-full text-left rounded-xl border px-3 py-2.5 transition",
                      isSelected
                        ? "border-transparent ring-1"
                        : "border-border-subtle hover:bg-surface-2/60",
                    )}
                    style={
                      isSelected
                        ? {
                            background: `${service.brandColor}1a`,
                            boxShadow: `inset 0 0 0 1px ${service.brandColor}`,
                          }
                        : undefined
                    }
                  >
                    <div className="text-sm font-medium">{tier.name}</div>
                    <div className="text-xs text-text-secondary tabular">
                      {tier.price === 0
                        ? "Free"
                        : `${format(tier.price)}${cycleSuffix(tier.cycle)}`}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>

          {selectedTier && (
            <div className="space-y-3 pt-2 border-t border-border-subtle/60">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-text-secondary">
                    Renewal date
                  </span>
                  <input
                    type="date"
                    value={renewal}
                    onChange={(e) => setRenewal(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent/60 transition"
                  />
                </label>
                <label className="flex items-center gap-2 sm:mt-5">
                  <input
                    type="checkbox"
                    checked={isTrial}
                    onChange={(e) => setIsTrial(e.target.checked)}
                    className="size-4 rounded border-border-subtle bg-surface-2 accent-accent"
                  />
                  <span className="text-sm">This is a free trial</span>
                </label>
              </div>

              {isTrial && (
                <label className="block">
                  <span className="text-xs text-text-secondary">
                    Trial ends on
                  </span>
                  <input
                    type="date"
                    value={trialEnd}
                    onChange={(e) => setTrialEnd(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent/60 transition"
                  />
                </label>
              )}

              <button
                type="button"
                onClick={handleAdd}
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(124,92,255,0.35)] hover:opacity-90 transition disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
                Add subscription
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
