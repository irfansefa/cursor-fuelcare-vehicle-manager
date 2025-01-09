'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { FiCalendar, FiClock, FiDroplet, FiTruck, FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useVehicleFuelTypes } from '../../hooks/useVehicleFuelTypes';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { DeleteVehicleDialog } from '../DeleteVehicleDialog';
import { UpdateVehicleModal } from '../UpdateVehicleModal';
import { useRouter } from 'next/navigation';

interface VehicleOverviewProps {
  vehicle: Vehicle;
}

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function VehicleOverview({ vehicle }: VehicleOverviewProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { compatibleFuelTypes, preferredFuelType, isLoading: isLoadingFuelTypes } = useVehicleFuelTypes(vehicle);
  
  // These would come from the API in the real implementation
  const mockStats = {
    totalDistance: "15,234 km",
    fuelEfficiency: "7.2 L/100km",
    lastMaintenance: "2 months ago",
    nextService: "In 2,000 km",
  };

  const handleEditClick = () => setShowUpdateModal(true);
  const handleDeleteClick = () => setShowDeleteDialog(true);
  const handleDeleteSuccess = () => {
    router.push('/vehicles');
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Vehicle Information</CardTitle>
          <div className="flex items-center space-x-2">
            {/* Desktop/Tablet Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleEditClick}>
                <FiEdit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteClick}>
                <FiTrash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
            {/* Mobile Dropdown */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <span className="sr-only">Open menu</span>
                    <FiMoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEditClick}>
                    <FiEdit2 className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600">
                    <FiTrash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Make</dt>
              <dd>{vehicle.make}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Model</dt>
              <dd>{vehicle.model}</dd>
            </div>
            {vehicle.year && (
              <div>
                <dt className="font-medium text-muted-foreground">Year</dt>
                <dd>{vehicle.year}</dd>
              </div>
            )}
            {vehicle.license_plate && (
              <div>
                <dt className="font-medium text-muted-foreground">License Plate</dt>
                <dd>{vehicle.license_plate}</dd>
              </div>
            )}
            {vehicle.vin && (
              <div>
                <dt className="font-medium text-muted-foreground">VIN</dt>
                <dd className="font-mono">{vehicle.vin}</dd>
              </div>
            )}
            <div>
              <dt className="font-medium text-muted-foreground">Compatible Fuel Types</dt>
              <dd>
                {isLoadingFuelTypes ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : compatibleFuelTypes.length > 0 ? (
                  compatibleFuelTypes.join(', ')
                ) : (
                  <span className="text-muted-foreground">No compatible fuel types specified</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Preferred Fuel Type</dt>
              <dd>
                {isLoadingFuelTypes ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : preferredFuelType ? (
                  preferredFuelType
                ) : (
                  <span className="text-muted-foreground">No preferred fuel type specified</span>
                )}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Distance"
          value={mockStats.totalDistance}
          icon={<FiTruck size={20} />}
        />
        <StatCard
          title="Fuel Efficiency"
          value={mockStats.fuelEfficiency}
          icon={<FiDroplet size={20} />}
        />
        <StatCard
          title="Last Maintenance"
          value={mockStats.lastMaintenance}
          icon={<FiClock size={20} />}
        />
        <StatCard
          title="Next Service"
          value={mockStats.nextService}
          icon={<FiCalendar size={20} />}
        />
      </div>

      {/* Modals */}
      <DeleteVehicleDialog
        vehicle={vehicle}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onDelete={handleDeleteSuccess}
      />

      <UpdateVehicleModal
        vehicle={vehicle}
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />
    </div>
  );
} 