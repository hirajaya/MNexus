import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const venueApiSlice = createApi({
    reducerPath: 'venueApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/venues' }),
    endpoints: (builder) => ({
        createVenue: builder.mutation({
            query: (venueData) => ({
                url: '/create',
                method: 'POST',
                body: venueData,
            }),
        }),
        getOneVenue: builder.query({
            query: (id) => `/${id}`,
        }),
        getAllVenues: builder.query({
            query: () => '/',
            transformResponse: (response) => response.map(venue => venue.name),
        }),
    }),
});

export const { 
    useCreateVenueMutation, 
    useGetOneVenueQuery, 
    useGetAllVenuesQuery 
} = venueApiSlice;
