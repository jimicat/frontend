// API基础URL
const API_BASE_URL = "https://podapi.ywnote.com"

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
  email?: string
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
}

// 导出API客户端实例
export const api = new ApiClient()

