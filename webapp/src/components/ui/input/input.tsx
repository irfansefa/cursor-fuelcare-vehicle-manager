import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { typographyScale } from "@/components/ui/utils"

const inputBaseClasses = cn(
  // Base styles
  "flex w-full rounded-md border border-input bg-background ring-offset-background",
  "file:border-0 file:bg-transparent file:font-medium",
  // Mobile-optimized focus states
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  // States
  "disabled:cursor-not-allowed disabled:opacity-50",
  // Mobile touch optimization
  "min-h-[44px]",
  // Mobile tap state
  "active:opacity-90"
)

const inputVariants = cva(inputBaseClasses, {
  variants: {
    size: {
      default: cn(
        // Mobile typography
        typographyScale.base.mobile,
        // Desktop typography
        "md:text-base",
        // Mobile spacing
        "h-11 px-4 py-2.5",
        // Desktop spacing
        "md:h-10 md:px-3 md:py-2",
        // File button typography
        "file:text-sm-mobile md:file:text-sm"
      ),
      sm: cn(
        // Mobile typography
        typographyScale.sm.mobile,
        // Desktop typography
        "md:text-sm",
        // Mobile spacing
        "h-10 px-3 py-2",
        // Desktop spacing
        "md:h-8 md:px-2 md:py-1.5",
        // File button typography
        "file:text-xs-mobile md:file:text-xs"
      ),
      lg: cn(
        // Mobile typography
        typographyScale.lg.mobile,
        // Desktop typography
        "md:text-lg",
        // Mobile spacing
        "h-12 px-5 py-3",
        // Desktop spacing
        "md:h-12 md:px-4 md:py-2.5",
        // File button typography
        "file:text-base-mobile md:file:text-base"
      ),
    },
    error: {
      true: "border-destructive focus-visible:ring-destructive",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    error: false,
  },
})

const helperTextVariants = cva("mt-1.5", {
  variants: {
    error: {
      true: cn(
        typographyScale.xs.mobile,
        "md:text-sm",
        "text-destructive"
      ),
      false: cn(
        typographyScale.xs.mobile,
        "md:text-sm",
        "text-muted-foreground"
      ),
    },
  },
  defaultVariants: {
    error: false,
  },
})

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, error, errorMessage, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ size, error, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {errorMessage && (
          <p className={helperTextVariants({ error: true })}>{errorMessage}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input } 