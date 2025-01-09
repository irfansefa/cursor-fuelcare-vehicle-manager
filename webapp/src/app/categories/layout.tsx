import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | FuelCare',
  description: 'Manage expense categories for your vehicles',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 