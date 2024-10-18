import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApiSlice = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),  
    endpoints: (builder) => ({
        submitPayment: builder.mutation({
            query: (paymentData) => ({
                url: '/payments',  
                method: 'POST',
                body: paymentData,
            }),
        }),
    }),
});

export const { useSubmitPaymentMutation } = paymentApiSlice;
