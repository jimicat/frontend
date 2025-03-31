"use client"

import { useState, useEffect } from "react"
import { api, type Podcast } from "@/lib/api"

export function useTrending() {
  const [trendingPodcasts, setTrendingPodcasts] = useState<Podcast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrendingPodcasts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.getTrendingPodcasts()

      if (response.success && response.data) {
        setTrendingPodcasts(response.data)
      } else {
        setError(response.message || "获取热门播客失败")
      }
    } catch (err) {
      setError("获取热门播客时发生错误")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingPodcasts()
  }, [])

  return {
    trendingPodcasts,
    isLoading,
    error,
    refreshTrending: fetchTrendingPodcasts,
  }
}

