'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Vehicle } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";
import { useGetFuelLogsQuery, useDeleteFuelLogMutation } from "../../store/fuelLogApi";
import { AddFuelLogModal } from "./AddFuelLogModal";
import { EditFuelLogModal } from "./EditFuelLogModal";
import { DeleteFuelLogDialog } from "./DeleteFuelLogDialog";
import { useToast } from "@/components/ui/feedback/use-toast";
import { Pagination } from "@/components/ui/navigation/pagination";
import { FuelLogFilters } from "./FuelLogFilters";
import type { FuelLog } from "../../store/fuelLogApi";
import type { FuelLogFilters as FuelLogFiltersType } from "./FuelLogFilters";
import type { SortField, SortOrder } from "../../store/fuelLogApi";

interface VehicleFuelLogsProps {
  vehicle: Vehicle;
}

interface SortableColumn {
  key: SortField;
  label: string;
}

const sortableColumns: SortableColumn[] = [
  { key: 'date', label: 'Date' },
  { key: 'odometer', label: 'Odometer' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'price_per_unit', label: 'Price/Unit' },
  { key: 'total_cost', label: 'Total Cost' },
  { key: 'location', label: 'Location' },
];

export function VehicleFuelLogs({ vehicle }: VehicleFuelLogsProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<FuelLog | null>(null);
  const [deleteLogId, setDeleteLogId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<FuelLogFiltersType>({});
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const { data: fuelLogsData, isLoading } = useGetFuelLogsQuery({
    vehicleId: vehicle.id,
    page,
    pageSize,
    ...filters,
    sortField,
    sortOrder,
  });

  const [deleteFuelLog, { isLoading: isDeleting }] = useDeleteFuelLogMutation();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!deleteLogId) return;

    try {
      await deleteFuelLog(deleteLogId).unwrap();
      
      // Check if we need to go to the previous page
      if (fuelLogs.length === 1 && page > 1) {
        setPage(page - 1);
      }

      toast({
        title: 'Success',
        description: 'Fuel log deleted successfully',
        variant: 'success',
      });
      setDeleteLogId(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete fuel log',
        variant: 'error',
      });
    }
  };

  const handleFiltersChange = (newFilters: FuelLogFiltersType) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1); // Reset to first page when sorting changes
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    if (!amount || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortOrder === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 inline" />
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const fuelLogs = fuelLogsData?.data || [];
  const { currentPage, totalPages, totalCount } = fuelLogsData?.meta || { currentPage: 1, totalPages: 1, totalCount: 0 };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fuel Logs</CardTitle>
          <Button onClick={() => setIsAddModalOpen(true)} size="sm">
            <Plus className="mr-2" />
            Add Fuel Log
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <FuelLogFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            vehicleId={vehicle.id}
          />
          {fuelLogs.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    {sortableColumns.map((column) => (
                      <TableHead
                        key={column.key}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort(column.key)}
                      >
                        <span className="inline-flex items-center">
                          {column.label}
                          {renderSortIcon(column.key)}
                        </span>
                      </TableHead>
                    ))}
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fuelLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{formatDate(log.date)}</TableCell>
                      <TableCell>{log.odometer} km</TableCell>
                      <TableCell>{log.quantity.toFixed(1)} L</TableCell>
                      <TableCell>{formatCurrency(log.pricePerUnit)}</TableCell>
                      <TableCell>{formatCurrency(log.totalCost)}</TableCell>
                      <TableCell>{log.location || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingLog(log)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteLogId(log.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalCount}
                onPageChange={setPage}
                onPageSizeChange={(newPageSize) => {
                  setPageSize(newPageSize);
                  setPage(1); // Reset to first page when changing page size
                }}
              />
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No fuel logs found. Add your first fuel log to start tracking.
            </div>
          )}
        </CardContent>
      </Card>

      <AddFuelLogModal
        vehicleId={vehicle.id}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {editingLog && (
        <EditFuelLogModal
          fuelLog={editingLog}
          vehicleId={vehicle.id}
          isOpen={!!editingLog}
          onClose={() => setEditingLog(null)}
        />
      )}

      <DeleteFuelLogDialog
        isOpen={!!deleteLogId}
        onClose={() => setDeleteLogId(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}