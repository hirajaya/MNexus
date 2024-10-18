import { Link } from "react-router-dom";
import moment from "moment";
import { useGetOffersQuery, useDeleteOfferMutation } from "../../redux/features/offers/offerApiSlice.js"; 
import { MdEdit, MdDelete } from 'react-icons/md'; 
import { toast } from 'react-toastify'; 
import SalesMenu from "./SalesMenu.jsx";

const OfferList = () => {
  const { data: offers, isLoading, isError } = useGetOffersQuery();
  const [deleteOffer, { isLoading: deletingOffer }] = useDeleteOfferMutation(); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading offers</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        const result = await deleteOffer(id).unwrap(); 
        toast.success("Offer deleted successfully!");
        console.log("Deletion result:", result); 
      } catch (error) {
        console.error("Delete error:", error); 
        toast.error(error.data?.message || "Failed to delete offer. Try again."); 
      }
    }
  };

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Offers ({offers.length})
          </div>
          <div className="flex flex-wrap justify-around items-center">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="block mb-4 overflow-hidden bg-pink-50 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <Link
                    to={`/admin/offer/update/${offer._id}`}
                    className="flex-grow"
                  >
                    <div className="flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {offer.offername} 
                        </h5>
                      </div>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Type: {offer.offertype} 
                      </p>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Month: {offer.offermonth} 
                      </p>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Code: {offer.offercode} 
                      </p>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Amount: {offer.offeramount} 
                      </p>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Description: {offer.offerdescription} 
                      </p>
                    </div>
                  </Link>
                  <div className="flex space-x-2">
                    <Link to={`/salesM/offer/update/${offer._id}`}>
                      <MdEdit className="text-blue-600 hover:text-black cursor-pointer" size={24} />
                    </Link>
                    <button onClick={() => handleDelete(offer._id)} disabled={deletingOffer} className="outline-none">
                      <MdDelete className="text-red-600 hover:text-black cursor-pointer" size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
        </div>
        <SalesMenu />
      </div>
    </div>
  );
};

export default OfferList;

