import type { ReactNode } from "react"

export function FormField({ id, label, description, required = false, error, className, children }: {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <div className="text-xs text-muted-foreground mb-1">{description}</div>}
      {children}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  )
} 