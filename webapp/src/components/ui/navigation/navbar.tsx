import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { typographyScale } from "@/components/ui/utils"

const navbarVariants = cva(
  cn(
    "w-full border-b bg-background",
    // Mobile optimization
    "safe-top", // iOS safe area
    "backdrop-blur-lg bg-background/80" // Mobile glass effect
  ),
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "bg-primary border-primary-foreground",
        transparent: "bg-transparent border-transparent",
      },
      size: {
        default: "h-[56px] md:h-16", // Mobile-first height
        sm: "h-[48px] md:h-14",
        lg: "h-[64px] md:h-20",
      },
      fixed: {
        true: "sticky top-0 z-50",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fixed: false,
    },
  }
)

const navbarItemVariants = cva(
  cn(
    "transition-colors",
    // Mobile typography
    typographyScale.base.mobile,
    // Desktop typography
    "md:text-sm"
  ),
  {
    variants: {
      variant: {
        default: "text-foreground/60 hover:text-foreground",
        active: "text-foreground font-medium",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  brand?: React.ReactNode
  children?: React.ReactNode
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, size, fixed, brand, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(navbarVariants({ variant, size, fixed }), className)}
        {...props}
      >
        <div className="container relative mx-auto h-full px-4">
          <div className="flex h-full items-center justify-between">
            {brand && <div className="flex-shrink-0">{brand}</div>}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </nav>
    )
  }
)
Navbar.displayName = "Navbar"

interface NavbarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const NavbarItem = React.forwardRef<HTMLDivElement, NavbarItemProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          navbarItemVariants({
            variant: active ? "active" : "default",
            className,
          })
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
NavbarItem.displayName = "NavbarItem"

const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        typographyScale.lg.mobile,
        "md:text-lg",
        "font-semibold",
        className
      )}
      {...props}
    />
  )
)
NavbarBrand.displayName = "NavbarBrand"

const NavbarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-4", className)}
      {...props}
    />
  )
)
NavbarContent.displayName = "NavbarContent"

export { Navbar, NavbarBrand, NavbarContent, NavbarItem } 