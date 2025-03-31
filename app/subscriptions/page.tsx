import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Headphones, Search, Bell, Filter, Play, Plus, MoreHorizontal, ArrowUpRight, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SubscriptionsPage() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Headphones className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">我的订阅</h1>
              <p className="text-muted-foreground">管理您订阅的播客和最新剧集</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="搜索您的订阅..." className="w-full pl-8" />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Select defaultValue="recent">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">最近更新</SelectItem>
                  <SelectItem value="name">名称</SelectItem>
                  <SelectItem value="most-episodes">剧集数量</SelectItem>
                  <SelectItem value="recently-added">最近添加</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">筛选</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-initial">
                全部
              </TabsTrigger>
              <TabsTrigger value="unplayed" className="flex-1 sm:flex-initial">
                未播放
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex-1 sm:flex-initial">
                进行中
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex-1 sm:flex-initial">
                收藏
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <SubscriptionsList />
            </TabsContent>

            <TabsContent value="unplayed" className="mt-6">
              <SubscriptionsList filter="unplayed" />
            </TabsContent>

            <TabsContent value="in-progress" className="mt-6">
              <SubscriptionsList filter="in-progress" />
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <SubscriptionsList filter="favorites" />
            </TabsContent>
          </Tabs>

          <Separator />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">最新剧集</h2>
              <Button variant="outline" size="sm">
                查看全部
              </Button>
            </div>

            <div className="rounded-lg border">
              <div className="divide-y">
                {[1, 2, 3, 4, 5].map((episode) => (
                  <div key={episode} className="flex items-center gap-4 p-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={`/placeholder.svg?height=100&width=100&text=E${episode}`}
                        alt={`Episode ${episode}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/episode/latest-${episode}`} className="hover:underline">
                        <h3 className="font-medium">最新剧集 {episode}: 数字时代的创新与挑战</h3>
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Link href={`/podcast/podcast-${episode}`} className="hover:underline">
                          播客 {episode}
                        </Link>
                        <span>•</span>
                        <span>
                          {episode * 10 + 25}:{episode * 5 + 10}
                        </span>
                        <span>•</span>
                        <span>{episode} 天前</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                        <span className="sr-only">播放</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">更多选项</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center p-4">
                <Button variant="outline">加载更多</Button>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">推荐订阅</h2>
              <Link
                href="/discover"
                className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
              >
                发现更多
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((podcast) => (
                <div key={podcast} className="group rounded-lg border p-4 transition-all hover:shadow-md">
                  <div className="flex flex-col">
                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=R${podcast}`}
                        alt={`Recommended Podcast ${podcast}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg font-bold">推荐播客 {podcast}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      这是一个关于{["科技创新", "商业策略", "健康生活", "音乐文化"][podcast - 1]}
                      的热门播客，深受听众喜爱。
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{podcast * 50 + 100} 集</span>
                      <span>•</span>
                      <span>每周更新</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="outline">{["科技", "商业", "健康", "音乐"][podcast - 1]}</Badge>
                      <Button size="sm" className="gap-1 bg-purple-600 text-white hover:bg-purple-700">
                        <Plus className="h-3 w-3" />
                        订阅
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="mb-6 text-2xl font-bold">订阅设置</h2>

            <div className="space-y-6 rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-episodes">新剧集通知</Label>
                  <p className="text-sm text-muted-foreground">当您订阅的播客发布新剧集时接收通知</p>
                </div>
                <Switch id="new-episodes" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-download">自动下载</Label>
                  <p className="text-sm text-muted-foreground">自动下载订阅播客的新剧集</p>
                </div>
                <Switch id="auto-download" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mark-played">自动标记为已播放</Label>
                  <p className="text-sm text-muted-foreground">当您完成90%的剧集时自动标记为已播放</p>
                </div>
                <Switch id="mark-played" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="limit-episodes">每个播客保留的剧集数量</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="limit-episodes">
                    <SelectValue placeholder="选择保留数量" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有剧集</SelectItem>
                    <SelectItem value="10">最新10集</SelectItem>
                    <SelectItem value="20">最新20集</SelectItem>
                    <SelectItem value="30">最新30集</SelectItem>
                    <SelectItem value="unplayed">仅未播放的剧集</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

function SubscriptionsList({ filter }: { filter?: string }) {
  // 这里可以根据filter参数筛选不同的订阅列表
  // 为了演示，我们使用相同的数据

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((podcast) => (
        <div key={podcast} className="group rounded-lg border p-4 transition-all hover:shadow-md">
          <div className="flex gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={`/placeholder.svg?height=100&width=100&text=P${podcast}`}
                alt={`Podcast ${podcast}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/podcast/podcast-${podcast}`} className="hover:underline">
                <h3 className="font-medium">订阅播客 {podcast}</h3>
              </Link>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {["科技", "商业", "健康", "音乐", "美食", "旅行", "教育", "娱乐", "科学"][podcast - 1]}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{podcast * 10 + 5} 集</span>
                {podcast % 3 === 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center text-purple-600">
                      <Bell className="mr-1 h-3 w-3" />新
                    </span>
                  </>
                )}
                {podcast % 4 === 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center text-amber-600">
                      <Clock className="mr-1 h-3 w-3" />
                      进行中
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t pt-3">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Play className="mr-1 h-4 w-4" />
              最新剧集
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">更多选项</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

