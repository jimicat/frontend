"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api"; // 引入API方法

// 定义适配后端数据的 Podcast 类型
type Podcast = {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  categories: Record<string, string>; // 分类是一个键值对
  trendScore: number;
  url: string;
};

export function TrendingPodcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.getTrendingPodcasts();
        console.log("API 响应:", response); // 调试日志
        if (response.success && response.data) {
          // 适配后端数据格式
          const adaptedData = response.data.map((podcast: any) => ({
            id: podcast.id,
            title: podcast.title,
            description: podcast.description,
            image: podcast.image || podcast.artwork, // 使用 `image` 或 `artwork`
            author: podcast.author,
            categories: podcast.categories,
            trendScore: podcast.trendScore,
            url: podcast.url,
          }));
          setPodcasts(adaptedData);
        } else {
          setError(response.message || "无法加载热门播客数据");
        }
      } catch (err) {
        console.error("API 请求错误:", err); // 错误日志
        setError("网络错误，请稍后再试");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-muted-foreground">加载中...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {podcasts.map((podcast) => (
        <Link
          key={podcast.id}
          href={`/podcast/podcast-${podcast.id}`}
          className="group rounded-lg border p-4 transition-all hover:shadow-md"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={podcast.image || "/placeholder.svg"}
                alt={podcast.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                热度: {podcast.trendScore}
              </div>
            </div>
            <h3 className="text-lg font-bold">{podcast.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">主持人: {podcast.author}</p>
            {/* <div className="mt-2 flex items-center justify-center gap-1">
              {Object.values(podcast.categories).map((category, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div> */}
          </div>
        </Link>
      ))}
    </div>
  );
}