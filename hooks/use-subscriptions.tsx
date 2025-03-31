"use client"

import { useState, useEffect } from "react"
import { api, type Podcast } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Podcast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // 获取用户订阅
  const fetchSubscriptions = async () => {
    if (!user) {
      setSubscriptions([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await api.getSubscriptions()
    
      if (response.success && Array.isArray(response.data)) {
        setSubscriptions(response.data) // Ensure it's an array
      } else {
        setSubscriptions([]) // Fallback to an empty array
        setError(response.message || "获取订阅失败")
      }
    } catch (err) {
      setSubscriptions([]) // Fallback to an empty array
      setError("获取订阅时发生错误")
      console.error(err)
    }
  }

  // 订阅播客
  const subscribeToPodcast = async (podcastId: string) => {
    if (!user) return false

    try {
      const response = await api.subscribeToPodcast(podcastId)

      if (response.success) {
        // 重新获取订阅列表
        await fetchSubscriptions()
        return true
      } else {
        setError(response.message || "订阅失败")
        return false
      }
    } catch (err) {
      setError("订阅过程中发生错误")
      console.error(err)
      return false
    }
  }

  // 取消订阅播客
  const unsubscribeFromPodcast = async (podcastId: string) => {
    if (!user) return false

    try {
      const response = await api.unsubscribeFromPodcast(podcastId)

      if (response.success) {
        // 更新本地订阅列表
        setSubscriptions((prev) => prev.filter((podcast) => podcast.id !== podcastId))
        return true
      } else {
        setError(response.message || "取消订阅失败")
        return false
      }
    } catch (err) {
      setError("取消订阅过程中发生错误")
      console.error(err)
      return false
    }
  }

  // 检查是否已订阅
  const isSubscribed = (podcastId: string) => {
    return subscriptions.some((podcast) => podcast.id === podcastId)
  }

  // 当用户变化时获取订阅
  useEffect(() => {
    fetchSubscriptions()
  }, [user])

  return {
    subscriptions,
    isLoading,
    error,
    fetchSubscriptions,
    subscribeToPodcast,
    unsubscribeFromPodcast,
    isSubscribed,
  }
}

