"use client"

import { useState, useEffect, useCallback } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"

export type Notification = {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  created_at: string
  action_url?: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  // 获取通知列表
  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      setNotifications([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await api.getNotifications()

      if (response.success && response.data) {
        setNotifications(response.data)
      } else {
        setError(response.message || "获取通知失败")
      }
    } catch (err) {
      setError("获取通知时发生错误")
      console.error("获取通知错误:", err)
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  // 标记通知为已读
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await api.markNotificationAsRead(notificationId)

      if (response.success) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId ? { ...notification, read: true } : notification,
          ),
        )
        return true
      }
      return false
    } catch (err) {
      console.error("标记通知为已读错误:", err)
      throw err
    }
  }

  // 标记所有通知为已读
  const markAllAsRead = async () => {
    try {
      const response = await api.markAllNotificationsAsRead()

      if (response.success) {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
        return true
      }
      return false
    } catch (err) {
      console.error("标记所有通知为已读错误:", err)
      throw err
    }
  }

  // 删除通知
  const deleteNotification = async (notificationId: string) => {
    try {
      const response = await api.deleteNotification(notificationId)

      if (response.success) {
        setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
        return true
      }
      return false
    } catch (err) {
      console.error("删除通知错误:", err)
      throw err
    }
  }

  // 清除所有通知
  const clearAllNotifications = async () => {
    try {
      const response = await api.clearAllNotifications()

      if (response.success) {
        setNotifications([])
        return true
      }
      return false
    } catch (err) {
      console.error("清除所有通知错误:", err)
      throw err
    }
  }

  // 获取未读通知数量
  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.read).length
  }

  // 初始加载通知
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications()
    } else {
      setNotifications([])
      setIsLoading(false)
    }
  }, [isAuthenticated, fetchNotifications])

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    getUnreadCount,
    fetchNotifications,
  }
}

