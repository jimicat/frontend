"use client"

import { useState } from "react"
import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { CategoryFilter } from "@/components/category-filter"
import { Newsletter } from "@/components/newsletter"
import { PodcastCard } from "@/components/podcast-card"
import { useTrending } from "@/hooks/use-trending"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export default function Home() {
  const { trendingPodcasts, isLoading, error } = useTrending()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const podcastsPerPage = 6

  // 根据选择的类别筛选播客
  const filteredPodcasts =
    selectedCategory === "All"
      ? trendingPodcasts
      : trendingPodcasts.filter((podcast) => podcast.category === selectedCategory)

  // 计算分页
  const indexOfLastPodcast = currentPage * podcastsPerPage
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage
  const currentPodcasts = filteredPodcasts.slice(indexOfFirstPodcast, indexOfLastPodcast)
  const totalPages = Math.ceil(filteredPodcasts.length / podcastsPerPage)

  // 处理类别变化
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // 重置到第一页
  }

  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">发现播客</h1>
            <p className="text-muted-foreground">探索热门播客，找到您感兴趣的内容</p>
          </div>

          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
                <p className="text-muted-foreground">加载播客中...</p>
              </div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : currentPodcasts.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
              <p className="text-muted-foreground">
                {selectedCategory === "All" ? "暂无播客数据" : `没有找到类别为"${selectedCategory}"的播客`}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentPodcasts.map((podcast) => (
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

              {totalPages > 1 && (
                <Pagination>
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
            </>
          )}

          <Newsletter />
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

