'use client';

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { useGetCategoriesQuery } from "@/features/expense/store/categoryApi";

export interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CategorySelect = React.forwardRef<HTMLButtonElement, CategorySelectProps>(
  ({ value, onChange, error }, ref) => {
    const { data: categories, isLoading, error: fetchError } = useGetCategoriesQuery({});

    return (
      <Select
        value={value}
        onValueChange={onChange}
        disabled={isLoading || !categories?.length}
      >
        <SelectTrigger
          ref={ref}
          className={error || fetchError ? "border-red-500" : ""}
          aria-invalid={!!error || !!fetchError}
        >
          <SelectValue 
            placeholder={
              fetchError 
                ? "Error loading categories" 
                : !categories?.length
                ? "No categories available" 
                : "Select category"
            } 
          />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2"
            >
              <div className={`w-3 h-3 rounded-full ${category.color}`} />
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

CategorySelect.displayName = "CategorySelect"; 