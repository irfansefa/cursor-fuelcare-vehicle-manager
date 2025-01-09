import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuel Types | FuelCare',
  description: 'Manage different types of fuel for your vehicles',
};

export default function FuelTypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 