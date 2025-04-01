"use client"

import { useState, useEffect } from "react"
import { api, type Podcast } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Podcast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  // 获取用户订阅
  const fetchSubscriptions = async () => {
    if (!user) {
      setSubscriptions([]) // Ensure subscriptions is an array
      setIsLoading(false)
      return
    }
  
    setIsLoading(true)
    setError(null)
  
    try {
      const response = await api.getSubscriptions()
  
      if ( Array.isArray(response.data)) {
        setSubscriptions(response.data) // Ensure data is an array

      } else {
        setSubscriptions([]) // Fallback to an empty array
        setError(response.message || "获取订阅失败")
      }
    } catch (err) {
      setSubscriptions([]) // Fallback to an empty array on error
      setError("获取订阅时发生错误")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 订阅播客
  const subscribeToPodcast = async (podcastId: string) => {
    if (!user) return false

    try {
      const response = await api.subscribeToPodcast(podcastId)

      if (response.success) {
        // 获取播客详情以添加到订阅列表
        const podcastResponse = await api.getPodcastDetails(podcastId)
        if (podcastResponse.success && podcastResponse.data) {
          setSubscriptions((prev) => [...prev, podcastResponse.data])
        }

        toast({
          title: "订阅成功",
          description: "已添加到您的订阅列表",
        })

        return true
      } else {
        toast({
          title: "订阅失败",
          description: response.message || "无法订阅此播客",
          variant: "destructive",
        })

        setError(response.message || "订阅失败")
        return false
      }
    } catch (err) {
      toast({
        title: "订阅失败",
        description: "发生错误，请稍后再试",
        variant: "destructive",
      })

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

        toast({
          title: "已取消订阅",
          description: "已从您的订阅列表中移除",
        })

        return true
      } else {
        toast({
          title: "取消订阅失败",
          description: response.message || "无法取消订阅此播客",
          variant: "destructive",
        })

        setError(response.message || "取消订阅失败")
        return false
      }
    } catch (err) {
      toast({
        title: "取消订阅失败",
        description: "发生错误，请稍后再试",
        variant: "destructive",
      })

      setError("取消订阅过程中发生错误")
      console.error(err)
      return false
    }
  }

  // 检查是否已订阅
  const isSubscribed = (podcastId: string) => {
    return Array.isArray(subscriptions) && subscriptions.some((podcast) => podcast.id === podcastId);
  };
  

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

