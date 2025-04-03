"use client"

import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EpisodeCard } from "@/components/episode-card"
import { Settings, Share2, Twitter, Instagram, Youtube, Globe, Users, Headphones, Mic } from "lucide-react"
import Image from "next/image"
import { useProfile } from "@/hooks/use-profile"
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import ProtectedRoute from "@/components/protected-route"

function ProfilePage() {
  const { profile, userPodcasts, isLoading, isUpdating, updateProfile } = useProfile()
  const { user } = useAuth()
  
  // 添加调试日志
  useEffect(() => {
    console.log("当前用户信息:", user)
    console.log("个人资料信息:", profile)
  }, [user, profile])
  const router = useRouter()
  const { toast } = useToast()
  const [listeningHistory, setListeningHistory] = useState<any[]>([])
  const [following, setFollowing] = useState<any[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(false)

  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // 获取收听历史
  useEffect(() => {
    const fetchListeningHistory = async () => {
      if (!user) return

      try {
        setIsLoadingHistory(true)
        const response = await api.getListeningHistory()
        if (response.success && response.data) {
          // 只获取最近的2条记录
          setListeningHistory(response.data?.data?.slice(0, 2) || [])
        }
      } catch (err) {
        console.error("获取收听历史错误:", err)
      } finally {
        setIsLoadingHistory(false)
      }
    }

    fetchListeningHistory()
  }, [user])

  // 获取关注列表
  useEffect(() => {
    const fetchFollowing = async () => {
      if (!user) return

      try {
        setIsLoadingFollowing(true)
        const response = await api.getUserFollowing(user.id)
        if (response.success && response.data) {
          setFollowing(response.data)
        }
      } catch (err) {
        console.error("获取关注列表错误:", err)
      } finally {
        setIsLoadingFollowing(false)
      }
    }

    fetchFollowing()
  }, [user])

  // 取消关注用户
  const handleUnfollow = async (userId: string) => {
    try {
      const response = await api.unfollowUser(userId)
      if (response.success) {
        // 从列表中移除
        setFollowing((prev) => prev.filter((user) => user.id !== userId))
        toast({
          title: "已取消关注",
          description: "您已成功取消关注该用户。",
        })
      } else {
        toast({
          title: "操作失败",
          description: response.message || "取消关注失败",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("取消关注错误:", err)
      toast({
        title: "操作失败",
        description: "取消关注时发生错误",
        variant: "destructive",
      })
    }
  }

  // 添加个人资料获取逻辑
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      
      try {
        const response = await api.getUserProfile(user.id)
        if (response.success && response.data) {
          updateProfile(response.data.data)
        }
      } catch (err) {
        console.error("获取个人资料错误:", err)
      }
    }
  
    fetchProfile()
  }, [user])

  if (!user && !isLoading) {
    return null // 重定向处理，不需要渲染内容
  }

  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="relative">
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-muted sm:h-64">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <Image
                  src={profile?.coverImage || "/placeholder.svg?height=400&width=1200"}
                  alt="Profile cover"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="absolute -bottom-12 left-4 flex items-end sm:left-8">
              {isLoading ? (
                <Skeleton className="h-24 w-24 rounded-full sm:h-32 sm:w-32" />
              ) : (
                <Avatar className="h-24 w-24 border-4 border-background sm:h-32 sm:w-32">
                  <AvatarImage src={profile?.avatarImage || "/placeholder.svg?height=200&width=200"} />
                  <AvatarFallback>{profile?.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              )}
            </div>

            <div className="absolute right-4 top-4 flex gap-2 sm:right-8">
              {!isLoading && profile && (
                <>
                  <EditProfileDialog profile={profile} onSave={updateProfile} isUpdating={isUpdating} />
                  <Link href="/settings">
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">设置</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{profile?.username || "用户"}</h1>
                  <p className="text-muted-foreground">@{profile?.username?.toLowerCase() || "user"}</p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {!isLoading && (
                <>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    分享
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">关于</h2>
                {isLoading ? (
                  <Skeleton className="h-20 w-full mt-2" />
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">{profile?.bio || "这个用户还没有添加个人简介。"}</p>
                )}
              </div>

              <div>
                <h2 className="text-lg font-medium">统计</h2>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </>
                  ) : (
                    <>
                      <div className="rounded-lg bg-muted p-3">
                        <div className="text-2xl font-bold">{profile?.stats?.following || 0}</div>
                        <div className="text-xs text-muted-foreground">关注中</div>
                      </div>
                      <div className="rounded-lg bg-muted p-3">
                        <div className="text-2xl font-bold">{profile?.stats?.followers || 0}</div>
                        <div className="text-xs text-muted-foreground">粉丝</div>
                      </div>
                      <div className="rounded-lg bg-muted p-3">
                        <div className="text-2xl font-bold">{profile?.stats?.episodes || 0}</div>
                        <div className="text-xs text-muted-foreground">剧集</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium">社交媒体</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </>
                  ) : (
                    <>
                      {profile?.socialLinks?.twitter && (
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0" asChild>
                          <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                          </a>
                        </Button>
                      )}
                      {profile?.socialLinks?.instagram && (
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0" asChild>
                          <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-4 w-4" />
                            <span className="sr-only">Instagram</span>
                          </a>
                        </Button>
                      )}
                      {profile?.socialLinks?.youtube && (
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0" asChild>
                          <a href={profile.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                            <Youtube className="h-4 w-4" />
                            <span className="sr-only">YouTube</span>
                          </a>
                        </Button>
                      )}
                      {profile?.socialLinks?.website && (
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0" asChild>
                          <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                            <span className="sr-only">网站</span>
                          </a>
                        </Button>
                      )}
                      {!profile?.socialLinks?.twitter &&
                        !profile?.socialLinks?.instagram &&
                        !profile?.socialLinks?.youtube &&
                        !profile?.socialLinks?.website && (
                          <p className="text-sm text-muted-foreground">未添加社交媒体链接</p>
                        )}
                    </>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium">兴趣</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-8 w-20 rounded-full" />
                      <Skeleton className="h-8 w-24 rounded-full" />
                      <Skeleton className="h-8 w-16 rounded-full" />
                      <Skeleton className="h-8 w-20 rounded-full" />
                    </>
                  ) : (
                    <>
                      {profile?.interests && profile.interests.length > 0 ? (
                        profile.interests.map((interest, index) => (
                          <Button key={index} variant="outline" size="sm" className="rounded-full">
                            {interest}
                          </Button>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">未添加兴趣标签</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Tabs defaultValue="podcasts">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="podcasts">
                    <Mic className="mr-2 h-4 w-4" />
                    播客
                  </TabsTrigger>
                  <TabsTrigger value="listening">
                    <Headphones className="mr-2 h-4 w-4" />
                    收听
                  </TabsTrigger>
                  <TabsTrigger value="following">
                    <Users className="mr-2 h-4 w-4" />
                    关注
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="podcasts" className="mt-6">
                  {isLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-40 w-full" />
                    </div>
                  ) : userPodcasts.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {userPodcasts.map((podcast) => (
                        <div key={podcast.id} className="rounded-lg border p-4">
                          <div className="flex gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={podcast.image_url || "/placeholder.svg?height=100&width=100"}
                                alt={podcast.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{podcast.title}</h3>
                              <p className="text-sm text-muted-foreground">{podcast.description}</p>
                              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{podcast.episodeCount} 剧集</span>
                                <span>•</span>
                                <span>{podcast.frequency}</span>
                              </div>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              <span>{podcast.followers} 粉丝</span>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/podcast/${podcast.id}`}>查看</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Mic className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">还没有创建播客</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">您还没有创建任何播客节目</p>
                      <Button asChild>
                        <Link href="/your-shows">创建播客</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="listening" className="mt-6">
                  {isLoadingHistory ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      <Skeleton className="h-64 w-full" />
                      <Skeleton className="h-64 w-full" />
                    </div>
                  ) : listeningHistory.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      {listeningHistory.map((episode) => (
                        <EpisodeCard
                          key={episode.id}
                          id={episode.id}
                          title={episode.title}
                          description={episode.description}
                          image={episode.image_url}
                          duration={episode.duration}
                          date={new Date(episode.published_date).toLocaleDateString()}
                          category={episode.category}
                          author={episode.author}
                          views={episode.plays || 0}
                          isFavorite={episode.is_favorite}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Headphones className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">还没有收听记录</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">您还没有收听任何播客剧集</p>
                      <Button asChild>
                        <Link href="/trending">发现播客</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="following" className="mt-6">
                  {isLoadingFollowing ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ) : following.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {following.map((followedUser) => (
                        <div key={followedUser.id} className="flex items-center gap-3 rounded-lg border p-3">
                          <Avatar>
                            <AvatarImage
                              src={
                                followedUser.avatar_url ||
                                `/placeholder.svg?height=40&width=40&text=${followedUser.username.substring(0, 1)}`
                              }
                            />
                            <AvatarFallback>{followedUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{followedUser.username}</h4>
                            <p className="truncate text-xs text-muted-foreground">
                              @{followedUser.username.toLowerCase()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleUnfollow(followedUser.id)}>
                            取消关注
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Users className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">还没有关注任何人</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">您还没有关注任何播客创作者</p>
                      <Button asChild>
                        <Link href="/trending">发现创作者</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}
export default function Page() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  )
}

