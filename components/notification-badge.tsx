"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/hooks/use-notifications"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export function NotificationBadge() {
  const { isAuthenticated } = useAuth()
  const { notifications, getUnreadCount } = useNotifications()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (isAuthenticated) {
      setUnreadCount(getUnreadCount())
    } else {
      setUnreadCount(0)
    }
  }, [notifications, isAuthenticated, getUnreadCount])

  if (!isAuthenticated) {
    return null
  }

  return (
    <Link href="/notifications" passHref>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}

