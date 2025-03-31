"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Heart, Share2, User, Play, Bookmark, BookmarkCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EpisodeCardProps {
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
}

export function EpisodeCard({
  id,
  title,
  description,
  image,
  duration,
  date,
  category,
  author,
  views,
  isFavorite: initialIsFavorite,
}: EpisodeCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group overflow-hidden transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2">
          <Link href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
            <Badge className="bg-purple-600 hover:bg-purple-700">{category}</Badge>
          </Link>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
          <Clock className="h-3 w-3" />
          {duration}
        </div>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity">
            <Link href={`/episode/${id}`}>
              <Button className="h-14 w-14 rounded-full bg-purple-600 text-white hover:bg-purple-700">
                <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                <span className="sr-only">Play</span>
              </Button>
            </Link>
          </div>
        )}

        {/* Add a clickable overlay for the entire card that doesn't include the badge */}
        <Link href={`/episode/${id}`}>
          <span className="absolute inset-0 z-10" aria-hidden="true" />
        </Link>
      </div>
      <CardContent className="p-4">
        <Link href={`/episode/${id}`} className="hover:underline">
          <h3 className="line-clamp-1 text-xl font-bold">{title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <Link href={`/author/${author.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
              {author}
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {views.toLocaleString()}
          </div>
          <div>{date}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={isFavorite ? "text-red-500" : ""}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                <span className="sr-only">Favorite</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isFavorite ? "Remove from favorites" : "Add to favorites"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={isBookmarked ? "text-purple-600" : ""}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                {isBookmarked ? <BookmarkCheck className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
                <span className="sr-only">Bookmark</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isBookmarked ? "Remove from library" : "Add to library"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

