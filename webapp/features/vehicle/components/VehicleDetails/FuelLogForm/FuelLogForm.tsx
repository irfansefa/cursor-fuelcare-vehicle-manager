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
import { Button } from '@/components/ui/button/button';
import { Textarea } from '@/components/ui/form/textarea';
import { useEffect, useState } from 'react';
import { FuelTypeSelect } from '@/features/fuel/components/FuelLog/FuelTypeSelect';

interface FuelLogFormProps {
  defaultValues?: Partial<FuelLogFormValues>;
  onSubmit: (data: FuelLogFormValues) => void;
  isSubmitting?: boolean;
  vehicleId: string;
}

export function FuelLogForm({ defaultValues, onSubmit, isSubmitting, vehicleId }: FuelLogFormProps) {
  const [unit, setUnit] = useState<'liters' | 'gallons'>('liters');

  const form = useForm<FuelLogFormValues>({
    resolver: zodResolver(fuelLogSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      fuelTypeId: '',
      quantity: 0,
      pricePerUnit: 0,
      totalCost: 0,
      odometer: 0,
      location: '',
      notes: '',
      ...defaultValues,
    },
  });

  // Auto-calculate total cost when quantity or price changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'quantity' || name === 'pricePerUnit') {
        const quantity = form.getValues('quantity') || 0;
        const pricePerUnit = form.getValues('pricePerUnit') || 0;
        const totalCost = Number((quantity * pricePerUnit).toFixed(2));
        form.setValue('totalCost', totalCost);
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
            name="fuelTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <FormControl>
                  <FuelTypeSelect
                    vehicleId={vehicleId}
                    value={field.value}
                    onChange={field.onChange}
                    onUnitChange={setUnit}
                    error={form.formState.errors.fuelTypeId?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Quantity ({unit === 'liters' ? 'L' : 'gal'})</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Enter quantity"
                    {...field}
                    value={value || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange(val ? Number(val) : 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pricePerUnit"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Price per {unit === 'liters' ? 'Liter' : 'Gallon'}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Enter price per unit"
                    {...field}
                    value={value || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange(val ? Number(val) : 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalCost"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Total Cost</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    value={value || 0}
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
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Odometer (km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Enter odometer reading"
                    {...field}
                    value={value || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange(val ? Number(val) : 0);
                    }}
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