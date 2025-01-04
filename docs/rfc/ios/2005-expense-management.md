# RFC 2005: iOS Expense Management System

## Status
- Status: Draft
- Date: 2024-01-20
- Priority: P1 (Core Feature)

## Context
The iOS Expense Management System provides users with a native mobile interface to track and manage vehicle-related expenses, leveraging iOS capabilities for receipt scanning, offline tracking, and location-based expense categorization.

## Goals
- Create expense tracking interface
- Implement smart receipt scanning
- Build budget management system
- Develop expense analytics

## Detailed Design

### Feature Structure
```
ios/FuelCare/Features/Expense/
├── Domain/
│   ├── Models/
│   │   ├── Expense.swift
│   │   ├── Receipt.swift
│   │   └── Budget.swift
│   ├── Repositories/
│   │   └── ExpenseRepository.swift
│   └── UseCases/
│       ├── ManageExpenseUseCase.swift
│       └── BudgetAnalysisUseCase.swift
├── Data/
│   ├── DataSources/
│   │   ├── ExpenseRemoteDataSource.swift
│   │   └── ExpenseLocalDataSource.swift
│   └── Repositories/
│       └── ExpenseRepositoryImpl.swift
└── Presentation/
    ├── ViewModels/
    │   ├── ExpenseListViewModel.swift
    │   ├── ExpenseDetailViewModel.swift
    │   └── BudgetViewModel.swift
    ├── Views/
    │   ├── ExpenseListViewController.swift
    │   ├── ExpenseDetailViewController.swift
    │   ├── BudgetViewController.swift
    │   └── Components/
    │       ├── ReceiptScanner.swift
    │       ├── ExpenseCard.swift
    │       └── BudgetChart.swift
    └── Coordinator/
        └── ExpenseCoordinator.swift
```

### Core Components

1. Expense Models
```swift
struct Expense: Codable {
    let id: String
    let vehicleId: String
    var date: Date
    var amount: Decimal
    var category: ExpenseCategory
    var description: String
    var receipt: Receipt?
    var location: Location?
    var tags: [String]
    var paymentMethod: PaymentMethod?
    
    var isSync: Bool
    var lastSyncDate: Date?
}

struct Budget: Codable {
    let id: String
    let vehicleId: String
    var category: ExpenseCategory
    var amount: Decimal
    var period: BudgetPeriod
    var startDate: Date
    var endDate: Date
    var alerts: [BudgetAlert]
}

struct BudgetAnalysis {
    let totalSpent: Decimal
    let remainingBudget: Decimal
    let percentageUsed: Double
    let projectedOverage: Decimal?
    let categoryBreakdown: [CategorySpend]
}
```

2. Expense Repository
```swift
protocol ExpenseRepository {
    func getExpenses(vehicleId: String) async throws -> [Expense]
    func saveExpense(_ expense: Expense) async throws -> Expense
    func updateExpense(_ expense: Expense) async throws -> Expense
    func deleteExpense(id: String) async throws
    func getBudgets(vehicleId: String) async throws -> [Budget]
    func updateBudget(_ budget: Budget) async throws -> Budget
    func analyzeBudget(vehicleId: String) async throws -> BudgetAnalysis
}

class ExpenseRepositoryImpl: ExpenseRepository {
    private let remoteDataSource: ExpenseRemoteDataSource
    private let localDataSource: ExpenseLocalDataSource
    private let receiptScanner: ReceiptScannerService
    private let locationService: LocationService
    
    // Implementation
}
```

3. Expense ViewModel
```swift
class ExpenseDetailViewModel: ViewModel {
    struct Input {
        let saveTrigger: Observable<Void>
        let scanReceiptTrigger: Observable<Void>
        let useLocationTrigger: Observable<Void>
        let expenseData: Observable<ExpenseFormData>
        let categorySelection: Observable<ExpenseCategory>
    }
    
    struct Output {
        let isLoading: Observable<Bool>
        let error: Observable<Error?>
        let expense: Observable<Expense?>
        let saveResult: Observable<Bool>
        let scannerVisible: Observable<Bool>
        let budgetImpact: Observable<BudgetImpact?>
    }
    
    private let expenseRepository: ExpenseRepository
    private let receiptScanner: ReceiptScannerService
    private let locationService: LocationService
    
    func transform(input: Input) -> Output {
        // Implementation
    }
}
```

### Features

1. Expense Management
   - Quick entry
   - Batch operations
   - Category management
   - Tag system

2. Receipt Processing
   - Smart scanning
   - Auto-categorization
   - Data extraction
   - Receipt organization

3. Budget System
   - Budget planning
   - Spending alerts
   - Category budgets
   - Forecast analysis

4. Analytics
   - Spending patterns
   - Category analysis
   - Trend visualization
   - Budget tracking

### API Integration

```swift
protocol ExpenseEndpoint {
    static func getExpenses(vehicleId: String) -> Endpoint
    static func createExpense(expense: Expense) -> Endpoint
    static func updateExpense(expense: Expense) -> Endpoint
    static func deleteExpense(id: String) -> Endpoint
    static func getBudgets(vehicleId: String) -> Endpoint
    static func updateBudget(budget: Budget) -> Endpoint
}

extension ExpenseEndpoint {
    static func getExpenses(vehicleId: String) -> Endpoint {
        return Endpoint(
            path: "/vehicles/\(vehicleId)/expenses",
            method: .get,
            headers: ["Content-Type": "application/json"]
        )
    }
    // Other endpoints
}
```

## Implementation Plan

### Phase 1: Core Features (Week 1)
- [ ] Expense interface
- [ ] CRUD operations
- [ ] Category system
- [ ] Local storage

### Phase 2: Receipt System (Week 2)
- [ ] Scanner interface
- [ ] OCR processing
- [ ] Auto-categorization
- [ ] Receipt management

### Phase 3: Budget Features (Week 3)
- [ ] Budget interface
- [ ] Alert system
- [ ] Analysis tools
- [ ] Forecasting

### Phase 4: Analytics (Week 4)
- [ ] Analytics dashboard
- [ ] Reports generation
- [ ] Export features
- [ ] Insights system

## UI Components

### ExpenseDetailViewController
```swift
class ExpenseDetailViewController: BaseViewController<ExpenseDetailViewModel> {
    private let scrollView = UIScrollView()
    private let formContainer = UIStackView()
    private let receiptImageView = UIImageView()
    private let scanButton = IconButton()
    private let categoryPicker = CategoryPickerView()
    private let saveButton = PrimaryButton()
    
    override func setupUI() {
        // UI setup
    }
    
    override func bindViewModel() {
        let input = ExpenseDetailViewModel.Input(
            saveTrigger: saveButton.rx.tap.asObservable(),
            scanReceiptTrigger: scanButton.rx.tap.asObservable(),
            useLocationTrigger: locationButton.rx.tap.asObservable(),
            expenseData: formData.asObservable(),
            categorySelection: categoryPicker.rx.selection.asObservable()
        )
        
        let output = viewModel.transform(input: input)
        // Bind outputs
    }
}
```

## Testing Strategy
- Repository tests
- OCR accuracy tests
- Budget calculations
- Category logic
- UI interaction tests

## Performance Considerations
- Receipt processing
- Background sync
- Data caching
- Memory management
- Battery optimization

## Security Measures
- Receipt encryption
- Secure storage
- Data privacy
- Access control

## Accessibility
- VoiceOver support
- Dynamic type
- Manual entry options
- Receipt alternatives
- Budget notifications

## Open Questions
1. ML model for categorization?
2. Budget alert frequency?
3. Receipt retention policy?
4. Offline analytics scope? 