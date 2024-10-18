import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../redux/api/orderApiSlice.js";
import { useCreateInquiryMutation } from "../../redux/features/inquiries/inquiriesApiSlice.js";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from 'react-toastify';

const Inquiry = () => {
    const { id: orderID } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderID);

    const [proofImage, setProofImage] = useState(null);
    const [description, setDescription] = useState("");

    const [createInquiry, { isLoading: isCreating, error: createError }] = useCreateInquiryMutation();

    const handleImageUpload = (e) => {
        setProofImage(e.target.files[0]);
    };

    const handleSubmitInquiry = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("orderID", orderID);
        formData.append("description", description);
        if (proofImage) {
            formData.append("proofImage", proofImage);
        }

        try {
            await createInquiry(formData).unwrap();
            toast.success("Your inquiry has been raised!");
            setDescription("");
            setProofImage(null);
            setTimeout(() => {
                navigate("/inquiry/inquiryList"); 
            }, 7000);
        } catch (err) {
            console.error("Failed to submit inquiry:", err);
            toast.error("Failed to raise your inquiry.");
        }
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
    ) : (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Raise Inquiry for Order</h2>

            <div className="border border-gray-300 p-6 mb-4 rounded-lg shadow-lg max-w-lg mx-auto bg-white">
                <h3 className="text-lg font-bold mb-4 text-center bg-pink-400 text-white rounded p-2 shadow-md">Order Details</h3>
                <p className="text-center mb-2 text-lg font-medium">
                    <strong>Name:</strong> {order.user.username}
                </p>
                <p className="text-center mb-2 text-lg font-medium">
                    <strong>Date:</strong> {order.createdAt.substring(0, 10)}
                </p>
                <p className="text-center mb-2 text-lg font-medium">
                    <strong>Item Price:</strong> Rs. {order.itemsPrice}
                </p>
                <p className="text-center mb-2 text-lg font-medium">
                    <strong>Total Price:</strong> Rs. {order.totalPrice}
                </p>
                <p className="text-center mb-2 text-lg font-medium">
                    <strong>Address:</strong> {order.deliveryAddress.address}, {order.deliveryAddress.city}{" "}
                    {order.deliveryAddress.postalCode}
                </p>
                <p className="text-center mb-2 text-lg font-medium">
                    <strong>Delivery Status:</strong> {order.isDelivered ? "Delivered" : "Pending"}
                </p>
            </div>

            <div className="border border-gray-300 p-6 mb-4 rounded-lg shadow-lg max-w-lg mx-auto bg-white">
                <h3 className="text-lg font-bold mb-4 text-center bg-pink-400 text-white rounded p-2 shadow-md">Submit Inquiry</h3>
                <form onSubmit={handleSubmitInquiry}>
                    <label className="block mb-2 font-medium text-center text-lg">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-4 border border-gray-300 rounded-lg p-2 w-full h-24"
                        placeholder="Enter your description here"
                    />
                    <label className="block mb-2 font-medium text-center text-lg">Proof Image (Mandatory):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-4 border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 text-white py-1 px-4 rounded-full hover:bg-pink-600 transition duration-300 w-auto mx-auto block"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Inquiry;
