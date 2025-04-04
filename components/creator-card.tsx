import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface CreatorCardProps {
  id: string
  name: string
  imageUrl: string
  bio: string
  podcastCount: number
  followerCount: number
}

export function CreatorCard({ id, name, imageUrl, bio, podcastCount, followerCount }: CreatorCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-gradient-to-r from-purple-400 to-pink-500">
        <div className="absolute -bottom-10 left-4">
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-background">
            <Image
              src={imageUrl || "/placeholder.svg?height=80&width=80"}
              alt={name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <CardContent className="mt-12 p-4">
        <Link href={`/creator/${id}`}>
          <h3 className="line-clamp-1 text-lg font-semibold hover:underline">{name}</h3>
        </Link>
        <p className="line-clamp-2 mt-1 text-sm text-muted-foreground">{bio}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-medium">{podcastCount}</span> <span className="text-muted-foreground">播客</span>
          </div>
          <div>
            <span className="font-medium">{followerCount}</span> <span className="text-muted-foreground">粉丝</span>
          </div>
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <UserPlus className="h-4 w-4" />
          <span>关注</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

