import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { saveDeliveryAddress, savePaymentMethod } from '../../redux/features/cart/cartSlice.js';
import ProgressSteps from "../../components/ProgressSteps.jsx";

const Delivery = () => {
  const cart = useSelector((state) => state.cart);
  const { deliveryAddress = {} } = cart; 
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [address, setAddress] = useState(deliveryAddress?.address || '');
  const [city, setCity] = useState(deliveryAddress?.city || '');
  const [postalCode, setPostalCode] = useState(deliveryAddress?.postalCode || '');
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!deliveryAddress?.address) {
      navigate('/delivery');
    }
  }, [navigate, deliveryAddress]);

  const regions = [
    "Western", "Central", "Southern", "Eastern", 
    "Northern", "North Western", "North Central", 
    "Sabaragamuwa", "Uva"
  ];

  const deliveryPrices = {
    "Western": 100,
    "Central": 200,
    "Southern": 300,
    "Eastern": 500,
    "Northern": 900,
    "North Western": 600,
    "North Central": 700,
    "Sabaragamuwa": 400,
    "Uva": 800
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const selectedPrice = deliveryPrices[city] || 0;
    setDeliveryPrice(selectedPrice);

    dispatch(saveDeliveryAddress({ address, city, postalCode, deliveryPrice: selectedPrice }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label className="block text-black mb-2">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2">Province</label>
            <select
              className="w-full p-2 border rounded"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select Province</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Select Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div>
          </div>

          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >Continue
          </button>

        </form>
      </div>
    </div>
  );
};

export default Delivery;
