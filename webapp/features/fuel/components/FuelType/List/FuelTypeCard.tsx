'use client';

import { FuelType } from '@/features/fuel/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/card';
import { Badge } from '@/components/ui/utils/badge';
import { Button } from '@/components/ui/button/button';
import { Pencil, Trash2 } from 'lucide-react';

interface FuelTypeCardProps {
  fuelType: FuelType;
  onEdit: (fuelType: FuelType) => void;
  onDelete: () => void;
}

export function FuelTypeCard({ fuelType, onEdit, onDelete }: FuelTypeCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{fuelType.name}</CardTitle>
        <Badge variant={fuelType.status === 'active' ? 'success' : 'secondary'}>
          {fuelType.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {fuelType.description || 'No description provided'}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Unit:</span>
            <span>{fuelType.unit}</span>
          </div>
          {Object.entries(fuelType.properties).length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Properties:</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(fuelType.properties).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(fuelType)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 