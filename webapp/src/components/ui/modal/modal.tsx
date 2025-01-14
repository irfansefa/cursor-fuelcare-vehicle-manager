"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { typographyScale } from "@/components/ui/utils"

const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalClose = DialogPrimitive.Close
const ModalPortal = DialogPrimitive.Portal
const ModalOverlay = DialogPrimitive.Overlay

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showClose?: boolean;
  }
>(({ className, children, size = 'md', showClose = true, ...props }, ref) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]'
  };

  return (
    <ModalPortal>
      <ModalOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Base styles
          "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200",
          // Mobile optimizations
          "p-4 md:p-6", // Reduced padding on mobile
          "gap-3 md:gap-4", // Adjusted spacing
          "max-h-[90vh] overflow-y-auto", // Better mobile scrolling
          "touch-pan-y", // Smooth touch scrolling
          // Responsive rounding
          "rounded-t-lg md:rounded-lg",
          // Size variants
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <ModalClose className={cn(
            // Base styles
            "absolute rounded-sm opacity-70 ring-offset-background transition-opacity",
            // Mobile optimizations
            "right-2 top-2 md:right-4 md:top-4", // Adjusted position
            "h-8 w-8 md:h-6 md:w-6", // Larger touch target on mobile
            "flex items-center justify-center",
            "active:opacity-80",
            // States
            "hover:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:pointer-events-none"
          )}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </ModalClose>
        )}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
});

ModalContent.displayName = "ModalContent";

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      // Base styles
      "flex flex-col",
      // Mobile optimizations
      "space-y-1 md:space-y-1.5",
      "text-center sm:text-left",
      className
    )}
    {...props}
  />
);

ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      // Base styles
      "flex",
      // Mobile optimizations
      "flex-col-reverse gap-2 md:gap-0",
      "sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      // Typography
      typographyScale.lg.mobile,
      "md:text-lg",
      "font-semibold leading-none tracking-tight",
      // Mobile optimizations
      "min-h-[24px] flex items-center",
      className
    )}
    {...props}
  />
));

ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      // Typography
      typographyScale.sm.mobile,
      "md:text-sm",
      "text-muted-foreground",
      // Mobile optimizations
      "min-h-[20px] flex items-center",
      className
    )}
    {...props}
  />
));

ModalDescription.displayName = "ModalDescription";

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
}; 