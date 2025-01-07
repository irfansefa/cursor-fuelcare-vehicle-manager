import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal/modal";
import { VehicleForm } from "../VehicleForm";
import { Vehicle, NewVehicle } from "../../types";
import { vehicleApi } from "../../store/vehicleApi";
import { useToast } from "@/components/ui/feedback/use-toast";
import { useRouter } from "next/navigation";

interface UpdateVehicleModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateVehicleModal({ vehicle, isOpen, onClose }: UpdateVehicleModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [updateVehicle] = vehicleApi.useUpdateVehicleMutation();

  const handleSubmit = async (data: NewVehicle) => {
    try {
      await updateVehicle({
        id: vehicle.id,
        vehicle: data,
      }).unwrap();
      
      toast({
        title: "Success",
        description: "Vehicle updated successfully",
        variant: "success",
      });
      onClose();
    } catch (error: any) {
      if (error?.status === 401) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to update the vehicle",
          variant: "error",
        });
        router.push('/auth');
        return;
      }
      
      toast({
        title: "Error",
        description: error?.data?.error || error?.error || "Failed to update vehicle",
        variant: "error",
      });
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="sm:max-w-[600px]">
        <ModalHeader>
          <ModalTitle>Update Vehicle</ModalTitle>
        </ModalHeader>
        <VehicleForm
          initialData={vehicle}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitLabel="Update Vehicle"
        />
      </ModalContent>
    </Modal>
  );
} 