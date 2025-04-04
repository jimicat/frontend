"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Clock, Filter, Loader2, SearchIcon, Trash2, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearch } from "@/hooks/use-search"
import { PodcastCard } from "@/components/podcast-card"
import { EpisodeCard } from "@/components/episode-card"
import { CreatorCard } from "@/components/creator-card"
import { SearchResultSkeleton } from "@/components/search/search-result-skeleton"

// 热门搜索关键词
const trendingSearches = ["技术播客", "商业访谈", "健康生活", "音乐评论", "旅行故事", "科学探索"]

// 搜索历史存储键
const SEARCH_HISTORY_KEY = "podcast_search_history"

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const {
    searchResults,
    episodeResults,
    creatorResults,
    isLoading,
    error,
    searchAll,
    searchPodcasts,
    // searchEpisodes,
    // searchCreators,
  } = useSearch()

  // 从本地存储加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  // 重置搜索状态
  useEffect(() => {
    if (!open) {
      setQuery("")
      setHasSearched(false)
      setActiveTab("all")
      setCategory("all")
      setSortBy("relevance")
      setShowFilters(false)
    }
  }, [open])

  // 添加到搜索历史
  const addToSearchHistory = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    const newHistory = [searchQuery, ...searchHistory.filter((item) => item !== searchQuery)].slice(0, 10) // 只保留最近10条

    setSearchHistory(newHistory)
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  }

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  }

  // 删除单个搜索历史
  const removeFromHistory = (item: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newHistory = searchHistory.filter((h) => h !== item)
    setSearchHistory(newHistory)
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  }

  // 执行搜索
  const performSearch = () => {
    if (!query.trim()) return

    setHasSearched(true)
    addToSearchHistory(query)

    switch (activeTab) {
      case "podcasts":
        searchPodcasts(query, { category, sortBy })
        break
      case "episodes":
        // searchEpisodes(query, { sortBy })
        break
      case "creators":
        // searchCreators(query, { sortBy })
        break
      default:
        searchAll(query, { category, sortBy })
    }
  }

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  // 处理标签页变化
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (hasSearched) {
      performSearch()
    }
  }

  // 处理筛选条件变化
  const handleFilterChange = () => {
    if (hasSearched) {
      performSearch()
    }
  }

  // 处理快速搜索
  const handleQuickSearch = (term: string) => {
    setQuery(term)
    setTimeout(() => {
      performSearch()
    }, 0)
  }

  // 处理导航到详情页
  const handleNavigate = (url: string) => {
    router.push(url)
    onOpenChange(false)
  }

  // 获取当前标签页的结果
  const getCurrentResults = () => {
    if (activeTab === "podcasts" || activeTab === "all") {
      // 处理播客搜索结果
      if (searchResults?.feeds) {
        return searchResults.feeds.map(feed => ({
          id: feed.id,
          type: "podcast",
          title: feed.title,
          description: feed.description,
          image_url: feed.artwork || feed.image,
          author: feed.author,
          category: Object.values(feed.categories || {})[0] || "未分类",
          episode_count: feed.episodeCount
        }))
      }
      return []
    } else if (activeTab === "episodes") {
      return Array.isArray(episodeResults) ? episodeResults : []
    } else if (activeTab === "creators") {
      return Array.isArray(creatorResults) ? creatorResults : []
    }
    return []
  }

  const results = getCurrentResults()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto sm:max-w-[90vw] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>搜索</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex w-full gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索播客、剧集或创作者..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" disabled={!query.trim() || isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            搜索
          </Button>
        </form>

        {!hasSearched ? (
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {/* 搜索历史 */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">最近搜索</h3>
                {searchHistory.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearSearchHistory}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    清除历史
                  </Button>
                )}
              </div>

              {searchHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground">暂无搜索历史</p>
              ) : (
                <div className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <button
                          type="button"
                          className="text-sm hover:underline"
                          onClick={() => handleQuickSearch(item)}
                        >
                          {item}
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => removeFromHistory(item, e)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 热门搜索 */}
            <div>
              <h3 className="mb-4 text-lg font-medium">热门搜索</h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => handleQuickSearch(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList>
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="podcasts">播客</TabsTrigger>
                  <TabsTrigger value="episodes">剧集</TabsTrigger>
                  <TabsTrigger value="creators">创作者</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="mr-2 h-4 w-4" />
                    筛选
                  </Button>

                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value)
                      setTimeout(handleFilterChange, 0)
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">相关性</SelectItem>
                      <SelectItem value="newest">最新</SelectItem>
                      <SelectItem value="oldest">最早</SelectItem>
                      <SelectItem value="popular">最受欢迎</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {showFilters && (activeTab === "all" || activeTab === "podcasts") && (
                <div className="my-4 flex flex-wrap gap-2">
                  <Badge
                    variant={category === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      setCategory("all")
                      setTimeout(handleFilterChange, 0)
                    }}
                  >
                    全部类别
                  </Badge>
                  {[
                    "Technology",
                    "Business",
                    "Health & Wellness",
                    "Music",
                    "Food",
                    "Travel",
                    "Science",
                    "Education",
                    "Entertainment",
                  ].map((cat) => (
                    <Badge
                      key={cat}
                      variant={category === cat ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setCategory(cat)
                        setTimeout(handleFilterChange, 0)
                      }}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="my-4" />

              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? (
                    "搜索中..."
                  ) : (
                    <>
                      找到 <span className="font-medium">{results.length}</span> 个与 "
                      <span className="font-medium">{query}</span>" 相关的结果
                    </>
                  )}
                </p>
              </div>

              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SearchResultSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : results.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <SearchIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">未找到结果</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    没有找到与 "{query}" 相关的{" "}
                    {activeTab === "podcasts"
                      ? "播客"
                      : activeTab === "episodes"
                        ? "剧集"
                        : activeTab === "creators"
                          ? "创作者"
                          : "内容"}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-medium">建议：</p>
                    <ul className="mt-2 text-sm text-muted-foreground">
                      <li>检查您的拼写</li>
                      <li>尝试使用不同的关键词</li>
                      <li>尝试使用更通用的关键词</li>
                      <li>尝试使用更少的关键词</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="grid max-h-[50vh] gap-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
                  {results.slice(0, 9).map((result) => {
                    if (result.type === "podcast") {
                      return (
                        <div
                          key={result.id}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                          onClick={() => handleNavigate(`/podcast/${result.id}`)}
                        >
                          <PodcastCard
                            id={result.id}
                            title={result.title}
                            description={result.description}
                            imageUrl={result.image_url}
                            author={result.author}
                            category={result.category}
                            episodeCount={result.episode_count}
                          />
                        </div>
                      )
                    } else if (result.type === "episode") {
                      return (
                        <div
                          key={result.id}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                          onClick={() => handleNavigate(`/episode/${result.id}`)}
                        >
                          <EpisodeCard
                            id={result.id}
                            title={result.title}
                            description={result.description}
                            imageUrl={result.image_url}
                            podcastTitle={result.podcast_title}
                            duration={result.duration}
                            publishDate={result.publish_date}
                          />
                        </div>
                      )
                    } else if (result.type === "creator") {
                      return (
                        <div
                          key={result.id}
                          className="cursor-pointer transition-opacity hover:opacity-90"
                          onClick={() => handleNavigate(`/creator/${result.id}`)}
                        >
                          <CreatorCard
                            id={result.id}
                            name={result.name}
                            imageUrl={result.image_url}
                            bio={result.bio}
                            podcastCount={result.podcast_count}
                            followerCount={result.follower_count}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              )}

              {results.length > 9 && (
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(query)}`)
                      onOpenChange(false)
                    }}
                  >
                    查看更多结果
                  </Button>
                </div>
              )}
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

