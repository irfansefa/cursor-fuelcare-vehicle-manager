import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vehicles | FuelCare',
  description: 'Manage and track your vehicles fuel consumption and expenses',
};

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 