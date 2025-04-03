// API基础URL
const API_BASE_URL = "http://127.0.0.1:5000"

// 定义API响应类型
type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
  token?: string
}

// 用户类型
export type User = {
  id: string
  username: string
  email: string
  // 个人资料字段
  name?: string
  bio?: string
  avatar?: string
  coverImage?: string
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
  // 播客相关
  podcasts?: {
    id: string
    title: string
    description: string
    image: string
    episodeCount: number
    followers: number
    frequency: string
  }[]
  // 收听历史
  listeningHistory?: {
    id: string
    title: string
    description: string
    image: string
    duration: string
    date: string
    category: string
    author: string
    views: number
    isFavorite: boolean
  }[]
  // 关注的用户
  followingUsers?: {
    id: string
    username: string
    name: string
    avatar: string
  }[]
}

// 播客类型
export type Podcast = {
  podcast_id: any
  id: string
  title: string
  description: string
  image: string
  author: string
  categories: { [key: string]: string }
  website: string
  feed_url: string
  episodeCount: number
}

// 剧集类型
export type Episode = {
  enclosureUrl: string
  id: string
  title: string
  description: string
  audio_url: string
  image: string
  datePublishedPretty: string
  datePublished: number
  duration: number
  podcast_id: string
}

// API客户端类
class ApiClient {
  // 获取存储的JWT令牌
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("podcasthub-token")
    }
    return null
  }

  // 设置JWT令牌
  private setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("podcasthub-token", token)
    }
  }

  // 清除JWT令牌
  private clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("podcasthub-token")
    }
  }

  // 构建请求头
  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (includeAuth) {
      const token = this.getToken()
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
    }

    return headers
  }

  // 发送请求的通用方法
  private async fetchApi<T>(endpoint: string, method = "GET", body?: any, includeAuth = true): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: this.getHeaders(includeAuth),
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await response.json()
      console.log("API响应:", data)

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "请求失败",
        }
      }

      // 如果响应包含token，保存它
      if (data.token) {
        this.setToken(data.token)
      }

      return {
        success: true,
        data: data,
        message: data.message,
        token: data.token,
      }
    } catch (error) {
      console.error("API请求错误:", error)
      return {
        success: false,
        message: "网络错误，请稍后再试",
      }
    }
  }

  // 用户注册
  async register(username: string, email: string, password: string): Promise<ApiResponse<User>> {
    console.log("Register request:", { username, email, password })
    try {
      const response = await this.fetchApi<User>("/api/register", "POST", { username, email, password }, false)
      console.log("Register response:", response)
      return response
    } catch (error) {
      console.error("Register API error:", error)
      throw error
    }
  }

  // 用户登录
  async login(username: string, password: string): Promise<ApiResponse<User>> {
    return this.fetchApi<User>("/api/login", "POST", { username, password }, false)
  }

  // 获取用户订阅
  async getSubscriptions(): Promise<ApiResponse<Podcast[]>> {
    return this.fetchApi<Podcast[]>("/api/subscriptions")
  }

  // 订阅播客
  async subscribeToPodcast(podcastId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/subscribe", "POST", { podcast_id: podcastId })
  }

  // 取消订阅播客
  async unsubscribeFromPodcast(podcastId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/unsubscribe", "POST", { podcast_id: podcastId })
  }

  // 获取热门播客
  async getTrendingPodcasts(): Promise<ApiResponse<Podcast[]>> {
    return this.fetchApi<Podcast[]>("/api/trending", "GET", undefined, false)
  }

  // 获取播客剧集
  async getPodcastEpisodes(feedId: string): Promise<ApiResponse<Episode[]>> {
    return this.fetchApi<Episode[]>(`/api/podcasts/${feedId}`, "GET", undefined, false)
  }

  // 搜索播客
  async searchPodcasts(query: string): Promise<ApiResponse<Podcast[]>> {
    return this.fetchApi<Podcast[]>(`/api/search?q=${encodeURIComponent(query)}`, "GET", undefined, false)
  }

  // 登出（客户端）
  logout(): void {
    this.clearToken()
  }

  // 验证当前令牌是否有效
  async validateToken(): Promise<boolean> {
    const token = this.getToken()
    if (!token) return false

    // 这里可以添加一个验证令牌的API调用，如果后端提供了这样的端点
    // 目前我们只检查令牌是否存在
    return true
  }

    // 获取单个播客详情
  async getPodcastDetails(podcastId: string): Promise<ApiResponse<Podcast>> {
    return this.fetchApi<Podcast>(`/api/podcast_detail/${podcastId}`, "GET", undefined, false)
  }


  // 获取收听历史
  async getListeningHistory(): Promise<ApiResponse<any[]>> {
    return this.fetchApi<any[]>("/api/history")
  }

  // 从历史记录中移除项目
  async removeFromHistory(itemId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/history/remove", "POST", { item_id: itemId })
  }

  // 清除所有历史记录
  async clearHistory(): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/history/clear", "POST")
  }

  // 标记历史记录项为已完成
  async markHistoryItemCompleted(itemId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/history/complete", "POST", { item_id: itemId })
  }

  // 获取通知列表
  async getNotifications(): Promise<ApiResponse<any[]>> {
    return this.fetchApi<any[]>("/api/notifications")
  }

  // 标记通知为已读
  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/notifications/read", "POST", { notification_id: notificationId })
  }

  // 标记所有通知为已读
  async markAllNotificationsAsRead(): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/notifications/read-all", "POST")
  }

  // 删除通知
  async deleteNotification(notificationId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/notifications/delete", "POST", { notification_id: notificationId })
  }

  // 清除所有通知
  async clearAllNotifications(): Promise<ApiResponse<any>> {
    return this.fetchApi<any>("/api/notifications/clear", "POST")
  }

  // 获取用户资料
  async getUserProfile(userId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>(`/api/users/${userId}/profile`)
  }

  // 更新用户资料
  async updateUserProfile(userId: string, profileData: any): Promise<ApiResponse<any>> {
    return this.fetchApi<any>(`/api/users/${userId}/profile`, "PUT", profileData)
  }

  // 获取用户的播客
  async getUserPodcasts(userId: string): Promise<ApiResponse<any[]>> {
    return this.fetchApi<any[]>(`/api/users/${userId}/podcasts`)
  }

  // 获取用户的关注者
  async getUserFollowers(userId: string): Promise<ApiResponse<any[]>> {
    return this.fetchApi<any[]>(`/api/users/${userId}/followers`)
  }

  // 获取用户正在关注的人
  async getUserFollowing(userId: string): Promise<ApiResponse<any[]>> {
    return this.fetchApi<any[]>(`/api/users/${userId}/following`)
  }

  // 关注用户
  async followUser(userId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>(`/api/users/${userId}/follow`, "POST")
  }

  // 取消关注用户
  async unfollowUser(userId: string): Promise<ApiResponse<any>> {
    return this.fetchApi<any>(`/api/users/${userId}/unfollow`, "POST")
  }
}



// 导出API客户端实例
export const api = new ApiClient()

