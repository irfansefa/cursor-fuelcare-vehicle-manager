import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FuelLogFormValues } from '../components/VehicleDetails/FuelLogForm/schema';

interface FuelLog extends FuelLogFormValues {
  id: string;
  vehicleId: string;
  createdAt: string;
  updatedAt: string;
}

export const fuelLogApi = createApi({
  reducerPath: 'fuelLogApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/fleet-management',
    credentials: 'include',
    prepareHeaders: (headers) => {
      console.log('Request Headers:', Object.fromEntries(headers.entries()));
      return headers;
    },
  }),
  tagTypes: ['FuelLog'],
  endpoints: (builder) => ({
    getFuelLogs: builder.query<FuelLog[], string>({
      query: (vehicleId) => {
        console.log('Getting fuel logs for vehicle:', vehicleId);
        return `/fuel-logs/list?vehicleId=${vehicleId}`;
      },
      providesTags: ['FuelLog'],
      transformResponse: (response: FuelLog[]) => {
        console.log('Fuel logs response:', response);
        return response;
      },
      transformErrorResponse: (error) => {
        console.error('Error fetching fuel logs:', error);
        return error;
      },
    }),
    addFuelLog: builder.mutation<FuelLog, FuelLogFormValues & { vehicleId: string }>({
      query: (fuelLog) => {
        console.log('Adding fuel log:', fuelLog);
        return {
          url: '/fuel-logs/create',
          method: 'POST',
          body: fuelLog,
        };
      },
      invalidatesTags: ['FuelLog'],
      transformResponse: (response: FuelLog) => {
        console.log('Add fuel log response:', response);
        return response;
      },
      transformErrorResponse: (error) => {
        console.error('Error adding fuel log:', error);
        return error;
      },
    }),
    updateFuelLog: builder.mutation<FuelLog, { id: string; vehicleId: string; fuelLog: Partial<FuelLogFormValues> }>({
      query: ({ id, vehicleId, fuelLog }) => ({
        url: `/fuel-logs/update/${id}`,
        method: 'PATCH',
        body: { ...fuelLog, vehicleId },
      }),
      invalidatesTags: ['FuelLog'],
    }),
    deleteFuelLog: builder.mutation<void, { id: string; vehicleId: string }>({
      query: ({ id, vehicleId }) => ({
        url: `/fuel-logs/delete/${id}`,
        method: 'DELETE',
        body: { vehicleId },
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