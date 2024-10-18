import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import UserOffers from "../pages/Offers";
import { useGetOffersQuery } from "../redux/features/offers/offerApiSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart; 
  
  const { data: offers, isLoading, isError } = useGetOffersQuery(); 

  const [showOffers, setShowOffers] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/delivery");
  };

  const applyOfferCode = () => {
    if (isLoading) {
      alert("Loading offers...");
      return;
    }

    if (isError || !offers) {
      alert("Offers data is not available.");
      return;
    }

    const offer = offers.find((offer) => offer.offercode === enteredCode);
    if (offer) {
      setDiscount(offer.offeramount); 
    } else {
      setDiscount(0);
      alert("Invalid offer code!");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const discountedTotal = (totalPrice - discount).toFixed(2); 

  return (
    <div className="container flex justify-around items-start wrap mx-auto mt-8">
      {cartItems.length === 0 ? (
        <div>
          Your Cart is Empty
          <Link to="/merchandise"> Browse </Link>
        </div>
      ) : (
        <div className="flex flex-col w-[80%]">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center mb-[1rem] pb-2">
              <div className="w-[5rem] h-[5rem]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="flex-1 ml-4">
                <Link to={`/product/${item._id}`} className="text-pink-500">
                  {item.name}
                </Link>
                <div className="mt-2 text-black">{item.artist}</div>
                <div className="mt-2 text-black font-bold">Rs. {item.price}</div>
              </div>

              <div className="w-24">
                <select
                  className="w-full p-1 border rounded text-black"
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }>
                  {[...Array(item.quantity).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  className="text-red-500 mr-[5rem]"
                  onClick={() => removeFromCartHandler(item._id)}>
                  <FaTrash className="ml-[1rem] mt-[.5rem]" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 w-[40rem]">
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>

              <div className="text-2xl font-bold">
                Rs. {discountedTotal}
              </div>

              <button
                className="bg-pink-500 mt-4 py-2 px-4 rounded-3xl text-lg w-full text-white"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}>
                Proceed To Checkout
              </button>
            </div>
          </div>

          {totalPrice > 1000 && ( 
            <div className="mt-8">
              <button
                className="bg-black text-white py-2 px-4 rounded-full text-lg"
                onClick={() => setShowOffers(!showOffers)}>
                {showOffers ? "Hide Offers" : "Add Offer Code"}
              </button>

              {showOffers && (
                <>
                  <input
                    type="text"
                    placeholder="Enter Offer Code"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    className="border rounded p-2 w-full mt-4"
                  />
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-full text-lg mt-2"
                    onClick={applyOfferCode}>
                    Apply Offer
                  </button>

                  <UserOffers />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
