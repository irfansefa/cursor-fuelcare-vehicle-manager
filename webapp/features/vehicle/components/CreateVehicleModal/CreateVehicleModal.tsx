import { Button } from "@/components/ui/button";
import {
  Modal as Dialog,
  ModalContent as DialogContent,
  ModalHeader as DialogHeader,
  ModalTitle as DialogTitle,
  ModalTrigger as DialogTrigger,
} from "@/components/ui/modal/modal";
import { VehicleForm } from "../VehicleForm";
import { NewVehicle } from "../../types";
import { vehicleApi } from "../../store/vehicleApi";
import { useState } from "react";
import { useToast } from "@/components/ui/feedback/use-toast";
import { useRouter } from "next/navigation";

export function CreateVehicleModal() {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Vehicle</DialogTitle>
        </DialogHeader>
        <VehicleForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 