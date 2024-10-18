import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DRIVERS_URL } from '../../constants'; 

export const driverApiSlice = createApi({
  reducerPath: 'driverApi', 
  baseQuery: fetchBaseQuery({ baseUrl: '' }), 
  tagTypes: ['Driver'],
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
      query: () => `${DRIVERS_URL}`, 
      providesTags: ['Driver'],
    }),
    getDriverById: builder.query({
      query: (id) => `${DRIVERS_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Driver', id }],
    }),
    addDriver: builder.mutation({
      query: (newDriver) => ({
        url: DRIVERS_URL,
        method: 'POST',
        body: newDriver,
      }),
      invalidatesTags: ['Driver'],
    }),
    updateDriver: builder.mutation({
      query: ({ id, updatedDriver }) => ({
        url: `${DRIVERS_URL}/${id}`,
        method: 'PUT',
        body: updatedDriver,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Driver', id }],
    }),
    deleteDriver: builder.mutation({
      query: (id) => ({
        url: `${DRIVERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Driver', id }],
    }),
  }),
});

export const {
  useGetAllDriversQuery,
  useGetDriverByIdQuery,
  useAddDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApiSlice;

