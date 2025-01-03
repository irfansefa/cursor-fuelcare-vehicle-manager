# FuelCare Vehicle Manager

A comprehensive vehicle management application for tracking expenses, fuel costs, and maintenance across web, iOS, and Android platforms.

## Features

- 🚗 Vehicle Management - Track multiple vehicles, service history, and documents
- ⛽ Fuel Cost Tracking - Log fuel purchases, analyze consumption, and compare prices
- 💰 Expense Management - Monitor maintenance, insurance, and other vehicle-related costs
- 🔧 Maintenance Tracking - Schedule services, set reminders, and store records
- 📊 Analytics & Insights - View comprehensive reports and cost analysis
- 🗺️ Gas Station Finder - Find nearby stations with real-time pricing

## Tech Stack

- **Web**: React 18, Next.js 14, TailwindCSS
- **iOS**: Swift 5.9, SwiftUI, TCA
- **Android**: Kotlin 1.9, Jetpack Compose
- **Backend**: Supabase (Auth, Database, Storage)

## Getting Started

1. Clone the repository
2. Choose your platform:
   - Web: `cd webapp && npm install`
   - iOS: `cd ios && pod install`
   - Android: `cd android && ./gradlew build`
3. Configure environment variables (see `.env.example`)
4. Run the development server for your platform

## Project Structure

```
├── webapp/          # Web application (PWA)
├── ios/             # iOS native app
├── android/         # Android native app
├── database/        # Database migrations
├── api/            # API documentation
└── docs/           # Project documentation
```

## License

MIT License - See [LICENSE](LICENSE) for details. 