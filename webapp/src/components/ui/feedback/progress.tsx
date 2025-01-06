import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        success: "bg-green-100 dark:bg-green-800/20",
        warning: "bg-yellow-100 dark:bg-yellow-800/20",
        error: "bg-red-100 dark:bg-red-800/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-green-600 dark:bg-green-400",
      warning: "bg-yellow-600 dark:bg-yellow-400",
      error: "bg-red-600 dark:bg-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value">,
    VariantProps<typeof progressVariants> {
  value?: number
  indicatorClassName?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ variant }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        progressIndicatorVariants({ variant }),
        "transition-transform duration-500",
        indicatorClassName
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress } 