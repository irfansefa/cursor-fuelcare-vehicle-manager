'use client';

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

export interface FormProps {
  children: ReactNode;
  onSubmit: (data: unknown) => void;
}

export function Form({ children, onSubmit }: FormProps) {
  const form = useForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {children}
    </form>
  );
} 