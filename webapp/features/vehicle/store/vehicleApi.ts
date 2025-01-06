import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Vehicle, NewVehicle, UpdateVehicle, VehicleFilters } from '../types';

function transformVehicleResponse(vehicle: any): Vehicle {
  return {
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    licensePlate: vehicle.license_plate,
    vin: vehicle.vin,
    status: vehicle.status,
    createdAt: vehicle.created_at,
    updatedAt: vehicle.updated_at,
    documents: vehicle.documents || [],
  };
}

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
      transformResponse: (response: any[]) => response.map(transformVehicleResponse),
      transformErrorResponse: (response: { status: number, data: any }) => {
        return response.data?.error || 'Failed to fetch vehicles';
      },
      providesTags: ['Vehicle'],
    }),
    getVehicleById: builder.query<Vehicle, string>({
      query: (id) => `/vehicles/details/${id}`,
      transformResponse: transformVehicleResponse,
      transformErrorResponse: (response: { status: number, data: any }) => {
        return response.data?.error || 'Failed to fetch vehicle';
      },
      providesTags: ['Vehicle'],
    }),
    createVehicle: builder.mutation<Vehicle, NewVehicle>({
      query: (vehicle) => ({
        url: '/vehicles/create',
        method: 'POST',
        body: vehicle,
      }),
      transformResponse: transformVehicleResponse,
      transformErrorResponse: (response: { status: number, data: any }) => {
        if (response.status === 401) {
          return 'Please sign in to create a vehicle';
        }
        return response.data?.error || 'Failed to create vehicle';
      },
      invalidatesTags: ['Vehicle'],
    }),
    updateVehicle: builder.mutation<Vehicle, UpdateVehicle>({
      query: ({ id, ...vehicle }) => ({
        url: `/vehicles/update/${id}`,
        method: 'PATCH',
        body: vehicle,
      }),
      transformResponse: transformVehicleResponse,
      transformErrorResponse: (response: { status: number, data: any }) => {
        if (response.status === 401) {
          return 'Please sign in to update the vehicle';
        }
        return response.data?.error || 'Failed to update vehicle';
      },
      invalidatesTags: ['Vehicle'],
    }),
    deleteVehicle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vehicles/delete/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (response: { status: number, data: any }) => {
        if (response.status === 401) {
          return 'Please sign in to delete the vehicle';
        }
        return response.data?.error || 'Failed to delete vehicle';
      },
      invalidatesTags: ['Vehicle'],
    }),
  }),
}); 