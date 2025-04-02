import { useState, useEffect } from "react"
import { api, type Episode } from "@/lib/api"

export function useLatestEpisodes(subscriptions: any[]) {
  const [latestEpisodes, setLatestEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLatestEpisodes() {
      if (!subscriptions?.length) {
        setLatestEpisodes([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // 获取所有订阅播客的最新剧集
        const episodePromises = subscriptions.map(podcast => 
          api.getPodcastEpisodes(podcast.id)
        )

        const episodeResponses = await Promise.all(episodePromises)
        
        // 合并所有播客的剧集并按日期排序
        const allEpisodes = episodeResponses
          .filter(response => response.success && Array.isArray(response.data))
          .flatMap(response => response.data)
          .sort((a, b) => {
            const dateA = new Date(a?.datePublished || a?.datePublishedPretty || new Date())
            const dateB = new Date(b?.datePublished || b?.datePublishedPretty || new Date())
            return dateB.getTime() - dateA.getTime()
          })
          .slice(0, 10) // 只保留最新的10集

        setLatestEpisodes(allEpisodes.filter((episode): episode is Episode => episode !== undefined))
      } catch (err) {
        console.error("获取最新剧集失败:", err)
        setError("获取最新剧集时发生错误")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestEpisodes()
  }, [subscriptions])

  return { latestEpisodes, isLoading, error }
}