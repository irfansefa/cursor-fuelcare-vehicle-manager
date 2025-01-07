import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Vehicle, VehicleFilters, NewVehicle } from '../types';

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/fleet-management',
    credentials: 'include',
  }),
  tagTypes: ['Vehicle'],
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], VehicleFilters>({
      query: (filters) => ({
        url: '/vehicles/list',
        params: filters,
      }),
      providesTags: ['Vehicle'],
    }),
    getVehicle: builder.query<Vehicle, string>({
      query: (id) => `/vehicles/details/${id}`,
      providesTags: ['Vehicle'],
    }),
    createVehicle: builder.mutation<Vehicle, NewVehicle>({
      query: (vehicle) => ({
        url: '/vehicles/create',
        method: 'POST',
        body: vehicle,
      }),
      invalidatesTags: ['Vehicle'],
    }),
    updateVehicle: builder.mutation<Vehicle, { id: string; vehicle: Partial<Vehicle> }>({
      query: ({ id, vehicle }) => ({
        url: `/vehicles/update/${id}`,
        method: 'PATCH',
        body: vehicle,
      }),
      invalidatesTags: ['Vehicle'],
    }),
    deleteVehicle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vehicles/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vehicle'],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleApi; 