import { Suspense } from "react"
import { PodcastLayout } from "@/components/podcast-layout"
import { PodcastDetails } from "@/components/podcast/podcast-details"
import { PodcastDetailsSkeleton } from "@/components/podcast/podcast-details-skeleton"

export default async function PodcastPage({ params }: { params: { id: string } }) {
  const { id } = await params // Ensure params is awaited if necessary

  return (
    <PodcastLayout>
      <Suspense fallback={<PodcastDetailsSkeleton />}>
        <PodcastDetails podcastId={id} />
      </Suspense>
    </PodcastLayout>
  )
}