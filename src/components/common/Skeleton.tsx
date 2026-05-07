import clsx from "clsx"

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx("rounded-xl bg-surface-2/60 animate-pulse", className)}
    />
  )
}

export function SubscriptionCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="size-11" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-5">
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-8 w-24 mt-2" />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Skeleton className="lg:col-span-3 h-64 rounded-2xl" />
        <Skeleton className="lg:col-span-2 h-64 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <SubscriptionCardSkeleton />
        <SubscriptionCardSkeleton />
        <SubscriptionCardSkeleton />
      </div>
    </div>
  )
}
