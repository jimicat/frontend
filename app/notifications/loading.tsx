import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsLoading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="mb-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <Skeleton className="h-12 w-full mb-6" />

      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-24 w-full mb-4" />
        ))}
    </div>
  )
}

