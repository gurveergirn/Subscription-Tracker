import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import clsx from "clsx"

type Tone = "success" | "error" | "info"
type Toast = { id: string; tone: Tone; message: string }

type Ctx = {
  push: (toast: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<Ctx | null>(null)
const TIMEOUT_MS = 3500

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { ...toast, id }])
      window.setTimeout(() => dismiss(id), TIMEOUT_MS)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-[70] flex flex-col gap-2 pointer-events-none w-[calc(100%-2rem)] max-w-sm">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 10)
    return () => window.clearTimeout(t)
  }, [])

  const Icon =
    toast.tone === "success"
      ? CheckCircle2
      : toast.tone === "error"
        ? AlertCircle
        : Info
  const tone = {
    success: "border-success/40 bg-success/10 text-success",
    error: "border-danger/40 bg-danger/10 text-danger",
    info: "border-accent/40 bg-accent/10 text-accent",
  }[toast.tone]

  return (
    <div
      className={clsx(
        "pointer-events-auto rounded-xl border bg-surface backdrop-blur-xl p-3 pr-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-all duration-200",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2",
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <span className={clsx("shrink-0 grid place-items-center size-7 rounded-lg border", tone)}>
          <Icon className="size-4" />
        </span>
        <div className="flex-1 text-sm text-text-primary pt-0.5">
          {toast.message}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-md p-1 text-text-muted hover:text-text-primary hover:bg-surface-2 transition"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>")
  return {
    success: (message: string) => ctx.push({ tone: "success", message }),
    error: (message: string) => ctx.push({ tone: "error", message }),
    info: (message: string) => ctx.push({ tone: "info", message }),
  }
}
