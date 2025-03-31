import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Play, User } from "lucide-react"

interface FeaturedEpisodeProps {
  id: string
  title: string
  description: string
  image: string
  duration: string
  date: string
  category: string
  author: string
  views: number
}

export function FeaturedEpisode({
  id,
  title,
  description,
  image,
  duration,
  date,
  category,
  author,
  views,
}: FeaturedEpisodeProps) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="relative aspect-[21/9] w-full md:aspect-[21/8] lg:aspect-[21/7]">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute left-4 top-4">
          <Link href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
            <Badge className="bg-purple-600 hover:bg-purple-700">{category}</Badge>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-6 lg:p-8">
        <div className="flex flex-col gap-2 md:max-w-2xl">
          <Link href={`/episode/${id}`}>
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl hover:underline">{title}</h2>
          </Link>
          <p className="line-clamp-2 text-sm text-white/80 md:text-base">{description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <Link href={`/author/${author.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
                {author}
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {views.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {duration}
            </div>
            <div>{date}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button className="gap-2 bg-purple-600 text-white hover:bg-purple-700" asChild>
              <Link href={`/episode/${id}`}>
                <Play className="h-4 w-4 fill-current" />
                Play Episode
              </Link>
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href={`/episode/${id}`}>Add to Queue</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

