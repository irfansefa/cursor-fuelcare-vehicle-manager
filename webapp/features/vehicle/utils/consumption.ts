import type { FuelLog } from "../store/fuelLogApi";

export interface ConsumptionMetrics {
  averageConsumption: number; // L/100km
  totalDistance: number; // km
  totalFuel: number; // L
  averageCostPerKm: number; // $/km
  averageCostPerLiter: number; // $/L
}

export function calculateConsumptionMetrics(fuelLogs: FuelLog[]): ConsumptionMetrics {
  if (!fuelLogs.length) {
    return {
      averageConsumption: 0,
      totalDistance: 0,
      totalFuel: 0,
      averageCostPerKm: 0,
      averageCostPerLiter: 0,
    };
  }

  // Sort logs by date to calculate distances
  const sortedLogs = [...fuelLogs].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let totalFuel = 0;
  let totalCost = 0;
  let totalDistance = 0;

  // Calculate total fuel, cost, and distance
  for (let i = 1; i < sortedLogs.length; i++) {
    const currentLog = sortedLogs[i];
    const previousLog = sortedLogs[i - 1];
    
    totalFuel += currentLog.quantity;
    totalCost += currentLog.totalCost;
    
    // Calculate distance between consecutive logs
    if (currentLog.odometer && previousLog.odometer) {
      const distance = currentLog.odometer - previousLog.odometer;
      if (distance > 0) {
        totalDistance += distance;
      }
    }
  }

  // Add first log's fuel and cost
  if (sortedLogs.length > 0) {
    totalFuel += sortedLogs[0].quantity;
    totalCost += sortedLogs[0].totalCost;
  }

  // Calculate averages
  const averageConsumption = totalDistance > 0 ? (totalFuel * 100) / totalDistance : 0;
  const averageCostPerKm = totalDistance > 0 ? totalCost / totalDistance : 0;
  const averageCostPerLiter = totalFuel > 0 ? totalCost / totalFuel : 0;

  return {
    averageConsumption: Number(averageConsumption.toFixed(2)),
    totalDistance: Number(totalDistance.toFixed(1)),
    totalFuel: Number(totalFuel.toFixed(1)),
    averageCostPerKm: Number(averageCostPerKm.toFixed(2)),
    averageCostPerLiter: Number(averageCostPerLiter.toFixed(2)),
  };
} 