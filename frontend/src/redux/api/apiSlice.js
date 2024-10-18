import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Admin', 'SalesManager', 'InventoryManager', 'OrderManager', 'Merchandise', 'Category', 'Promotions'],
  endpoints: (builder) => ({
    
    getAdminDashboard: builder.query({
      query: () => '/admin/dashboard',
      providesTags: ['Admin'],
    }),
    getAdminMerchList: builder.query({
      query: () => '/admin/merchlist',
      providesTags: ['Merchandise'],
    }),
    getAdminCategory: builder.query({
      query: () => '/admin/category',
      providesTags: ['Category'],
    }),
    getAdminPayroll: builder.query({
      query: () => '/admin/payroll',
      providesTags: ['Payroll'],
    }),

    getSalesDashboard: builder.query({
      query: () => '/salesM/sdashboard',
      providesTags: ['SalesManager'],
    }),
    getSalesProfitLoss: builder.query({
      query: () => '/salesM/profitloss',
      providesTags: ['SalesManager'],
    }),
    getSalesPromotions: builder.query({
      query: () => '/salesM/promotions',
      providesTags: ['Promotions'],
    }),
    getSalesOffers: builder.query({
      query: () => '/salesM/offers',
      providesTags: ['SalesManager'],
    }),
    getSalesRefunds: builder.query({
      query: () => '/salesM/refunds',
      providesTags: ['SalesManager'],
    }),

    getInventoryDashboard: builder.query({
      query: () => '/inventoryM/indashboard',
      providesTags: ['InventoryManager'],
    }),
    getInventoryProducts: builder.query({
      query: () => '/inventoryM/product',
      providesTags: ['InventoryManager'],
    }),
    getInventoryRecords: builder.query({
      query: () => '/inventoryM/records',
      providesTags: ['InventoryManager'],
    }),

    getOrderDashboard: builder.query({
      query: () => '/orderM/omdashboard',
      providesTags: ['OrderManager'],
    }),
    getOrderProducts: builder.query({
      query: () => '/orderM/product',
      providesTags: ['OrderManager'],
    }),
    getOrderDrivers: builder.query({
      query: () => '/orderM/records',
      providesTags: ['OrderManager'],
    }),
  }),
});


export const {
  useGetAdminDashboardQuery,
  useGetAdminMerchListQuery,
  useGetAdminCategoryQuery,
  useGetAdminPayrollQuery,

  useGetSalesDashboardQuery,
  useGetSalesProfitLossQuery,
  useGetSalesPromotionsQuery,
  useGetSalesOffersQuery,
  useGetSalesRefundsQuery,

  useGetInventoryDashboardQuery,
  useGetInventoryProductsQuery,
  useGetInventoryRecordsQuery,

  useGetOrderDashboardQuery,
  useGetOrderProductsQuery,
  useGetOrderDriversQuery,
} = apiSlice;
