import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllInquiriesQuery, useDeleteInquiryMutation, useUpdateInquiryMutation } from '../../redux/features/inquiries/inquiriesApiSlice';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const InquiryList = () => {
    const dispatch = useDispatch();
    const { data: inquiries, isLoading, error } = useGetAllInquiriesQuery();
    const [deleteInquiry] = useDeleteInquiryMutation();
    const [updateInquiry] = useUpdateInquiryMutation();

    const [editingInquiryId, setEditingInquiryId] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedImage, setUpdatedImage] = useState('');

    const handleDeleteInquiry = async (inquiryId) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            try {
                await deleteInquiry(inquiryId).unwrap();
                toast.success("Inquiry deleted successfully.");
            } catch (err) {
                toast.error("Failed to delete inquiry.");
            }
        }
    };

    const handleEditClick = (inquiry) => {
        setEditingInquiryId(inquiry._id);
        setUpdatedDescription(inquiry.description);
        setUpdatedImage(inquiry.proofImage);
    };

    const handleUpdateInquiry = async (inquiryId) => {
        try {
            await updateInquiry({ id: inquiryId, description: updatedDescription, proofImage: updatedImage }).unwrap();
            toast.success("Inquiry updated successfully.");
            setEditingInquiryId(null);
        } catch (err) {
            toast.error("Failed to update inquiry.");
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || error.message);
        }
    }, [error]);

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-xl font-semibold mb-2 text-center">My Inquiries</h2>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {error && <Message variant="danger">{error.data?.message || error.message}</Message>}
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2 text-center">Inquiry ID</th>
                                <th className="border border-gray-300 p-2 text-center">Order Created Date</th>
                                <th className="border border-gray-300 p-2 text-center">Inquiry Created Date</th>
                                <th className="border border-gray-300 p-2 text-center">Description</th>
                                <th className="border border-gray-300 p-2 text-center">Image</th>
                                <th className="border border-gray-300 p-2 text-center">Status</th> {/* New Status Column */}
                                <th className="border border-gray-300 p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inquiry, index) => (
                                <tr key={inquiry._id} className="border-b hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2 text-center">{`I00${index + 1}`}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {inquiry.orderID ? new Date(inquiry.orderID.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center align-middle">
                                        {editingInquiryId === inquiry._id ? (
                                            <input
                                                type="text"
                                                value={updatedDescription}
                                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                                className="border border-gray-300 rounded p-1"
                                            />
                                        ) : (
                                            inquiry.description
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 flex justify-center items-center">
                                        {editingInquiryId === inquiry._id ? (
                                            <input
                                                type="text"
                                                value={updatedImage}
                                                onChange={(e) => setUpdatedImage(e.target.value)}
                                                className="border border-gray-300 rounded p-1"
                                            />
                                        ) : (
                                            inquiry.proofImage && (
                                                <img
                                                    src={`/${inquiry.proofImage}`} 
                                                    alt="Proof"
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            )
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {/* Status Button */}
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${inquiry.isApproved ? 'bg-green-100 text-green-600' : inquiry.isDenied ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {inquiry.isApproved ? 'Approved' : inquiry.isDenied ? 'Denied' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <div className="flex justify-around">
                                            {editingInquiryId === inquiry._id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateInquiry(inquiry._id)}
                                                        className="text-green-500 cursor-pointer"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingInquiryId(null)}
                                                        className="text-red-500 cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEditClick(inquiry)} />
                                                    <FaTrash
                                                        className="text-red-500 cursor-pointer"
                                                        onClick={() => handleDeleteInquiry(inquiry._id)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </>
            )}
        </div>
    );
};

export default InquiryList;
