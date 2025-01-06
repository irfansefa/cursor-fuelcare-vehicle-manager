import { Vehicle, VehicleFilters } from "../types";
import { VehicleCard } from "./VehicleCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";

interface VehicleListProps {
  vehicles: Vehicle[];
  filters: VehicleFilters;
  onFilterChange: (filters: VehicleFilters) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
  onSelect?: (vehicle: Vehicle) => void;
}

export function VehicleList({
  vehicles,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
  onSelect,
}: VehicleListProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Search vehicles..."
          value={filters.search ?? ""}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="max-w-sm"
        />
        <Select
          value={filters.status}
          onValueChange={(value: any) =>
            onFilterChange({ ...filters, status: value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={onEdit ? () => onEdit(vehicle) : undefined}
            onDelete={onDelete ? () => onDelete(vehicle) : undefined}
            onSelect={onSelect ? () => onSelect(vehicle) : undefined}
          />
        ))}
      </div>
    </div>
  );
} 