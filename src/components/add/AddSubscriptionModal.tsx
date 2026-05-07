import { useMemo, useState } from "react"
import { Search, Sparkles } from "lucide-react"
import clsx from "clsx"
import Modal from "../common/Modal"
import ServiceCard from "./ServiceCard"
import CustomServiceForm from "./CustomServiceForm"
import { SERVICES } from "../../data/services"
import { CATEGORIES, type Category, type SubscriptionInput } from "../../types"

type Props = {
  open: boolean
  onClose: () => void
  onAdd: (input: SubscriptionInput) => Promise<void> | void
  existingServiceIds?: string[]
}

type View = "browse" | "custom"

export default function AddSubscriptionModal({
  open,
  onClose,
  onAdd,
  existingServiceIds = [],
}: Props) {
  const [view, setView] = useState<View>("browse")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return SERVICES.filter((s) => {
      if (activeCategory !== "All" && s.category !== activeCategory) return false
      if (!q) return true
      return (
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    })
  }, [search, activeCategory])

  async function handleAdd(input: SubscriptionInput) {
    try {
      await onAdd(input)
    } catch {
      return
    }
    setExpandedId(null)
    setView("browse")
    setSearch("")
    setActiveCategory("All")
    onClose()
  }

  function handleClose() {
    setExpandedId(null)
    setView("browse")
    setSearch("")
    setActiveCategory("All")
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add subscription">
      {view === "custom" ? (
        <CustomServiceForm onBack={() => setView("browse")} onAdd={handleAdd} />
      ) : (
        <div className="flex flex-col h-full">
          <div className="px-4 sm:px-5 pt-4 pb-3 space-y-3 border-b border-border-subtle/60">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services or category..."
                className="w-full rounded-xl border border-border-subtle bg-surface-2 pl-9 pr-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              <CategoryChip
                label="All"
                active={activeCategory === "All"}
                onClick={() => setActiveCategory("All")}
              />
              {CATEGORIES.map((c) => (
                <CategoryChip
                  key={c}
                  label={c}
                  active={activeCategory === c}
                  onClick={() => setActiveCategory(c)}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-sm text-text-secondary">
                No services match your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((s) => (
                  <ServiceCard
                    key={s.id}
                    service={s}
                    expanded={expandedId === s.id}
                    isDuplicate={existingServiceIds.includes(s.id)}
                    onToggle={() =>
                      setExpandedId((cur) => (cur === s.id ? null : s.id))
                    }
                    onAdd={handleAdd}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setView("custom")}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border-subtle px-4 py-4 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2/40 transition"
            >
              <Sparkles className="size-4" />
              Can't find your service? Add custom →
            </button>
          </div>
        </div>
      )}
    </Modal>
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
          : "bg-surface-2 text-text-secondary border-border-subtle hover:text-text-primary",
      )}
    >
      {label}
    </button>
  )
}
