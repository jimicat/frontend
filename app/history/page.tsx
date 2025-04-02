"use client"

// Add cn utility import
import { cn } from "@/lib/utils"
import { useState } from "react"
import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Clock,
  Search,
  Play,
  Trash2,
  MoreHorizontal,
  Calendar,
  AlertCircle,
  Loader2,
  ArrowUpDown,
  CheckCircle2,
  Bookmark,
  BookmarkPlus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useHistory } from "@/hooks/use-history"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatDate, formatDuration } from "@/lib/utils"

export default function HistoryPage() {
  const { history, isLoading, error, removeFromHistory, clearHistory, markAsCompleted } = useHistory()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [isClearing, setIsClearing] = useState(false)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const [processingItem, setProcessingItem] = useState<string | null>(null)

  // 搜索和排序历史记录
  const filteredHistory = history
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.podcast_title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(a.listened_at).getTime()
      const dateB = new Date(b.listened_at).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

  // 根据标签页筛选
  const getFilteredItems = () => {
    if (activeTab === "all") return filteredHistory
    if (activeTab === "completed") return filteredHistory.filter((item) => item.completed)
    if (activeTab === "in-progress") return filteredHistory.filter((item) => !item.completed)
    return filteredHistory
  }

  const displayItems = getFilteredItems()

  // 处理清除历史记录
  const handleClearHistory = async () => {
    setIsClearing(true)
    try {
      await clearHistory()
      setShowClearDialog(false)
    } finally {
      setIsClearing(false)
    }
  }

  // 处理移除单个历史记录
  const handleRemoveItem = async (id: string) => {
    setProcessingItem(id)
    try {
      await removeFromHistory(id)
    } finally {
      setProcessingItem(null)
    }
  }

  // 处理标记为已完成
  const handleMarkAsCompleted = async (id: string) => {
    setProcessingItem(id)
    try {
      await markAsCompleted(id)
    } finally {
      setProcessingItem(null)
    }
  }

  // Add error boundary
  if (typeof window === 'undefined') {
    return null; // Return null during SSR
  }

  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">收听历史</h1>
              <p className="text-muted-foreground">查看您最近收听的播客剧集</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索历史记录..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === "newest" ? "最新优先" : "最早优先"}
              </Button>

              <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    清除历史记录
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>清除收听历史</DialogTitle>
                    <DialogDescription>您确定要清除所有收听历史记录吗？此操作无法撤销。</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowClearDialog(false)}>
                      取消
                    </Button>
                    <Button variant="destructive" onClick={handleClearHistory} disabled={isClearing}>
                      {isClearing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          清除中...
                        </>
                      ) : (
                        "确认清除"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-initial">
                全部
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex-1 sm:flex-initial">
                进行中
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 sm:flex-initial">
                已完成
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <HistoryContent
                items={displayItems}
                isLoading={isLoading}
                error={error}
                processingItem={processingItem}
                onRemove={handleRemoveItem}
                onMarkCompleted={handleMarkAsCompleted}
                searchQuery={searchQuery}
              />
            </TabsContent>

            <TabsContent value="in-progress" className="mt-6">
              <HistoryContent
                items={displayItems}
                isLoading={isLoading}
                error={error}
                processingItem={processingItem}
                onRemove={handleRemoveItem}
                onMarkCompleted={handleMarkAsCompleted}
                searchQuery={searchQuery}
              />
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <HistoryContent
                items={displayItems}
                isLoading={isLoading}
                error={error}
                processingItem={processingItem}
                onRemove={handleRemoveItem}
                onMarkCompleted={handleMarkAsCompleted}
                searchQuery={searchQuery}
              />
            </TabsContent>
          </Tabs>

          <Separator />

          <div>
            <h2 className="mb-6 text-2xl font-bold">收听统计</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-medium">总收听时长</h3>
                </div>
                <p className="mt-3 text-3xl font-bold">
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                  ) : (
                    `${Math.floor(history.reduce((total, item) => total + (item.duration_seconds || 0), 0) / 3600)} 小时`
                  )}
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-medium">收听剧集数</h3>
                </div>
                <p className="mt-3 text-3xl font-bold">
                  {isLoading ? <Loader2 className="h-8 w-8 animate-spin text-purple-600" /> : history.length}
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-medium">已完成剧集</h3>
                </div>
                <p className="mt-3 text-3xl font-bold">
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                  ) : (
                    history.filter((item) => item.completed).length
                  )}
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-medium">最近收听</h3>
                </div>
                <p className="mt-3 text-xl font-bold">
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                  ) : history.length > 0 ? (
                    formatDate(history[0].listened_at)
                  ) : (
                    "无记录"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

interface HistoryContentProps {
  items: any[]
  isLoading: boolean
  error: string | null
  processingItem: string | null
  onRemove: (id: string) => void
  onMarkCompleted: (id: string) => void
  searchQuery: string
}

function HistoryContent({
  items,
  isLoading,
  error,
  processingItem,
  onRemove,
  onMarkCompleted,
  searchQuery,
}: HistoryContentProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
          <p className="text-muted-foreground">加载历史记录中...</p>
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

  if (items.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <p className="text-muted-foreground">
          {searchQuery ? `没有找到匹配"${searchQuery}"的历史记录` : "暂无收听历史记录"}
        </p>
        {!searchQuery && (
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/">浏览播客</Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
              <Image
                src={item.image_url || `/placeholder.svg?height=100&width=100&text=${item.title.charAt(0)}`}
                alt={item.title}
                fill
                className="object-cover"
              />
              {item.progress > 0 && item.progress < 100 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                  <div className="h-full bg-purple-600" style={{ width: `${item.progress}%` }} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/episode/${item.episode_id}`} className="hover:underline">
                <h3 className="font-medium">{item.title}</h3>
              </Link>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Link href={`/podcast/${item.podcast_id}`} className="hover:underline">
                  {item.podcast_title}
                </Link>
                <span>•</span>
                <span>{formatDuration(item.duration || "0:00")}</span>
                <span>•</span>
                <span>
                  {new Date(item.listened_at).toLocaleDateString()}{" "}
                  {new Date(item.listened_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {item.completed && (
                  <>
                    <span>•</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      已完成
                    </span>
                  </>
                )}
                {!item.completed && item.progress > 0 && (
                  <>
                    <span>•</span>
                    <span>{item.progress}%</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href={`/episode/${item.episode_id}`}>
                  <Play className="h-4 w-4" />
                  <span className="sr-only">播放</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">更多选项</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!item.completed && (
                    <DropdownMenuItem onClick={() => onMarkCompleted(item.id)} disabled={processingItem === item.id}>
                      {processingItem === item.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      )}
                      标记为已完成
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href={`/podcast/${item.podcast_id}`}>
                      <Bookmark className="mr-2 h-4 w-4" />
                      查看播客
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/episode/${item.episode_id}`}>
                      <BookmarkPlus className="mr-2 h-4 w-4" />
                      保存到库
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950"
                    onClick={() => onRemove(item.id)}
                    disabled={processingItem === item.id}
                  >
                    {processingItem === item.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    从历史记录中移除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

