import { Pause, Sparkles, AlertTriangle } from "lucide-react"
import clsx from "clsx"
import BrandLogo from "../common/BrandLogo"
import { cycleSuffix, normalizeToMonthly } from "../../lib/money"
import { useMoney } from "../../lib/currency"
import { daysUntil, renewalLabel } from "../../lib/dates"
import type { Subscription } from "../../types"

type Props = {
  subscription: Subscription
  onClick?: () => void
}

export default function SubscriptionCard({ subscription: s, onClick }: Props) {
  const { format } = useMoney()
  const days = daysUntil(s.renewalDate)
  const upcomingSoon = s.status === "active" && days >= 0 && days <= 7
  const isYearly = s.billingCycle === "yearly"
  const monthlyEq =
    typeof s.monthlyEquivalent === "number"
      ? s.monthlyEquivalent
      : normalizeToMonthly(s.cost, s.billingCycle)

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative w-full text-left rounded-2xl border bg-surface p-4 overflow-hidden transition-all hover:bg-surface-2/60 hover:-translate-y-0.5",
        s.status === "paused" && "opacity-60",
      )}
      style={{ borderColor: `${s.brandColor}40` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-20"
        style={{
          background: `linear-gradient(180deg, ${s.brandColor}55 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-1"
        style={{ background: s.brandColor }}
      />

      <div className="relative flex items-start gap-3">
        <BrandLogo
          name={s.name}
          url={s.logoUrl}
          brandColor={s.brandColor}
          size={44}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{s.name}</span>
            {s.status === "paused" && (
              <Badge tone="muted" icon={<Pause className="size-3" />}>
                Paused
              </Badge>
            )}
            {s.status === "trial" && (
              <Badge tone="warning" icon={<Sparkles className="size-3" />}>
                Trial
              </Badge>
            )}
          </div>
          <div className="text-xs text-text-muted truncate">{s.tierName}</div>
        </div>
      </div>

      <div className="relative mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-xl font-semibold tabular">
            {s.cost === 0 ? "Free" : `${format(s.cost)}`}
            {s.cost > 0 && (
              <span className="text-sm font-normal text-text-muted">
                {cycleSuffix(s.billingCycle)}
              </span>
            )}
          </div>
          {isYearly && s.cost > 0 && (
            <div className="text-xs text-text-muted tabular">
              ~{format(monthlyEq)}/mo
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-[10px] text-text-muted uppercase tracking-wide">
            Renews
          </div>
          <div
            className={clsx(
              "text-xs",
              upcomingSoon
                ? "text-warning inline-flex items-center gap-1"
                : "text-text-secondary",
            )}
          >
            {upcomingSoon && <AlertTriangle className="size-3" />}
            {renewalLabel(s.renewalDate)}
          </div>
        </div>
      </div>
    </button>
  )
}

function Badge({
  children,
  tone,
  icon,
}: {
  children: React.ReactNode
  tone: "muted" | "warning"
  icon?: React.ReactNode
}) {
  const cls =
    tone === "warning"
      ? "bg-warning/15 text-warning"
      : "bg-surface-2 text-text-secondary"
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px]",
        cls,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
