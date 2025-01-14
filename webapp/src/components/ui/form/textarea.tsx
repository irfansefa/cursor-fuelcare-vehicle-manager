import * as React from "react"
import { cn } from "@/lib/utils"
import { typographyScale } from "@/components/ui/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // Base styles
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent shadow-sm",
        // Typography
        typographyScale.sm.mobile,
        "md:text-sm",
        // Mobile optimizations
        "px-3 py-2",
        "min-h-[80px] md:min-h-[60px]", // Increased height for mobile
        "active:opacity-80",
        // States
        "placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-1 focus:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea } 