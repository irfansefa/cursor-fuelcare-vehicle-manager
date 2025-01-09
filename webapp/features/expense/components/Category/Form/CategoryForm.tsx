'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/features/expense/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Input } from '@/components/ui/input/input';
import { Textarea } from '@/components/ui/form/textarea';
import { Button } from '@/components/ui/button/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/form/radio-group';
import { cn } from '@/lib/utils';

const CATEGORY_COLORS = [
  { value: 'bg-red-500', label: 'Red' },
  { value: 'bg-orange-500', label: 'Orange' },
  { value: 'bg-amber-500', label: 'Amber' },
  { value: 'bg-yellow-500', label: 'Yellow' },
  { value: 'bg-lime-500', label: 'Lime' },
  { value: 'bg-green-500', label: 'Green' },
  { value: 'bg-emerald-500', label: 'Emerald' },
  { value: 'bg-teal-500', label: 'Teal' },
  { value: 'bg-cyan-500', label: 'Cyan' },
  { value: 'bg-sky-500', label: 'Sky' },
  { value: 'bg-blue-500', label: 'Blue' },
  { value: 'bg-indigo-500', label: 'Indigo' },
  { value: 'bg-violet-500', label: 'Violet' },
  { value: 'bg-purple-500', label: 'Purple' },
  { value: 'bg-fuchsia-500', label: 'Fuchsia' },
  { value: 'bg-pink-500', label: 'Pink' },
  { value: 'bg-rose-500', label: 'Rose' },
];

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  description: z.string().max(200, 'Description is too long').optional(),
  color: z.string().min(1, 'Color is required'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryDTO) => Promise<void>;
}

interface EditCategoryFormProps {
  category: Category;
  onSubmit: (data: UpdateCategoryDTO) => Promise<void>;
}

export function CategoryForm(props: CategoryFormProps | EditCategoryFormProps) {
  const isEditing = 'category' in props;
  const category = isEditing ? props.category : null;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
      color: category?.color || CATEGORY_COLORS[0].value,
    },
  });

  const handleSubmit = async (data: CategoryFormValues) => {
    if (isEditing) {
      await props.onSubmit({
        ...data,
        id: props.category.id,
      });
    } else {
      await props.onSubmit(data);
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
                <Input placeholder="Enter category name" {...field} />
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

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-6 gap-2"
                >
                  {CATEGORY_COLORS.map((color) => (
                    <FormItem key={color.value}>
                      <FormControl>
                        <RadioGroupItem
                          value={color.value}
                          id={color.value}
                          className="peer sr-only"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={color.value}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div
                          className={cn(
                            "h-6 w-6 rounded-full",
                            color.value
                          )}
                        />
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
              ? 'Update Category'
              : 'Create Category'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 