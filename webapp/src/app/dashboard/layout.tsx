import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | FuelCare',
  description: 'View your vehicle fleet overview and key metrics',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 