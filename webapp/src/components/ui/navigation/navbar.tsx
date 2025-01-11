import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const navbarVariants = cva(
  "w-full border-b bg-background",
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "bg-primary border-primary-foreground",
        transparent: "bg-transparent border-transparent",
      },
      size: {
        default: "h-16",
        sm: "h-14",
        lg: "h-20",
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

const NavbarBrand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-2", className)}
    {...props}
  />
))
NavbarBrand.displayName = "NavbarBrand"

const NavbarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-4", className)}
    {...props}
  />
))
NavbarContent.displayName = "NavbarContent"

const NavbarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
NavbarItem.displayName = "NavbarItem"

export { Navbar, NavbarBrand, NavbarContent, NavbarItem } 