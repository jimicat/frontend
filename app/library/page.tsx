import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Clock, Heart, Bookmark, Download, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LibraryPage() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Your Library</h1>
            <p className="mt-2 text-muted-foreground">
              Access your saved episodes, favorites, and downloads in one place.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search your library..." className="w-full pl-8" />
            </div>

            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="saved">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="saved">
                <Bookmark className="mr-2 h-4 w-4" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="downloads">
                <Download className="mr-2 h-4 w-4" />
                Downloads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="mt-6">
              <div className="rounded-lg border">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=EP${item}`}
                          alt={`Episode ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/episode/episode-${item}`} className="hover:underline">
                          <h3 className="font-medium">Saved Episode {item}: The Future of Technology</h3>
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Alex Johnson</span>
                          <span>•</span>
                          <span>45:32</span>
                          <span>•</span>
                          <span>Mar 24, 2024</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4 fill-current" />
                          <span className="sr-only">Remove from saved</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <div className="rounded-lg border">
                <div className="divide-y">
                  {[1, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=EP${item}`}
                          alt={`Episode ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/episode/episode-${item}`} className="hover:underline">
                          <h3 className="font-medium">Favorite Episode {item}: The Future of Technology</h3>
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Alex Johnson</span>
                          <span>•</span>
                          <span>45:32</span>
                          <span>•</span>
                          <span>Mar 24, 2024</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Heart className="h-4 w-4 fill-current" />
                          <span className="sr-only">Remove from favorites</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="rounded-lg border">
                <div className="divide-y">
                  {[2, 5, 1, 3].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=EP${item}`}
                          alt={`Episode ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/episode/episode-${item}`} className="hover:underline">
                          <h3 className="font-medium">Recently Played Episode {item}</h3>
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Alex Johnson</span>
                          <span>•</span>
                          <span>45:32</span>
                          <span>•</span>
                          <span>Played 2 days ago</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                          <span className="sr-only">Save</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="downloads" className="mt-6">
              <div className="rounded-lg border">
                <div className="divide-y">
                  {[3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=EP${item}`}
                          alt={`Episode ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/episode/episode-${item}`} className="hover:underline">
                          <h3 className="font-medium">Downloaded Episode {item}</h3>
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Alex Johnson</span>
                          <span>•</span>
                          <span>45:32</span>
                          <span>•</span>
                          <span>Downloaded Mar 20, 2024</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4 fill-current" />
                          <span className="sr-only">Remove download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

