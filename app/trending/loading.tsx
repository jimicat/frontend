import { Skeleton } from "@/components/ui/skeleton"
import { PodcastLayout } from "@/components/podcast-layout"

export default function TrendingLoading() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div>
              <Skeleton className="h-10 w-64" />
              <Skeleton className="mt-2 h-4 w-48" />
            </div>
          </div>

          <div>
            <Skeleton className="h-10 w-full max-w-md" />

            <div className="mt-6 space-y-8">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="overflow-hidden rounded-lg border">
                      <Skeleton className="aspect-square w-full" />
                      <div className="p-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="mt-2 h-4 w-full" />
                        <Skeleton className="mt-2 h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-8 w-16" />
                </div>

                <div className="rounded-lg border">
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center gap-4 p-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-full max-w-xs" />
                          <Skeleton className="mt-1 h-3 w-40" />
                        </div>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <Skeleton className="h-6 w-40" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="rounded-lg border p-4">
                      <Skeleton className="h-6 w-24" />
                      <div className="mt-2 flex items-center justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-10" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-8 w-40" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-lg border p-4">
                  <div className="flex flex-col items-center text-center">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="mt-4 h-6 w-32" />
                    <Skeleton className="mt-1 h-4 w-24" />
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-8 w-40" />
            </div>

            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 16 }).map((_, index) => (
                <Skeleton key={index} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PodcastLayout>
  )
}

