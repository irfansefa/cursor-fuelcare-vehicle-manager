import * as React from "react"
import { FiChevronRight } from "react-icons/fi"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode
  children: React.ReactNode
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, separator = <FiChevronRight className="h-4 w-4" />, children, ...props }, ref) => {
    const items = React.Children.toArray(children)

    return (
      <nav ref={ref} aria-label="breadcrumb" className={cn("flex", className)} {...props}>
        <ol className="flex items-center space-x-2">
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
    className={cn("text-sm text-muted-foreground hover:text-foreground flex items-center", className)}
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
      "text-sm font-medium underline-offset-4 hover:underline",
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
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

export { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } 