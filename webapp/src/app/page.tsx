'use client';

import { Button } from '@/components/buttons/Button';
import { MainLayout } from '@/components/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to FuelCare</h1>
        <p className="text-lg text-gray-600">
          Your comprehensive vehicle management solution
        </p>
        <div className="flex space-x-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </MainLayout>
  );
}
