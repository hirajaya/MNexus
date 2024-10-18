import { apiSlice } from './apiSlice'; 

const PLAYLISTS_URL = '/api/playlists';

export const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createPlaylist: builder.mutation({
      query: (playlistData) => ({
        url: PLAYLISTS_URL,
        method: 'POST',
        body: playlistData,
      }),
    }),

    getPlaylists: builder.query({
      query: () => ({
        url: PLAYLISTS_URL,
        method: 'GET',
      }),
    }),

    getPlaylistById: builder.query({
      query: (id) => ({
        url: `${PLAYLISTS_URL}/${id}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useCreatePlaylistMutation,
  useGetPlaylistsQuery,
  useGetPlaylistByIdQuery,
} = playlistApiSlice;
