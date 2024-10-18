import { apiSlice } from '../../api/apiSlice';
import { MUSIC_URL } from '../../constants';

export const musicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addMusic: builder.mutation({
            query: (data) => ({
                url: `${MUSIC_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        updateMusic: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${MUSIC_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteMusic: builder.mutation({
            query: (id) => ({
                url: `${MUSIC_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllMusic: builder.query({
            query: () => ({
                url: `${MUSIC_URL}`,
                method: 'GET',
            }),
        }),
        getMusicByID: builder.query({
            query: (id) => ({
                url: `${MUSIC_URL}/${id}`,
                method: 'GET',
            }),
        }),
        getMusicByAID: builder.query({
            query: (AID) => ({
                url: `${MUSIC_URL}/aid/${AID}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useAddMusicMutation,
    useUpdateMusicMutation,
    useDeleteMusicMutation,
    useGetAllMusicQuery,
    useGetMusicByIDQuery,
    useGetMusicByAIDQuery,
} = musicApiSlice;
