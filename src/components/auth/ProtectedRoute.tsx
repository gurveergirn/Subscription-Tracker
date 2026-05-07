import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../lib/auth"

export default function ProtectedRoute() {
  const { status } = useAuth()

  if (status === "loading") {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="size-8 rounded-full border-2 border-border-subtle border-t-accent animate-spin" />
      </div>
    )
  }

  if (status === "unauthed") {
    return <Navigate to="/signin" replace />
  }

  return <Outlet />
}
