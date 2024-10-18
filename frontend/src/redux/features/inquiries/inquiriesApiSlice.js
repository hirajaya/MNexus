import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const inquiryApiSlice = createApi({
    reducerPath: 'inquiriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/inquiries' }),
    tagTypes: ['Inquiry'],
    endpoints: (builder) => ({
        createInquiry: builder.mutation({
            query: (inquiryData) => ({
                url: '/',
                method: 'POST',
                body: inquiryData,
            }),
            invalidatesTags: ['Inquiry'],
        }),
        getAllInquiries: builder.query({
            query: () => '/',
            providesTags: ['Inquiry'],
        }),
        getInquiriesByUserId: builder.query({
            query: (userId) => `/user/${userId}`,
            providesTags: ['Inquiry'],
        }),
        getInquiryById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Inquiry'],
        }),
        updateInquiry: builder.mutation({
            query: ({ id, ...inquiryData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: inquiryData,
            }),
            invalidatesTags: ['Inquiry'],
        }),
        deleteInquiry: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Inquiry'],
        }),
        approveInquiry: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}/approve`,
                method: 'PUT',
            }),
            invalidatesTags: ['Inquiry'],
        }),
        denyInquiry: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}/deny`,
                method: 'PUT',
            }),
            invalidatesTags: ['Inquiry'],
        }),
        getApprovedInquiries: builder.query({
            query: () => `/inquiries?status=approved`,
            providesTags: ['Inquiries'],
        }),
    }),
});

export const {
    useCreateInquiryMutation,
    useGetAllInquiriesQuery,
    useGetInquiriesByUserIdQuery,
    useGetInquiryByIdQuery,
    useUpdateInquiryMutation,
    useDeleteInquiryMutation,
    useApproveInquiryMutation,
    useDenyInquiryMutation,
    useGetApprovedInquiriesQuery,
} = inquiryApiSlice;

export default inquiryApiSlice;
