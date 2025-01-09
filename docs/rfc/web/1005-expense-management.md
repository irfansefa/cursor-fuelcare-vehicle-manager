# RFC 1005: Web Expense Management System

## Status
- Status: Draft
- Date: 2024-01-20
- Priority: P1 (Core Feature)

## Context
The Expense Management System provides users with a simple and flexible interface to track and analyze all vehicle-related expenses.

## Goals
- Create intuitive expense tracking interface
- Enable custom expense categorization
- Build comprehensive expense analytics
- Support receipt management (future enhancement)

## Detailed Design

### React Components Structure
```
webapp/
├── features/
│   └── expense/
│       ├── components/
│       │   ├── ExpenseLog/
│       │   │   ├── ExpenseForm
│       │   │   ├── ExpenseList
│       │   │   └── ExpenseFilters
│       │   ├── Categories/
│       │   │   ├── CategoryForm
│       │   │   └── CategoryList
│       │   └── Analytics/
│       │       ├── ExpenseSummary
│       │       ├── CategoryBreakdown
│       │       └── TrendAnalysis
│       ├── hooks/
│       │   ├── useExpense
│       │   └── useCategories
│       ├── store/
│       │   ├── expenseSlice
│       │   └── expenseApi
│       └── utils/
│           ├── calculations
│           └── formatters
```

### State Management
```typescript
interface ExpenseState {
  expenses: Expense[];
  categories: Category[];
  selectedExpense: Expense | null;
  filters: ExpenseFilters;
  loading: boolean;
  error: string | null;
}

interface Expense {
  id: string;
  vehicleId: string;
  date: string;
  categoryId: string;
  amount: number;
  description?: string;
  receiptUrl?: string;
  vendor?: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  userId: string;
}

interface ExpenseFilters {
  dateRange?: DateRange;
  categories?: string[];
  vehicles?: string[];
  search?: string;
}
```

### Features

1. Expense Tracking
   - Simple expense entry
   - Vehicle association
   - Custom categorization
   - Notes and descriptions
   - Basic vendor tracking

2. Category Management
   - Custom category creation
   - Category editing
   - Category color coding
   - Category archiving

3. Analytics Dashboard
   - Expense breakdown by category
   - Time-based analysis
   - Vehicle expense comparison
   - Custom date ranges
   - Export capabilities

### API Integration

```typescript
export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], ExpenseFilters>(),
    addExpense: builder.mutation<Expense, NewExpense>(),
    updateExpense: builder.mutation<Expense, UpdateExpense>(),
    deleteExpense: builder.mutation<void, string>(),
    getCategories: builder.query<Category[], void>(),
    addCategory: builder.mutation<Category, NewCategory>(),
    updateCategory: builder.mutation<Category, UpdateCategory>(),
    deleteCategory: builder.mutation<void, string>()
  })
});
```

### Database Schema

```sql
-- Expense Categories Table
CREATE TABLE expense_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7),  -- Hex color code
    is_system BOOLEAN DEFAULT false,  -- Indicates if this is a default category
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    archived_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT valid_color_format CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
    
    -- Indexes
    CONSTRAINT unique_category_name_per_user UNIQUE (user_id, name)
);

-- Default Categories Table
CREATE TABLE default_expense_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7),
    is_system BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO default_expense_categories (name, description, color) VALUES
    ('Maintenance', 'Regular vehicle maintenance and repairs', '#FF4B4B'),
    ('Insurance', 'Vehicle insurance payments', '#4CAF50'),
    ('Tax', 'Vehicle-related taxes and fees', '#2196F3'),
    ('Parking', 'Parking fees and permits', '#FFC107'),
    ('Cleaning', 'Vehicle washing and detailing', '#9C27B0'),
    ('Registration', 'Vehicle registration fees', '#795548'),
    ('Tolls', 'Road tolls and highway fees', '#607D8B');

-- Function to copy default categories for new users
CREATE OR REPLACE FUNCTION copy_default_categories_for_user(new_user_id UUID)
RETURNS void AS $$
BEGIN
    INSERT INTO expense_categories (
        user_id,
        name,
        description,
        color,
        is_system
    )
    SELECT 
        new_user_id,
        name,
        description,
        color,
        true  -- Mark as system category
    FROM default_expense_categories;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create default categories for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM copy_default_categories_for_user(NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Expenses Table
CREATE TABLE expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id),
    category_id UUID NOT NULL REFERENCES expense_categories(id),
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    vendor VARCHAR(100),
    receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_amount CHECK (amount > 0),
    
    -- Indexes
    CREATE INDEX idx_expenses_vehicle_id ON expenses(vehicle_id),
    CREATE INDEX idx_expenses_category_id ON expenses(category_id),
    CREATE INDEX idx_expenses_date ON expenses(date),
    CREATE INDEX idx_expenses_user_id ON expenses(user_id)
);

-- RLS Policies
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Expense Categories Policies
CREATE POLICY "Users can view their own categories"
    ON expense_categories FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories"
    ON expense_categories FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories"
    ON expense_categories FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories"
    ON expense_categories FOR DELETE
    USING (auth.uid() = user_id);

-- Expenses Policies
CREATE POLICY "Users can view their own expenses"
    ON expenses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expenses"
    ON expenses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses"
    ON expenses FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses"
    ON expenses FOR DELETE
    USING (auth.uid() = user_id);

-- Triggers
CREATE TRIGGER set_updated_at_expense_categories
    BEFORE UPDATE ON expense_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_expenses
    BEFORE UPDATE ON expenses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## Implementation Plan

### Phase 1: Core Expense Management (Week 1)
- [ ] Basic expense form
- [ ] Expense list with filters
- [ ] Custom category management
- [ ] Vehicle selection integration

### Phase 2: Analytics (Week 2)
- [ ] Category-based analysis
- [ ] Time-based trends
- [ ] Vehicle expense breakdown
- [ ] Export functionality

### Phase 3: Enhancements (Week 3)
- [ ] Advanced filtering
- [ ] Batch operations
- [ ] Data visualization
- [ ] Performance optimization

## Component Specifications

### ExpenseForm Component
```typescript
interface ExpenseFormProps {
  vehicleId: string;
  onSubmit: (expense: NewExpense) => Promise<void>;
  initialData?: Expense;
}

const validationSchema = z.object({
  date: z.date(),
  amount: z.number().positive(),
  categoryId: z.string(),
  description: z.string().optional(),
  vehicleId: z.string()
});
```

### CategoryForm Component
```typescript
interface CategoryFormProps {
  onSubmit: (category: NewCategory) => Promise<void>;
  initialData?: Category;
}
```

## UI/UX Considerations
- Simple, intuitive forms
- Quick category creation
- Easy expense filtering
- Clear analytics visualization
- Responsive design

## Testing Strategy
- Component unit tests
- Form validation tests
- Analytics calculation tests
- Filter functionality tests
- Category management tests

## Performance Optimizations
- Efficient data filtering
- Optimized category management
- Smart data loading
- Cached calculations
- Debounced searches

## Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
- Error announcements

## Open Questions
1. Analytics export formats? 