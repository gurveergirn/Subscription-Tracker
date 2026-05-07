import { useMemo } from "react"
import { CalendarClock } from "lucide-react"
import clsx from "clsx"
import BrandLogo from "../common/BrandLogo"
import { cycleSuffix } from "../../lib/money"
import { useMoney } from "../../lib/currency"
import { daysUntil, renewalLabel } from "../../lib/dates"
import type { Subscription } from "../../types"

type Props = {
  subscriptions: Subscription[]
  onSelect?: (s: Subscription) => void
}

export default function UpcomingRenewals({ subscriptions, onSelect }: Props) {
  const { format } = useMoney()
  const upcoming = useMemo(() => {
    return subscriptions
      .filter((s) => s.status === "active")
      .map((s) => ({ s, days: daysUntil(s.renewalDate) }))
      .filter(({ days }) => days >= 0 && days <= 30)
      .sort((a, b) => a.days - b.days)
  }, [subscriptions])

  if (upcoming.length === 0) return null

  return (
    <section className="space-y-3">
      <header className="flex items-center gap-2">
        <CalendarClock className="size-4 text-text-muted" />
        <h3 className="text-sm font-medium tracking-tight">
          Upcoming renewals
        </h3>
      </header>
      <div className="flex gap-3 overflow-x-auto -mx-1 px-1 pb-1">
        {upcoming.map(({ s, days }) => {
          const soon = days <= 7
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect?.(s)}
              className={clsx(
                "shrink-0 w-56 text-left rounded-2xl border bg-surface p-4 transition hover:bg-surface-2/60",
                soon ? "border-warning/40" : "border-border-subtle",
              )}
            >
              <div className="flex items-center gap-3">
                <BrandLogo
                  name={s.name}
                  url={s.logoUrl}
                  brandColor={s.brandColor}
                  size={36}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-xs text-text-muted truncate">
                    {s.tierName}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span
                  className={clsx(
                    "text-xs font-medium",
                    soon ? "text-warning" : "text-text-secondary",
                  )}
                >
                  {renewalLabel(s.renewalDate)}
                </span>
                <span className="tabular text-sm">
                  {s.cost === 0
                    ? "Free"
                    : `${format(s.cost)}${cycleSuffix(s.billingCycle)}`}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
