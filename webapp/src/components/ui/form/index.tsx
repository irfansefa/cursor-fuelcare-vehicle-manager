'use client';

import * as React from "react"
import { useFormContext, Controller, Control, FormProvider, UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"

interface FormProps<T extends Record<string, any>> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  children: React.ReactNode;
}

const Form = <T extends Record<string, any>>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className={cn("space-y-6", className)}
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return <div ref={ref} {...props} />
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const formContext = useFormContext();
  
  if (!formContext) {
    return null;
  }

  const { formState: { errors } } = formContext;
  const fieldName = String(children);
  const error = errors[fieldName];
  
  if (!error) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {error.message?.toString()}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

interface FormFieldProps {
  name: string;
  control?: Control<any>;
  render: (props: { field: any }) => React.ReactElement;
}

const FormField = ({
  name,
  control,
  render,
}: FormFieldProps) => {
  const formContext = useFormContext();
  const fieldControl = control || formContext?.control;

  if (!fieldControl) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={fieldControl}
      render={({ field }) => render({ field })}
    />
  )
}

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} 