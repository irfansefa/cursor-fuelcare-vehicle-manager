'use client';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { PageLayout } from '@/components/layout/page-layout';

export default function LoginPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-md">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </PageLayout>
  );
} 