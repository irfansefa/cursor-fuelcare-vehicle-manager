# RFC 3004: Android Fuel Management

## Status
- Status: Draft
- Date: 2024-01-20
- Priority: P1 (Core Feature)

## Context
The Android Fuel Management system provides comprehensive fuel tracking, consumption analysis, and receipt management capabilities, leveraging Android's platform features and Jetpack Compose for an optimal user experience.

## Goals
- Create fuel tracking system
- Implement receipt management
- Build consumption analysis
- Develop cost tracking

## Detailed Design

### Feature Structure
```
android/app/src/main/java/com/fuelcare/features/fuel/
├── domain/
│   ├── models/
│   │   ├── FuelEntry.kt
│   │   ├── Receipt.kt
│   │   └── FuelStatistics.kt
│   ├── repositories/
│   │   └── FuelRepository.kt
│   └── usecases/
│       ├── FuelTrackingUseCase.kt
│       ├── ReceiptManagementUseCase.kt
│       └── ConsumptionAnalysisUseCase.kt
├── data/
│   ├── local/
│   │   ├── FuelDatabase.kt
│   │   └── FuelDao.kt
│   ├── remote/
│   │   └── FuelApi.kt
│   └── repositories/
│       └── FuelRepositoryImpl.kt
└── presentation/
    ├── viewmodels/
    │   ├── FuelEntryViewModel.kt
    │   ├── FuelHistoryViewModel.kt
    │   └── ConsumptionViewModel.kt
    └── screens/
        ├── FuelEntryScreen.kt
        ├── FuelHistoryScreen.kt
        ├── ConsumptionScreen.kt
        └── components/
            ├── FuelEntryForm.kt
            ├── ReceiptScanner.kt
            ├── ConsumptionChart.kt
            └── FuelHistoryItem.kt
```

### Core Components

1. Fuel Models
```kotlin
data class FuelEntry(
    val id: String,
    val vehicleId: String,
    val date: LocalDateTime,
    val odometer: Int,
    val liters: Double,
    val pricePerLiter: Double,
    val totalCost: Double,
    val location: Location?,
    val stationId: String?,
    val receiptImage: String?,
    val notes: String?,
    val fuelType: FuelType,
    val isTankFull: Boolean
)

data class Receipt(
    val id: String,
    val fuelEntryId: String,
    val imageUrl: String,
    val ocrText: String?,
    val extractedData: Map<String, String>?,
    val uploadDate: LocalDateTime
)

data class FuelStatistics(
    val averageConsumption: Double,
    val totalCost: Double,
    val totalLiters: Double,
    val costPerKilometer: Double,
    val consumptionTrend: List<ConsumptionPoint>,
    val costTrend: List<CostPoint>
)
```

2. Fuel Repository
```kotlin
interface FuelRepository {
    suspend fun getFuelEntries(vehicleId: String): Flow<List<FuelEntry>>
    suspend fun getFuelEntry(id: String): FuelEntry
    suspend fun addFuelEntry(entry: FuelEntry): Result<FuelEntry>
    suspend fun updateFuelEntry(entry: FuelEntry): Result<FuelEntry>
    suspend fun deleteFuelEntry(id: String): Result<Unit>
    suspend fun uploadReceipt(receipt: Receipt): Result<Receipt>
    suspend fun getStatistics(vehicleId: String): FuelStatistics
}

class FuelRepositoryImpl(
    private val fuelApi: FuelApi,
    private val fuelDao: FuelDao,
    private val imageStorage: ImageStorage
) : FuelRepository {
    // Implementation
}
```

3. Fuel ViewModel
```kotlin
class FuelEntryViewModel(
    private val fuelTrackingUseCase: FuelTrackingUseCase,
    private val receiptManagementUseCase: ReceiptManagementUseCase
) : BaseViewModel() {
    private val _fuelEntry = MutableStateFlow<FuelEntry?>(null)
    val fuelEntry: StateFlow<FuelEntry?> = _fuelEntry.asStateFlow()

    private val _receipt = MutableStateFlow<Receipt?>(null)
    val receipt: StateFlow<Receipt?> = _receipt.asStateFlow()

    fun addFuelEntry(entry: FuelEntry) = launchWithLoading {
        fuelTrackingUseCase.addFuelEntry(entry).onSuccess { newEntry ->
            _fuelEntry.value = newEntry
        }
    }

    fun uploadReceipt(uri: Uri) = launchWithLoading {
        receiptManagementUseCase.uploadReceipt(uri).onSuccess { receipt ->
            _receipt.value = receipt
        }
    }
}
```

### Features

1. Fuel Tracking
   - Entry recording
   - History viewing
   - Cost calculation
   - Location tracking

