import type { FuelLog } from "../types";

export interface ConsumptionMetrics {
  byFuelType: {
    [fuelTypeId: string]: {
      averageConsumption: number; // L/100km or gal/100km based on fuel type unit
      totalDistance: number; // km
      totalFuel: number; // L or gal based on fuel type unit
      averageCostPerKm: number; // $/km
      averageCostPerUnit: number; // $/L or $/gal
      unit: 'liters' | 'gallons';
    };
  };
  overall: {
    totalDistance: number; // km
    totalCost: number; // $
    averageCostPerKm: number; // $/km
  };
}

export function calculateConsumptionMetrics(fuelLogs: FuelLog[]): ConsumptionMetrics {
  if (!fuelLogs.length) {
    return {
      byFuelType: {},
      overall: {
        totalDistance: 0,
        totalCost: 0,
        averageCostPerKm: 0,
      },
    };
  }

  // Sort logs by date to calculate distances
  const sortedLogs = [...fuelLogs].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group logs by fuel type
  const fuelTypeGroups = new Map<string, {
    logs: FuelLog[];
    unit: 'liters' | 'gallons';
  }>();

  // Initialize groups
  sortedLogs.forEach(log => {
    if (!fuelTypeGroups.has(log.fuelType.id)) {
      fuelTypeGroups.set(log.fuelType.id, {
        logs: [],
        unit: log.fuelType.unit,
      });
    }
    fuelTypeGroups.get(log.fuelType.id)!.logs.push(log);
  });

  const byFuelType: ConsumptionMetrics['byFuelType'] = {};
  let overallTotalDistance = 0;
  let overallTotalCost = 0;

  // Calculate metrics for each fuel type
  fuelTypeGroups.forEach((group, fuelTypeId) => {
    const { logs, unit } = group;
    let totalFuel = 0;
    let totalCost = 0;
    let totalDistance = 0;

    // Calculate total fuel, cost, and distance
    for (let i = 1; i < logs.length; i++) {
      const currentLog = logs[i];
      const previousLog = logs[i - 1];
      
      totalFuel += currentLog.quantity;
      totalCost += currentLog.totalCost;
      
      // Calculate distance between consecutive logs of the same fuel type
      if (currentLog.odometer && previousLog.odometer) {
        const distance = currentLog.odometer - previousLog.odometer;
        if (distance > 0) {
          totalDistance += distance;
        }
      }
    }

    // Add first log's fuel and cost
    if (logs.length > 0) {
      totalFuel += logs[0].quantity;
      totalCost += logs[0].totalCost;
    }

    // Calculate averages
    const averageConsumption = totalDistance > 0 ? (totalFuel * 100) / totalDistance : 0;
    const averageCostPerKm = totalDistance > 0 ? totalCost / totalDistance : 0;
    const averageCostPerUnit = totalFuel > 0 ? totalCost / totalFuel : 0;

    byFuelType[fuelTypeId] = {
      averageConsumption: Number(averageConsumption.toFixed(2)),
      totalDistance: Number(totalDistance.toFixed(1)),
      totalFuel: Number(totalFuel.toFixed(1)),
      averageCostPerKm: Number(averageCostPerKm.toFixed(2)),
      averageCostPerUnit: Number(averageCostPerUnit.toFixed(2)),
      unit,
    };

    overallTotalDistance += totalDistance;
    overallTotalCost += totalCost;
  });

  return {
    byFuelType,
    overall: {
      totalDistance: Number(overallTotalDistance.toFixed(1)),
      totalCost: Number(overallTotalCost.toFixed(2)),
      averageCostPerKm: overallTotalDistance > 0 
        ? Number((overallTotalCost / overallTotalDistance).toFixed(2))
        : 0,
    },
  };
} 