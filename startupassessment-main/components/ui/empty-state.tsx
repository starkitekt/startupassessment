import { ReactNode } from "react"
import { AlertCircle } from "lucide-react"

export function EmptyState({ message, icon }: { message: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
      {icon || <AlertCircle className="h-8 w-8 mb-2" />}
      <p>{message}</p>
    </div>
  )
} 