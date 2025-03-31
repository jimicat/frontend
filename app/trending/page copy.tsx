import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { EpisodeCard } from "@/components/episode-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Newsletter } from "@/components/newsletter"
import { TrendingUp, Flame, BarChart3, Clock, Award, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TrendingPodcasts } from "@/components/TrendingPodcasts";

export default function TrendingPage() {
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

          <Tabs defaultValue="today" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="today">今日</TabsTrigger>
                <TabsTrigger value="week">本周</TabsTrigger>
                <TabsTrigger value="month">本月</TabsTrigger>
                <TabsTrigger value="alltime">全部时间</TabsTrigger>
              </TabsList>

              <div className="hidden md:block">
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  查看详细统计
                </Button>
              </div>
            </div>

            <TabsContent value="today" className="mt-6">
              <TrendingContent timeframe="今日" />
            </TabsContent>

            <TabsContent value="week" className="mt-6">
              <TrendingContent timeframe="本周" />
            </TabsContent>

            <TabsContent value="month" className="mt-6">
              <TrendingContent timeframe="本月" />
            </TabsContent>

            <TabsContent value="alltime" className="mt-6">
              <TrendingContent timeframe="全部时间" />
            </TabsContent>
          </Tabs>

          <Separator />

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">热门播客</h2>
            </div>

            {<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((podcast) => (
                <Link
                  key={podcast}
                  href={`/podcast/podcast-${podcast}`}
                  className="group rounded-lg border p-4 transition-all hover:shadow-md"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=P${podcast}`}
                        alt={`Podcast ${podcast}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                        {podcast * 12 + 8} 集
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">热门播客 {podcast}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">主持人 {podcast}</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {["科技", "商业", "健康", "音乐"][podcast - 1]}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {podcast * 10 + 5}K 订阅
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>}
            {/* <TrendingPodcasts /> */}
          </div>

          <Separator />

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">热门创作者</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((creator) => (
                <Link
                  key={creator}
                  href={`/author/creator-${creator}`}
                  className="flex items-center gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=C${creator}`}
                      alt={`Creator ${creator}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">创作者 {creator}</h3>
                    <p className="text-sm text-muted-foreground">
                      {creator * 5 + 3} 个节目 • {creator * 10 + 5}K 粉丝
                    </p>
                    <div className="mt-1 flex gap-1">
                      <Badge variant="outline" className="text-xs">
                        {["科技", "商业", "健康", "音乐", "美食", "旅行"][creator % 6]}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <div className="mb-6 flex items-center gap-3">
              <Flame className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">热门话题</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "人工智能",
                "创业",
                "健康生活",
                "投资",
                "数字营销",
                "心理健康",
                "职业发展",
                "科技创新",
                "可持续发展",
                "远程工作",
                "个人成长",
                "数字化转型",
                "元宇宙",
                "区块链",
                "气候变化",
                "未来趋势",
              ].map((topic, index) => (
                <Link key={index} href={`/topic/${topic}`}>
                  <Badge
                    variant={index < 5 ? "default" : "outline"}
                    className={index < 5 ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {index < 5 && <Flame className="mr-1 h-3 w-3" />}
                    {topic}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          <Newsletter />
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

function TrendingContent({ timeframe }: { timeframe: string }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            <Flame className="mr-2 inline-block h-5 w-5 text-red-500" />
            {timeframe}热门节目
          </h2>
          <Link href="/episodes" className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400">
            查看全部
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <EpisodeCard
            id="trending-1"
            title="元宇宙的未来：虚拟世界的无限可能"
            description="探索元宇宙技术的最新发展，以及它如何改变我们的工作、娱乐和社交方式。"
            image="/placeholder.svg?height=400&width=400"
            duration="52:18"
            date="3月28日, 2024"
            category="科技"
            author="李明"
            views={8432}
            isFavorite={false}
          />
          <EpisodeCard
            id="trending-2"
            title="创业者必备的心理素质"
            description="成功的创业者分享他们如何克服挑战、保持韧性，以及在压力下做出正确决策的策略。"
            image="/placeholder.svg?height=400&width=400"
            duration="45:32"
            date="3月25日, 2024"
            category="商业"
            author="王强"
            views={6721}
            isFavorite={true}
          />
          <EpisodeCard
            id="trending-3"
            title="数字游民生活方式：边工作边旅行"
            description="了解如何成为一名数字游民，在世界各地工作的同时探索不同文化和地点。"
            image="/placeholder.svg?height=400&width=400"
            duration="38:45"
            date="3月26日, 2024"
            category="旅行"
            author="张旅"
            views={5893}
            isFavorite={false}
          />
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
            {[1, 2, 3, 4, 5].map((item) => (
              <Link
                key={item}
                href={`/episode/rising-${item}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  {item}
                </div>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=R${item}`}
                    alt={`Rising Episode ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-medium">快速上升的节目 {item}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>创作者 {item}</span>
                    <span>•</span>
                    <span>
                      {item * 10 + 5}:{item * 5 + 10}
                    </span>
                    <span>•</span>
                    <span className="flex items-center text-green-600">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {item * 50 + 120}%
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {["科技", "商业", "健康", "音乐", "美食"][item - 1]}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            <BarChart3 className="mr-2 inline-block h-5 w-5" />
            {timeframe}热门类别
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            { name: "科技", count: 128, growth: "+12%", color: "bg-blue-500" },
            { name: "商业", count: 96, growth: "+8%", color: "bg-green-500" },
            { name: "健康", count: 84, growth: "+15%", color: "bg-red-500" },
            { name: "音乐", count: 72, growth: "+5%", color: "bg-yellow-500" },
            { name: "美食", count: 64, growth: "+10%", color: "bg-purple-500" },
            { name: "旅行", count: 56, growth: "+18%", color: "bg-pink-500" },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:bg-muted/50"
            >
              <div className={`h-10 w-1 rounded-full ${category.color}`} />
              <div className="flex-1">
                <h3 className="font-medium">{category.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{category.count} 个节目</span>
                  <span className="text-sm text-green-600">{category.growth}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

