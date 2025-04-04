"use client"

import { useState } from "react"
import { api, type Podcast, type Episode, type Creator } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function useSearch() {
  const { toast } = useToast()
  const [searchResults, setSearchResults] = useState<Podcast[]>([])
  const [episodeResults, setEpisodeResults] = useState<Episode[]>([])
  const [creatorResults, setCreatorResults] = useState<Creator[]>([])
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

  // const searchEpisodes = async (query: string) => {
  //   if (!query.trim()) {
  //     setEpisodeResults([])
  //     return
  //   }

  //   setIsLoading(true)
  //   setError(null)

  //   try {
  //     const response = await api.searchEpisodes(query)

  //     if (response.success && response.data) {
  //       setEpisodeResults(response.data)
  //     } else {
  //       setError(response.message || "搜索失败")
  //     }
  //   } catch (err) {
  //     setError("搜索过程中发生错误")
  //     console.error(err)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const searchCreators = async (query: string) => {
  //   if (!query.trim()) {
  //     setCreatorResults([])
  //     return
  //   }

  //   setIsLoading(true)
  //   setError(null)

  //   try {
  //     const response = await api.searchCreators(query)

  //     if (response.success && response.data) {
  //       setCreatorResults(response.data)
  //     } else {
  //       setError(response.message || "搜索失败")
  //     }
  //   } catch (err) {
  //     setError("搜索过程中发生错误")
  //     console.error(err)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const searchAll = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setEpisodeResults([])
      setCreatorResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const [podcastsResponse, episodesResponse, creatorsResponse] = await Promise.all([
        api.searchPodcasts(query),
        // api.searchEpisodes(query),
        // api.searchCreators(query),
      ])

      if (podcastsResponse.success && podcastsResponse.data) {
        setSearchResults(podcastsResponse.data)
      }

      // if (episodesResponse.success && episodesResponse.data) {
      //   setEpisodeResults(episodesResponse.data)
      // }

      // if (creatorsResponse.success && creatorsResponse.data) {
      //   setCreatorResults(creatorsResponse.data)
      // }

      // if (!podcastsResponse.success && !episodesResponse.success && !creatorsResponse.success) {
        if (!podcastsResponse.success) {
        setError("搜索失败")
        toast({
          variant: "destructive",
          title: "搜索失败",
          description: "无法获取搜索结果，请稍后重试",
        })
      }
    } catch (err) {
      setError("搜索过程中发生错误")
      console.error(err)
      toast({
        variant: "destructive",
        title: "搜索失败",
        description: "搜索过程中发生错误，请稍后重试",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    searchResults,
    episodeResults,
    creatorResults,
    isLoading,
    error,
    searchPodcasts,
    // searchEpisodes,
    // searchCreators,
    searchAll,
  }
}

