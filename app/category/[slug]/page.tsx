import { PodcastLayout } from "@/components/podcast-layout"
import { EpisodeCard } from "@/components/episode-card"
import { AudioPlayer } from "@/components/audio-player"
import { CategoryFilter } from "@/components/category-filter"
import { Newsletter } from "@/components/newsletter"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

// This would normally come from a database or API
const getCategoryData = (slug: string) => {
  const categories = {
    technology: {
      name: "Technology",
      description: "Explore the latest in tech innovation, digital trends, and the future of computing.",
      episodeCount: 42,
    },
    business: {
      name: "Business",
      description: "Insights on entrepreneurship, management strategies, and business growth.",
      episodeCount: 38,
    },
    "health-wellness": {
      name: "Health & Wellness",
      description: "Tips and discussions on physical health, mental wellbeing, and balanced living.",
      episodeCount: 56,
    },
    music: {
      name: "Music",
      description: "Discover new artists, genres, and the stories behind your favorite songs.",
      episodeCount: 29,
    },
    food: {
      name: "Food",
      description: "Culinary adventures, cooking techniques, and food culture from around the world.",
      episodeCount: 31,
    },
    travel: {
      name: "Travel",
      description: "Destination guides, travel tips, and stories from explorers around the globe.",
      episodeCount: 27,
    },
  }

  return (
    categories[slug] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
      description: "Explore episodes in this category.",
      episodeCount: 0,
    }
  )
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryData(params.slug)

  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{category.name}</h1>
            <p className="mt-2 text-muted-foreground">{category.description}</p>
            <p className="mt-1 text-sm text-muted-foreground">{category.episodeCount} episodes</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter />

            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <EpisodeCard
              id="episode-1"
              title="The Future of AI in Everyday Life"
              description="We discuss how artificial intelligence is changing our daily routines and what to expect in the coming years."
              image="/placeholder.svg?height=400&width=400"
              duration="45:32"
              date="Mar 24, 2024"
              category="Technology"
              author="Alex Johnson"
              views={1243}
              isFavorite={true}
            />
            <EpisodeCard
              id="featured-episode-1"
              title="Special Interview: The Evolution of Technology"
              description="Join us for this special episode featuring tech pioneer Dr. Lisa Chen as she discusses the evolution of technology over the past decade."
              image="/placeholder.svg?height=400&width=400"
              duration="1:12:45"
              date="Mar 26, 2024"
              category="Technology"
              author="Alex Johnson"
              views={3542}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-7"
              title="Quantum Computing Explained"
              description="A beginner-friendly introduction to quantum computing and its potential applications."
              image="/placeholder.svg?height=400&width=400"
              duration="38:15"
              date="Mar 5, 2024"
              category="Technology"
              author="Alex Johnson"
              views={876}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-8"
              title="The Rise of Smart Cities"
              description="How urban areas are being transformed by technology and data-driven decision making."
              image="/placeholder.svg?height=400&width=400"
              duration="42:18"
              date="Feb 28, 2024"
              category="Technology"
              author="Alex Johnson"
              views={1032}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-9"
              title="Cybersecurity in the Digital Age"
              description="Essential practices to protect yourself and your business from cyber threats."
              image="/placeholder.svg?height=400&width=400"
              duration="55:42"
              date="Feb 21, 2024"
              category="Technology"
              author="Alex Johnson"
              views={1567}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-10"
              title="The Ethics of AI Development"
              description="Exploring the moral implications and responsibilities in artificial intelligence research."
              image="/placeholder.svg?height=400&width=400"
              duration="49:30"
              date="Feb 14, 2024"
              category="Technology"
              author="Alex Johnson"
              views={1289}
              isFavorite={false}
            />
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationNext href="#" />
            </PaginationContent>
          </Pagination>

          <Separator />

          <Newsletter />
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

