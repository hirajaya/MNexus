import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PROMOTION_URL } from '../../constants.js'; 

export const promotionApi = createApi({
  reducerPath: 'promotionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPromotions: builder.query({
      query: () => '/promotions', 
      method: 'GET',
    }),

    getPromotionById: builder.query({
      query: (id) => `/promotions/${id}`, 
    }),

    createPromotion: builder.mutation({
      query: (newPromotion) => ({
        url: '/promotions', 
        method: 'POST',
        body: newPromotion,
      }),
    }),

    updatePromotion: builder.mutation({
      query: ({ id, updatedPromotion }) => ({
        url: `/promotions/${id}`, 
        method: 'PUT',
        body: updatedPromotion,
      }),
    }),

    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `/promotions/${id}`, 
        method: 'DELETE',         
      }),
      invalidatesTags: ['Promotion'], 
    }),
    
    getProducts: builder.query({
      query: () => PROMOTION_URL, 
    }),
  }),
});

export const {
  useGetPromotionsQuery,
  useGetPromotionByIdQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
  useGetProductsQuery, 
} = promotionApi;
