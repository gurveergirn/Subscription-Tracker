import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import clsx from "clsx"
import SubscriptionCard from "./SubscriptionCard"
import { CATEGORIES, type Category, type Subscription } from "../../types"
import { daysUntil } from "../../lib/dates"

type Props = {
  subscriptions: Subscription[]
  onSelect: (s: Subscription) => void
}

type SortKey = "newest" | "price-high" | "price-low" | "name" | "renewal"

export default function ActiveSubscriptions({ subscriptions, onSelect }: Props) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All")
  const [sortKey, setSortKey] = useState<SortKey>("newest")

  const usedCategories = useMemo(() => {
    const set = new Set(subscriptions.map((s) => s.category))
    return CATEGORIES.filter((c) => set.has(c))
  }, [subscriptions])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = subscriptions.filter((s) => {
      if (activeCategory !== "All" && s.category !== activeCategory) return false
      if (!q) return true
      return (
        s.name.toLowerCase().includes(q) ||
        s.tierName.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    })
    switch (sortKey) {
      case "price-high":
        list = [...list].sort((a, b) => b.monthlyEquivalent - a.monthlyEquivalent)
        break
      case "price-low":
        list = [...list].sort((a, b) => a.monthlyEquivalent - b.monthlyEquivalent)
        break
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      case "renewal":
        list = [...list].sort(
          (a, b) => daysUntil(a.renewalDate) - daysUntil(b.renewalDate),
        )
        break
      default:
        break
    }
    return list
  }, [subscriptions, search, activeCategory, sortKey])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          Your subscriptions
        </h2>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="rounded-xl border border-border-subtle bg-surface px-3 py-2 text-xs outline-none focus:border-accent/60"
        >
          <option value="newest">Newest</option>
          <option value="price-high">Price (high → low)</option>
          <option value="price-low">Price (low → high)</option>
          <option value="name">Name</option>
          <option value="renewal">Renewal date</option>
        </select>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your subscriptions..."
          className="w-full rounded-xl border border-border-subtle bg-surface pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
        />
      </div>

      {usedCategories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1">
          <CategoryChip
            label="All"
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {usedCategories.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={activeCategory === c}
              onClick={() => setActiveCategory(c)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-surface p-8 text-center text-sm text-text-secondary">
          No subscriptions match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <SubscriptionCard
              key={s.id}
              subscription={s}
              onClick={() => onSelect(s)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "shrink-0 rounded-full px-3 py-1.5 text-xs whitespace-nowrap border transition",
        active
          ? "bg-accent/15 text-accent border-accent/40"
          : "bg-surface text-text-secondary border-border-subtle hover:text-text-primary",
      )}
    >
      {label}
    </button>
  )
}
