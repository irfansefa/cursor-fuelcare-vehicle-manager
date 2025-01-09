'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/navigation/tabs';
import { CategoryBreakdown } from './category-breakdown/CategoryBreakdown';
import { TrendAnalysis } from './trend-analysis/TrendAnalysis';

interface VehicleExpenseAnalyticsProps {
  vehicleId: string;
}

export function VehicleExpenseAnalytics({ vehicleId }: VehicleExpenseAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('category');

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="category">Category Analysis</TabsTrigger>
          <TabsTrigger value="trends">Expense Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="category">
          <CategoryBreakdown vehicleId={vehicleId} />
        </TabsContent>

        <TabsContent value="trends">
          <TrendAnalysis vehicleId={vehicleId} />
        </TabsContent>
      </Tabs>
    </Card>
  );
} 