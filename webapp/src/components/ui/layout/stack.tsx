import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const stackVariants = cva(
  "flex flex-col",
  {
    variants: {
      spacing: {
        default: "space-y-4",
        none: "space-y-0",
        xs: "space-y-1",
        sm: "space-y-2",
        md: "space-y-6",
        lg: "space-y-8",
        xl: "space-y-12",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      spacing: "default",
      align: "stretch",
      justify: "start",
    },
  }
)

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  divider?: React.ReactNode
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing, align, justify, divider, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)

    return (
      <div
        ref={ref}
        className={cn(stackVariants({ spacing, align, justify }), className)}
        {...props}
      >
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {divider && index < childrenArray.length - 1 && divider}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
Stack.displayName = "Stack"

export { Stack } 