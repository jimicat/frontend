"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api, type User } from "@/lib/api"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 检查用户是否已登录
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 验证令牌是否有效
        const isValid = await api.validateToken()

        if (isValid) {
          // 如果令牌有效，从本地存储获取用户信息
          const storedUser = localStorage.getItem("podcasthub-user")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (err) {
        console.error("Auth validation error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // 登录函数
  const login = async (username: string, password: string): Promise<boolean> => {
    setError(null)
    try {
      const response = await api.login(username, password)
      console.log("Login response:", response)

      if (response.success && response.data) {
        const userData = response.data
        setUser(userData)

        // 保存用户信息到本地存储
        localStorage.setItem("podcasthub-user", JSON.stringify(userData))
        return true
      } else {
        setError(response.message || "登录失败")
        return false
      }
    } catch (err) {
      setError("登录过程中发生错误")
      return false
    }
  }

  // 注册函数
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setError(null)
    try {
      const response = await api.register(username, email, password)

      if (response.success && response.data) {
        const userData = response.data
        setUser(userData)

        // 保存用户信息到本地存储
        localStorage.setItem("podcasthub-user", JSON.stringify(userData))
        return true
      } else {
        setError(response.message || "注册失败")
        return false
      }
    } catch (err) {
      setError("注册过程中发生错误")
      return false
    }
  }

  // 登出函数
  const logout = () => {
    api.logout()
    setUser(null)
    localStorage.removeItem("podcasthub-user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, error }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

