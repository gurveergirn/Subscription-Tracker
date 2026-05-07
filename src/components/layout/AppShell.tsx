import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import BottomNav from "./BottomNav"

export default function AppShell() {
  return (
    <div className="min-h-screen bg-app text-text-primary">
      <Sidebar />
      <main className="lg:ml-60 pb-20 lg:pb-0">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6 sm:py-8">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