2. Receipt Management
   - Image capture
   - OCR processing
   - Data extraction
   - Storage handling

3. Consumption Analysis
   - Statistics calculation
   - Trend analysis
   - Cost tracking
   - Efficiency metrics

4. Data Visualization
   - Charts
   - Graphs
   - Reports
   - Comparisons

### Dependency Injection

```kotlin
val fuelModule = module {
    // ViewModels
    viewModel { FuelEntryViewModel(get(), get()) }
    viewModel { FuelHistoryViewModel(get()) }
    viewModel { ConsumptionViewModel(get()) }

    // UseCases
    factory { FuelTrackingUseCase(get()) }
    factory { ReceiptManagementUseCase(get()) }
    factory { ConsumptionAnalysisUseCase(get()) }

    // Repository
    single<FuelRepository> { FuelRepositoryImpl(get(), get(), get()) }

    // API
    single { get<Retrofit>().create(FuelApi::class.java) }

    // Local Storage
    single { FuelDatabase.getInstance(get()) }
    single { get<FuelDatabase>().fuelDao() }
    single { ImageStorage(get()) }
}
```

### UI Components

1. Fuel Entry Screen
```kotlin
@Composable
fun FuelEntryScreen(
    viewModel: FuelEntryViewModel = getViewModel(),
    onNavigateBack: () -> Unit
) {
    val fuelEntry by viewModel.fuelEntry.collectAsState()
    val receipt by viewModel.receipt.collectAsState()
    var showCamera by remember { mutableStateOf(false) }

    BaseScreen(viewModel = viewModel) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            FuelEntryForm(
                onSubmit = { entry ->
                    viewModel.addFuelEntry(entry)
                }
            )

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = { showCamera = true },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Scan Receipt")
            }

            if (showCamera) {
                ReceiptScanner(
                    onImageCaptured = { uri ->
                        viewModel.uploadReceipt(uri)
                        showCamera = false
                    },
                    onDismiss = { showCamera = false }
                )
            }

            receipt?.let { receipt ->
                AsyncImage(
                    model = receipt.imageUrl,
                    contentDescription = "Receipt Image",
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(200.dp)
                        .clip(RoundedCornerShape(8.dp))
                )
            }
        }
    }
}
```

2. Reusable Components
```kotlin
@Composable
fun FuelEntryForm(
    onSubmit: (FuelEntry) -> Unit
) {
    var odometer by remember { mutableStateOf("") }
    var liters by remember { mutableStateOf("") }
    var pricePerLiter by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }
    var isTankFull by remember { mutableStateOf(true) }

    Column(modifier = Modifier.fillMaxWidth()) {
        OutlinedTextField(
            value = odometer,
            onValueChange = { odometer = it },
            label = { Text("Odometer") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
            value = liters,
            onValueChange = { liters = it },
            label = { Text("Liters") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
            value = pricePerLiter,
            onValueChange = { pricePerLiter = it },
            label = { Text("Price per Liter") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
            value = notes,
            onValueChange = { notes = it },
            label = { Text("Notes") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = isTankFull,
                onCheckedChange = { isTankFull = it }
            )
            Text("Full Tank")
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                // Create and submit FuelEntry
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Save")
        }
    }
}

@Composable
fun ConsumptionChart(
    statistics: FuelStatistics
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "Fuel Consumption",
                style = MaterialTheme.typography.titleLarge
            )
            // Chart implementation
        }
    }
}
```

## Implementation Plan

### Phase 1: Core Features (Week 1)
- [ ] Fuel entry
- [ ] Database setup
- [ ] Basic UI
- [ ] Cost tracking

### Phase 2: Receipt Management (Week 2)
- [ ] Camera integration
- [ ] OCR processing
- [ ] Data extraction
- [ ] Storage handling

### Phase 3: Analysis (Week 3)
- [ ] Statistics calculation
- [ ] Trend analysis
- [ ] Visualizations
- [ ] Reports

### Phase 4: Advanced Features (Week 4)
- [ ] Location tracking
- [ ] Station integration
- [ ] Export/Import
- [ ] Backup/Restore

## Testing Strategy
- Unit tests
- Integration tests
- Compose UI tests
- State management tests
- Camera integration tests

## Performance Considerations
- Image optimization
- OCR processing
- Data caching
- Memory management
- Storage efficiency

## Security Measures
- Data encryption
- Access control
- Input validation
- Secure storage
- Receipt privacy

## Accessibility
- Screen readers
- Content descriptions
- Focus management
- Image alternatives
- Clear labeling

## Open Questions
1. OCR accuracy requirements?
2. Receipt storage duration?
3. Statistics calculation method?
4. Location tracking frequency? 