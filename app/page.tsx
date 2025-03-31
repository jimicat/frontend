import { PodcastLayout } from "@/components/podcast-layout"
import { EpisodeCard } from "@/components/episode-card"
import { AudioPlayer } from "@/components/audio-player"
import { CategoryFilter } from "@/components/category-filter"
import { FeaturedEpisode } from "@/components/featured-episode"
import { Newsletter } from "@/components/newsletter"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export default function Home() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <FeaturedEpisode
            id="featured-episode-1"
            title="Special Interview: The Evolution of Technology"
            description="Join us for this special episode featuring tech pioneer Dr. Lisa Chen as she discusses the evolution of technology over the past decade and what we can expect in the coming years."
            image="/placeholder.svg?height=600&width=1200"
            duration="1:12:45"
            date="Mar 26, 2024"
            category="Technology"
            author="Alex Johnson"
            views={3542}
          />

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Discover Episodes</h1>
            <p className="text-muted-foreground">收听您喜爱的播客提供的最新节目</p>
          </div>

          {/* <CategoryFilter /> */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              id="episode-2"
              title="Mindfulness Practices for Busy Professionals"
              description="Learn practical mindfulness techniques that can be integrated into even the busiest schedules."
              image="/placeholder.svg?height=400&width=400"
              duration="32:15"
              date="Mar 20, 2024"
              category="Health & Wellness"
              author="Sarah Chen"
              views={982}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-3"
              title="Sustainable Business Models"
              description="Exploring how companies are adapting their business models to meet sustainability goals while maintaining profitability."
              image="/placeholder.svg?height=400&width=400"
              duration="51:08"
              date="Mar 18, 2024"
              category="Business"
              author="Michael Rodriguez"
              views={756}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-4"
              title="The History of Electronic Music"
              description="A journey through the evolution of electronic music from its early experimental days to modern EDM."
              image="/placeholder.svg?height=400&width=400"
              duration="58:42"
              date="Mar 15, 2024"
              category="Music"
              author="DJ Electra"
              views={1892}
              isFavorite={true}
            />
            <EpisodeCard
              id="episode-5"
              title="Cooking with Seasonal Ingredients"
              description="Chef Maria shares her favorite recipes that highlight the best seasonal produce for spring."
              image="/placeholder.svg?height=400&width=400"
              duration="36:20"
              date="Mar 12, 2024"
              category="Food"
              author="Maria Gonzalez"
              views={1105}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-6"
              title="Travel on a Budget: Hidden Gems"
              description="Discover amazing destinations that won't break the bank and tips for traveling economically."
              image="/placeholder.svg?height=400&width=400"
              duration="42:55"
              date="Mar 10, 2024"
              category="Travel"
              author="Nomad Nick"
              views={2341}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-7"
              title="Travel on a Budget: Hidden Gems"
              description="Discover amazing destinations that won't break the bank and tips for traveling economically."
              image="/placeholder.svg?height=400&width=400"
              duration="42:55"
              date="Mar 10, 2024"
              category="Travel"
              author="Nomad Nick"
              views={2341}
              isFavorite={false}
            />
            <EpisodeCard
              id="episode-8"
              title="Travel on a Budget: Hidden Gems"
              description="Discover amazing destinations that won't break the bank and tips for traveling economically."
              image="/placeholder.svg?height=400&width=400"
              duration="42:55"
              date="Mar 10, 2024"
              category="Travel"
              author="Nomad Nick"
              views={2341}
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

          {/* <Newsletter /> */}
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

