import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./lib/auth"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import AppShell from "./components/layout/AppShell"
import DashboardPage from "./pages/DashboardPage"
import SettingsPage from "./pages/SettingsPage"
import SignInPage from "./pages/SignInPage"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
