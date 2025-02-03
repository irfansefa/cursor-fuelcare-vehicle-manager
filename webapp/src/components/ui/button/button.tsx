import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { typographyScale } from "@/components/ui/utils"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    // Mobile touch target optimization
    "min-h-[44px] min-w-[44px]",
    // Mobile tap state
    "active:opacity-80"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: cn(
          // Mobile size
          typographyScale.sm.mobile,
          // Desktop size
          "md:text-base",
          // Mobile-first spacing
          "h-11 px-4 py-2.5",
          // Desktop spacing
          "md:h-9 md:px-4 md:py-2"
        ),
        sm: cn(
          // Mobile size
          typographyScale.xs.mobile,
          // Desktop size
          "md:text-sm",
          // Mobile-first spacing
          "h-10 px-3 py-2",
          // Desktop spacing
          "md:h-8 md:px-3 md:py-1.5"
        ),
        lg: cn(
          // Mobile size
          typographyScale.base.mobile,
          // Desktop size
          "md:text-lg",
          // Mobile-first spacing
          "h-12 px-6 py-3",
          // Desktop spacing
          "md:h-10 md:px-8 md:py-2"
        ),
        icon: cn(
          // Mobile size
          "h-11 w-11",
          // Desktop size
          "md:h-9 md:w-9"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 