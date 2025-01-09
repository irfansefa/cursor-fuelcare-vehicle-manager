'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FuelType, CreateFuelTypeDTO, UpdateFuelTypeDTO } from '@/features/fuel/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Textarea } from '@/components/ui/form/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { Plus, Trash2 } from 'lucide-react';

const propertySchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
});

const fuelTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  unit: z.enum(['liters', 'gallons'] as const),
  properties: z.array(propertySchema).optional().default([]),
  status: z.enum(['active', 'inactive'] as const).default('active'),
});

type FuelTypeFormValues = z.infer<typeof fuelTypeSchema>;

interface FuelTypeFormProps {
  fuelType?: FuelType;
  onSubmit: (data: CreateFuelTypeDTO) => Promise<void>;
  isSubmitting?: boolean;
}

interface EditFuelTypeFormProps {
  fuelType: FuelType;
  onSubmit: (data: UpdateFuelTypeDTO) => Promise<void>;
  isSubmitting?: boolean;
}

export function FuelTypeForm(props: FuelTypeFormProps | EditFuelTypeFormProps) {
  const isEditing = 'fuelType' in props && props.fuelType !== undefined;
  const { onSubmit, isSubmitting = false } = props;
  const fuelType = isEditing ? props.fuelType : undefined;

  const form = useForm<FuelTypeFormValues>({
    resolver: zodResolver(fuelTypeSchema),
    defaultValues: {
      name: fuelType?.name || '',
      description: fuelType?.description || '',
      unit: fuelType?.unit || 'liters',
      properties: fuelType ? Object.entries(fuelType.properties || {}).map(([key, value]) => ({
        key,
        value: String(value),
      })) : [],
      status: fuelType?.status || 'active',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "properties"
  });

  const handleSubmit = async (data: FuelTypeFormValues) => {
    try {
      // Convert properties array to object
      const properties = data.properties?.reduce((acc, { key, value }) => ({
        ...acc,
        [key]: value
      }), {});

      const submitData = {
        ...data,
        properties,
        ...(isEditing && props.fuelType ? { id: props.fuelType.id } : {}),
      };

      await onSubmit(submitData as any); // Type assertion needed due to TypeScript limitation
      if (!isEditing) {
        form.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter fuel type name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description (optional)"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="liters">Liters</SelectItem>
                    <SelectItem value="gallons">Gallons</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Properties</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ key: '', value: '' })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
          
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name={`properties.${index}.key`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`properties.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 