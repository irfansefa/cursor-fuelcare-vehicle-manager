import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { FiInfo, FiAlertCircle, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
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
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
    onClose?: () => void
  }
>(({ className, variant, children, onClose, ...props }, ref) => {
  const Icon = {
    default: FiInfo,
    info: FiInfo,
    success: FiCheckCircle,
    warning: FiAlertCircle,
    error: FiXCircle,
  }[variant || "default"]

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <FiX className="h-4 w-4" />
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
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
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
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription } 