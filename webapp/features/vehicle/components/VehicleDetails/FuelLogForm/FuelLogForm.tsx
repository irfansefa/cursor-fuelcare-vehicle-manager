'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FuelLogFormValues, fuelLogSchema } from './schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Input } from '@/components/ui/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { Button } from '@/components/ui/button/button';
import { Textarea } from '@/components/ui/form/textarea';
import { useEffect } from 'react';

interface FuelLogFormProps {
  defaultValues?: Partial<FuelLogFormValues>;
  onSubmit: (data: FuelLogFormValues) => void;
  isSubmitting?: boolean;
}

export function FuelLogForm({ defaultValues, onSubmit, isSubmitting }: FuelLogFormProps) {
  const form = useForm<FuelLogFormValues>({
    resolver: zodResolver(fuelLogSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      fuelType: 'regular',
      quantity: undefined,
      pricePerUnit: undefined,
      totalCost: 0,
      odometer: undefined,
      location: '',
      notes: '',
      ...defaultValues,
    },
  });

  // Auto-calculate total cost when quantity or price changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'quantity' || name === 'pricePerUnit') {
        const quantity = form.getValues('quantity');
        const pricePerUnit = form.getValues('pricePerUnit');
        const totalCost = Number((quantity * pricePerUnit).toFixed(2));
        form.setValue('totalCost', totalCost || 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select
                  value={field.value || 'regular'}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity (L)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Enter quantity"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(e.target.value ? +e.target.value : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pricePerUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Unit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Enter price per unit"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(e.target.value ? +e.target.value : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Cost</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    value={field.value?.toString() || '0'}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="odometer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Odometer (km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Enter odometer reading"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(e.target.value ? +e.target.value : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} placeholder="Enter location (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value || ''} placeholder="Enter notes (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 