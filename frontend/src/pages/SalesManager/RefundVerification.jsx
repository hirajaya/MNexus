import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllInquiriesQuery } from '../../redux/features/inquiries/inquiriesApiSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const RefundVerification = () => {
    const dispatch = useDispatch();
    const { data: inquiries, isLoading, error } = useGetAllInquiriesQuery();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || error.message);
        }
    }, [error]);

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-xl font-semibold mb-2 text-center">All Inquiries</h2>
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
                                <th className="border border-gray-300 p-2 text-center">Image</th>
                                <th className="border border-gray-300 p-2 text-center">Status</th>
                                <th className="border border-gray-300 p-2 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inquiry, index) => (
                                <tr key={inquiry._id} className="border-b hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2 text-center">{`I00${index + 1}`}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {inquiry.orderID?.createdAt 
                                            ? new Date(inquiry.orderID.createdAt).toLocaleDateString() 
                                            : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {inquiry.createdAt 
                                            ? new Date(inquiry.createdAt).toLocaleDateString() 
                                            : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 p-2 flex justify-center items-center">
                                        {inquiry.proofImage && (
                                            <img
                                                src={`/${inquiry.proofImage}`} 
                                                alt="Proof"
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${inquiry.isApproved ? 'bg-green-100 text-green-600' : inquiry.isDenied ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {inquiry.isApproved ? 'Approved' : inquiry.isDenied ? 'Denied' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <Link to={`sales/inquiry/${inquiry._id}`}>
                                            <button className="bg-pink-400 text-white py-1 px-3 rounded">
                                                View More
                                            </button>
                                        </Link>
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

export default RefundVerification;
