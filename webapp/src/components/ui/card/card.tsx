import * as React from "react"
import { cn } from "@/lib/utils"
import { typographyScale } from "@/components/ui/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md border bg-card text-card-foreground shadow-sm",
      // Mobile optimizations
      "touch-none",
      "active:opacity-95",
      // Compact spacing
      "p-2 md:p-3",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col",
      // Compact spacing
      "space-y-0.5",
      "p-2 md:p-3",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Typography - reduced size
      typographyScale.base.mobile,
      "md:text-lg",
      "font-semibold leading-none tracking-tight",
      // Minimum height for touch
      "min-h-[24px]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Typography - smaller size
      typographyScale.xs.mobile,
      "md:text-sm",
      "text-muted-foreground",
      // Reduced height
      "min-h-[20px]",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      // Compact spacing
      "px-2 pt-0 pb-2",
      "md:px-3 md:pb-3",
      // Typography - slightly smaller
      typographyScale.sm.mobile,
      "md:text-base",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center",
      // Compact spacing
      "px-2 pt-0 pb-2",
      "md:px-3 md:pb-3",
      // Reduced gap
      "gap-1.5 md:gap-2",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 