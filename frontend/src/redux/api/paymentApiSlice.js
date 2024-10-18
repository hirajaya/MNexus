import { apiSlice } from '../api/apiSlice';

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentsByDriverId: builder.query({
      query: (driverID) => `/payments/${driverID}`,
      providesTags: (result, error, driverID) => [{ type: 'Payment', id: driverID }],
    }),
    createPayment: builder.mutation({
      query: (newPayment) => ({
        url: '/payments',
        method: 'POST',
        body: newPayment,
      }),
      invalidatesTags: [{ type: 'Payment' }],
    }),
    updatePayment: builder.mutation({
      query: ({ id, updatedPayment }) => ({
        url: `/payments/${id}`,
        method: 'PUT',
        body: updatedPayment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Payment', id }],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Payment', id }],
    }),
  }),
});

export const {
  useGetPaymentsByDriverIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApiSlice;
