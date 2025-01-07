import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal/modal";
import { VehicleForm } from "../VehicleForm";
import { NewVehicle } from "../../types";
import { vehicleApi } from "../../store/vehicleApi";
import { useToast } from "@/components/ui/feedback/use-toast";
import { useRouter } from "next/navigation";

interface CreateVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVehicleModal({ isOpen, onClose }: CreateVehicleModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [createVehicle] = vehicleApi.useCreateVehicleMutation();

  const handleSubmit = async (data: NewVehicle) => {
    try {
      const result = await createVehicle(data).unwrap();
      
      toast({
        title: "Success",
        description: "Vehicle created successfully",
        variant: "success",
      });
      onClose();
      router.push(`/vehicles/${result.id}`);
    } catch (error: any) {
      if (error?.status === 401) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to create a vehicle",
          variant: "error",
        });
        router.push('/auth');
        return;
      }
      
      toast({
        title: "Error",
        description: error?.data?.error || error?.error || "Failed to create vehicle",
        variant: "error",
      });
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="sm:max-w-[600px]">
        <ModalHeader>
          <ModalTitle>Create Vehicle</ModalTitle>
        </ModalHeader>
        <VehicleForm
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </ModalContent>
    </Modal>
  );
} 