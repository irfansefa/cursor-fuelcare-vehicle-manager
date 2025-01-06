'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Vehicle } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";
import { useGetFuelLogsQuery } from "../../store/fuelLogApi";
import { AddFuelLogModal } from "./AddFuelLogModal";

interface VehicleFuelLogsProps {
  vehicle: Vehicle;
}

export function VehicleFuelLogs({ vehicle }: VehicleFuelLogsProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: fuelLogs, isLoading } = useGetFuelLogsQuery(vehicle.id);

  console.log('Fuel logs in component:', JSON.stringify(fuelLogs, null, 2));
  console.log('Sample log price/cost:', fuelLogs?.[0] ? {
    pricePerUnit: fuelLogs[0].pricePerUnit,
    pricePerUnitType: typeof fuelLogs[0].pricePerUnit,
    totalCost: fuelLogs[0].totalCost,
    totalCostType: typeof fuelLogs[0].totalCost,
  } : 'No logs');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    if (!amount || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fuel Logs</CardTitle>
          <Button onClick={() => setIsAddModalOpen(true)} size="sm">
            <FiPlus className="mr-2" />
            Add Fuel Log
          </Button>
        </CardHeader>
        <CardContent>
          {fuelLogs && fuelLogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Odometer</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fuelLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{formatDate(log.date)}</TableCell>
                    <TableCell>{log.odometer} km</TableCell>
                    <TableCell>{log.quantity.toFixed(1)} L</TableCell>
                    <TableCell>{formatCurrency(log.pricePerUnit)}</TableCell>
                    <TableCell>{formatCurrency(log.totalCost)}</TableCell>
                    <TableCell>{log.location || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No fuel logs found. Add your first fuel log to start tracking.
            </div>
          )}
        </CardContent>
      </Card>

      <AddFuelLogModal
        vehicleId={vehicle.id}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
} 