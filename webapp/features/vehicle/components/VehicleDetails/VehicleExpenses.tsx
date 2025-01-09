'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Vehicle } from "../../types";
import { ExpenseList } from "@/features/expense/components/List";
import { AddExpenseModal } from "@/features/expense/components/ExpenseLog/Form/AddExpenseModal";

interface VehicleExpensesProps {
  vehicle: Vehicle;
}

export function VehicleExpenses({ vehicle }: VehicleExpensesProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Expenses</CardTitle>
          <Button onClick={() => setIsAddModalOpen(true)} size="sm">
            <FiPlus className="mr-2" />
            Add Expense
          </Button>
        </CardHeader>
        <CardContent>
          <ExpenseList vehicleId={vehicle.id} />
        </CardContent>
      </Card>

      <AddExpenseModal
        vehicleId={vehicle.id}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
} 