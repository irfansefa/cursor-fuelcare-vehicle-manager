import { NewVehicle, Vehicle } from "../../types";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/form/checkbox";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const schema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  license_plate: z.string().optional(),
  vin: z.string().optional(),
  status: z.enum(["active", "maintenance", "inactive"]),
  compatible_fuel_types: z.array(z.string()).min(1, "Select at least one fuel type"),
  preferred_fuel_type: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData?: Vehicle;
  onSubmit: (data: NewVehicle) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function VehicleForm({ initialData, onSubmit, onCancel, submitLabel = "Create Vehicle" }: Props) {
  const [fuelTypes, setFuelTypes] = useState<Array<{ id: string; name: string }>>([]);
  const supabase = createClientComponentClient();
  
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      make: initialData?.make ?? "",
      model: initialData?.model ?? "",
      year: initialData?.year ?? undefined,
      license_plate: initialData?.license_plate ?? "",
      vin: initialData?.vin ?? "",
      status: initialData?.status ?? "active",
      compatible_fuel_types: [],
      preferred_fuel_type: "",
    }
  });

  const compatibleFuelTypes = form.watch("compatible_fuel_types");

  // Load fuel types
  useEffect(() => {
    const loadFuelTypes = async () => {
      const { data } = await supabase
        .from("fuel_types")
        .select("id, name")
        .eq("status", "active")
        .order("name");
      
      if (data) {
        setFuelTypes(data);
      }
    };

    loadFuelTypes();
  }, [supabase]);

  // Set initial values when fuel types are loaded
  useEffect(() => {
    if (initialData && fuelTypes.length > 0) {
      // Create a map of fuel type IDs to names
      const fuelTypeMap = new Map(fuelTypes.map(ft => [ft.id, ft.name]));

      // Convert fuel type IDs to names
      const compatibleNames = initialData.compatible_fuel_types
        .map(id => fuelTypeMap.get(id))
        .filter((name): name is string => !!name);

      const preferredName = initialData.preferred_fuel_type
        ? fuelTypeMap.get(initialData.preferred_fuel_type) ?? ""
        : "";

      // Debug values
      console.log("Setting initial values:", {
        compatibleNames,
        preferredName,
        originalCompatible: initialData.compatible_fuel_types,
        originalPreferred: initialData.preferred_fuel_type,
      });

      // Set form values
      form.setValue("compatible_fuel_types", compatibleNames);
      form.setValue("preferred_fuel_type", preferredName);
    }
  }, [initialData, fuelTypes, form]);

  const handleSubmit = async (data: FormData) => {
    // Convert fuel type names back to IDs
    const fuelTypeMap = new Map(fuelTypes.map(ft => [ft.name, ft.id]));
    
    const compatible_fuel_types = data.compatible_fuel_types
      .map(name => fuelTypeMap.get(name))
      .filter((id): id is string => !!id);
      
    const preferred_fuel_type = data.preferred_fuel_type 
      ? fuelTypeMap.get(data.preferred_fuel_type)
      : undefined;

    await onSubmit({
      ...data,
      compatible_fuel_types,
      preferred_fuel_type,
    });
  };

  return (
    <div className="space-y-6">
      <Form form={form} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Make */}
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input placeholder="Enter make" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Model */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Enter model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year */}
          <FormField
            control={form.control}
            name="year"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Year (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter year"
                    {...field}
                    value={value ?? ""}
                    onChange={e => onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* License Plate */}
          <FormField
            control={form.control}
            name="license_plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Plate (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter license plate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* VIN */}
          <FormField
            control={form.control}
            name="vin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VIN (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter VIN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Compatible Fuel Types */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="compatible_fuel_types"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Compatible Fuel Types</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {fuelTypes.map((type) => (
                      <FormField
                        key={type.id}
                        control={form.control}
                        name="compatible_fuel_types"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={type.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type.name)}
                                  onCheckedChange={(checked) => {
                                    const value: string[] = field.value || [];
                                    if (checked) {
                                      field.onChange([...value, type.name]);
                                    } else {
                                      field.onChange(
                                        value.filter((val: string) => val !== type.name)
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {type.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Preferred Fuel Type */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="preferred_fuel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Fuel Type (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred fuel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {compatibleFuelTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {submitLabel}
          </Button>
        </div>
      </Form>
    </div>
  );
} 