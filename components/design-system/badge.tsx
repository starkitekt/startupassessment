"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success: "border-transparent bg-green-600 text-white hover:bg-green-700",
        warning: "border-transparent bg-yellow-600 text-white hover:bg-yellow-700",
        info: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
        outline: "text-foreground border-border hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, shape, leftIcon, rightIcon, removable, onRemove, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, size, shape }), className)} {...props}>
        {leftIcon && <span className="mr-1 h-3 w-3 flex items-center justify-center">{leftIcon}</span>}
        {children}
        {rightIcon && !removable && <span className="ml-1 h-3 w-3 flex items-center justify-center">{rightIcon}</span>}
        {removable && (
          <button
            type="button"
            className="ml-1 h-3 w-3 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors"
            onClick={onRemove}
            aria-label="Remove"
          >
            <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  },
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
