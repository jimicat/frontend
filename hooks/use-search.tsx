"use client"

import { useState } from "react"
import { api, type Podcast } from "@/lib/api"

export function useSearch() {
  const [searchResults, setSearchResults] = useState<Podcast[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchPodcasts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await api.searchPodcasts(query)

      if (response.success && response.data) {
        setSearchResults(response.data)
      } else {
        setError(response.message || "搜索失败")
      }
    } catch (err) {
      setError("搜索过程中发生错误")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    searchResults,
    isLoading,
    error,
    searchPodcasts,
  }
}

