'use client';

import { useState } from "react";
import { VehicleList } from "@/features/vehicle/components/VehicleList";
import { Vehicle, VehicleFilters, NewVehicle } from "@/features/vehicle/types";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { VehicleForm } from "@/features/vehicle/components/VehicleForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalTrigger,
} from "@/components/ui/modal/modal";

// TODO: Replace with actual API call
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    licensePlate: "ABC123",
    vin: "1HGCM82633A123456",
    status: "active",
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2019,
    licensePlate: "XYZ789",
    status: "maintenance",
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function VehiclesPage() {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateVehicle = async (data: NewVehicle) => {
    try {
      // TODO: Implement API call to create vehicle
      console.log("Creating vehicle:", data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create vehicle:", error);
      throw error;
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    // TODO: Implement edit functionality
    console.log("Edit vehicle:", vehicle);
  };

  const handleDelete = (vehicle: Vehicle) => {
    // TODO: Implement delete functionality
    console.log("Delete vehicle:", vehicle);
  };

  const handleSelect = (vehicle: Vehicle) => {
    // TODO: Implement view details functionality
    console.log("View vehicle details:", vehicle);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vehicles</h1>
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalTrigger asChild>
            <Button>
              <FiPlus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add New Vehicle</ModalTitle>
              <ModalDescription>
                Enter the details of your new vehicle below.
              </ModalDescription>
            </ModalHeader>
            <VehicleForm
              onSubmit={handleCreateVehicle}
              onCancel={() => setIsModalOpen(false)}
            />
          </ModalContent>
        </Modal>
      </div>

      <VehicleList
        vehicles={mockVehicles}
        filters={filters}
        onFilterChange={setFilters}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelect}
      />
    </div>
  );
} 