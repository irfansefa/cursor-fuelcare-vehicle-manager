# RFC 2004: iOS Fuel Management System

## Status
- Status: Draft
- Date: 2024-01-20
- Priority: P1 (Core Feature)

## Context
The iOS Fuel Management System provides users with a native mobile interface to track fuel consumption, manage receipts, and analyze efficiency, leveraging iOS capabilities for location tracking, camera integration, and offline functionality.

## Goals
- Create fuel tracking interface
- Implement receipt scanning
- Build location tracking
- Develop efficiency analytics

## Detailed Design

### Feature Structure
```
ios/FuelCare/Features/Fuel/
├── Domain/
│   ├── Models/
│   │   ├── FuelEntry.swift
│   │   ├── Receipt.swift
│   │   └── FuelStats.swift
│   ├── Repositories/
│   │   └── FuelRepository.swift
│   └── UseCases/
│       ├── TrackFuelUseCase.swift
│       └── AnalyzeFuelUseCase.swift
├── Data/
│   ├── DataSources/
│   │   ├── FuelRemoteDataSource.swift
│   │   └── FuelLocalDataSource.swift
│   └── Repositories/
│       └── FuelRepositoryImpl.swift
└── Presentation/
    ├── ViewModels/
    │   ├── FuelEntryViewModel.swift
    │   ├── FuelHistoryViewModel.swift
    │   └── FuelAnalyticsViewModel.swift
    ├── Views/
    │   ├── FuelEntryViewController.swift
    │   ├── FuelHistoryViewController.swift
    │   ├── FuelAnalyticsViewController.swift
    │   └── Components/
    │       ├── ReceiptScanner.swift
    │       ├── FuelStatsCard.swift
    │       └── EfficiencyChart.swift
    └── Coordinator/
        └── FuelCoordinator.swift
```

### Core Components

1. Fuel Models
```swift
struct FuelEntry: Codable {
    let id: String
    let vehicleId: String
    var date: Date
    var odometer: Double
    var volume: Double
    var cost: Decimal
    var fuelType: FuelType
    var location: Location?
    var receipt: Receipt?
    var notes: String?
    
    var isSync: Bool
    var lastSyncDate: Date?
}

struct Receipt: Codable {
    let id: String
    let imageUrl: URL
    let localPath: String?
    let scannedData: ScannedReceiptData?
    let timestamp: Date
}

struct FuelStats {
    let averageConsumption: Double
    let totalCost: Decimal
    let totalVolume: Double
    let efficiency: Double
    let trends: ConsumptionTrends
}
```

2. Fuel Repository
```swift
protocol FuelRepository {
    func getFuelEntries(vehicleId: String) async throws -> [FuelEntry]
    func saveFuelEntry(_ entry: FuelEntry) async throws -> FuelEntry
    func updateFuelEntry(_ entry: FuelEntry) async throws -> FuelEntry
    func deleteFuelEntry(id: String) async throws
    func uploadReceipt(_ image: UIImage, for entry: FuelEntry) async throws -> Receipt
    func getFuelStats(vehicleId: String) async throws -> FuelStats
}

class FuelRepositoryImpl: FuelRepository {
    private let remoteDataSource: FuelRemoteDataSource
    private let localDataSource: FuelLocalDataSource
    private let receiptScanner: ReceiptScannerService
    private let locationService: LocationService
    
    // Implementation
}
```

3. Fuel ViewModel
```swift
class FuelEntryViewModel: ViewModel {
    struct Input {
        let saveTrigger: Observable<Void>
        let scanReceiptTrigger: Observable<Void>
        let useLocationTrigger: Observable<Void>
        let entryData: Observable<FuelEntryFormData>
    }
    
    struct Output {
        let isLoading: Observable<Bool>
        let error: Observable<Error?>
        let entry: Observable<FuelEntry?>
        let saveResult: Observable<Bool>
        let scannerVisible: Observable<Bool>
        let currentLocation: Observable<Location?>
    }
    
    private let fuelRepository: FuelRepository
    private let receiptScanner: ReceiptScannerService
    private let locationService: LocationService
    
    func transform(input: Input) -> Output {
        // Implementation
    }
}
```

### Features

1. Fuel Entry Management
   - Quick entry
   - Receipt scanning
   - Location tracking
   - Offline support

2. Receipt Processing
   - Camera integration
   - OCR processing
   - Data extraction
   - Receipt storage

3. Location Services
   - Auto-location
   - Station detection
   - Distance tracking
   - Map integration

4. Analytics
   - Consumption tracking
   - Cost analysis
   - Efficiency metrics
   - Trend visualization

### API Integration

```swift
protocol FuelEndpoint {
    static func getFuelEntries(vehicleId: String) -> Endpoint
    static func createFuelEntry(entry: FuelEntry) -> Endpoint
    static func updateFuelEntry(entry: FuelEntry) -> Endpoint
    static func deleteFuelEntry(id: String) -> Endpoint
    static func uploadReceipt(entryId: String) -> Endpoint
    static func getFuelStats(vehicleId: String) -> Endpoint
}

extension FuelEndpoint {
    static func getFuelEntries(vehicleId: String) -> Endpoint {
        return Endpoint(
            path: "/vehicles/\(vehicleId)/fuel",
            method: .get,
            headers: ["Content-Type": "application/json"]
        )
    }
    // Other endpoints
}
```

## Implementation Plan

### Phase 1: Core Features (Week 1)
- [ ] Entry interface
- [ ] History view
- [ ] CRUD operations
- [ ] Local storage

### Phase 2: Receipt System (Week 2)
- [ ] Camera integration
- [ ] OCR processing
- [ ] Data extraction
- [ ] Receipt storage

### Phase 3: Location Features (Week 3)
- [ ] Location services
- [ ] Station detection
- [ ] Distance tracking
- [ ] Map integration

### Phase 4: Analytics (Week 4)
- [ ] Stats calculation
- [ ] Chart visualization
- [ ] Trend analysis
- [ ] Export features

## UI Components

### FuelEntryViewController
```swift
class FuelEntryViewController: BaseViewController<FuelEntryViewModel> {
    private let scrollView = UIScrollView()
    private let formContainer = UIStackView()
    private let receiptImageView = UIImageView()
    private let scanButton = IconButton()
    private let locationButton = IconButton()
    private let saveButton = PrimaryButton()
    
    override func setupUI() {
        // UI setup
    }
    
    override func bindViewModel() {
        let input = FuelEntryViewModel.Input(
            saveTrigger: saveButton.rx.tap.asObservable(),
            scanReceiptTrigger: scanButton.rx.tap.asObservable(),
            useLocationTrigger: locationButton.rx.tap.asObservable(),
            entryData: formData.asObservable()
        )
        
        let output = viewModel.transform(input: input)
        // Bind outputs
    }
}
```

## Testing Strategy
- Repository tests
- OCR accuracy tests
- Location tests
- Analytics tests
- UI interaction tests

## Performance Considerations
- Image optimization
- OCR processing
- Background sync
- Battery usage
- Memory management

## Security Measures
- Receipt data privacy
- Location privacy
- Secure storage
- Data encryption

## Accessibility
- VoiceOver support
- Dynamic type
- Manual entry options
- Location alternatives
- Receipt alternatives

## Open Questions
1. OCR service provider?
2. Receipt storage duration?
3. Location accuracy vs battery?
4. Offline analytics scope? 