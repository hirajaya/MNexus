import { useGetPromotionsQuery } from "../../redux/features/promotions/promotionApiSlice.js";
import Message from "../../components/Message.jsx";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from "moment";
import { FaClock, FaTag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice.js";

const PromotionCarousel = () => {
    const { data: promotions, isLoading, error } = useGetPromotionsQuery();
    const dispatch = useDispatch();

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const applyDiscount = (price, deduction) => {
        return price - (price * deduction / 100);
    };

    const handleAddToCart = (product1, product2, deduction) => {
        if (product1) {
            const discountedPrice1 = deduction ? applyDiscount(product1.price, deduction) : product1.price;
            dispatch(addToCart({ 
                _id: product1._id, 
                name: product1.name, 
                image: product1.image, 
                price: discountedPrice1, 
                qty: 1 
            }));
        }

        if (product2) {
            const discountedPrice2 = deduction ? applyDiscount(product2.price, deduction) : product2.price;
            dispatch(addToCart({ 
                _id: product2._id, 
                name: product2.name, 
                image: product2.image, 
                price: discountedPrice2, 
                qty: 1 
            }));
        }
    };

    return (
        <div className="mb-4 lg:block xl:block md:block">
            {isLoading ? null : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Slider
                    {...settings}
                    className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
                >
                    {promotions.map((promotion) => (
                        <div key={promotion._id} className="flex justify-center">
                            <div className="rounded-lg p-4 bg-pink-25 shadow-md">
                                <h2 className="text-xl font-semibold mb-2 flex items-center">
                                    {promotion.promotionType}
                                </h2>
                                <div className="flex justify-between items-center mb-4">
                                    {promotion.product1 && (
                                        <div className="flex items-center mr-4">
                                            <img
                                                src={promotion.product1.image}
                                                alt={promotion.product1.name}
                                                className="w-24 h-24 object-cover rounded-md mr-2"
                                            />
                                            <p className="text-gray-700">{promotion.product1.name}</p>
                                        </div>
                                    )}
                                    {promotion.product2 && (
                                        <div className="flex items-center">
                                            <img
                                                src={promotion.product2.image}
                                                alt={promotion.product2.name}
                                                className="w-24 h-24 object-cover rounded-md mr-2"
                                            />
                                            <p className="text-gray-700">{promotion.product2.name}</p>
                                        </div>
                                    )}
                                </div>
                                <p className="mb-2">
                                    {promotion.description}
                                </p>
                                <p className="mb-2">
                                    Valid Until: {moment(promotion.validTo).format("MMMM Do YYYY")}
                                </p>
                                <h1 className="flex items-center mb-6">
                                    <FaClock className="mr-2 text-black" /> Added:{" "}
                                    {moment(promotion.createdAt).fromNow()}
                                </h1>
                                <div 
                                    className="flex justify-end cursor-pointer" 
                                    onClick={() => handleAddToCart(promotion.product1, promotion.product2, promotion.deduction)}>
                                    <FaTag className="mr-2 text-yellow-500" size={40} />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default PromotionCarousel;
