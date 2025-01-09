import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card/card";
import { Vehicle } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/utils/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { DeleteVehicleDialog } from './DeleteVehicleDialog';
import { UpdateVehicleModal } from './UpdateVehicleModal';
import { useVehicleFuelTypes } from '../hooks/useVehicleFuelTypes';

interface VehicleCardProps {
  vehicle: Vehicle;
  onUpdate?: () => void;
  onSelect?: () => void;
}

export function VehicleCard({ vehicle, onUpdate, onSelect }: VehicleCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleEditClick = () => setShowUpdateModal(true);
  const handleEditClose = () => {
    setShowUpdateModal(false);
    onUpdate?.();
  };
  const handleDeleteClick = () => setShowDeleteDialog(true);

  return (
    <>
      <Card className="w-full flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div>
              {vehicle.make} {vehicle.model}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditClick}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription>
            {vehicle.year && `Year: ${vehicle.year}`}
            {vehicle.license_plate && ` • License Plate: ${vehicle.license_plate}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="grid gap-2">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Status:</span>
              <Badge
                variant={
                  vehicle.status === "active"
                    ? "success"
                    : vehicle.status === "maintenance"
                    ? "warning"
                    : "destructive"
                }
              >
                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
              </Badge>
            </div>
            {vehicle.vin && (
              <div>
                <span className="font-semibold">VIN:</span> {vehicle.vin}
              </div>
            )}
            {vehicle.preferred_fuel_type && (
              <div>
                <span className="font-semibold">Fuel:</span>{" "}
                <FuelTypeDisplay vehicle={vehicle} />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          {onSelect && (
            <Button variant="secondary" className="w-full" onClick={onSelect}>
              View Details
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Delete Dialog */}
      <DeleteVehicleDialog
        vehicle={vehicle}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onDelete={onUpdate}
      />

      {/* Update Vehicle Modal */}
      <UpdateVehicleModal
        vehicle={vehicle}
        isOpen={showUpdateModal}
        onClose={handleEditClose}
      />
    </>
  );
}

function FuelTypeDisplay({ vehicle }: { vehicle: Vehicle }) {
  const { preferredFuelType, isLoading } = useVehicleFuelTypes(vehicle);
  
  if (isLoading) {
    return <span className="text-muted-foreground">Loading...</span>;
  }
  
  return <span>{preferredFuelType || 'Not specified'}</span>;
} 