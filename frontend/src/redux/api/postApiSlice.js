import { apiSlice } from "./apiSlice";
import { POSTS_URL } from "../constants";

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (newPost) => ({
                url: `${POSTS_URL}`,
                method: "POST",
                body: newPost,
            }),
        }),

        updatePost: builder.mutation({
            query: ({ postId, updatedPost }) => ({
                url: `${POSTS_URL}/${postId}`,
                method: "PUT",
                body: updatedPost,
            }),
        }),

        deletePost: builder.mutation({
            query: (postId) => ({
                url: `${POSTS_URL}/${postId}`,
                method: "DELETE",
            }),
        }),

        fetchPosts: builder.query({
            query: () => `${POSTS_URL}`,
        }),

        fetchPostById: builder.query({
            query: (postId) => `${POSTS_URL}/${postId}`,
        }),

        fetchPostsByAID: builder.query({
            query: (AID) => `${POSTS_URL}/aid/${AID}`,
        }),
    }),
});

export const { 
    useCreatePostMutation, 
    useUpdatePostMutation, 
    useDeletePostMutation, 
    useFetchPostsQuery, 
    useFetchPostByIdQuery, 
    useFetchPostsByAIDQuery 
} = postApiSlice;
