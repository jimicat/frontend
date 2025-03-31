import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EpisodeCard } from "@/components/episode-card"
import { Newsletter } from "@/components/newsletter"
import {
  Clock,
  Calendar,
  Heart,
  Share2,
  Download,
  Bookmark,
  Play,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would normally come from a database or API
const getEpisodeData = (id: string) => {
  const episodes = {
    "episode-1": {
      id: "episode-1",
      title: "The Future of AI in Everyday Life",
      description:
        "We discuss how artificial intelligence is changing our daily routines and what to expect in the coming years. From smart homes to personal assistants, AI is becoming increasingly integrated into our lives. In this episode, we explore the ethical implications, potential benefits, and challenges of this technological revolution.\n\nOur guest, Dr. Alex Johnson, is a leading researcher in artificial intelligence and machine learning. He shares insights from his latest research and discusses how AI will transform various industries including healthcare, transportation, and entertainment.",
      image: "/placeholder.svg?height=600&width=1200",
      duration: "45:32",
      date: "Mar 24, 2024",
      category: "Technology",
      author: "Alex Johnson",
      authorImage: "/placeholder.svg?height=100&width=100",
      authorBio:
        "Alex Johnson is a technology researcher and podcast host with over 10 years of experience in the tech industry.",
      views: 1243,
      likes: 342,
      comments: 56,
      transcript:
        "This is a sample transcript of the episode. In a real application, this would be the full text transcript of the podcast episode.",
      relatedEpisodes: ["episode-2", "episode-3", "episode-4"],
    },
    "featured-episode-1": {
      id: "featured-episode-1",
      title: "Special Interview: The Evolution of Technology",
      description:
        "Join us for this special episode featuring tech pioneer Dr. Lisa Chen as she discusses the evolution of technology over the past decade and what we can expect in the coming years. Dr. Chen shares her insights on emerging technologies, the impact of AI on society, and how businesses can adapt to rapid technological changes.\n\nIn this in-depth conversation, we explore topics ranging from quantum computing to the future of work in an increasingly automated world. Dr. Chen also discusses her personal journey in the tech industry and offers advice for aspiring technologists.",
      image: "/placeholder.svg?height=600&width=1200",
      duration: "1:12:45",
      date: "Mar 26, 2024",
      category: "Technology",
      author: "Lisa Chen",
      authorImage: "/placeholder.svg?height=100&width=100",
      authorBio:
        "Dr. Lisa Chen is a renowned technology pioneer, researcher, and entrepreneur with multiple patents in AI and machine learning.",
      views: 3542,
      likes: 892,
      comments: 124,
      transcript:
        "This is a sample transcript of the episode. In a real application, this would be the full text transcript of the podcast episode.",
      relatedEpisodes: ["episode-1", "episode-3", "episode-5"],
    },
  }

  return episodes[id] || episodes["episode-1"]
}

export default function EpisodePage({ params }: { params: { id: string } }) {
  const episode = getEpisodeData(params.id)

  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl md:aspect-[21/8] lg:aspect-[21/7]">
            <Image
              src={episode.image || "/placeholder.svg"}
              alt={episode.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            <div className="absolute left-4 top-4">
              <Link href={`/category/${episode.category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge className="bg-purple-600 hover:bg-purple-700">{episode.category}</Badge>
              </Link>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{episode.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {episode.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {episode.date}
                  </div>
                  <div>{episode.views.toLocaleString()} views</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-purple-600 text-white hover:bg-purple-700">
                  <Play className="h-4 w-4 fill-current" />
                  Play Episode
                </Button>
                <Button variant="outline" className="gap-2">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Favorite</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>

              <Separator />

              <div>
                <h2 className="mb-4 text-xl font-semibold">Episode Description</h2>
                <div className="space-y-4 text-muted-foreground">
                  {episode.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="mb-4 text-xl font-semibold">Transcript</h2>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">{episode.transcript}</p>
                  <Button variant="link" className="mt-2 px-0">
                    Show full transcript
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Comments ({episode.comments})</h2>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((comment) => (
                    <div key={comment} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${comment}`} />
                        <AvatarFallback>U{comment}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">User{comment}</div>
                          <div className="text-xs text-muted-foreground">2 days ago</div>
                        </div>
                        <p className="mt-1 text-sm">
                          This was such an insightful episode! I learned so much about the future of technology.
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            24
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsDown className="mr-1 h-4 w-4" />2
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="mt-4 w-full">
                  Load More Comments
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={episode.authorImage} />
                    <AvatarFallback>{episode.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      <Link
                        href={`/author/${episode.author.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:underline"
                      >
                        {episode.author}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">Host & Producer</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{episode.authorBio}</p>
                <Button variant="outline" className="mt-4 w-full">
                  Follow
                </Button>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Related Episodes</h3>
                <div className="space-y-4">
                  {[
                    {
                      id: "episode-2",
                      title: "Mindfulness Practices for Busy Professionals",
                      image: "/placeholder.svg?height=100&width=100",
                      duration: "32:15",
                      author: "Sarah Chen",
                    },
                    {
                      id: "episode-3",
                      title: "Sustainable Business Models",
                      image: "/placeholder.svg?height=100&width=100",
                      duration: "51:08",
                      author: "Michael Rodriguez",
                    },
                    {
                      id: "episode-4",
                      title: "The History of Electronic Music",
                      image: "/placeholder.svg?height=100&width=100",
                      duration: "58:42",
                      author: "DJ Electra",
                    },
                  ].map((relatedEpisode) => (
                    <Link
                      key={relatedEpisode.id}
                      href={`/episode/${relatedEpisode.id}`}
                      className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={relatedEpisode.image || "/placeholder.svg"}
                          alt={relatedEpisode.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <h4 className="line-clamp-2 font-medium">{relatedEpisode.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{relatedEpisode.author}</span>
                          <span>•</span>
                          <span>{relatedEpisode.duration}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-lg font-medium">Episode Stats</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold">{episode.views.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold">{episode.likes}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold">{episode.comments}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">More Episodes You Might Like</h2>
              <Link
                href="/episodes"
                className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
              >
                View All
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            </div>
          </div>

          <Newsletter />
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

