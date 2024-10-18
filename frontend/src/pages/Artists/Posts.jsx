import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatePostMutation, useFetchPostsByAIDQuery } from '../../redux/api/postApiSlice.js';
import { motion } from 'framer-motion';

const Posts = () => {
    const { AID } = useParams();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [createPost, { isLoading }] = useCreatePostMutation();
    const { data: posts, error, isLoading: isFetching } = useFetchPostsByAIDQuery(AID);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('AID', AID);
        if (image) {
            formData.append('Image', image);
        }

        await createPost(formData);
        setName('');
        setTitle('');
        setContent('');
        setImage(null);
    };

    const formVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div 
            className="flex justify-center items-start h-screen bg-gray-100 p-8"
        >
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
                initial="hidden"
                animate="visible"
                variants={formVariants}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-center text-pink-600 mb-6">Create Post</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    required
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mb-4 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="mb-4 w-full"
                />
                <button
                    type="submit"
                    className="bg-pink-600 text-white font-bold py-2 px-4 w-full rounded-md hover:bg-pink-700 transition-all"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Post'}
                </button>
            </motion.form>

            <div className="ml-10 w-full max-w-lg">
                <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">Posts by Artist</h3>
                {isFetching ? (
                    <p className="text-center text-gray-500">Loading posts...</p>
                ) : error ? (
                    <p className="text-center text-red-600">Error fetching posts: {error.message}</p>
                ) : (
                    <ul className="space-y-4">
                        {posts && posts.map((post) => (
                            <li key={post.id} className="bg-white p-4 rounded-md shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800">{post.title}</h4>
                                <p className="text-gray-600 mt-2">{post.content}</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    <strong>By:</strong> {post.name} | <strong>AID:</strong> {post.AID}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
};

export default Posts;
