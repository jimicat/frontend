"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePodcast } from "@/hooks/use-podcast"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio-player"
import {
  Headphones,
  Play,
  Clock,
  Calendar,
  User,
  Share2,
  ExternalLink,
  Plus,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatDate, formatDuration } from "@/lib/utils"
import { PodcastDetailsSkeleton } from "./podcast-details-skeleton"

export function PodcastDetails({ podcastId }: { podcastId: string }) {
  const { user } = useAuth()
  const { podcast, episodes, isLoading, error, isSubscribed, subscribe, unsubscribe } = usePodcast(podcastId)

  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null)
  const [isSubscribing, setIsSubscribing] = useState(false)

  // 处理订阅/取消订阅
  const handleSubscription = async () => {
    if (!user) {
      // 如果用户未登录，重定向到登录页面
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      return
    }

    setIsSubscribing(true)
    try {
      if (isSubscribed) {
        await unsubscribe()
      } else {
        await subscribe()
      }
    } finally {
      setIsSubscribing(false)
    }
  }

  if (isLoading) {
    return <PodcastDetailsSkeleton />
  }

  if (error || !podcast) {
    return (
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "无法加载播客信息，请稍后再试。"}</AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 md:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        {/* 播客头部信息 */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-lg">
            <Image
              src={podcast.image_url || "/placeholder.svg?height=240&width=240"}
              alt={podcast.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-600 hover:bg-purple-700">{podcast.category}</Badge>
                <span className="text-sm text-muted-foreground">{episodes.length} 集</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{podcast.title}</h1>
              <p className="mt-2 text-muted-foreground">由 {podcast.author} 主持</p>
            </div>

            <p className="text-sm text-muted-foreground">{podcast.description}</p>

            <div className="flex flex-wrap gap-3">
              <Button
                className="gap-2 bg-purple-600 text-white hover:bg-purple-700"
                onClick={handleSubscription}
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isSubscribed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isSubscribed ? "已订阅" : "订阅"}
              </Button>

              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                分享
              </Button>

              {podcast.website && (
                <Button variant="outline" className="gap-2" asChild>
                  <a href={podcast.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    访问网站
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* 剧集列表 */}
        <div>
          <Tabs defaultValue="episodes" className="w-full">
            <TabsList>
              <TabsTrigger value="episodes">
                <Headphones className="mr-2 h-4 w-4" />
                剧集
              </TabsTrigger>
              <TabsTrigger value="about">
                <User className="mr-2 h-4 w-4" />
                关于
              </TabsTrigger>
            </TabsList>

            <TabsContent value="episodes" className="mt-6">
              <div className="rounded-lg border">
                <div className="divide-y">
                  {episodes.length > 0 ? (
                    episodes.map((episode) => (
                      <div key={episode.id} className="flex items-center gap-4 p-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={episode.image_url || podcast.image_url || "/placeholder.svg?height=100&width=100"}
                            alt={episode.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/episode/${episode.id}`} className="hover:underline">
                            <h3 className="font-medium">{episode.title}</h3>
                          </Link>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDuration(episode.duration)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(episode.published_date)}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{episode.description}</p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedEpisode(episode.id)}
                          >
                            <Play className="h-4 w-4" />
                            <span className="sr-only">播放</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center p-8 text-center">
                      <p className="text-muted-foreground">暂无剧集</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="rounded-lg border p-6">
                <h2 className="text-xl font-semibold">关于 {podcast.title}</h2>
                <p className="mt-4 whitespace-pre-line text-muted-foreground">{podcast.description}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium">主持人</h3>
                    <p className="text-muted-foreground">{podcast.author}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">类别</h3>
                    <p className="text-muted-foreground">{podcast.category}</p>
                  </div>

                  {podcast.website && (
                    <div>
                      <h3 className="text-sm font-medium">网站</h3>
                      <a
                        href={podcast.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        {podcast.website}
                      </a>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium">剧集数量</h3>
                    <p className="text-muted-foreground">{episodes.length} 集</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 音频播放器 */}
      {selectedEpisode && <AudioPlayer />}
    </div>
  )
}

