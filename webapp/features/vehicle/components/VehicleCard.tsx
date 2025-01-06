import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card/card";
import { Vehicle, VehicleStatus } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/utils/badge";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
}

const statusVariants: Record<VehicleStatus, "success" | "warning" | "error"> = {
  active: "success",
  maintenance: "warning",
  inactive: "error",
};

export function VehicleCard({ vehicle, onEdit, onDelete, onSelect }: VehicleCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-lg">{vehicle.make} {vehicle.model}</h3>
          <Badge variant={statusVariants[vehicle.status]}>
            {vehicle.status}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <FiMoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={onEdit}>
                Edit
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {vehicle.year && (
            <div>
              <p className="text-muted-foreground">Year</p>
              <p className="font-medium">{vehicle.year}</p>
            </div>
          )}
          {vehicle.licensePlate && (
            <div>
              <p className="text-muted-foreground">License Plate</p>
              <p className="font-medium">{vehicle.licensePlate}</p>
            </div>
          )}
          {vehicle.vin && (
            <div className="col-span-2">
              <p className="text-muted-foreground">VIN</p>
              <p className="font-medium">{vehicle.vin}</p>
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
  );
} 