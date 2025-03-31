import { Skeleton } from "@/components/ui/skeleton"

export function PodcastDetailsSkeleton() {
  return (
    <div className="container px-4 py-6 md:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        {/* 播客头部信息骨架 */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Skeleton className="aspect-square w-full max-w-[240px] rounded-lg" />

          <div className="flex flex-1 flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="mt-2 h-10 w-full max-w-md" />
              <Skeleton className="mt-2 h-4 w-40" />
            </div>

            <Skeleton className="h-20 w-full" />

            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        {/* 剧集列表骨架 */}
        <div>
          <Skeleton className="h-10 w-full max-w-xs" />

          <div className="mt-6 rounded-lg border">
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-full max-w-md" />
                    <div className="mt-1 flex items-center gap-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="mt-1 h-3 w-full" />
                    <Skeleton className="mt-1 h-3 w-2/3" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

