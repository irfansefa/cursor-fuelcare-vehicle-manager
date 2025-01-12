import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { typographyScale } from "@/components/ui/utils"

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode
  children: React.ReactNode
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, separator = <ChevronRight className="h-4 w-4" />, children, ...props }, ref) => {
    const items = React.Children.toArray(children)

    return (
      <nav 
        ref={ref} 
        aria-label="breadcrumb" 
        className={cn(
          "flex overflow-x-auto scrollbar-none", // Mobile scroll
          "py-1 -mx-1 px-1", // Padding for touch scrolling
          className
        )} 
        {...props}
      >
        <ol className="flex items-center space-x-2 min-w-fit">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index < items.length - 1 && (
                <span className="mx-2 text-muted-foreground">{separator}</span>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    )
  }
)
Breadcrumbs.displayName = "Breadcrumbs"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      // Typography
      typographyScale.sm.mobile,
      "md:text-sm",
      // Colors and layout
      "text-muted-foreground hover:text-foreground flex items-center",
      // Mobile touch target
      "min-h-[32px]",
      className
    )}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      // Typography
      typographyScale.sm.mobile,
      "md:text-sm",
      "font-medium",
      // Interactive states
      "underline-offset-4 hover:underline",
      // Mobile touch target
      "min-h-[32px] flex items-center",
      // Active state
      "active:opacity-80",
      className
    )}
    {...props}
  />
))
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(
      // Typography
      typographyScale.sm.mobile,
      "md:text-sm",
      "font-medium",
      // Colors
      "text-foreground",
      // Layout
      "min-h-[32px] flex items-center",
      className
    )}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

export { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } 