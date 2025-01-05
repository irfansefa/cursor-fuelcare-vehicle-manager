'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { AuthService } from "../services/auth-service";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function ForgotPasswordForm({ onSuccess, onError }: ForgotPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.requestPasswordReset(data.email);
      setIsEmailSent(true);
      onSuccess?.();
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Check your email</h2>
        <p className="text-muted-foreground">
          We've sent you a password reset link. Please check your email to reset your password.
        </p>
        <p className="text-sm text-muted-foreground">
          Didn't receive the email?{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal"
            onClick={() => setIsEmailSent(false)}
          >
            Try again
          </Button>
        </p>
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Forgot your password?</h2>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }: { field: ControllerRenderProps<ForgotPasswordFormValues, "email"> }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your email" 
                type="email" 
                autoComplete="email"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {error && (
        <div className="text-sm text-destructive">{error}</div>
      )}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading}
      >
        {loading ? "Sending reset link..." : "Send reset link"}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </Form>
  );
} 