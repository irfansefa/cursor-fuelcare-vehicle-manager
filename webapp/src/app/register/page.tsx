'use client';

import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { PageLayout } from '@/components/layout/page-layout';

export default function RegisterPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-md">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your details to create your account
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </PageLayout>
  );
} 