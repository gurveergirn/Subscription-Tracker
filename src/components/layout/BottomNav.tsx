import { NavLink } from "react-router-dom"
import { LayoutDashboard, Settings } from "lucide-react"
import clsx from "clsx"

const tabs = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/settings", label: "Settings", icon: Settings },
]

export default function BottomNav() {
  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-surface/80 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-2">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] transition-colors",
                  isActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary",
                )
              }
            >
              <Icon className="size-5" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
