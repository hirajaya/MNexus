import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInquiryByIdQuery, useApproveInquiryMutation, useDenyInquiryMutation } from '../../redux/features/inquiries/inquiriesApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InquiryDetails = () => {
    const { id: inquiryId } = useParams();
    const { data: inquiry, isLoading, error } = useGetInquiryByIdQuery(inquiryId);
    const [approveInquiry] = useApproveInquiryMutation();
    const [denyInquiry] = useDenyInquiryMutation();

    const encryptInquiryId = (id) => {
        const randomNum = Math.floor(Math.random() * 900) + 100;
        return `I${randomNum}`;
    };

    const encryptedInquiryId = encryptInquiryId(inquiry?._id);

    const handleImageClick = (src) => {
        toast(<img src={src} alt="Enlarged" className="toast-image" />, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            closeOnClick: true,
            draggable: true,
            style: { maxWidth: '80%', padding: '20px' },
        });
    };

    const totalItemPrice = inquiry?.orderID?.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0;

    const handleApproveClick = async () => {
        try {
            await approveInquiry({ id: inquiry._id }).unwrap();
        } catch (error) {
            console.error('Failed to approve inquiry: ', error);
        }
    };

    const handleDenyClick = async () => {
        try {
            await denyInquiry({ id: inquiry._id }).unwrap();
        } catch (error) {
            console.error('Failed to deny inquiry: ', error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg max-w-3xl">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.message}</Message>
            ) : (
                <div className="p-6 space-y-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Inquiry Details</h2>
                    <div className="border-b pb-4">
                        <strong className="block text-lg">Inquiry ID:</strong>
                        <span className="text-gray-600">{encryptedInquiryId}</span>
                    </div>
                    <div className="border-b pb-4">
                        <strong className="block text-lg">Customer Name:</strong>
                        <span className="text-gray-600">{inquiry?.orderID?.user?.username || 'N/A'}</span>
                    </div>
                    <div className="border-b pb-4">
                        <strong className="block text-lg">Delivery Address:</strong>
                        <span className="text-gray-600">
                            {inquiry?.orderID?.deliveryAddress?.address}, {inquiry?.orderID?.deliveryAddress?.city}, {inquiry?.orderID?.deliveryAddress?.postalCode}
                        </span>
                    </div>
                    <div className="border-b pb-4">
                        <strong className="block text-lg">Payment Method:</strong>
                        <span className="text-gray-600">{inquiry?.orderID?.paymentMethod}</span>
                    </div>
                    <div className="border-b pb-4">
                        <strong className="block text-lg">Total Item Price:</strong>
                        <span className="text-gray-600">Rs. {totalItemPrice.toFixed(2)}</span>
                    </div>
                    <div className="border-b pb-4">
                        <strong className="block text-lg">Description:</strong>
                        <p className="text-gray-600">{inquiry?.description}</p>
                    </div>
                    <div className="border-b pb-4">
                        <strong className="block text-lg">Ordered Items:</strong>
                        <ul className="list-disc list-inside text-gray-600">
                            {inquiry?.orderID?.orderItems?.map((item) => (
                                <li key={item.product}>
                                    {item.name} - Quantity: {item.qty}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {inquiry?.proofImage && (
                        <div className="border-b pb-4">
                            <strong className="block text-lg">Proof Image:</strong>
                            <img
                                src={`/${inquiry.proofImage}`}
                                alt="Proof"
                                className="w-48 h-48 object-cover mt-2 rounded-lg shadow-md cursor-pointer"
                                onClick={() => handleImageClick(`/${inquiry.proofImage}`)}
                            />
                        </div>
                    )}
                    <div>
                        <strong className="block text-lg">Status:</strong>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${inquiry?.isApproved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {inquiry?.isApproved ? 'Approved' : inquiry?.isDenied ? 'Denied' : 'Pending'}
                        </span>
                    </div>
                    <button onClick={handleApproveClick} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Approve
                    </button>
                    <button onClick={handleDenyClick} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                        Deny
                    </button>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
            />
            <style jsx>{`
                .toast-image {
                    max-width: 100%;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default InquiryDetails;
