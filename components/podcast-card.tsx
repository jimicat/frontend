"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Headphones, Play, Plus, Check, Loader2 } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useSubscriptions } from "@/hooks/use-subscriptions"
import { useRouter } from "next/navigation"

interface PodcastCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  author: string
  category: string
  episodeCount?: number
}

export function PodcastCard({ id, title, description, imageUrl, author, category, episodeCount }: PodcastCardProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { isSubscribed, subscribeToPodcast, unsubscribeFromPodcast } = useSubscriptions()
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const subscribed = isSubscribed(id)

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    setIsSubscribing(true)
    try {
      if (subscribed) {
        await unsubscribeFromPodcast(id)
      } else {
        await subscribeToPodcast(id)
      }
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <Card
      className="group overflow-hidden transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/podcast/${id}`}>
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder.svg?height=400&width=400"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <Badge className="bg-purple-600 hover:bg-purple-700">{category}</Badge>
          </div>
          {episodeCount !== undefined && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
              <Headphones className="h-3 w-3" />
              {episodeCount} 集
            </div>
          )}

          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity">
              <Button className="h-14 w-14 rounded-full bg-purple-600 text-white hover:bg-purple-700">
                <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                <span className="sr-only">查看播客</span>
              </Button>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/podcast/${id}`} className="hover:underline">
          <h3 className="line-clamp-1 text-xl font-bold">{title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 text-xs text-muted-foreground">
          <span>由 {author} 主持</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/podcast/${id}`}>查看详情</Link>
        </Button>

        <Button
          variant={subscribed ? "outline" : "default"}
          size="sm"
          className={subscribed ? "" : "bg-purple-600 hover:bg-purple-700"}
          onClick={handleSubscribe}
          disabled={isSubscribing}
        >
          {isSubscribing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : subscribed ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {subscribed ? "已订阅" : "订阅"}
        </Button>
      </CardFooter>
    </Card>
  )
}

