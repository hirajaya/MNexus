import { apiSlice } from '../../api/apiSlice';

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (eventData) => {
        const formData = new FormData();
        for (const key in eventData) {
          formData.append(key, eventData[key]);
        }

        return {
          url: '/api/events',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getAllEvents: builder.query({
      query: () => '/api/events',
    }),
    getEventByID: builder.query({
      query: (EID) => `/api/events/${EID}`,
    }),
    getEventByAname: builder.query({
      query: (AID) => `/api/events/artist/${AID}`,
    }),
    updateEvent: builder.mutation({
      query: ({ EID, updatedData }) => {
        const formData = new FormData();
        for (const key in updatedData) {
          formData.append(key, updatedData[key]);
        }

        return {
          url: `/api/events/${EID}`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
    deleteEvent: builder.mutation({
      query: (EID) => ({
        url: `/api/events/${EID}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetEventByIDQuery,
  useGetEventByAnameQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;
