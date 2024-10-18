import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery, useCreateReviewMutation, useUpdateProductStockMutation } from '../../redux/api/productApiSlice';
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const { userInfo } = useSelector((state) => state.auth);
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
    const [updateProductStock] = useUpdateProductStockMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const addToCartHandler = () => {
        if (qty > product.quantity) {
            toast.error("Selected quantity exceeds available stock!");
            return;
        }

        dispatch(addToCart({ ...product, qty }));
        updateProductStock({ id: productId, quantity: product.quantity - qty });
        refetch();
        navigate("/cart");
    };

    return (
        <>
            <div>
                <Link to="/" className="text-black font-semibold hover:underline ml-[10rem]">Go Back</Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.message}</Message>
            ) : (
                <>
                    <div className="flex flex-wrap mt-[2rem] ml-[10rem]">
                        <div className="w-full xl:w-1/3 lg:w-1/3 md:w-full sm:w-full pr-[2rem]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full object-cover rounded" />
                        </div>

                        <div className="w-full xl:w-1/2 lg:w-1/2 md:w-full sm:w-full flex flex-col">
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className="my-4 text-[#B0B0B0]">{product.description}</p>
                            <p className="text-5xl my-4 font-extrabold">Rs. {product.price}</p>

                            <div className="flex items-center justify-between w-[20rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6">
                                        <FaStore className="mr-2 text-black" /> Artist:{" "}{product.artist}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[20rem]">
                                        <FaClock className="mr-2 text-black" /> Added:{" "}{moment(product.createAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaStar className="mr-2 text-black" /> Reviews:{" "}{product.numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex items-center mb-6">
                                        <FaStar className="mr-2 text-black" /> Ratings: {product.rating}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}{product.quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                        <FaBox className="mr-2 text-black" /> In Stock:{" "}{product.quantity}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex justify-between flex-wrap">
                                <Ratings
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`} />
                                {product.quantity > 0 && (
                                    <div>
                                        <select value={qty} onChange={(e) => setQty(e.target.value)} className="p-2 w-[6rem] rounded-lg text-black">
                                            {[...Array(product.quantity).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="btn-container">
                                <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                            <ProductTabs 
                                loadingProductReview={loadingProductReview} 
                                userInfo={userInfo} 
                                submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;
