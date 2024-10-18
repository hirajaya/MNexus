import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPromotionByIdQuery, useUpdatePromotionMutation } from "../../redux/features/promotions/promotionApiSlice.js";
import { toast } from "react-toastify";
import { useAllProductsQuery } from "../../redux/api/productApiSlice.js"; 
import SalesMenu from './SalesMenu.jsx'; 

const UpdatePromotionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: promotion, isLoading, isError } = useGetPromotionByIdQuery(id);
  
  const { data: products } = useAllProductsQuery(); 
  
  const [updatePromotion, { isLoading: updatingPromotion }] = useUpdatePromotionMutation();
  
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");
  const [promotionType, setPromotionType] = useState("");
  const [description, setDescription] = useState("");
  const [deduction, setDeduction] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");

  useEffect(() => {
    if (promotion) {
      setProduct1(promotion.product1?._id || "");
      setProduct2(promotion.product2?._id || "");
      setPromotionType(promotion.promotionType || "");
      setDescription(promotion.description || "");
      setDeduction(promotion.deduction || "");
      setValidFrom(promotion.validFrom?.split("T")[0] || ""); 
      setValidTo(promotion.validTo?.split("T")[0] || "");
    }
  }, [promotion]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedPromotionData = {
      product1,
      product2,
      promotionType,
      description,
      deduction,
      validFrom,
      validTo,
    };

    try {
      await updatePromotion({ id, updatedPromotion: updatedPromotionData }).unwrap();
      toast.success("Promotion updated successfully!");
      navigate("/salesM/allpromotions"); 
    } catch (error) {
      console.error("Error updating promotion:", error);
      toast.error("Failed to update promotion. Try again.");
    }
  };


  if (isLoading) {
    return <div>Loading promotion data...</div>;
  }

  if (isError) {
    return <div>Error loading promotion data.</div>;
  }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="p-3 md:w-3/4">
        <h2 className="text-2xl mb-4">Update Promotion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="product1" className="block mb-1">Select Merchandise 1</label>
            <select 
              value={product1} 
              onChange={(e) => setProduct1(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#fdfdfd] text-black"
            >
              <option value="" disabled>Select a product</option>
              {products?.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          </div>

          <SalesMenu />

          <div className="mb-4">
            <label htmlFor="product2" className="block mb-1">Select Merchandise 2</label>
            <select 
              value={product2} 
              onChange={(e) => setProduct2(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#fdfdfd] text-black"
            >
              <option value="" disabled>Select a product</option>
              {products?.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="promotionType" className="block mb-1">Promotion Type</label>
            <input 
              type="text" 
              value={promotionType} 
              onChange={(e) => setPromotionType(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">Description</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="deduction" className="block mb-1">Deduction</label>
            <input 
              type="number" 
              value={deduction} 
              onChange={(e) => setDeduction(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
              min="0"
              max="100"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="validFrom" className="block mb-1">Valid From</label>
            <input 
              type="date" 
              value={validFrom} 
              onChange={(e) => setValidFrom(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="validTo" className="block mb-1">Valid To</label>
            <input 
              type="date" 
              value={validTo} 
              onChange={(e) => setValidTo(e.target.value)} 
              required 
              className="p-4 w-full border rounded-lg bg-[#ffffff] text-black"
            />
          </div>

          <button 
            type="submit" 
            className={`py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white ${updatingPromotion ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={updatingPromotion} 
          >
            {updatingPromotion ? 'Updating...' : 'Update Promotion'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePromotionForm;
