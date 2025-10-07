import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertTriangle, TrendingUp, Activity, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  id: string;
  type: "alert" | "insight" | "reminder" | "success";
  title: string;
  message: string;
  timestamp: string;
  priority: "urgent" | "high" | "normal";
  dismissed: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "alert",
    title: "Blood Pressure Elevated",
    message: "Your BP averaged 138/88 mmHg this week, above your target of 130/80. Consider discussing with your doctor.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: "urgent",
    dismissed: false,
  },
  {
    id: "notif-2",
    type: "alert",
    title: "Resting Heart Rate Increased",
    message: "Your resting heart rate is up 9% this week (68 bpm). This may be related to the 15% decline in sleep quality.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    priority: "urgent",
    dismissed: false,
  },
  {
    id: "notif-3",
    type: "insight",
    title: "Sleep Pattern Affecting Heart Rate",
    message: "AI detected correlation: Poor sleep quality appears to increase your resting heart rate the next day.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    dismissed: false,
  },
  {
    id: "notif-4",
    type: "reminder",
    title: "Lisinopril Refill Due Soon",
    message: "Your prescription has 5 days remaining. Request refill to avoid missing doses.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    dismissed: false,
  },
  {
    id: "notif-5",
    type: "success",
    title: "LDL Cholesterol Improved",
    message: "Great progress! Your LDL dropped 23% to 112 mg/dL since starting Atorvastatin.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "normal",
    dismissed: false,
  },
  {
    id: "notif-6",
    type: "insight",
    title: "Blood Glucose Trending Down",
    message: "Your average glucose is down 5% to 118 mg/dL. Metformin appears to be working well.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "normal",
    dismissed: false,
  },
];

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("healthNotifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(initialNotifications);
    }
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("healthNotifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const dismissNotification = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, dismissed: true } : notif
    ));
  };

  const clearAll = () => {
    setNotifications(notifications.map(notif => ({ ...notif, dismissed: true })));
  };

  const undismissedNotifications = notifications.filter(n => !n.dismissed);
  const unreadCount = undismissedNotifications.length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return AlertTriangle;
      case "insight":
        return TrendingUp;
      case "reminder":
        return Clock;
      case "success":
        return CheckCircle;
      default:
        return Activity;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-red-500";
      case "insight":
        return "text-blue-500";
      case "reminder":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      default:
        return "text-primary";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "normal":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-6 right-6 z-40 relative"
          data-testid="button-notification-bell"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
              data-testid="badge-notification-count"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0"
        align="end"
        data-testid="panel-notifications"
      >
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Notifications
              </CardTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  data-testid="button-clear-all"
                >
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {undismissedNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="text-no-notifications">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    All caught up! No new notifications.
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {undismissedNotifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        data-testid={`notification-${notification.id}`}
                      >
                        <div className="border-b p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start space-x-3">
                            <Icon
                              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${getNotificationColor(
                                notification.type
                              )}`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="font-semibold text-sm">
                                  {notification.title}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 -mt-1 -mr-2"
                                  onClick={() => dismissNotification(notification.id)}
                                  data-testid={`button-dismiss-${notification.id}`}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                {notification.priority !== "normal" && (
                                  <Badge
                                    className={`${getPriorityBadgeColor(
                                      notification.priority
                                    )} text-white text-xs`}
                                  >
                                    {notification.priority}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
