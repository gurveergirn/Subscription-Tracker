import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Drawer({ open, onClose, title, children }: Props) {
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
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-app sm:bg-surface sm:border-l sm:border-border-subtle flex flex-col">
        <header className="flex items-center gap-3 h-14 px-4 sm:px-5 border-b border-border-subtle shrink-0">
          {title && (
            <h2 className="text-base font-semibold tracking-tight flex-1">
              {title}
            </h2>
          )}
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
