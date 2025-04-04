import { PodcastLayout } from "@/components/podcast-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SearchResultSkeleton } from "@/components/search/search-result-skeleton"

export default function SearchLoading() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="搜索播客、剧集或创作者..." className="pl-9" disabled />
            </div>
            <Button disabled>搜索</Button>
          </div>

          <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all" disabled>
                  全部
                </TabsTrigger>
                <TabsTrigger value="podcasts" disabled>
                  播客
                </TabsTrigger>
                <TabsTrigger value="episodes" disabled>
                  剧集
                </TabsTrigger>
                <TabsTrigger value="creators" disabled>
                  创作者
                </TabsTrigger>
              </TabsList>
            </div>

            <Separator className="my-4" />

            <div className="mb-4">
              <Skeleton className="h-5 w-64" />
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SearchResultSkeleton key={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PodcastLayout>
  )
}

