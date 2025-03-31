import { PodcastLayout } from "@/components/podcast-layout"
import { PodcastDetailsSkeleton } from "@/components/podcast/podcast-details-skeleton"

export default function PodcastLoading() {
  return (
    <PodcastLayout>
      <PodcastDetailsSkeleton />
    </PodcastLayout>
  )
}

