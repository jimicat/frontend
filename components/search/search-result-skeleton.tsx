import { Skeleton } from "@/components/ui/skeleton"

export function SearchResultSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4">
        <Skeleton className="mb-2 h-5 w-3/4" />
        <Skeleton className="mb-4 h-4 w-full" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  )
}

