"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PodcastLayout } from "@/components/podcast-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Clock, Filter, SearchIcon, Trash2, X } from "lucide-react"
import { PodcastCard } from "@/components/podcast-card"
import { EpisodeCard } from "@/components/episode-card"
import { CreatorCard } from "@/components/creator-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/hooks/use-search"
import { SearchResultSkeleton } from "@/components/search/search-result-skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState("all")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 9

  const { searchResults, isLoading, error, searchPodcasts, searchEpisodes, searchCreators, searchAll } = useSearch()

  // 从本地存储加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem("searchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  // 当URL参数中的查询变化时执行搜索
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      performSearch(initialQuery)

      // 添加到搜索历史
      if (initialQuery.trim() !== "") {
        addToSearchHistory(initialQuery)
      }
    }
  }, [initialQuery])

  // 执行搜索
  const performSearch = (searchQuery: string) => {
    setCurrentPage(1)

    if (searchQuery.trim() === "") return

    switch (activeTab) {
      case "podcasts":
        searchPodcasts(searchQuery, { category, sortBy })
        break
      case "episodes":
        searchEpisodes(searchQuery, { sortBy })
        break
      case "creators":
        searchCreators(searchQuery, { sortBy })
        break
      default:
        searchAll(searchQuery, { category, sortBy })
    }
  }

  // 添加到搜索历史
  const addToSearchHistory = (searchQuery: string) => {
    const newHistory = [searchQuery, ...searchHistory.filter((item) => item !== searchQuery)].slice(0, 10) // 只保留最近10条

    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("searchHistory")
  }

  // 删除单个搜索历史
  const removeFromHistory = (item: string) => {
    const newHistory = searchHistory.filter((h) => h !== item)
    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  // 处理标签页变化
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }

  // 处理筛选条件变化
  const handleFilterChange = () => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }

  // 计算当前页的结果
  const paginatedResults = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // 计算总页数
  const totalPages = Math.ceil(searchResults.length / itemsPerPage)

  // 热门搜索关键词
  const trendingSearches = ["技术播客", "商业访谈", "健康生活", "音乐评论", "旅行故事", "科学探索"]

  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">搜索</h1>
            <p className="text-muted-foreground">搜索播客、剧集和创作者</p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索播客、剧集或创作者..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus={!initialQuery}
              />
            </div>
            <Button type="submit">搜索</Button>
          </form>

          {initialQuery ? (
            <div className="flex flex-col gap-6">
              <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
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

                {isLoading ? (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <SearchResultSkeleton key={index} />
                    ))}
                  </div>
                ) : error ? (
                  <Alert variant="destructive" className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : searchResults.length === 0 ? (
                  <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <SearchIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">未找到结果</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      没有找到与 "{initialQuery}" 相关的{" "}
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
                  <TabsContent value="all" className="mt-6">
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">
                        找到 {searchResults.length} 个与 "{initialQuery}" 相关的结果
                      </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {paginatedResults.map((result) => {
                        if (result.type === "podcast") {
                          return (
                            <PodcastCard
                              key={result.id}
                              id={result.id}
                              title={result.title}
                              description={result.description}
                              imageUrl={result.image_url}
                              author={result.author}
                              category={result.category}
                              episodeCount={result.episode_count}
                            />
                          )
                        } else if (result.type === "episode") {
                          return (
                            <EpisodeCard
                              key={result.id}
                              id={result.id}
                              title={result.title}
                              description={result.description}
                              imageUrl={result.image_url}
                              podcastTitle={result.podcast_title}
                              duration={result.duration}
                              publishDate={result.publish_date}
                            />
                          )
                        } else if (result.type === "creator") {
                          return (
                            <CreatorCard
                              key={result.id}
                              id={result.id}
                              name={result.name}
                              imageUrl={result.image_url}
                              bio={result.bio}
                              podcastCount={result.podcast_count}
                              followerCount={result.follower_count}
                            />
                          )
                        }
                        return null
                      })}
                    </div>

                    {totalPages > 1 && (
                      <Pagination className="mt-6">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                if (currentPage > 1) setCurrentPage(currentPage - 1)
                              }}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>

                          {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                              <PaginationLink
                                href="#"
                                isActive={currentPage === index + 1}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(index + 1)
                                }}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                              }}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </TabsContent>
                )}

                <TabsContent value="podcasts" className="mt-6">
                  {/* 播客标签页内容 - 与全部标签页类似，但只显示播客 */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      找到 {searchResults.filter((r) => r.type === "podcast").length} 个与 "{initialQuery}" 相关的播客
                    </p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedResults
                      .filter((result) => result.type === "podcast")
                      .map((podcast) => (
                        <PodcastCard
                          key={podcast.id}
                          id={podcast.id}
                          title={podcast.title}
                          description={podcast.description}
                          imageUrl={podcast.image_url}
                          author={podcast.author}
                          category={podcast.category}
                          episodeCount={podcast.episode_count}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="episodes" className="mt-6">
                  {/* 剧集标签页内容 */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      找到 {searchResults.filter((r) => r.type === "episode").length} 个与 "{initialQuery}" 相关的剧集
                    </p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedResults
                      .filter((result) => result.type === "episode")
                      .map((episode) => (
                        <EpisodeCard
                          key={episode.id}
                          id={episode.id}
                          title={episode.title}
                          description={episode.description}
                          imageUrl={episode.image_url}
                          podcastTitle={episode.podcast_title}
                          duration={episode.duration}
                          publishDate={episode.publish_date}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="creators" className="mt-6">
                  {/* 创作者标签页内容 */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      找到 {searchResults.filter((r) => r.type === "creator").length} 个与 "{initialQuery}" 相关的创作者
                    </p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedResults
                      .filter((result) => result.type === "creator")
                      .map((creator) => (
                        <CreatorCard
                          key={creator.id}
                          id={creator.id}
                          name={creator.name}
                          imageUrl={creator.image_url}
                          bio={creator.bio}
                          podcastCount={creator.podcast_count}
                          followerCount={creator.follower_count}
                        />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="mt-4 grid gap-8 md:grid-cols-2">
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
                            className="text-sm hover:underline"
                            onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
                          >
                            {item}
                          </button>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromHistory(item)}>
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
                      onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PodcastLayout>
  )
}

