"use client"

import { useState } from "react"
import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Newsletter } from "@/components/newsletter"
import { TrendingUp, Flame, BarChart3, Clock } from "lucide-react"
import { useTrending } from "@/hooks/use-trending"
import { PodcastCard } from "@/components/podcast-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TrendingPage() {
  const { trendingPodcasts, isLoading, error, refreshTrending } = useTrending()
  const [timeframe, setTimeframe] = useState("today")

  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">热门趋势</h1>
              <p className="text-muted-foreground">发现最受欢迎的播客内容和最新趋势</p>
            </div>
          </div>

          <Tabs defaultValue="today" className="w-full" onValueChange={setTimeframe}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="today">今日</TabsTrigger>
                <TabsTrigger value="week">本周</TabsTrigger>
                <TabsTrigger value="month">本月</TabsTrigger>
                <TabsTrigger value="alltime">全部时间</TabsTrigger>
              </TabsList>

              <div className="hidden md:block">
                <Button variant="outline" size="sm" onClick={() => refreshTrending()}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  刷新数据
                </Button>
              </div>
            </div>

            <TabsContent value="today" className="mt-6">
              <TrendingContent timeframe="今日" podcasts={trendingPodcasts} isLoading={isLoading} error={error} />
            </TabsContent>

            <TabsContent value="week" className="mt-6">
              <TrendingContent timeframe="本周" podcasts={trendingPodcasts} isLoading={isLoading} error={error} />
            </TabsContent>

            <TabsContent value="month" className="mt-6">
              <TrendingContent timeframe="本月" podcasts={trendingPodcasts} isLoading={isLoading} error={error} />
            </TabsContent>

            <TabsContent value="alltime" className="mt-6">
              <TrendingContent timeframe="全部时间" podcasts={trendingPodcasts} isLoading={isLoading} error={error} />
            </TabsContent>
          </Tabs>

          <Newsletter />
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

function TrendingContent({
  timeframe,
  podcasts,
  isLoading,
  error,
}: {
  timeframe: string
  podcasts: any[]
  isLoading: boolean
  error: string | null
}) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
          <p className="text-muted-foreground">加载热门播客中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!podcasts || podcasts.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <p className="text-muted-foreground">暂无热门播客数据</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          刷新页面
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            <Flame className="mr-2 inline-block h-5 w-5 text-red-500" />
            {timeframe}热门播客
          </h2>
          <Link href="/discover" className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400">
            查看全部
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {podcasts.slice(0, 9).map((podcast) => (
            <PodcastCard
              key={podcast.id}
              id={podcast.id}
              title={podcast.title}
              description={podcast.description}
              imageUrl={podcast.image_url || podcast.artwork}
              author={podcast.author}
              category={podcast.category}
              episodeCount={podcast.episode_count}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            <Clock className="mr-2 inline-block h-5 w-5" />
            {timeframe}快速上升
          </h2>
          <Button variant="outline" size="sm">
            刷新
          </Button>
        </div>

        <div className="rounded-lg border">
          <div className="divide-y">
            {podcasts.slice(0, 5).map((podcast, index) => (
              <Link
                key={podcast.id}
                href={`/podcast/${podcast.id}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  {index + 1}
                </div>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={podcast.image_url || `podcast.artwork`}
                    alt={podcast.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-medium">{podcast.title}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{podcast.author}</span>
                    <span>•</span>
                    <span className="flex items-center text-green-600">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {Math.floor(Math.random() * 100) + 20}%
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {podcast.category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

