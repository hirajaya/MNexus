import { Link } from "react-router-dom";
import moment from "moment";
import { useGetPromotionsQuery, useDeletePromotionMutation } from "../../redux/features/promotions/promotionApiSlice.js";
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import SalesMenu from "./SalesMenu.jsx";
import { useState, useEffect } from 'react';

const AllPromotions = () => {
  const { data: promotions = [], isLoading, isError } = useGetPromotionsQuery();
  const [deletePromotion, { isLoading: deletingPromotion }] = useDeletePromotionMutation();
  const [currentPromotions, setCurrentPromotions] = useState(promotions);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (promotions) {
      setCurrentPromotions(
        promotions.filter(promotion =>
          promotion.promotionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          promotion.product1?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          promotion.product2?.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, promotions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading promotions</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await deletePromotion(id).unwrap();
        
        setCurrentPromotions((prevPromotions) => 
          prevPromotions.filter(promotion => promotion._id !== id)
        );
        toast.success("Promotion deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error(error.data?.message || "Failed to delete promotion. Try again.");
      }
    }
  };

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Promotions ({currentPromotions.length})
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          </div>
          
          <div className="flex flex-wrap justify-around items-center">
            {currentPromotions.map((promotion) => (
              <div
                key={promotion._id}
                className="block mb-4 overflow-hidden bg-pink-50 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <Link
                    to={`/admin/promotion/update/${promotion._id}`}
                    className="flex-grow"
                  >
                    <div className="flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {promotion.promotionType}
                        </h5>
                      </div>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Merchandise: {promotion.product1?.name} and {promotion.product2?.name}
                      </p>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Description: {promotion.description}
                      </p>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        Deduction: {promotion.deduction}
                      </p>
                      <div className="text-gray-400 flex justify-between">
                        <p>From {moment(promotion.validTo).format("MMMM Do YYYY")} to {moment(promotion.validFrom).format("MMMM Do YYYY")}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex space-x-2">
                    <Link to={`/salesM/promotion/update/${promotion._id}`}>
                      <MdEdit className="text-pink-600 hover:text-black cursor-pointer" size={24} />
                    </Link>
                    <button onClick={() => handleDelete(promotion._id)} disabled={deletingPromotion} className="outline-none">
                      <MdDelete className="text-red-600 hover:text-black cursor-pointer" size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2"></div>
        <SalesMenu />
      </div>
    </div>
  );
};

export default AllPromotions;
