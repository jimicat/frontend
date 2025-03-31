import { Skeleton } from "@/components/ui/skeleton"
import { PodcastLayout } from "@/components/podcast-layout"

export default function SubscriptionsLoading() {
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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full sm:max-w-xs" />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Skeleton className="h-10 w-full sm:w-[180px]" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div>
            <Skeleton className="h-10 w-full max-w-md" />

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="rounded-lg border p-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-full max-w-[150px]" />
                      <Skeleton className="mt-1 h-4 w-16 rounded-full" />
                      <Skeleton className="mt-2 h-3 w-24" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-8 w-20" />
            </div>

            <div className="rounded-lg border">
              <div className="divide-y">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="mt-1 h-3 w-48" />
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center p-4">
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-lg border p-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="mt-4 h-6 w-full max-w-[150px]" />
                  <Skeleton className="mt-1 h-4 w-full" />
                  <Skeleton className="mt-1 h-4 w-full" />
                  <div className="mt-2 flex items-center gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <Skeleton className="mb-6 h-8 w-40" />

            <div className="rounded-lg border p-6">
              <div className="space-y-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <Skeleton className="h-6 w-10 rounded-full" />
                    </div>
                    {item < 4 && <Skeleton className="mt-6 h-px w-full" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PodcastLayout>
  )
}

