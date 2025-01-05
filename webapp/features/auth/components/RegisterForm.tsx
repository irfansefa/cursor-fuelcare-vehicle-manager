'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectPath?: string;
}

export function RegisterForm({ onSuccess, onError, redirectPath = "/dashboard" }: RegisterFormProps) {
  const { register, loading, error: authError, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, redirectPath, router]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });
      setIsRegistered(true);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  if (isRegistered) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Check your email</h2>
        <p className="text-muted-foreground">
          We've sent you a confirmation link. Please check your email to complete your registration.
        </p>
        <p className="text-sm text-muted-foreground">
          Already confirmed?{" "}
          <Link href="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <FormField
        control={form.control}
        name="email"
        render={({ field }: { field: ControllerRenderProps<RegisterFormValues, "email"> }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your email" 
                type="email" 
                autoComplete="username"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }: { field: ControllerRenderProps<RegisterFormValues, "fullName"> }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your full name" 
                autoComplete="name"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }: { field: ControllerRenderProps<RegisterFormValues, "password"> }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input 
                placeholder="Create a password" 
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
        render={({ field }: { field: ControllerRenderProps<RegisterFormValues, "confirmPassword"> }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input 
                placeholder="Confirm your password" 
                type="password" 
                autoComplete="new-password"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {authError && (
        <div className="text-sm text-destructive">{authError}</div>
      )}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </Form>
  );
} 