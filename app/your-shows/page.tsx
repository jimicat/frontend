import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mic, Search, Filter, Plus, BarChart3, Edit, Trash2, Settings, Upload, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function YourShowsPage() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Mic className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">我的节目</h1>
              <p className="text-muted-foreground">管理您创建的播客节目</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="搜索您的节目..." className="w-full pl-8" />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button className="gap-2 bg-purple-600 text-white hover:bg-purple-700">
                <Plus className="h-4 w-4" />
                创建新节目
              </Button>

              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">筛选</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="active" className="flex-1 sm:flex-initial">
                活跃节目
              </TabsTrigger>
              <TabsTrigger value="drafts" className="flex-1 sm:flex-initial">
                草稿
              </TabsTrigger>
              <TabsTrigger value="archived" className="flex-1 sm:flex-initial">
                已归档
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <YourShowsList />
            </TabsContent>

            <TabsContent value="drafts" className="mt-6">
              <YourShowsList filter="drafts" />
            </TabsContent>

            <TabsContent value="archived" className="mt-6">
              <YourShowsList filter="archived" />
            </TabsContent>
          </Tabs>

          <Separator />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">最近上传的剧集</h2>
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
                      <Link href={`/episode/your-episode-${episode}`} className="hover:underline">
                        <h3 className="font-medium">您的剧集 {episode}: 探索未来科技的无限可能</h3>
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Link href={`/podcast/your-podcast-${(episode % 3) + 1}`} className="hover:underline">
                          您的播客 {(episode % 3) + 1}
                        </Link>
                        <span>•</span>
                        <span>
                          {episode * 10 + 25}:{episode * 5 + 10}
                        </span>
                        <span>•</span>
                        <span>{episode} 天前上传</span>
                        <span>•</span>
                        <span>{episode * 100 + 50} 次播放</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">编辑</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <BarChart3 className="h-4 w-4" />
                        <span className="sr-only">统计</span>
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
              <h2 className="text-2xl font-bold">节目统计</h2>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                详细分析
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "总播放次数", value: "24,892", icon: <BarChart3 className="h-5 w-5 text-purple-600" /> },
                { title: "总订阅数", value: "1,245", icon: <Mic className="h-5 w-5 text-purple-600" /> },
                { title: "总剧集数", value: "48", icon: <Calendar className="h-5 w-5 text-purple-600" /> },
                { title: "平均收听时长", value: "32:18", icon: <Clock className="h-5 w-5 text-purple-600" /> },
              ].map((stat, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <div className="flex items-center gap-3">
                    {stat.icon}
                    <h3 className="text-lg font-medium">{stat.title}</h3>
                  </div>
                  <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="mb-6 text-2xl font-bold">快速操作</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="h-auto flex-col gap-2 p-6 text-left" asChild>
                <Link href="/upload-episode">
                  <Upload className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="text-base font-medium">上传新剧集</h3>
                    <p className="text-sm text-muted-foreground">上传新的播客剧集到您的节目</p>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto flex-col gap-2 p-6 text-left" asChild>
                <Link href="/analytics">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="text-base font-medium">查看详细分析</h3>
                    <p className="text-sm text-muted-foreground">获取您节目的详细收听数据和分析</p>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto flex-col gap-2 p-6 text-left" asChild>
                <Link href="/podcast-settings">
                  <Settings className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="text-base font-medium">节目设置</h3>
                    <p className="text-sm text-muted-foreground">管理您的节目设置和分发选项</p>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto flex-col gap-2 p-6 text-left" asChild>
                <Link href="/monetization">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="text-base font-medium">设置变现</h3>
                    <p className="text-sm text-muted-foreground">探索赞助、会员和广告选项</p>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto flex-col gap-2 p-6 text-left" asChild>
                <Link href="/promotion">
                  <Share className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="text-base font-medium">推广您的节目</h3>
                    <p className="text-sm text-muted-foreground">获取推广工具和分享您的内容</p>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

function YourShowsList({ filter }: { filter?: string }) {
  // 这里可以根据filter参数筛选不同的节目列表
  // 为了演示，我们使用相同的数据，但在实际应用中可以根据filter显示不同内容

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((podcast) => (
        <div key={podcast} className="group rounded-lg border p-4 transition-all hover:shadow-md">
          <div className="flex flex-col">
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={`/placeholder.svg?height=200&width=200&text=YP${podcast}`}
                alt={`Your Podcast ${podcast}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute left-2 top-2 bg-green-600 hover:bg-green-700">活跃</Badge>
            </div>
            <h3 className="text-lg font-bold">您的播客 {podcast}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              这是您创建的关于{["科技创新", "商业策略", "健康生活"][podcast - 1]}的播客节目。
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{podcast * 10 + 6} 集</span>
              <span>•</span>
              <span>{podcast * 500 + 245} 订阅</span>
              <span>•</span>
              <span>每周更新</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">{["科技", "商业", "健康"][podcast - 1]}</Badge>
            </div>
            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/manage-podcast/${podcast}`}>管理</Link>
              </Button>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">编辑</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <BarChart3 className="h-4 w-4" />
                  <span className="sr-only">统计</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">删除</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
        <div className="flex flex-col items-center text-center">
          <Plus className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-2 font-medium">创建新节目</h3>
          <p className="mt-1 text-sm text-muted-foreground">开始创建您的新播客节目</p>
          <Button className="mt-4 bg-purple-600 text-white hover:bg-purple-700">创建节目</Button>
        </div>
      </div>
    </div>
  )
}

function Clock({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function Share({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

