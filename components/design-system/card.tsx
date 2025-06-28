"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200", {
  variants: {
    variant: {
      default: "border-border",
      elevated: "shadow-md hover:shadow-lg",
      outlined: "border-2",
      ghost: "border-transparent shadow-none",
    },
    padding: {
      none: "",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
    interactive: {
      true: "cursor-pointer hover:shadow-md hover:border-border/80 active:scale-[0.98]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
    interactive: false,
  },
})

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    padding: {
      none: "",
      sm: "p-4 pb-2",
      default: "p-6 pb-4",
      lg: "p-8 pb-6",
    },
  },
  defaultVariants: {
    padding: "default",
  },
})

const cardContentVariants = cva("", {
  variants: {
    padding: {
      none: "",
      sm: "p-4 pt-0",
      default: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "default",
  },
})

const cardFooterVariants = cva("flex items-center", {
  variants: {
    padding: {
      none: "",
      sm: "p-4 pt-0",
      default: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "default",
  },
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantProps<typeof cardHeaderVariants>, "padding"> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantProps<typeof cardContentVariants>, "padding"> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantProps<typeof cardFooterVariants>, "padding"> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding, interactive, className }))} {...props} />
  ),
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, padding, ...props }, ref) => (
  <div ref={ref} className={cn(cardHeaderVariants({ padding, className }))} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, padding, ...props }, ref) => (
  <div ref={ref} className={cn(cardContentVariants({ padding, className }))} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, padding, ...props }, ref) => (
  <div ref={ref} className={cn(cardFooterVariants({ padding, className }))} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
