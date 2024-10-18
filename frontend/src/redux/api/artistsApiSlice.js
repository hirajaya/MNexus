import { apiSlice } from './apiSlice';
import { ARTISTS_URL } from '../constants';

export const artistsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        artistLogin: builder.mutation({
            query: (data) => ({
                url: `${ARTISTS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        artistLogout: builder.mutation({
            query: () => ({
                url: `${ARTISTS_URL}/logout`,
                method: "POST",
            }),
        }),

        registerArtist: builder.mutation({
            query: (data) => ({
                url: `${ARTISTS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        createArtist: builder.mutation({
            query: (data) => ({
                url: `${ARTISTS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        artistProfile: builder.mutation({
            query: (data) => ({
                url: `${ARTISTS_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),

        getAllArtists: builder.query({
            query: () => ({
                url: `${ARTISTS_URL}`,
                method: "GET",
            }),
        }),

        getArtistByAID: builder.query({
            query: (AID) => ({
                url: `${ARTISTS_URL}/${AID}`,
                method: "GET",
            }),
        }),

        updateArtistByAID: builder.mutation({
            query: ({ AID, data }) => ({
                url: `${ARTISTS_URL}/${AID}`,
                method: "PUT",
                body: data,
            }),
        }),

        deleteArtistByAID: builder.mutation({
            query: (AID) => ({
                url: `${ARTISTS_URL}/${AID}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { 
    useArtistLoginMutation, 
    useArtistLogoutMutation, 
    useRegisterArtistMutation, 
    useArtistProfileMutation,
    useCreateArtistMutation,
    useGetAllArtistsQuery,
    useGetArtistByAIDQuery,
    useUpdateArtistByAIDMutation,
    useDeleteArtistByAIDMutation,
} = artistsApiSlice;
