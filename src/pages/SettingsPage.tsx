import TopBar from "../components/layout/TopBar"

export default function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" subtitle="Currency, account, and danger zone." />
      <div className="rounded-2xl border border-border-subtle bg-surface p-6">
        <p className="text-sm text-text-secondary">
          Settings will live here once auth is wired up.
        </p>
      </div>
    </>
  )
}
