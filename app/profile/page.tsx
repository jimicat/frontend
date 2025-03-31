import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EpisodeCard } from "@/components/episode-card"
import { Settings, Edit, Share2, Twitter, Instagram, Youtube, Globe, Users, Headphones, Mic } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="relative">
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-muted sm:h-64">
              <Image src="/placeholder.svg?height=400&width=1200" alt="Profile cover" fill className="object-cover" />
            </div>

            <div className="absolute -bottom-12 left-4 flex items-end sm:left-8">
              <Avatar className="h-24 w-24 border-4 border-background sm:h-32 sm:w-32">
                <AvatarImage src="/placeholder.svg?height=200&width=200" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>

            <div className="absolute right-4 top-4 flex gap-2 sm:right-8">
              <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">John Doe</h1>
              <p className="text-muted-foreground">@johndoe</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button className="bg-purple-600 text-white hover:bg-purple-700">Follow</Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">About</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Podcast enthusiast and tech lover. I enjoy discussing the latest in technology, business, and personal
                  development.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium">Stats</h2>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold">128</div>
                    <div className="text-xs text-muted-foreground">Following</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold">2.4k</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-xs text-muted-foreground">Episodes</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium">Social</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <Youtube className="h-4 w-4" />
                    <span className="sr-only">YouTube</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Website</span>
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium">Interests</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Technology
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Business
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Science
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Health
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Music
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Tabs defaultValue="podcasts">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="podcasts">
                    <Mic className="mr-2 h-4 w-4" />
                    Podcasts
                  </TabsTrigger>
                  <TabsTrigger value="listening">
                    <Headphones className="mr-2 h-4 w-4" />
                    Listening
                  </TabsTrigger>
                  <TabsTrigger value="following">
                    <Users className="mr-2 h-4 w-4" />
                    Following
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="podcasts" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=100&width=100&text=TP"
                            alt="Tech Podcast"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Tech Perspectives</h3>
                          <p className="text-sm text-muted-foreground">Weekly discussions on technology trends</p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <span>42 episodes</span>
                            <span>•</span>
                            <span>Weekly</span>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>5.2k followers</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=100&width=100&text=BP"
                            alt="Business Podcast"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Business Insights</h3>
                          <p className="text-sm text-muted-foreground">Entrepreneurship and business strategies</p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <span>28 episodes</span>
                            <span>•</span>
                            <span>Bi-weekly</span>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>3.8k followers</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="listening" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
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
                  </div>
                </TabsContent>

                <TabsContent value="following" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg border p-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${item}`} />
                          <AvatarFallback>U{item}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">User {item}</h4>
                          <p className="truncate text-xs text-muted-foreground">@user{item}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Unfollow
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

