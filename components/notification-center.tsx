"use client"

import { useState } from "react"
import { Bell, X, CheckCircle, AlertCircle, Info, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "market"
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Market Settled",
    message: "BTC >$95K settled YES. You won +2.4 SOL",
    time: "2m ago",
    read: false
  },
  {
    id: "2",
    type: "market",
    title: "New Hot Market",
    message: "SOL breaks $200 in 24h? - 523 bettors",
    time: "15m ago",
    read: false
  },
  {
    id: "3",
    type: "info",
    title: "Price Alert",
    message: "ETH crossed your target price of $3,500",
    time: "1h ago",
    read: true
  },
  {
    id: "4",
    type: "warning",
    title: "Market Ending Soon",
    message: "JUP DAO Proposal #47 ends in 2 hours",
    time: "2h ago",
    read: true
  }
]

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "market":
        return <TrendingUp className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-3 border-b border-border p-4 last:border-0 ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border p-3">
              <Button variant="ghost" className="w-full text-sm" size="sm">
                View All Notifications
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
