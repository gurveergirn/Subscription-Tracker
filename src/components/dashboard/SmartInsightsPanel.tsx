import { useMemo } from "react"
import {
  AlertTriangle,
  Layers,
  Lightbulb,
  PiggyBank,
  Sparkles,
} from "lucide-react"
import clsx from "clsx"
import { computeInsights, type Insight } from "../../lib/insights"
import type { Subscription } from "../../types"

type Props = {
  subscriptions: Subscription[]
}

export default function SmartInsightsPanel({ subscriptions }: Props) {
  const insights = useMemo(() => computeInsights(subscriptions), [subscriptions])

  return (
    <section className="rounded-2xl border border-border-subtle bg-surface p-5 h-full">
      <header className="flex items-center gap-2 mb-4">
        <Lightbulb className="size-4 text-text-muted" />
        <h3 className="text-sm font-medium tracking-tight">Smart insights</h3>
      </header>

      {insights.length === 0 ? (
        <div className="grid place-items-center py-10 text-center">
          <div className="text-sm text-text-secondary max-w-[14rem]">
            You're all set. Tips will show up here as your tracker grows.
          </div>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {insights.map((i) => (
            <InsightItem key={i.id} insight={i} />
          ))}
        </ul>
      )}
    </section>
  )
}

function InsightItem({ insight }: { insight: Insight }) {
  const Icon = iconFor(insight.kind)
  const toneClass = {
    warning: "bg-warning/10 text-warning border-warning/30",
    info: "bg-accent/10 text-accent border-accent/30",
    success: "bg-success/10 text-success border-success/30",
  }[insight.tone]

  return (
    <li className="rounded-xl border border-border-subtle bg-surface-2/40 p-3">
      <div className="flex items-start gap-3">
        <span
          className={clsx(
            "shrink-0 grid place-items-center size-8 rounded-lg border",
            toneClass,
          )}
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-medium text-text-primary">
            {insight.title}
          </div>
          <div className="text-xs text-text-secondary mt-0.5">
            {insight.detail}
          </div>
        </div>
      </div>
    </li>
  )
}

function iconFor(kind: Insight["kind"]) {
  switch (kind) {
    case "renewal":
      return AlertTriangle
    case "trial":
      return Sparkles
    case "redundancy":
      return Layers
    case "savings":
      return PiggyBank
    case "duplicate":
      return AlertTriangle
  }
}
