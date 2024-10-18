import { apiSlice } from '../../api/apiSlice';
import { ALBUM_URL } from '../../constants.js';

export const albumApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addAlbum: builder.mutation({
            query: (albumData) => ({
                url: ALBUM_URL,
                method: 'POST',
                body: albumData,
            }),
        }),
        updateAlbum: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `${ALBUM_URL}/${id}`,
                method: 'PUT',
                body: updates,
            }),
        }),
        deleteAlbum: builder.mutation({
            query: (id) => ({
                url: `${ALBUM_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllAlbums: builder.query({
            query: () => ({
                url: ALBUM_URL,
                method: 'GET',
            }),
        }),
        getAlbumByID: builder.query({
            query: (id) => ({
                url: `${ALBUM_URL}/${id}`,
                method: 'GET',
            }),
        }),
        getAlbumByAID: builder.query({
            query: (AID) => ({
                url: `${ALBUM_URL}/aid/${AID}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useAddAlbumMutation,
    useUpdateAlbumMutation,
    useDeleteAlbumMutation,
    useGetAllAlbumsQuery,
    useGetAlbumByIDQuery,
    useGetAlbumByAIDQuery,
} = albumApiSlice;
