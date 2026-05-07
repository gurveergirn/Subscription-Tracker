import { useEffect } from "react"
import { createPortal } from "react-dom"
import clsx from "clsx"

type Props = {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: "danger" | "default"
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onCancel])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] grid place-items-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-border-subtle bg-surface p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-3.5 py-2 text-sm border border-border-subtle hover:bg-surface-2 transition"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={clsx(
              "rounded-xl px-3.5 py-2 text-sm font-medium text-white transition",
              tone === "danger"
                ? "bg-danger hover:opacity-90"
                : "bg-accent hover:opacity-90",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
