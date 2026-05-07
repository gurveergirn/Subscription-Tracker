import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { PieChart as PieIcon } from "lucide-react"
import { CATEGORY_COLOR } from "../../lib/categoryColors"
import { formatMoney } from "../../lib/money"
import type { Subscription } from "../../types"

type Props = {
  subscriptions: Subscription[]
}

type Slice = { name: string; value: number; color: string }

export default function CategoryDonutChart({ subscriptions }: Props) {
  const slices = useMemo<Slice[]>(() => {
    const map = new Map<string, number>()
    for (const s of subscriptions) {
      if (s.status !== "active") continue
      map.set(s.category, (map.get(s.category) ?? 0) + s.monthlyEquivalent)
    }
    return [...map.entries()]
      .map(([name, value]) => ({
        name,
        value,
        color: CATEGORY_COLOR[name as keyof typeof CATEGORY_COLOR] ?? "#7C5CFF",
      }))
      .sort((a, b) => b.value - a.value)
  }, [subscriptions])

  const total = slices.reduce((s, x) => s + x.value, 0)

  return (
    <section className="rounded-2xl border border-border-subtle bg-surface p-5">
      <header className="flex items-center gap-2 mb-4">
        <PieIcon className="size-4 text-text-muted" />
        <h3 className="text-sm font-medium tracking-tight">
          Spending by category
        </h3>
      </header>

      {slices.length === 0 ? (
        <div className="grid place-items-center py-10 text-sm text-text-secondary">
          Add an active subscription to see the breakdown.
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-full sm:w-56 h-56 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="62%"
                  outerRadius="92%"
                  paddingAngle={2}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {slices.map((s) => (
                    <Cell key={s.name} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#121214",
                    border: "1px solid #26262b",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "#f5f5f7" }}
                  labelStyle={{ color: "#9c9ca3" }}
                  formatter={(value) => formatMoney(Number(value)) + "/mo"}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="text-center">
                <div className="text-[10px] text-text-muted uppercase tracking-wide">
                  Per month
                </div>
                <div className="text-2xl font-semibold tabular">
                  {formatMoney(total)}
                </div>
              </div>
            </div>
          </div>

          <ul className="flex-1 w-full space-y-1.5">
            {slices.map((s) => {
              const pct = total > 0 ? (s.value / total) * 100 : 0
              return (
                <li
                  key={s.name}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{ background: s.color }}
                    />
                    <span className="truncate text-text-secondary">
                      {s.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="tabular text-text-primary">
                      {formatMoney(s.value)}
                    </span>
                    <span className="tabular text-text-muted text-xs w-10 text-right">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
