"use client"

import { useState } from "react"
import {
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  Clock,
  Filter,
  Headphones,
  Info,
  Megaphone,
  MoreVertical,
  Search,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"
import ProtectedRoute from "@/components/protected-route"

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsContent />
    </ProtectedRoute>
  )
}

function NotificationsContent() {
  const { toast } = useToast()
  const {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    fetchNotifications,
  } = useNotifications()

  const [searchQuery, setSearchQuery] = useState("")
  const [showClearDialog, setShowClearDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  // 处理搜索
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return !notification.read && matchesSearch
    if (activeTab === "read") return notification.read && matchesSearch

    // 按类型筛选
    return notification.type === activeTab && matchesSearch
  })

  // 排序通知
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  // 统计未读通知
  const unreadCount = notifications.filter((n) => !n.read).length

  // 处理标记为已读
  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id)
      toast({
        title: "通知已标记为已读",
        description: "通知状态已更新",
      })
    } catch (error) {
      toast({
        title: "操作失败",
        description: "无法标记通知为已读",
        variant: "destructive",
      })
    }
  }

  // 处理标记所有为已读
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
      toast({
        title: "所有通知已标记为已读",
        description: "通知状态已更新",
      })
    } catch (error) {
      toast({
        title: "操作失败",
        description: "无法标记所有通知为已读",
        variant: "destructive",
      })
    }
  }

  // 处理删除通知
  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id)
      toast({
        title: "通知已删除",
        description: "通知已从列表中移除",
      })
    } catch (error) {
      toast({
        title: "操作失败",
        description: "无法删除通知",
        variant: "destructive",
      })
    }
  }

  // 处理清除所有通知
  const handleClearAllNotifications = async () => {
    try {
      await clearAllNotifications()
      setShowClearDialog(false)
      toast({
        title: "所有通知已清除",
        description: "通知列表已清空",
      })
    } catch (error) {
      toast({
        title: "操作失败",
        description: "无法清除所有通知",
        variant: "destructive",
      })
    }
  }

  // 获取通知图标
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Info className="h-5 w-5 text-blue-500" />
      case "episode":
        return <Headphones className="h-5 w-5 text-green-500" />
      case "podcast":
        return <Megaphone className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMins / 60)
    const diffDays = Math.round(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins} 分钟前`
    } else if (diffHours < 24) {
      return `${diffHours} 小时前`
    } else if (diffDays < 7) {
      return `${diffDays} 天前`
    } else {
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  // 如果加载中，显示骨架屏
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">通知</h1>
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-24 w-full mb-4" />
        ))}
      </div>
    )
  }

  // 如果有错误，显示错误信息
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-medium">获取通知时出错</h3>
          <p className="text-red-600">{error}</p>
          <Button variant="outline" className="mt-2" onClick={() => fetchNotifications()}>
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">通知</h1>
          <p className="text-muted-foreground">{unreadCount > 0 ? `您有 ${unreadCount} 条未读通知` : "没有未读通知"}</p>
        </div>

        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              全部标为已读
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => setShowClearDialog(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            清除所有
          </Button>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索通知..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {sortOrder === "newest" ? "最新优先" : "最早优先"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("newest")}>最新优先</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("oldest")}>最早优先</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">
            全部
            <Badge variant="outline" className="ml-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            未读
            <Badge variant="outline" className="ml-2">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="system">系统</TabsTrigger>
          <TabsTrigger value="episode">新剧集</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {renderNotificationsList(sortedNotifications)}
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
          {renderNotificationsList(sortedNotifications)}
        </TabsContent>

        <TabsContent value="system" className="mt-0">
          {renderNotificationsList(sortedNotifications)}
        </TabsContent>

        <TabsContent value="episode" className="mt-0">
          {renderNotificationsList(sortedNotifications)}
        </TabsContent>
      </Tabs>

      {/* 清除所有通知对话框 */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>清除所有通知</DialogTitle>
            <DialogDescription>您确定要清除所有通知吗？此操作无法撤销。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleClearAllNotifications}>
              清除所有
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  // 渲染通知列表
  function renderNotificationsList(notifications: any[]) {
    if (notifications.length === 0) {
      return (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">没有通知</h3>
          <p className="text-muted-foreground">{searchQuery ? "没有匹配的通知" : "当有新通知时，将会显示在这里"}</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`p-4 transition-colors ${!notification.read ? "bg-muted/30" : ""}`}>
            <div className="flex gap-4">
              <div className="mt-1">{getNotificationIcon(notification.type)}</div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {notification.title}
                      {!notification.read && <Badge className="ml-2 bg-blue-500">新</Badge>}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground flex items-center mr-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(notification.created_at)}
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            标记为已读
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDeleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {notification.action_url && (
                  <Button
                    variant="link"
                    className="h-auto p-0 mt-2 text-sm"
                    onClick={() => {
                      // 标记为已读并导航
                      if (!notification.read) {
                        handleMarkAsRead(notification.id)
                      }
                      window.location.href = notification.action_url
                    }}
                  >
                    查看详情
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }
}

