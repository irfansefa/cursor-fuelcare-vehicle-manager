import { FuelTypeSelect } from "@/features/fuel/components/FuelLog/FuelTypeSelect";
import { Card } from "@/components/ui/card/card";

const mockVehicleId = "123e4567-e89b-12d3-a456-426614174000"; // Matches test data vehicle ID

export default function FuelTypeSelectShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Fuel Type Select</h2>
        <p className="text-muted-foreground mb-4">
          A select component for choosing compatible fuel types for a specific vehicle.
          It automatically fetches and filters fuel types based on vehicle compatibility.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default State</h3>
        <Card className="p-6">
          <FuelTypeSelect
            vehicleId={mockVehicleId}
            onChange={(value) => console.log('Selected:', value)}
          />
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Unit Change Handler</h3>
        <Card className="p-6">
          <FuelTypeSelect
            vehicleId={mockVehicleId}
            onChange={(value) => console.log('Selected:', value)}
            onUnitChange={(unit) => console.log('Unit changed:', unit)}
          />
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Error State</h3>
        <Card className="p-6">
          <FuelTypeSelect
            vehicleId={mockVehicleId}
            onChange={(value) => console.log('Selected:', value)}
            error="Please select a fuel type"
          />
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Props</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Default</th>
                <th className="py-2 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-4 font-mono text-sm">vehicleId</td>
                <td className="py-2 px-4 font-mono text-sm">string</td>
                <td className="py-2 px-4">Required</td>
                <td className="py-2 px-4">The ID of the vehicle to fetch compatible fuel types for</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">value</td>
                <td className="py-2 px-4 font-mono text-sm">string?</td>
                <td className="py-2 px-4">undefined</td>
                <td className="py-2 px-4">The currently selected fuel type ID</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">onChange</td>
                <td className="py-2 px-4 font-mono text-sm">(value: string) {'->'} void</td>
                <td className="py-2 px-4">Required</td>
                <td className="py-2 px-4">Callback fired when the selection changes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">onUnitChange</td>
                <td className="py-2 px-4 font-mono text-sm">(unit: &apos;liters&apos; | &apos;gallons&apos;) {'->'} void</td>
                <td className="py-2 px-4">undefined</td>
                <td className="py-2 px-4">Optional callback fired when the selected fuel type&apos;s unit changes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">error</td>
                <td className="py-2 px-4 font-mono text-sm">string?</td>
                <td className="py-2 px-4">undefined</td>
                <td className="py-2 px-4">Error message to display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 