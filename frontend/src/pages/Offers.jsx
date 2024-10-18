import { useGetOffersQuery } from "../redux/features/offers/offerApiSlice"; 
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

const UserOffers = () => {
  const { data: offers, isLoading, isError } = useGetOffersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    const errorMessage = isError?.data?.message || isError?.error || "An error occurred";
    return <Message variant="danger">{errorMessage}</Message>;
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Available Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <OfferCard key={offer._id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

const OfferCard = ({ offer }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(offer.offercode)
      .then(() => {
        toast.success("Offer code copied!");
      })
      .catch((err) => console.error("Failed to copy offer code: ", err));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 relative transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{offer.offername}</h3>
      <p className="text-gray-600">Type: {offer.offertype}</p>
      <p className="text-gray-600">Amount: Rs. {offer.offeramount}</p>
      <p className="text-gray-600">Description: {offer.offerdescription}</p>
      <p className="text-gray-600">Valid for: {offer.offermonth}</p>
      <div className="mt-4">
        <button
          onClick={handleCopy}
          className="bg-pink-500 text-white rounded-full py-2 px-4 hover:bg-pink-700 transition-colors duration-300"
        >
          {offer.offercode}
        </button>
      </div>
    </div>
  );
};

export default UserOffers;
