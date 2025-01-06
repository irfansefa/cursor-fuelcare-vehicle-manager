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
      query: ({ vehicleId, page = 1, pageSize = 10 }) => 
        `/fuel-logs/list?vehicleId=${vehicleId}&page=${page}&pageSize=${pageSize}`,
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