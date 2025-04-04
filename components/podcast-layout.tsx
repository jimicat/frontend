"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, BookMarked, Home, Menu, Search, Settings, User, Headphones, Mic, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthButton } from "@/components/auth-button"
import { useAuth } from "@/hooks/use-auth"
import { SearchDialog } from "@/components/search/search-dialog"

export function PodcastLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-background transition-shadow duration-200",
          isScrolled && "shadow-sm",
        )}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-purple-600">
                    <BookMarked className="h-5 w-5" />
                    <span>PodcastHub</span>
                  </Link>
                  <ThemeToggle />
                </div>
                <div className="my-4">
                  <form onSubmit={handleSearch}>
                    <Input
                      type="search"
                      placeholder="Search episodes..."
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isActive("/")
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>
                  <Link
                    href="/trending"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isActive("/trending")
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <TrendingUp className="h-5 w-5" />
                    Trending
                  </Link>
                  <Link
                    href="/library"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isActive("/library")
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <BookMarked className="h-5 w-5" />
                    Library
                  </Link>
                  <Link
                    href="/history"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isActive("/history")
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Clock className="h-5 w-5" />
                    History
                  </Link>
                  <Link
                    href="/profile"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isActive("/profile")
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isActive("/settings")
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-semibold">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/category/technology">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                      >
                        Technology
                      </Badge>
                    </Link>
                    <Link href="/category/business">
                      <Badge variant="outline">Business</Badge>
                    </Link>
                    <Link href="/category/health-wellness">
                      <Badge variant="outline">Health</Badge>
                    </Link>
                    <Link href="/category/music">
                      <Badge variant="outline">Music</Badge>
                    </Link>
                    <Link href="/category/food">
                      <Badge variant="outline">Food</Badge>
                    </Link>
                    <Link href="/category/travel">
                      <Badge variant="outline">Travel</Badge>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 font-semibold text-purple-600">
              <BookMarked className="h-5 w-5" />
              <span className="hidden md:inline-block">PodcastHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsSearchDialogOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {user && (
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {notifications}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </Link>
            )}

            <AuthButton />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive("/")
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/trending"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive("/trending")
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <TrendingUp className="h-5 w-5" />
                Trending
              </Link>
              <Link
                href="/library"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive("/library")
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <BookMarked className="h-5 w-5" />
                Library
              </Link>
              <Link
                href="/history"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive("/history")
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Clock className="h-5 w-5" />
                History
              </Link>
              <Link
                href="/subscriptions"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive("/subscriptions")
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Headphones className="h-5 w-5" />
                Subscriptions
              </Link>
              <Link
                href="/your-shows"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive("/your-shows")
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Mic className="h-5 w-5" />
                Your Shows
              </Link>
            </nav>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="px-4 text-sm font-semibold">Categories</h3>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  See All
                </Button>
              </div>
              <div className="space-y-1">
                <Link
                  href="/category/technology"
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm hover:bg-muted hover:text-foreground",
                    isActive("/category/technology")
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                      : "text-muted-foreground",
                  )}
                >
                  Technology
                </Link>
                <Link
                  href="/category/business"
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm hover:bg-muted hover:text-foreground",
                    isActive("/category/business")
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                      : "text-muted-foreground",
                  )}
                >
                  Business
                </Link>
                <Link
                  href="/category/health-wellness"
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm hover:bg-muted hover:text-foreground",
                    isActive("/category/health-wellness")
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                      : "text-muted-foreground",
                  )}
                >
                  Health & Wellness
                </Link>
                <Link
                  href="/category/music"
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm hover:bg-muted hover:text-foreground",
                    isActive("/category/music")
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                      : "text-muted-foreground",
                  )}
                >
                  Music
                </Link>
                <Link
                  href="/category/food"
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm hover:bg-muted hover:text-foreground",
                    isActive("/category/food")
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                      : "text-muted-foreground",
                  )}
                >
                  Food
                </Link>
                <Link
                  href="/category/travel"
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm hover:bg-muted hover:text-foreground",
                    isActive("/category/travel")
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                      : "text-muted-foreground",
                  )}
                >
                  Travel
                </Link>
              </div>
            </div>
            <div className="mt-auto">
              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950">
                <h4 className="font-medium text-purple-700 dark:text-purple-300">Upgrade to Pro</h4>
                <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
                  Get ad-free listening and exclusive content
                </p>
                <Button className="mt-3 w-full bg-purple-600 text-white hover:bg-purple-700">Upgrade Now</Button>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 pb-20">{children}</main>
      </div>

      {/* 搜索对话框 */}
      <SearchDialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen} />
    </div>
  )
}

