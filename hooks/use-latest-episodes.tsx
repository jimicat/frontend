import { useState, useEffect } from "react"
import { api, type Episode } from "@/lib/api"

export function useLatestEpisodes(subscriptions: any[]) {
  const [latestEpisodes, setLatestEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const fetchLatestEpisodes = async (pageNum: number) => {
    if (!subscriptions?.length) {
      setLatestEpisodes([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const episodePromises = subscriptions.map(podcast => 
        api.getPodcastEpisodes(podcast.id)
      )

      const episodeResponses = await Promise.all(episodePromises)
      
      const allEpisodes = episodeResponses
        .filter(response => response.success && Array.isArray(response.data))
        .flatMap(response => response.data)
        .sort((a, b) => {
          const dateA = new Date(a?.datePublished || a?.datePublishedPretty || new Date())
          const dateB = new Date(b?.datePublished || b?.datePublishedPretty || new Date())
          return dateB.getTime() - dateA.getTime()
        })

      const start = 0
      const end = pageNum * pageSize
      const paginatedEpisodes = allEpisodes.slice(start, end)
      
      setLatestEpisodes(paginatedEpisodes.filter((episode): episode is Episode => episode !== undefined))
      setHasMore(allEpisodes.length > end)
    } catch (err) {
      console.error("获取最新剧集失败:", err)
      setError("获取最新剧集时发生错误")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLatestEpisodes(page)
  }, [subscriptions, page])

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  return { latestEpisodes, isLoading, error, hasMore, loadMore }
}