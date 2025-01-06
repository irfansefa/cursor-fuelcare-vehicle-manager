import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FuelLogFormValues } from '../components/VehicleDetails/FuelLogForm/schema';

export interface FuelLog extends FuelLogFormValues {
  id: string;
  vehicleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface GetFuelLogsParams {
  vehicleId: string;
  page?: number;
  pageSize?: number;
  dateFrom?: string;
  dateTo?: string;
  fuelType?: string;
  location?: string;
}

export const fuelLogApi = createApi({
  reducerPath: 'fuelLogApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/fleet-management',
    credentials: 'include',
  }),
  tagTypes: ['FuelLog'],
  endpoints: (builder) => ({
    getFuelLogs: builder.query<PaginatedResponse<FuelLog>, GetFuelLogsParams>({
      query: ({ vehicleId, page = 1, pageSize = 10, dateFrom, dateTo, fuelType, location }) => {
        const params = new URLSearchParams({
          vehicleId,
          page: page.toString(),
          pageSize: pageSize.toString(),
        });

        if (dateFrom) params.append('dateFrom', dateFrom);
        if (dateTo) params.append('dateTo', dateTo);
        if (fuelType) params.append('fuelType', fuelType);
        if (location) params.append('location', location);

        return `/fuel-logs/list?${params.toString()}`;
      },
      providesTags: ['FuelLog'],
    }),
    addFuelLog: builder.mutation<FuelLog, FuelLogFormValues & { vehicleId: string }>({
      query: (fuelLog) => ({
        url: '/fuel-logs/create',
        method: 'POST',
        body: fuelLog,
      }),
      invalidatesTags: ['FuelLog'],
    }),
    updateFuelLog: builder.mutation<FuelLog, { id: string; vehicleId: string; fuelLog: Partial<FuelLogFormValues> }>({
      query: ({ id, vehicleId, fuelLog }) => ({
        url: `/fuel-logs/update/${id}`,
        method: 'PATCH',
        body: { ...fuelLog, vehicleId },
      }),
      invalidatesTags: ['FuelLog'],
    }),
    deleteFuelLog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/fuel-logs/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FuelLog'],
    }),
  }),
});

export const {
  useGetFuelLogsQuery,
  useAddFuelLogMutation,
  useUpdateFuelLogMutation,
  useDeleteFuelLogMutation,
} = fuelLogApi; 