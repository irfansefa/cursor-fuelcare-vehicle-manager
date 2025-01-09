import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | FuelCare',
  description: 'Sign in to your FuelCare account to manage your vehicles',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 