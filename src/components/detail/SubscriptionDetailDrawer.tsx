import { useEffect, useState } from "react"
import { Pause, Play, Trash2, Loader2 } from "lucide-react"
import clsx from "clsx"
import Drawer from "../common/Drawer"
import ConfirmDialog from "../common/ConfirmDialog"
import BrandLogo from "../common/BrandLogo"
import {
  CATEGORIES,
  type BillingCycle,
  type Category,
  type Subscription,
  type SubscriptionInput,
  type SubscriptionStatus,
} from "../../types"
import { cycleSuffix, normalizeToMonthly } from "../../lib/money"
import { useMoney } from "../../lib/currency"
import { toDateInputValue } from "../../lib/dates"

type Props = {
  subscription: Subscription | null
  onClose: () => void
  onUpdate: (id: string, patch: Partial<SubscriptionInput>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const cycles: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "weekly", label: "Weekly" },
  { value: "quarterly", label: "Quarterly" },
]

export default function SubscriptionDetailDrawer({
  subscription,
  onClose,
  onUpdate,
  onDelete,
}: Props) {
  const open = subscription !== null
  const [tierName, setTierName] = useState("")
  const [cost, setCost] = useState("")
  const [cycle, setCycle] = useState<BillingCycle>("monthly")
  const [renewal, setRenewal] = useState("")
  const [category, setCategory] = useState<Category>("Entertainment")
  const [status, setStatus] = useState<SubscriptionStatus>("active")
  const [trialEnd, setTrialEnd] = useState("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [dirty, setDirty] = useState(false)
  const { format } = useMoney()

  useEffect(() => {
    if (!subscription) return
    setTierName(subscription.tierName)
    setCost(String(subscription.cost))
    setCycle(subscription.billingCycle)
    setRenewal(toDateInputValue(subscription.renewalDate))
    setCategory(subscription.category)
    setStatus(subscription.status)
    setTrialEnd(toDateInputValue(subscription.trialEndsAt))
    setNotes(subscription.notes ?? "")
    setDirty(false)
  }, [subscription])

  if (!subscription) {
    return (
      <Drawer open={false} onClose={onClose}>
        <div />
      </Drawer>
    )
  }

  const monthlyEq = normalizeToMonthly(parseFloat(cost) || 0, cycle)

  function markDirty<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v)
      setDirty(true)
    }
  }

  async function handleSave() {
    if (!subscription) return
    setSaving(true)
    try {
      await onUpdate(subscription.id, {
        tierName,
        cost: parseFloat(cost) || 0,
        billingCycle: cycle,
        renewalDate: new Date(renewal),
        category,
        status,
        trialEndsAt: status === "trial" && trialEnd ? new Date(trialEnd) : null,
        notes,
      })
      setDirty(false)
    } catch {
      // Toast shown by parent.
    } finally {
      setSaving(false)
    }
  }

  async function togglePause() {
    if (!subscription) return
    const next: SubscriptionStatus =
      subscription.status === "paused" ? "active" : "paused"
    setSaving(true)
    try {
      await onUpdate(subscription.id, { status: next })
      setStatus(next)
    } catch {
      // Toast shown by parent.
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!subscription) return
    setConfirmDelete(false)
    setSaving(true)
    try {
      await onDelete(subscription.id)
      onClose()
    } catch {
      // Toast shown by parent.
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Drawer open={open} onClose={onClose} title="Subscription">
        <div className="p-5 space-y-5">
          <div className="flex items-start gap-3">
            <BrandLogo
              name={subscription.name}
              url={subscription.logoUrl}
              brandColor={subscription.brandColor}
              size={48}
              rounded="2xl"
            />
            <div className="min-w-0">
              <div className="text-base font-semibold truncate">
                {subscription.name}
              </div>
              <div className="text-xs text-text-muted">
                Status:{" "}
                <span
                  className={clsx(
                    "inline-block rounded-full px-2 py-0.5",
                    status === "active" && "bg-success/15 text-success",
                    status === "paused" && "bg-surface-2 text-text-secondary",
                    status === "trial" && "bg-warning/15 text-warning",
                  )}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface-2/40 p-4">
            <div className="text-3xl font-semibold tabular">
              {parseFloat(cost) === 0 ? "Free" : format(parseFloat(cost) || 0)}
              {parseFloat(cost) > 0 && (
                <span className="text-base font-normal text-text-muted">
                  {cycleSuffix(cycle)}
                </span>
              )}
            </div>
            {cycle !== "monthly" && parseFloat(cost) > 0 && (
              <div className="text-xs text-text-muted tabular">
                ~{format(monthlyEq)}/mo equivalent
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Field label="Tier name">
              <input
                value={tierName}
                onChange={(e) => markDirty(setTierName)(e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Cost">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={cost}
                  onChange={(e) => markDirty(setCost)(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Billing cycle">
                <select
                  value={cycle}
                  onChange={(e) =>
                    markDirty(setCycle)(e.target.value as BillingCycle)
                  }
                  className={inputCls}
                >
                  {cycles.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Renewal date">
              <input
                type="date"
                value={renewal}
                onChange={(e) => markDirty(setRenewal)(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Category">
              <select
                value={category}
                onChange={(e) =>
                  markDirty(setCategory)(e.target.value as Category)
                }
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Status">
              <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-surface-2 p-1 text-xs">
                {(["active", "trial", "paused"] as SubscriptionStatus[]).map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => markDirty(setStatus)(s)}
                      className={clsx(
                        "rounded-lg py-1.5 capitalize transition",
                        status === s
                          ? "bg-surface text-text-primary shadow"
                          : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            </Field>

            {status === "trial" && (
              <Field label="Trial ends on">
                <input
                  type="date"
                  value={trialEnd}
                  onChange={(e) => markDirty(setTrialEnd)(e.target.value)}
                  className={inputCls}
                />
              </Field>
            )}

            <Field label="Notes">
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => markDirty(setNotes)(e.target.value)}
                className={clsx(inputCls, "resize-none")}
              />
            </Field>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={togglePause}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border-subtle px-3 py-2 text-sm hover:bg-surface-2 transition disabled:opacity-50"
            >
              {subscription.status === "paused" ? (
                <>
                  <Play className="size-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="size-4" />
                  Pause
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl border border-danger/40 text-danger px-3 py-2 text-sm hover:bg-danger/10 transition disabled:opacity-50"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !dirty}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(124,92,255,0.35)] hover:opacity-90 transition disabled:opacity-50"
          >
            {saving && <Loader2 className="size-4 animate-spin" />}
            {dirty ? "Save changes" : "No changes"}
          </button>
        </div>
      </Drawer>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this subscription?"
        description={`${subscription.name} will be removed from your tracker. This can't be undone.`}
        confirmLabel="Delete"
        tone="danger"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  )
}

const inputCls =
  "w-full rounded-xl border border-border-subtle bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent/60 transition"

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="block text-xs text-text-secondary mb-1.5">{label}</span>
      {children}
    </label>
  )
}
