import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card/card";
import { Vehicle } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/utils/badge";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { DeleteVehicleDialog } from './DeleteVehicleDialog';
import { UpdateVehicleModal } from './UpdateVehicleModal';

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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div>
              {vehicle.make} {vehicle.model}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Open menu</span>
                  <FiMoreHorizontal className="h-4 w-4" />
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
        <CardContent>
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
          </div>
        </CardContent>
        <CardFooter>
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