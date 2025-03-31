"use client"

import { useState, useEffect } from "react"
import { api, type Podcast, type Episode } from "@/lib/api"
import { useSubscriptions } from "@/hooks/use-subscriptions"
import { useAuth } from "@/hooks/use-auth"

export function usePodcast(podcastId: string) {
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { isSubscribed, subscribeToPodcast, unsubscribeFromPodcast } = useSubscriptions()

  // 获取播客详情
  const fetchPodcastDetails = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // 获取播客详情
      const podcastResponse = await api.getPodcastDetails(podcastId)
      console.log("podcastResponse", podcastResponse)

      if (podcastResponse.success && podcastResponse.data) {
        setPodcast(podcastResponse.data)
      } else {
        setError(podcastResponse.message || "获取播客详情失败")
        return
      }

      // 获取播客剧集
      const episodesResponse = await api.getPodcastEpisodes(podcastId)
      console.log("episodesResponse", episodesResponse) 

      if (episodesResponse.success && episodesResponse.data) {
        setEpisodes(episodesResponse.data)
      } else {
        setError(episodesResponse.message || "获取播客剧集失败")
      }
    } catch (err) {
      setError("获取播客信息时发生错误")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 订阅播客
  const subscribe = async () => {
    if (!user) return false
    return await subscribeToPodcast(podcastId)
  }

  // 取消订阅播客
  const unsubscribe = async () => {
    if (!user) return false
    return await unsubscribeFromPodcast(podcastId)
  }

  // 检查是否已订阅
  const checkIsSubscribed = () => {
    return isSubscribed(podcastId)
  }

  // 初始加载
  useEffect(() => {
    if (podcastId) {
      fetchPodcastDetails()
    }
  }, [podcastId])

  return {
    podcast,
    episodes,
    isLoading,
    error,
    isSubscribed: checkIsSubscribed(),
    subscribe,
    unsubscribe,
    refreshPodcast: fetchPodcastDetails,
  }
}

