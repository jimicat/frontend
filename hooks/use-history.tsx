"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export interface HistoryItem {
  id: string
  episode_id: string
  podcast_id: string
  title: string
  podcast_title: string
  image_url: string
  duration: string
  duration_seconds: number
  progress: number
  completed: boolean
  listened_at: string
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  // 获取用户历史记录
  const fetchHistory = async () => {
    if (!user) {
      setHistory([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await api.getListeningHistory()

      if (response.success && response.data) {
        setHistory(response.data)
      } else {
        setError(response.message || "获取历史记录失败")
      }
    } catch (err) {
      setError("获取历史记录时发生错误")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 从历史记录中移除项目
  const removeFromHistory = async (itemId: string) => {
    if (!user) return false

    try {
      const response = await api.removeFromHistory(itemId)

      if (response.success) {
        // 更新本地历史记录
        setHistory((prev) => prev.filter((item) => item.id !== itemId))

        toast({
          title: "已移除",
          description: "已从历史记录中移除",
        })

        return true
      } else {
        toast({
          title: "移除失败",
          description: response.message || "无法从历史记录中移除",
          variant: "destructive",
        })

        setError(response.message || "移除失败")
        return false
      }
    } catch (err) {
      toast({
        title: "移除失败",
        description: "发生错误，请稍后再试",
        variant: "destructive",
      })

      setError("移除过程中发生错误")
      console.error(err)
      return false
    }
  }

  // 清除所有历史记录
  const clearHistory = async () => {
    if (!user) return false

    try {
      const response = await api.clearHistory()

      if (response.success) {
        // 清空本地历史记录
        setHistory([])

        toast({
          title: "已清除",
          description: "已清除所有历史记录",
        })

        return true
      } else {
        toast({
          title: "清除失败",
          description: response.message || "无法清除历史记录",
          variant: "destructive",
        })

        setError(response.message || "清除失败")
        return false
      }
    } catch (err) {
      toast({
        title: "清除失败",
        description: "发生错误，请稍后再试",
        variant: "destructive",
      })

      setError("清除过程中发生错误")
      console.error(err)
      return false
    }
  }

  // 标记为已完成
  const markAsCompleted = async (itemId: string) => {
    if (!user) return false

    try {
      const response = await api.markHistoryItemCompleted(itemId)

      if (response.success) {
        // 更新本地历史记录
        setHistory((prev) =>
          prev.map((item) => (item.id === itemId ? { ...item, completed: true, progress: 100 } : item)),
        )

        toast({
          title: "已标记为完成",
          description: "剧集已标记为已完成",
        })

        return true
      } else {
        toast({
          title: "标记失败",
          description: response.message || "无法标记为已完成",
          variant: "destructive",
        })

        setError(response.message || "标记失败")
        return false
      }
    } catch (err) {
      toast({
        title: "标记失败",
        description: "发生错误，请稍后再试",
        variant: "destructive",
      })

      setError("标记过程中发生错误")
      console.error(err)
      return false
    }
  }

  // 当用户变化时获取历史记录
  useEffect(() => {
    fetchHistory()
  }, [user])

  return {
    history,
    isLoading,
    error,
    fetchHistory,
    removeFromHistory,
    clearHistory,
    markAsCompleted,
  }
}

