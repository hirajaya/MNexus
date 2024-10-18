import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice'; 
import { promotionApi } from './features/promotions/promotionApiSlice.js';
import { offerApi } from "./features/offers/offerApiSlice.js";
import cartSliceReducer from '../redux/features/cart/cartSlice.js';
import inquiryApi from "./features/inquiries/inquiriesApiSlice.js";
import merchReducer from '../redux/features/merch/merchSlice.js';
import favouriteReducer from '../redux/features/favourites/favouriteSlice.js';
import { getFavoritesFromLocalStorage } from "../utils/localStorage";
import authReducer from "./features/auth/authSlice";
import { venueApiSlice } from "./features/venue/venueApiSlice.js";
import { driverApiSlice } from "./features/drivers/driverApiSlice.js";

const initialFavourites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer, 
    [inquiryApi.reducerPath]: inquiryApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [driverApiSlice.reducerPath] : driverApiSlice.reducer,
    [venueApiSlice.reducerPath] : venueApiSlice.reducer,
    auth: authReducer,
    favourites: favouriteReducer,
    cart: cartSliceReducer,
    merch: merchReducer,
  },
  preloadedState: {
    favourites: initialFavourites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(promotionApi.middleware)
      .concat(inquiryApi.middleware)
      .concat(offerApi.middleware)
      .concat(driverApiSlice.middleware)
      .concat(venueApiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
