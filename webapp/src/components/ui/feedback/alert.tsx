import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Info, AlertCircle, CheckCircle, XCircle, X } from "lucide-react"
import { typographyScale } from "@/components/ui/utils"

const alertVariants = cva(
  cn(
    // Base styles
    "relative w-full rounded-lg border",
    // Mobile optimizations
    "p-3 md:p-4", // Reduced padding on mobile
    "min-h-[52px] md:min-h-[56px]", // Touch-friendly height
    "[&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-4 md:[&>svg]:w-4", // Larger icons on mobile
    "[&>svg]:absolute [&>svg]:left-3 [&>svg]:top-3 md:[&>svg]:left-4 md:[&>svg]:top-4", // Adjusted icon position
    "[&>svg+div]:translate-y-[-3px]",
    "[&>svg~*]:pl-8 md:[&>svg~*]:pl-7", // Adjusted content padding
  ),
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-blue-200 text-blue-800 [&>svg]:text-blue-500 bg-blue-50 dark:border-blue-800 dark:text-blue-200 dark:bg-blue-950",
        success: "border-green-200 text-green-800 [&>svg]:text-green-500 bg-green-50 dark:border-green-800 dark:text-green-200 dark:bg-green-950",
        warning: "border-yellow-200 text-yellow-800 [&>svg]:text-yellow-500 bg-yellow-50 dark:border-yellow-800 dark:text-yellow-200 dark:bg-yellow-950",
        error: "border-red-200 text-red-800 [&>svg]:text-red-500 bg-red-50 dark:border-red-800 dark:text-red-200 dark:bg-red-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof alertVariants> & {
    onClose?: () => void
  }
>(({ className, variant, children, onClose, ...props }, ref) => {
  const Icon = {
    default: Info,
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
  }[variant || "default"]

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            // Base styles
            "absolute rounded-sm opacity-70 ring-offset-background transition-opacity",
            // Mobile optimizations
            "right-2 top-2 md:right-4 md:top-4", // Adjusted position
            "h-8 w-8 md:h-6 md:w-6", // Larger touch target on mobile
            "flex items-center justify-center",
            "active:opacity-80", // Touch feedback
            // States
            "hover:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:pointer-events-none"
          )}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      // Typography
      typographyScale.base.mobile,
      "md:text-base",
      "font-medium leading-none tracking-tight",
      // Mobile optimizations
      "mb-1 md:mb-1.5",
      "min-h-[24px] flex items-center",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Typography
      typographyScale.sm.mobile,
      "md:text-sm",
      // Mobile optimizations
      "min-h-[20px] flex items-center",
      "[&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription } 