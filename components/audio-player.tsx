"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  FastForward,
  Pause,
  Play,
  Rewind,
  Volume2,
  Volume1,
  VolumeX,
  SkipBack,
  SkipForward,
  Maximize2,
  Minimize2,
  ListMusic,
  Heart,
  Share2,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [speed, setSpeed] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Get volume icon based on volume level
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />
    return <Volume2 className="h-5 w-5" />
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t bg-background p-3 shadow-lg transition-all duration-300",
        isFullscreen ? "h-[calc(100vh-4rem)]" : "h-auto",
      )}
    >
      <div className="container flex flex-col gap-4">
        {isFullscreen && (
          <div className="flex flex-col items-center justify-center gap-6 py-8">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
              <Image src="/placeholder.svg?height=400&width=400" alt="Current episode" fill className="object-cover" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">The Future of AI in Everyday Life</h2>
              <p className="text-muted-foreground">Alex Johnson</p>
            </div>
            <div className="flex w-full max-w-md gap-4">
              <Button
                variant="outline"
                size="icon"
                className={cn("rounded-full", isFavorite ? "text-red-500" : "")}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                <span className="sr-only">Favorite</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Download className="h-5 w-5" />
                <span className="sr-only">Download</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="ml-auto rounded-full">
                    <ListMusic className="h-5 w-5" />
                    <span className="sr-only">Queue</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Up Next</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=100&width=100"
                            alt="Episode thumbnail"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-medium">Episode {i + 1}: The Future of Technology</h4>
                          <p className="truncate text-xs text-muted-foreground">Alex Johnson • 45:32</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {!isFullscreen && (
              <>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Current episode"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-medium">The Future of AI in Everyday Life</h4>
                  <p className="truncate text-xs text-muted-foreground">Alex Johnson</p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center justify-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden h-8 w-8 sm:flex">
                      <SkipBack className="h-4 w-4" />
                      <span className="sr-only">Previous</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Previous</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Rewind className="h-4 w-4" />
                      <span className="sr-only">Rewind 15s</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Rewind 15s</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
                <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FastForward className="h-4 w-4" />
                      <span className="sr-only">Forward 15s</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Forward 15s</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden h-8 w-8 sm:flex">
                      <SkipForward className="h-4 w-4" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Next</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs tabular-nums text-muted-foreground">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 2732}
                step={1}
                className="flex-1"
                onValueChange={(value) => setCurrentTime(value[0])}
              />
              <span className="text-xs tabular-nums text-muted-foreground">{formatTime(duration || 2732)}</span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {getVolumeIcon()}
                      <span className="sr-only">Volume</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Volume</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                className="w-24"
                onValueChange={(value) => setVolume(value[0] / 100)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8">
                  {speed}x
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                  <DropdownMenuItem key={rate} onClick={() => setSpeed(rate)}>
                    {rate}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              <span className="sr-only">{isFullscreen ? "Minimize" : "Maximize"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to conditionally join class names
import { cn } from "@/lib/utils"

