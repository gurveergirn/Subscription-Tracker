import { NavLink } from "react-router-dom"
import { LayoutDashboard, Settings, Wallet } from "lucide-react"
import clsx from "clsx"

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/settings", label: "Settings", icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r border-border-subtle bg-surface/60 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border-subtle">
        <span className="grid place-items-center size-8 rounded-lg bg-accent/15 text-accent">
          <Wallet className="size-4" />
        </span>
        <span className="text-base font-semibold tracking-tight">Subs</span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                isActive
                  ? "bg-surface-2 text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2/60",
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border-subtle">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
          <div className="size-8 rounded-full bg-surface-2 grid place-items-center text-xs text-text-secondary">
            G
          </div>
          <div className="min-w-0">
            <div className="text-sm truncate">Signed out</div>
            <div className="text-xs text-text-muted truncate">Sign in to sync</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
