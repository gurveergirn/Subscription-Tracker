import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import clsx from "clsx"

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  rightSlot?: ReactNode
  className?: string
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  rightSlot,
  className,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={clsx(
          "relative w-full sm:max-w-3xl sm:max-h-[90vh] bg-app sm:bg-surface sm:border sm:border-border-subtle sm:rounded-2xl flex flex-col overflow-hidden",
          className,
        )}
      >
        <header className="flex items-center gap-3 h-14 px-4 sm:px-5 border-b border-border-subtle shrink-0">
          {title && (
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          )}
          <div className="flex-1">{rightSlot}</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-2 transition"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
