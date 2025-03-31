"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const validateSession = async () => {
      // 如果用户已加载且不存在，直接重定向
      if (!isLoading && !user) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        return
      }

      // 如果用户存在，验证令牌是否有效
      if (user) {
        try {
          const isValid = await api.validateToken()
          if (!isValid) {
            // 令牌无效，重定向到登录页面
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
          }
        } catch (error) {
          console.error("Token validation error:", error)
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        }
      }

      setIsValidating(false)
    }

    validateSession()
  }, [user, isLoading, router, pathname])

  // 如果正在加载或验证中，显示加载状态
  if (isLoading || isValidating) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
          <p className="text-muted-foreground">正在验证您的会话...</p>
        </div>
      </div>
    )
  }

  // 用户已登录且令牌有效，渲染子组件
  return <>{children}</>
}

