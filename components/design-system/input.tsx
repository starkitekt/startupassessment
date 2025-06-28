"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-input hover:border-input/80",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      size: {
        sm: "h-9 px-2 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, label, helperText, error, id, ...props }, ref) => {
    const inputId = React.useId()
    const hasError = !!error
    const finalVariant = hasError ? "error" : variant

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <input
          type={type}
          id={id || inputId}
          className={cn(inputVariants({ variant: finalVariant, size, className }))}
          ref={ref}
          {...props}
        />

        {(helperText || error) && (
          <p className={cn("text-xs", hasError ? "text-destructive" : "text-muted-foreground")}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input, inputVariants }
