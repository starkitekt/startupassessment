export function NotificationBadge({ count }: { count: number }) {
  return (
    <span className="min-w-[24px] px-1 overflow-hidden inline-block text-center rounded-full bg-destructive text-white text-xs font-bold">
      {count > 99 ? '99+' : count}
    </span>
  )
} 