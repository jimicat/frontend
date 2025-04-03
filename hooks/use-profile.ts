"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"
import { api, type User } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

// 扩展用户资料类型
export type UserProfile = User & {
  bio?: string
  coverImage?: string
  avatarImage?: string
  socialLinks?: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string
  }
  stats?: {
    following: number
    followers: number
    episodes: number
  }
  interests?: string[]
}

// 用户播客类型
export type UserPodcast = {
  id: string
  title: string
  description: string
  image_url: string
  episodeCount: number
  frequency: string
  followers: number
}

export function useProfile() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userPodcasts, setUserPodcasts] = useState<UserPodcast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  // 获取用户资料
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await api.getUserProfile(user.id)
        console.log("用户资料:", response)

        if (response.success && response.data) {
          setProfile(response.data)
        } else {
          setError(response.message || "无法获取用户资料")
          // 如果API调用失败，至少使用基本用户信息
          setProfile(user as UserProfile)
        }

        // 获取用户的播客
        const podcastsResponse = await api.getUserPodcasts(user.id)
        if (podcastsResponse.success && podcastsResponse.data) {
          setUserPodcasts(podcastsResponse.data)
        }
      } catch (err) {
        console.error("获取用户资料错误:", err)
        setError("获取用户资料时发生错误")
        // 使用基本用户信息作为后备
        setProfile(user as UserProfile)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [user])

  // 更新用户资料
  const updateProfile = async (updatedProfile: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false

    try {
      setIsUpdating(true)
      const response = await api.updateUserProfile(user.id, updatedProfile)

      if (response.success && response.data) {
        setProfile((prev) => (prev ? { ...prev, ...response.data } : response.data))
        toast({
          title: "资料已更新",
          description: "您的个人资料已成功更新。",
        })
        return true
      } else {
        toast({
          title: "更新失败",
          description: response.message || "无法更新用户资料",
          variant: "destructive",
        })
        return false
      }
    } catch (err) {
      console.error("更新用户资料错误:", err)
      toast({
        title: "更新失败",
        description: "更新用户资料时发生错误",
        variant: "destructive",
      })
      return false
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    profile,
    userPodcasts,
    isLoading: isLoading || isAuthLoading,
    isUpdating,
    error,
    updateProfile,
  }
}

