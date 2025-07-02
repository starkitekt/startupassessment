import { TYPE_ICON_MAP } from "@/lib/mappings"
import type { Notification } from "@/contexts/notification-context"

export function NotificationList({ notifications, onClick }: {
  notifications: Notification[];
  onClick?: (notification: Notification) => void;
}) {
  return (
    <ul className="divide-y divide-muted-foreground/10">
      {notifications.map((notification) => (
        <li key={notification.id} className="flex items-center gap-3 py-3 cursor-pointer" onClick={() => onClick?.(notification)}>
          <span>{TYPE_ICON_MAP[notification.type]}</span>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm">{notification.title}</div>
            <div className="text-xs text-muted-foreground">{notification.message}</div>
          </div>
        </li>
      ))}
    </ul>
  )
} 