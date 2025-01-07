import { z } from 'zod';

export const fuelLogSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  fuelTypeId: z.string({
    required_error: 'Please select a fuel type',
  }),
  quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
  pricePerUnit: z.number().min(0.01, 'Price per unit must be greater than 0'),
  totalCost: z.number().min(0, 'Total cost must be greater than or equal to 0'),
  odometer: z.number().min(0, 'Odometer reading must be greater than or equal to 0'),
  location: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type FuelLogFormValues = z.infer<typeof fuelLogSchema>; 