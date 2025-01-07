import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  FuelType, 
  CreateFuelTypeDTO, 
  UpdateFuelTypeDTO, 
  FuelTypeFilters 
} from '../types/fuelType';

export const fuelTypeApi = createApi({
  reducerPath: 'fuelTypeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/fleet-management',
    credentials: 'include',
  }),
  tagTypes: ['FuelType'],
  endpoints: (builder) => ({
    getFuelTypes: builder.query<FuelType[], FuelTypeFilters>({
      query: (filters) => ({
        url: '/fuel-types/list',
        params: filters,
      }),
      providesTags: ['FuelType']
    }),

    getFuelTypeById: builder.query<FuelType, string>({
      query: (id) => `/fuel-types/details/${id}`,
      providesTags: ['FuelType']
    }),

    createFuelType: builder.mutation<FuelType, CreateFuelTypeDTO>({
      query: (fuelType) => ({
        url: '/fuel-types/create',
        method: 'POST',
        body: fuelType,
      }),
      invalidatesTags: ['FuelType']
    }),

    updateFuelType: builder.mutation<FuelType, UpdateFuelTypeDTO>({
      query: ({ id, ...fuelType }) => ({
        url: `/fuel-types/update/${id}`,
        method: 'PATCH',
        body: fuelType,
      }),
      invalidatesTags: ['FuelType']
    }),

    deleteFuelType: builder.mutation<void, string>({
      query: (id) => ({
        url: `/fuel-types/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FuelType']
    })
  })
});

export const {
  useGetFuelTypesQuery,
  useGetFuelTypeByIdQuery,
  useCreateFuelTypeMutation,
  useUpdateFuelTypeMutation,
  useDeleteFuelTypeMutation
} = fuelTypeApi; 