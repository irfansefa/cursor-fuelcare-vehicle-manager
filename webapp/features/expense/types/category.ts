export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  color: string;
}

export interface UpdateCategoryDTO extends CreateCategoryDTO {
  id: string;
}

export interface CategoryFilters {
  search?: string;
  sortBy?: keyof Category;
  sortOrder?: 'asc' | 'desc';
} 