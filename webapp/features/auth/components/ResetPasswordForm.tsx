'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/auth-service";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectPath?: string;
}

export function ResetPasswordForm({ onSuccess, onError, redirectPath = "/auth" }: ResetPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.updatePassword(data.password);
      onSuccess?.();
      router.push(redirectPath);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Reset your password</h2>
        <p className="text-muted-foreground">
          Enter your new password below.
        </p>
      </div>
      <FormField
        control={form.control}
        name="password"
        render={({ field }: { field: ControllerRenderProps<ResetPasswordFormValues, "password"> }) => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your new password" 
                type="password" 
                autoComplete="new-password"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }: { field: ControllerRenderProps<ResetPasswordFormValues, "confirmPassword"> }) => (
          <FormItem>
            <FormLabel>Confirm New Password</FormLabel>
            <FormControl>
              <Input 
                placeholder="Confirm your new password" 
                type="password" 
                autoComplete="new-password"
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
        {loading ? "Resetting password..." : "Reset password"}
      </Button>
    </Form>
  );
} 