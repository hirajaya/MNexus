import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const offerApi = createApi({
  reducerPath: 'offerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => '/offers',
      method: 'GET',
    }),
    getOfferById: builder.query({
      query: (id) => `/offers/${id}`,
    }),
    createOffer: builder.mutation({
      query: (newOffer) => ({
        url: '/offers',
        method: 'POST',
        body: newOffer,
      }),
    }),
    updateOffer: builder.mutation({
      query: ({ id, updatedOffer }) => ({
        url: `/offers/${id}`,
        method: 'PUT',
        body: updatedOffer,
      }),
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/offers/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetOfferByIdQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offerApi;
